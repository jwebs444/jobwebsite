export type FeaturedProject = {
	title: string;
	category: string;
	description: string;
	icon: string;
	href: string;
	technologies: string[];
	highlights: string[];
	testCount: number;
};

export const featuredProjects: FeaturedProject[] = [
	{
		title: 'Canyon Rain Forecast Comparator',
		category: 'Weather data API',
		description:
			'A FastAPI service that compares National Weather Service and OpenWeather precipitation forecasts for user-supplied coordinates.',
		icon: 'fa-solid fa-cloud-rain',
		href: 'https://github.com/jwebs444/Canyon_rain',
		technologies: ['Python', 'FastAPI', 'NWS API', 'OpenWeather', 'Pytest'],
		highlights: [
			'Normalizes hourly and three-hour forecasts into comparable time windows.',
			'Validates coordinates and duration while handling upstream failures safely.',
			'Fetches each provider once per request and keeps credentials out of source control.'
		],
		testCount: 7
	},
	{
		title: 'DungeonCrawler',
		category: 'Turn-based CLI game',
		description:
			'A Python adventure game built around randomized exploration, profession-specific attributes, combat, loot, and resource management.',
		icon: 'fa-solid fa-dungeon',
		href: 'https://github.com/jwebs444/DungeonCrawler',
		technologies: ['Python', 'OOP', 'CLI', 'Pytest', 'GitHub Actions'],
		highlights: [
			'Models parties, enemies, rooms, professions, health, movement, and supplies.',
			'Separates game logic from terminal input and output for reliable testing.',
			'Handles invalid choices and expedition exit paths without crashing or skipping state.'
		],
		testCount: 4
	}
];

