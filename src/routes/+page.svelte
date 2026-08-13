<script lang="ts">
	import Main from '../components/Main.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Jason Weber | Technology, Operations & Software</title>
	<meta
		name="description"
		content="Jason Weber is a technology and operations leader who builds software, improves systems, and makes complex work easier to run."
	/>
	<meta property="og:title" content="Jason Weber | Technology, Operations & Software" />
	<meta
		property="og:description"
		content="Make complicated work move—through clearer systems, useful software, and practical leadership."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://jasonweber.me/" />
	<meta property="og:image" content="https://jasonweber.me/og.png?v=02c74beb9e6a" />
	<meta property="og:image:width" content="1536" />
	<meta property="og:image:height" content="1024" />
	<meta property="og:image:alt" content="Jason Weber — Technology, Operations, Software" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://jasonweber.me/og.png?v=02c74beb9e6a" />
	<link rel="canonical" href="https://jasonweber.me/" />
	<link rel="preconnect" href="https://challenges.cloudflare.com" />
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
		defer
	></script>
</svelte:head>

<Main turnstileSiteKey={data.turnstileSiteKey} />
