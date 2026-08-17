import { describe, expect, it } from 'vitest';
import pageSource from './routes/+page.svelte?raw';
import robots from '../static/robots.txt?raw';
import sitemap from '../static/sitemap.xml?raw';

describe('search discovery contract', () => {
	it('publishes one consistent canonical profile URL', () => {
		expect(pageSource).toContain('<link rel="canonical" href="https://jasonweber.me/" />');
		expect(pageSource).toContain(
			'<meta name="robots" content="index, follow, max-image-preview:large" />'
		);
		expect(sitemap.match(/<loc>/g)).toHaveLength(1);
		expect(sitemap).toContain('<loc>https://jasonweber.me/</loc>');
	});

	it('advertises the canonical sitemap without blocking public content', () => {
		expect(robots).toContain('Allow: /');
		expect(robots).toContain('Sitemap: https://jasonweber.me/sitemap.xml');
		expect(robots).not.toContain('Disallow: /');
	});

	it('describes the visible profile and accountable person with JSON-LD', () => {
		expect(pageSource).toContain("'@type': 'ProfilePage'");
		expect(pageSource).toContain("'@type': 'Person'");
		expect(pageSource).toContain("'@type': 'WebSite'");
	});
});
