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
		content="I make complicated work move—through clearer systems, useful software, and practical leadership."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://thejasonandjasonshow.com/" />
	<meta property="og:image" content="https://thejasonandjasonshow.com/og.png" />
	<meta property="og:image:width" content="1536" />
	<meta property="og:image:height" content="1024" />
	<meta property="og:image:alt" content="Jason Weber — Technology, Operations, Software" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://thejasonandjasonshow.com/og.png" />
	<link rel="canonical" href="https://thejasonandjasonshow.com/" />
	<link rel="preconnect" href="https://challenges.cloudflare.com" />
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<Main turnstileSiteKey={data.turnstileSiteKey} />
