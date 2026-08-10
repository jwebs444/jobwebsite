<script lang="ts">
	import type { FeaturedProject } from '$lib/projects';

	export let project: FeaturedProject;
</script>

<article
	class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-violet-900/80 bg-slate-950/80 p-6 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-violet-500 sm:p-8"
>
	<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-700 via-violet-400 to-sky-400"></div>

	<header class="flex items-start gap-4">
		<div class="grid aspect-square w-12 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-xl text-violet-300 ring-1 ring-violet-400/20">
			<i class={project.icon} aria-hidden="true"></i>
		</div>
		<div>
			<p class="poppins text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
				{project.category}
			</p>
			<h4 class="mt-2 text-2xl font-semibold text-white sm:text-3xl">{project.title}</h4>
		</div>
	</header>

	<p class="mt-6 text-base leading-7 text-slate-300">{project.description}</p>

	<ul class="mt-6 flex flex-col gap-3 text-sm leading-6 text-slate-300 sm:text-base">
		{#each project.highlights as highlight}
			<li class="flex gap-3">
				<i class="fa-solid fa-check mt-1.5 text-xs text-violet-400" aria-hidden="true"></i>
				<span>{highlight}</span>
			</li>
		{/each}
	</ul>

	<div class="mt-7 flex flex-wrap gap-2" aria-label="Technologies used">
		{#each project.technologies as technology}
			<span class="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300">
				{technology}
			</span>
		{/each}
	</div>

	<footer class="mt-auto flex items-center justify-between gap-4 border-t border-slate-800 pt-7">
		<p class="text-sm text-slate-400">
			<span class="font-semibold text-white">{project.testCount}</span> automated tests
		</p>
		<a
			href={project.href}
			target="_blank"
			rel="noreferrer"
			class="rounded-full bg-white px-5 py-2.5 font-medium text-slate-950 transition hover:bg-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-slate-950"
		>
			View source <span aria-hidden="true">&rarr;</span>
		</a>
	</footer>
</article>
