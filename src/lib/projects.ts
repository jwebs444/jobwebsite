export type FeaturedProject = {
	index: string;
	title: string;
	category: string;
	summary: string;
	href: string;
	linkLabel: string;
	technologies: string[];
	highlights: string[];
	proof: string;
};

export const featuredProjects: FeaturedProject[] = [
	{
		index: '01',
		title: 'Roost Atlas',
		category: 'Mapping product · Public lands data',
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
		title: 'Mr. Crowmeister',
		category: 'Publishing platform · Personal brand',
		summary:
			'An original publishing platform for videos, maps, sound, field images, writing, and practical guides.',
		href: 'https://mrcrowmeister.com',
		linkLabel: 'Open live site',
		technologies: ['React', 'TypeScript', 'Cloudflare', 'Content pipeline', 'Responsive media'],
		highlights: [
			'Brings several media formats into one coherent editorial and navigation system.',
			'Uses responsive media delivery and generated content to keep publishing maintainable.',
			'Connects storytelling with practical field tools, including Roost Atlas.'
		],
		proof: 'Live platform · original media · ongoing publishing system'
	},
	{
		index: '03',
		title: 'Canyon Rain',
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
		index: '04',
		title: 'DungeonCrawler',
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
