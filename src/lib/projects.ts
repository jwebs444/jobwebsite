export type FeaturedProject = {
	index: string;
	title: string;
	category: string;
	summary: string;
	href: string;
	repository: string;
	technologies: string[];
	highlights: string[];
	proof: string;
};

export const featuredProjects: FeaturedProject[] = [
	{
		index: '01',
		title: 'Canyon Rain',
		category: 'Forecast API · Data integration',
		summary:
			'A FastAPI service that compares National Weather Service and OpenWeather precipitation forecasts for a requested coordinate.',
		href: 'https://github.com/jwebs444/Canyon_rain',
		repository: 'jwebs444/Canyon_rain',
		technologies: ['Python', 'FastAPI', 'NWS API', 'OpenWeather', 'Pytest'],
		highlights: [
			'Normalizes hourly and three-hour forecasts into comparable windows.',
			'Validates location and duration inputs and handles upstream failures safely.',
			'Fetches each provider once per request and keeps credentials outside source control.'
		],
		proof: '7 automated tests · GitHub Actions · documented API'
	},
	{
		index: '02',
		title: 'DungeonCrawler',
		category: 'Game systems · Object-oriented Python',
		summary:
			'A turn-based command-line adventure built around randomized exploration, profession-specific attributes, combat, loot, and resource management.',
		href: 'https://github.com/jwebs444/DungeonCrawler',
		repository: 'jwebs444/DungeonCrawler',
		technologies: ['Python', 'OOP', 'CLI', 'Pytest', 'GitHub Actions'],
		highlights: [
			'Models parties, enemies, rooms, health, movement, supplies, and profession bonuses.',
			'Separates game state from terminal input and output for deterministic testing.',
			'Validates player choices and closes edge cases around resting, exiting, and exploration.'
		],
		proof: '4 automated tests · zero runtime dependencies · CI verified'
	}
];
