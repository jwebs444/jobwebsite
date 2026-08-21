export type FeaturedProject = {
	index: string;
	title: string;
	group: ProjectGroupId;
	category: string;
	summary: string;
	href: string;
	linkLabel: string;
	technologies: string[];
	highlights: string[];
	proof: string;
};

export type ProjectGroupId = 'public-systems' | 'software-builds';

export const projectGroups: Array<{
	id: ProjectGroupId;
	label: string;
	description: string;
}> = [
	{
		id: 'public-systems',
		label: 'Connected public systems',
		description:
			'Three independent public properties shaped by the same field practice: turn direct observation into useful maps, route context, and original publishing.'
	},
	{
		id: 'software-builds',
		label: 'Focused software builds',
		description:
			'Two public repositories that put weather-data integration and testable game-state design in view.'
	}
];

export const featuredProjects: FeaturedProject[] = [
	{
		index: '01',
		title: 'Roost Atlas',
		group: 'public-systems',
		category: 'Camping atlas · Public-lands data',
		summary:
			'A live public-lands camping map for finding free, dispersed, and developed places to roost.',
		href: 'https://roostatlas.com',
		linkLabel: 'Open live site',
		technologies: ['JavaScript', 'Leaflet', 'OpenStreetMap', 'Marker clustering', 'Responsive UI'],
		highlights: [
			'Filters sites by cost, camping type, vehicle access, land agency, and verification.',
			'Combines map exploration, search, clustered markers, and detailed site records.',
			'Surfaces field-useful access and feature information without burying the map.'
		],
		proof: 'Live product · multisource verification · field-focused UX'
	},
	{
		index: '02',
		title: 'PerchPoints',
		group: 'public-systems',
		category: 'Photographic atlas · Route planning',
		summary:
			'A photographic atlas of reviewed places, paired with provenance-aware map locations and multi-day Flightways.',
		href: 'https://perchpoints.com',
		linkLabel: 'Open live site',
		technologies: ['SvelteKit', 'TypeScript', 'Leaflet', 'OpenStreetMap', 'Cloudflare'],
		highlights: [
			'Preserves exact, approximate, area-only, and withheld location tiers.',
			'Builds Flightways around routed drives, outing estimates, and reviewed sleep leads.',
			'Distinguishes photographed PerchPoints from honest source-only travel stops.'
		],
		proof: 'Live atlas · provenance-aware locations · reviewed Flightways'
	},
	{
		index: '03',
		title: 'Mr. Crowmeister',
		group: 'public-systems',
		category: 'Publishing platform · Field media',
		summary:
			'An original publishing platform for video, sound, field photography, writing, maps, and practical guides.',
		href: 'https://mrcrowmeister.com',
		linkLabel: 'Open live site',
		technologies: ['React', 'TypeScript', 'Cloudflare', 'Content pipeline', 'Responsive media'],
		highlights: [
			'Keeps each medium legible inside one coherent editorial and navigation system.',
			'Uses responsive media delivery and generated indexes to keep publishing maintainable.',
			'Moves between field evidence and original storytelling without flattening either into a feed.'
		],
		proof: 'Live platform · original media · ongoing publishing system'
	},
	{
		index: '04',
		title: 'Canyon Rain',
		group: 'software-builds',
		category: 'Forecast API · Data integration',
		summary:
			'A FastAPI service that compares National Weather Service and OpenWeather precipitation forecasts for a requested coordinate.',
		href: 'https://github.com/jwebs444/Canyon_rain',
		linkLabel: 'View repository',
		technologies: ['Python', 'FastAPI', 'NWS API', 'OpenWeather', 'Pytest'],
		highlights: [
			'Normalizes hourly and three-hour forecasts into comparable windows.',
			'Validates location and duration inputs and handles upstream failures safely.',
			'Fetches each provider once per request and keeps credentials outside source control.'
		],
		proof: '7 automated tests · GitHub Actions · documented API'
	},
	{
		index: '05',
		title: 'DungeonCrawler',
		group: 'software-builds',
		category: 'Game systems · Object-oriented Python',
		summary:
			'A turn-based command-line adventure built around randomized exploration, profession-specific attributes, combat, loot, and resource management.',
		href: 'https://github.com/jwebs444/DungeonCrawler',
		linkLabel: 'View repository',
		technologies: ['Python', 'OOP', 'CLI', 'Pytest', 'GitHub Actions'],
		highlights: [
			'Models parties, enemies, rooms, health, movement, supplies, and profession bonuses.',
			'Separates game state from terminal input and output for deterministic testing.',
			'Validates player choices and closes edge cases around resting, exiting, and exploration.'
		],
		proof: '4 automated tests · zero runtime dependencies · CI verified'
	}
];
