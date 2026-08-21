<script lang="ts">
	import type { FeaturedProject } from '$lib/projects';

	export let project: FeaturedProject;
</script>

<article class="project-card">
	<header class="project-card__header">
		<p class="project-index" aria-hidden="true">{project.index}</p>
		<div>
			<p class="eyebrow">{project.category}</p>
			<h4>{project.title}</h4>
		</div>
	</header>

	<p class="project-summary">{project.summary}</p>

	<ul class="project-highlights">
		{#each project.highlights as highlight (highlight)}
			<li><span aria-hidden="true">↳</span>{highlight}</li>
		{/each}
	</ul>

	<div class="tag-list" aria-label="Technologies used">
		{#each project.technologies as technology (technology)}
			<span>{technology}</span>
		{/each}
	</div>

	<footer class="project-card__footer">
		<p>{project.proof}</p>
		<!-- eslint-disable svelte/no-navigation-without-resolve -- URL is an external project link. -->
		<a
			href={project.href}
			target="_blank"
			rel="noreferrer"
			aria-label={`${project.linkLabel}: ${project.title}`}
		>
			{project.linkLabel} <span aria-hidden="true">↗</span>
		</a>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	</footer>
</article>
