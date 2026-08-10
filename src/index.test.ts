import { describe, expect, it } from 'vitest';

import { featuredProjects } from '$lib/projects';

describe('featured projects', () => {
	it('presents the four selected portfolio projects', () => {
		expect(featuredProjects.map(({ title }) => title)).toEqual([
			'Roost Atlas',
			'Mr. Crowmeister',
			'Canyon Rain',
			'DungeonCrawler'
		]);
	});

	it('publishes verifiable details for every featured project', () => {
		for (const project of featuredProjects) {
			expect(project.href).toMatch(/^https:\/\//);
			expect(project.linkLabel).toMatch(/open|view/i);
			expect(project.highlights.length).toBeGreaterThanOrEqual(3);
			expect(project.technologies.length).toBeGreaterThanOrEqual(2);
			expect(project.proof.length).toBeGreaterThan(20);
		}
	});
});
