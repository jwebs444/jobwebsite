<script lang="ts">
	import type { FeaturedProject } from '$lib/projects';

	export let project: FeaturedProject;
</script>

<article class="project-card">
	<header class="project-card__header">
		<p class="project-index" aria-hidden="true">{project.index}</p>
		<div>
			<p class="eyebrow">{project.category}</p>
			<h3>{project.title}</h3>
		</div>
	</header>

	<p class="project-summary">{project.summary}</p>

	<ul class="project-highlights">
		{#each project.highlights as highlight}
			<li><span aria-hidden="true">↳</span>{highlight}</li>
		{/each}
	</ul>

	<div class="tag-list" aria-label="Technologies used">
		{#each project.technologies as technology}
			<span>{technology}</span>
		{/each}
	</div>

	<footer class="project-card__footer">
		<p>{project.proof}</p>
		<a href={project.href} target="_blank" rel="noreferrer">
			View repository <span aria-hidden="true">↗</span>
		</a>
	</footer>
</article>
