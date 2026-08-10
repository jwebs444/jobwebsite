<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';
	import { featuredProjects } from '$lib/projects';

	const emailAddress = 'jwebs444@gmail.com';
	let copyLabel = 'Copy email address';

	function openEmailApp() {
		const subject = encodeURIComponent('Website inquiry');
		window.location.href = `mailto:${emailAddress}?subject=${subject}`;
	}

	async function copyEmail() {
		try {
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(emailAddress);
			} else {
				const field = document.createElement('textarea');
				field.value = emailAddress;
				field.style.position = 'fixed';
				field.style.opacity = '0';
				document.body.appendChild(field);
				field.select();
				document.execCommand('copy');
				field.remove();
			}

			copyLabel = 'Email copied';
			window.setTimeout(() => (copyLabel = 'Copy email address'), 2400);
		} catch {
			copyLabel = 'Copy unavailable';
		}
	}

	const selectedImpact = [
		{
			title: 'Recovered critical legacy data',
			body: 'Recovered an active data set from a failing Windows 7 system for a multi-million-dollar investment partnership.'
		},
		{
			title: 'Leads technology through operations',
			body: 'Integrates new technology and improves day-to-day systems across a working hoist and crane business.'
		},
		{
			title: 'Built a business while earning two degrees',
			body: 'Created and operated a profitable private-chef service while completing degrees in psychology and philosophy.'
		}
	];

	const experience = [
		{
			period: '2024 — Present',
			role: 'Technology & Operations Manager',
			company: 'Kresl Power',
			description:
				'Streamlining operational efficiency and overseeing the integration of new technologies across a diverse hoist and crane business.'
		},
		{
			period: '2021 — 2024',
			role: 'Virtualization Engineer',
			company: 'Upstart LP',
			description:
				'Recovered an active legacy data set from a failing Windows 7 system and served as a trusted technology consultant for a multi-million-dollar investment partnership.'
		},
		{
			period: 'Aug 2020 — Jan 2022',
			role: 'Graduate Teaching Assistant, Philosophy',
			company: 'Northern Illinois University',
			description:
				'Supported undergraduate philosophy instruction and made complex arguments clearer and more approachable for students.'
		},
		{
			period: '2018 — 2021',
			role: 'Personal Chef',
			company: 'Self-employed',
			description:
				'Built and operated an in-home private-chef business, owning client acquisition, profitability, delivery, and billing while completing two degrees.'
		},
		{
			period: '2017 — 2018',
			role: 'Sous Chef',
			company: 'Livia',
			description:
				'Managed diverse teams of more than ten people in fast-paced service environments where coordination, quality, and calm execution mattered.'
		}
	];

	const capabilities = [
		{
			number: '01',
			title: 'Operations systems',
			body: 'I find bottlenecks, clarify ownership, and build workflows people can actually use.'
		},
		{
			number: '02',
			title: 'Data & infrastructure',
			body: 'I work comfortably across SQL, data recovery, virtualization, APIs, and the messy realities of legacy systems.'
		},
		{
			number: '03',
			title: 'Software delivery',
			body: 'I ship Python and web projects with validation, automated tests, CI, documentation, and maintainable boundaries.'
		},
		{
			number: '04',
			title: 'Translation & leadership',
			body: 'I turn complex technical or analytical ideas into language that helps teams make decisions and move.'
		}
	];
</script>

<main id="top">
	<section class="hero section-shell" aria-labelledby="hero-title">
		<div class="hero-grid" aria-hidden="true"></div>
		<div class="hero-copy">
			<p class="hero-kicker"><span></span> Technology · Operations · Software</p>
			<h1 id="hero-title">I make complicated work <em>move.</em></h1>
			<p class="hero-intro">
				I’m Jason Weber—an operations leader and software builder who finds the real problem,
				translates the complexity, and ships a practical way forward.
			</p>
			<div class="hero-actions">
				<a class="button button-primary" href="#work"
					>Explore my work <span aria-hidden="true">↓</span></a
				>
				<a class="text-link" href="#contact"
					>Start a conversation <span aria-hidden="true">↓</span></a
				>
			</div>
		</div>

		<div class="hero-portrait">
			<img
				src="/images/jason-canyon.jpg"
				alt="Jason Weber smiling during a canyon expedition"
				fetchpriority="high"
			/>
			<p class="portrait-caption">Curious by nature.<br />Practical by training.</p>
		</div>
	</section>

	<section class="impact section-shell" aria-labelledby="impact-title">
		<div class="impact-heading">
			<p class="eyebrow">Selected impact</p>
			<h2 id="impact-title">Useful outcomes, not decorative metrics.</h2>
		</div>
		<div class="impact-grid">
			{#each selectedImpact as item, index}
				<article>
					<p>0{index + 1}</p>
					<h3>{item.title}</h3>
					<span>{item.body}</span>
				</article>
			{/each}
		</div>
	</section>

	<section class="projects section-shell" id="work" aria-labelledby="work-title">
		<div class="section-heading">
			<div>
				<p class="eyebrow">Selected work</p>
				<h2 id="work-title">Proof lives in the details.</h2>
			</div>
			<p>
				These projects show the same pattern I bring to operations work: understand the system,
				design for failure, document the decisions, and leave it stronger than I found it.
			</p>
		</div>

		<div class="project-grid">
			{#each featuredProjects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</section>

	<section class="experience section-shell" id="experience" aria-labelledby="experience-title">
		<div class="section-heading section-heading--compact">
			<div>
				<p class="eyebrow">Experience</p>
				<h2 id="experience-title">A career built by stepping into the hard part.</h2>
			</div>
		</div>

		<div class="timeline">
			{#each experience as item}
				<article class="timeline-item">
					<p class="timeline-period">{item.period}</p>
					<div class="timeline-role">
						<h3>{item.role}</h3>
						<p>{item.company}</p>
					</div>
					<p class="timeline-description">{item.description}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="capabilities" id="approach" aria-labelledby="approach-title">
		<div class="section-shell">
			<div class="section-heading section-heading--dark">
				<div>
					<p class="eyebrow">How I work</p>
					<h2 id="approach-title">Think deeply. Explain clearly. Build what lasts.</h2>
				</div>
				<p>
					My background crosses kitchens, entrepreneurship, data recovery, industrial operations,
					and software. The common thread is calm ownership when the path is not obvious.
				</p>
			</div>

			<div class="capability-grid">
				{#each capabilities as capability}
					<article>
						<p>{capability.number}</p>
						<h3>{capability.title}</h3>
						<span>{capability.body}</span>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="about section-shell" id="about" aria-labelledby="about-title">
		<div class="about-statement">
			<p class="eyebrow">Beyond the résumé</p>
			<h2 id="about-title">Curiosity is not a hobby. It is how I operate.</h2>
		</div>
		<div class="about-copy">
			<p>
				I studied psychology and philosophy because I wanted to understand people and difficult
				ideas. I learned kitchens because execution matters. I learned software because a good
				system can multiply what a team is capable of doing.
			</p>
			<p>
				Outside work, I explore deserts, make photographs, write, and build field tools through
				<a href="https://mrcrowmeister.com" target="_blank" rel="noreferrer">Mr. Crowmeister</a>.
				That work has a different audience, but it comes from the same habits: attention,
				adaptability, and bringing something useful back.
			</p>
		</div>
	</section>

	<section class="education section-shell" aria-labelledby="education-title">
		<div>
			<p class="eyebrow">Education</p>
			<h2 id="education-title">Continual learning, applied immediately.</h2>
		</div>
		<div class="education-list">
			<article>
				<p>2023</p>
				<h3>Python, SQL & DevOps Bootcamp</h3>
				<span>NuCamp</span>
			</article>
			<article>
				<p>2022</p>
				<h3>Wilderness First Responder</h3>
				<span>Desert Mountain Medicine</span>
			</article>
			<article>
				<p>2022</p>
				<h3>Canyoneering Leadership & Rescue</h3>
				<span>Uber Adventures Accredited Canyoneering Program</span>
			</article>
			<article>
				<p>2018 — 2022</p>
				<h3>Bachelor’s degrees in Psychology & Philosophy</h3>
				<span>Northern Illinois University</span>
			</article>
		</div>
	</section>

	<section class="contact section-shell" id="contact" aria-labelledby="contact-title">
		<p class="eyebrow">Let’s talk</p>
		<h2 id="contact-title">Have a difficult system that needs a practical next move?</h2>
		<div class="contact-panel">
			<div class="contact-intro">
				<span>Direct conversation</span>
				<p>Open a new message in your system’s default email app, or copy my address.</p>
			</div>
			<div class="contact-actions">
				<button class="button button-light" type="button" on:click={openEmailApp}
					>Email Jason <span aria-hidden="true">↗</span></button
				>
				<button class="text-button text-link text-link--light" type="button" on:click={copyEmail}
					>{copyLabel}</button
				>
				<a
					class="text-link text-link--light"
					href="https://www.linkedin.com/in/jason-weber-data/"
					target="_blank"
					rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a
				>
				<a
					class="text-link text-link--light"
					href="https://github.com/jwebs444"
					target="_blank"
					rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a
				>
			</div>
		</div>
		<p class="sr-only" aria-live="polite">
			{copyLabel === 'Email copied' ? 'Email address copied to clipboard.' : ''}
		</p>
		<p class="contact-note">Full résumé available on request.</p>
	</section>
</main>
