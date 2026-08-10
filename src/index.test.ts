import { describe, expect, it } from 'vitest';

import { featuredProjects } from '$lib/projects';

describe('featured projects', () => {
	it('presents the two selected portfolio projects', () => {
		expect(featuredProjects.map(({ title }) => title)).toEqual([
			'Canyon Rain Forecast Comparator',
			'DungeonCrawler'
		]);
	});

	it('links every project to a secure GitHub repository', () => {
		for (const project of featuredProjects) {
			expect(project.href).toMatch(/^https:\/\/github\.com\/jwebs444\//);
			expect(project.highlights.length).toBeGreaterThanOrEqual(3);
		}
	});
});
