<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';
	import { featuredProjects } from '$lib/projects';

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
				<a class="text-link" href="mailto:jwebs444@gmail.com"
					>Start a conversation <span aria-hidden="true">↗</span></a
				>
			</div>
		</div>

		<div class="hero-portrait">
			<div class="portrait-field" aria-hidden="true">
				<span>Operator</span><span>Builder</span><span>Translator</span>
			</div>
			<img src="/images/profile.png" alt="Jason Weber" />
			<p class="portrait-caption">Curious by nature. Practical by training.</p>
		</div>
	</section>

	<section class="proof-strip" aria-label="Career snapshot">
		<div><strong>Current</strong><span>Technology & Operations Manager</span></div>
		<div><strong>2023</strong><span>Python, SQL & DevOps bootcamp</span></div>
		<div><strong>2 degrees</strong><span>Psychology & Philosophy, NIU</span></div>
		<div><strong>11 tests</strong><span>Across two featured Python projects</span></div>
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
				<p>2018 — 2022</p>
				<h3>Bachelor’s degrees in Psychology & Philosophy</h3>
				<span>Northern Illinois University</span>
			</article>
		</div>
	</section>

	<section class="contact section-shell" id="contact" aria-labelledby="contact-title">
		<p class="eyebrow">Let’s talk</p>
		<h2 id="contact-title">Have a difficult system that needs a practical next move?</h2>
		<div class="contact-actions">
			<a class="button button-light" href="mailto:jwebs444@gmail.com"
				>Email Jason <span aria-hidden="true">↗</span></a
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
		<p class="contact-note">Full résumé available on request.</p>
	</section>
</main>
