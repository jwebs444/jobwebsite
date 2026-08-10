import { describe, expect, it } from 'vitest';

import { featuredProjects } from '$lib/projects';

describe('featured projects', () => {
	it('presents the two selected portfolio projects', () => {
		expect(featuredProjects.map(({ title }) => title)).toEqual(['Canyon Rain', 'DungeonCrawler']);
	});

	it('publishes verifiable details for every featured project', () => {
		for (const project of featuredProjects) {
			expect(project.href).toMatch(/^https:\/\/github\.com\/jwebs444\//);
			expect(project.repository).toMatch(/^jwebs444\//);
			expect(project.highlights.length).toBeGreaterThanOrEqual(3);
			expect(project.technologies.length).toBeGreaterThanOrEqual(2);
			expect(project.proof).toMatch(/test|dependenc|verified/i);
		}
	});
});
