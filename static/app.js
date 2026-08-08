const state = {
  map: null,
  markers: new Map(),
  allSites: [],
  sites: [],
  features: [],
  featureStates: new Map(),
  selectedId: null,
  debounce: null,
};

const elements = {
  list: document.querySelector("#site-list"),
  count: document.querySelector("#result-count"),
  search: document.querySelector("#search"),
  showAll: document.querySelector("#show-all"),
  clearFilters: document.querySelector("#clear-filters"),
  costFilter: document.querySelector("#cost-filter"),
  typeFilter: document.querySelector("#type-filter"),
  featureFilters: document.querySelector("#feature-filters"),
  details: document.querySelector("#details"),
  mapError: document.querySelector("#map-error"),
};

function textValue(value, fallback = "Unknown") {
  return value === null || value === undefined || value === "" ? fallback : String(value);
}

function yesNo(value) {
  if (value === 1) return "Yes";
  if (value === 0) return "No";
  return "Unknown";
}

function locationName(site) {
  if (!site.nearest_town) return "Nearest town not listed";
  return [site.nearest_town, site.nearest_town_state].filter(Boolean).join(", ");
}

function initializeMap() {
  if (!window.L) {
    elements.mapError.hidden = false;
    return;
  }

  state.map = L.map("map", {
    zoomControl: true,
    dragging: true,
    touchZoom: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    keyboard: true,
    inertia: true,
    worldCopyJump: true,
  }).setView([38.9, -111.1], 7);

  L.tileLayer("https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png", {
    subdomains: "abc",
    maxZoom: 20,
    attribution: '<a href="https://www.cyclosm.org/">CyclOSM</a> | Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(state.map);

  state.map.dragging.enable();
}

async function loadFeatures() {
  const response = await fetch("/static/data/features.json");
  if (!response.ok) throw new Error("Could not load features");
  const result = await response.json();
  state.features = result.features;
  renderFeatureFilters();
}

function siteQuery() {
  const params = new URLSearchParams();
  if (elements.search.value.trim()) params.set("q", elements.search.value.trim());
  if (elements.costFilter.value !== "all") params.set("cost", elements.costFilter.value);
  if (elements.typeFilter.value !== "all") params.set("site_type", elements.typeFilter.value);
  for (const [feature, mode] of state.featureStates) {
    params.append(mode === "include" ? "feature_in" : "feature_out", feature);
  }
  return params;
}

async function loadSites() {
  if (!state.allSites.length) {
    const response = await fetch("/static/data/sites.json");
    if (!response.ok) throw new Error("Could not load camping sites");
    state.allSites = await response.json();
  }

  const search = elements.search.value.trim().toLocaleLowerCase();
  const cost = elements.costFilter.value;
  const siteType = elements.typeFilter.value;

  state.sites = state.allSites.filter((site) => {
    const searchable = [site.name, site.nearest_town, site.notes]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase();
    if (search && !searchable.includes(search)) return false;
    if (cost === "free" && site.fee_amount !== 0) return false;
    if (cost === "paid" && !(site.fee_amount > 0)) return false;
    if (siteType === "dispersed" && site.site_category !== "dispersed") return false;
    if (siteType === "non-dispersed" && site.site_category === "dispersed") return false;

    for (const [feature, mode] of state.featureStates) {
      const hasFeature = site.features.includes(feature);
      if (mode === "include" && !hasFeature) return false;
      if (mode === "exclude" && hasFeature) return false;
    }
    return true;
  });
  renderSites();
}

function renderFeatureFilters() {
  elements.featureFilters.replaceChildren();
  for (const feature of state.features) {
    const mode = state.featureStates.get(feature.name) || "neutral";
    const button = document.createElement("button");
    button.type = "button";
    button.className = `feature-filter ${mode === "neutral" ? "" : mode}`.trim();
    button.textContent = `${mode === "include" ? "+ " : mode === "exclude" ? "− " : ""}${feature.name} (${feature.site_count})`;
    button.setAttribute("aria-label", `${feature.name}: ${mode}. Click to change.`);
    button.addEventListener("click", () => {
      if (mode === "neutral") state.featureStates.set(feature.name, "include");
      else if (mode === "include") state.featureStates.set(feature.name, "exclude");
      else state.featureStates.delete(feature.name);
      renderFeatureFilters();
      loadSites().catch(showError);
    });
    elements.featureFilters.append(button);
  }
}

function renderSites() {
  elements.list.replaceChildren();
  elements.count.textContent = `${state.sites.length} ${state.sites.length === 1 ? "site" : "sites"}`;

  for (const site of state.sites) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "site-card" + (site.id === state.selectedId ? " active" : "");
    card.dataset.siteId = site.id;

    const name = document.createElement("strong");
    name.textContent = site.name;
    const meta = document.createElement("span");
    meta.textContent = `${locationName(site)} · ${textValue(site.elevation_ft)} ft`;
    card.append(name, meta);
    card.addEventListener("click", () => selectSite(site.id, true));
    elements.list.append(card);
  }

  renderMarkers();
}

function renderMarkers() {
  if (!state.map) return;

  for (const marker of state.markers.values()) marker.remove();
  state.markers.clear();

  const bounds = [];
  for (const site of state.sites) {
    const marker = L.marker([site.latitude, site.longitude]).addTo(state.map);
    const popup = document.createElement("div");
    const title = document.createElement("div");
    title.className = "popup-title";
    title.textContent = site.name;
    const location = document.createElement("div");
    location.textContent = locationName(site);
    popup.append(title, location);
    marker.bindPopup(popup);
    marker.on("click", () => selectSite(site.id, false));
    state.markers.set(site.id, marker);
    bounds.push([site.latitude, site.longitude]);
  }

  if (bounds.length) state.map.fitBounds(bounds, { padding: [35, 35], maxZoom: 10 });
}

async function selectSite(siteId, moveMap) {
  const site = state.allSites.find((candidate) => candidate.id === siteId);
  if (!site) return;
  state.selectedId = site.id;

  document.querySelector("#detail-category").textContent = site.site_category;
  document.querySelector("#detail-name").textContent = site.name;
  document.querySelector("#detail-location").textContent = `${locationName(site)} · ${site.latitude.toFixed(6)}, ${site.longitude.toFixed(6)}`;
  document.querySelector("#detail-notes").textContent = site.notes || "";
  document.querySelector("#detail-notes").hidden = !site.notes;
  document.querySelector("#detail-source-text").textContent = site.original_text;
  document.querySelector("#detail-source").textContent = `${site.source_title}, page ${site.page_number} · ${site.transcription_status}`;

  const facts = [
    ["Elevation", site.elevation_ft ? `${site.elevation_ft} ft` : "Unknown"],
    ["Fee", site.fee_description || (site.fee_amount === 0 ? "Free" : "Unknown")],
    ["Tent camping", yesNo(site.tent_allowed)],
    ["RV camping", yesNo(site.rv_allowed)],
    ["Water", yesNo(site.water_available)],
    ["Toilets", site.toilet_type === "none" ? "No" : textValue(site.toilet_type)],
    ["Reservations", yesNo(site.reservations_accepted)],
    ["Stay limit", site.stay_limit_days ? `${site.stay_limit_days} days` : "Not listed"],
  ];

  const factContainer = document.querySelector("#detail-facts");
  factContainer.replaceChildren();
  for (const [label, value] of facts) {
    const fact = document.createElement("div");
    fact.className = "fact";
    const factLabel = document.createElement("span");
    factLabel.textContent = label;
    const factValue = document.createElement("strong");
    factValue.textContent = value;
    fact.append(factLabel, factValue);
    factContainer.append(fact);
  }

  const chipContainer = document.querySelector("#detail-features");
  chipContainer.replaceChildren();
  for (const feature of site.features) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = feature;
    chipContainer.append(chip);
  }

  elements.details.hidden = false;
  document.querySelectorAll(".site-card").forEach((card) => {
    card.classList.toggle("active", Number(card.dataset.siteId) === site.id);
  });

  const marker = state.markers.get(site.id);
  if (marker && moveMap) {
    state.map.setView(marker.getLatLng(), Math.max(state.map.getZoom(), 11));
    marker.openPopup();
  }
}

elements.search.addEventListener("input", () => {
  clearTimeout(state.debounce);
  state.debounce = setTimeout(() => loadSites().catch(showError), 220);
});

elements.showAll.addEventListener("click", () => {
  elements.search.value = "";
  loadSites().catch(showError);
});

elements.costFilter.addEventListener("change", () => loadSites().catch(showError));
elements.typeFilter.addEventListener("change", () => loadSites().catch(showError));

elements.clearFilters.addEventListener("click", () => {
  elements.search.value = "";
  elements.costFilter.value = "all";
  elements.typeFilter.value = "all";
  state.featureStates.clear();
  renderFeatureFilters();
  loadSites().catch(showError);
});

document.querySelector("#close-details").addEventListener("click", () => {
  elements.details.hidden = true;
  state.selectedId = null;
  document.querySelectorAll(".site-card.active").forEach((card) => card.classList.remove("active"));
});

function showError(error) {
  elements.count.textContent = error.message;
}

initializeMap();
loadFeatures()
  .then(loadSites)
  .catch(showError);
