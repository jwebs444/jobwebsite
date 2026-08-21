import { describe, expect, it } from 'vitest';

import { featuredProjects, projectGroups } from '$lib/projects';

describe('featured projects', () => {
	it('presents the five selected portfolio projects in the approved order', () => {
		expect(featuredProjects.map(({ title }) => title)).toEqual([
			'Roost Atlas',
			'PerchPoints',
			'Mr. Crowmeister',
			'Canyon Rain',
			'DungeonCrawler'
		]);
	});

	it('keeps the related public systems distinct from the focused software builds', () => {
		expect(projectGroups.map(({ id }) => id)).toEqual(['public-systems', 'software-builds']);
		expect(featuredProjects.filter(({ group }) => group === 'public-systems')).toHaveLength(3);
		expect(featuredProjects.filter(({ group }) => group === 'software-builds')).toHaveLength(2);
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

	it('publishes the canonical PerchPoints destination', () => {
		expect(featuredProjects.find(({ title }) => title === 'PerchPoints')?.href).toBe(
			'https://perchpoints.com'
		);
	});
});
