<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';
	import { featuredProjects } from '$lib/projects';
	import { inquiryTopics } from '$lib/inquiry';

	export let turnstileSiteKey = '';

	let inquiryState: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
	let inquiryMessage = '';

	async function submitInquiry(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		inquiryState = 'submitting';
		inquiryMessage = '';

		try {
			const response = await fetch('/api/inquiry', { method: 'POST', body: new FormData(form) });
			const result = (await response.json()) as { ok: boolean; message: string };
			inquiryMessage = result.message;
			inquiryState = result.ok ? 'success' : 'error';

			if (result.ok) form.reset();
		} catch {
			inquiryState = 'error';
			inquiryMessage = 'The message could not be sent right now. Please try again shortly.';
		} finally {
			window.turnstile?.reset();
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
			<h1 id="hero-title">Make complicated work <em>move.</em></h1>
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
			/>
			<p class="portrait-caption">Curious by nature.<br />Practical by training.</p>
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

	<section class="impact section-shell" aria-labelledby="impact-title">
		<div class="impact-heading">
			<p class="eyebrow">Selected outcomes</p>
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

			<div class="about about--integrated" id="about" aria-labelledby="about-title">
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
			</div>
		</div>
	</section>

	<section class="contact" id="contact" aria-labelledby="contact-title">
		<div class="contact__inner section-shell">
		<p class="eyebrow">Let’s talk</p>
		<h2 id="contact-title">Have a difficult system that needs a practical next move?</h2>
		<div class="contact-panel">
			<div class="contact-intro">
				<span>Start a conversation</span>
				<p>Tell me what you are working through, where it is stuck, and what a useful outcome looks like.</p>
				<div class="contact-links" aria-label="Professional profiles">
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
			<form class="inquiry-form" method="POST" action="/api/inquiry" on:submit={submitInquiry}>
				<div class="form-field">
					<label for="inquiry-name">Name</label>
					<input id="inquiry-name" name="name" autocomplete="name" maxlength="100" required />
				</div>
				<div class="form-field">
					<label for="inquiry-email">Email</label>
					<input
						id="inquiry-email"
						name="email"
						type="email"
						autocomplete="email"
						maxlength="254"
						required
					/>
				</div>
				<div class="form-field">
					<label for="inquiry-organization">Organization <span>Optional</span></label>
					<input
						id="inquiry-organization"
						name="organization"
						autocomplete="organization"
						maxlength="120"
					/>
				</div>
				<div class="form-field">
					<label for="inquiry-topic">What would you like to discuss?</label>
					<select id="inquiry-topic" name="topic" required>
						<option value="" disabled selected>Choose a topic</option>
						{#each inquiryTopics as topic}
							<option value={topic}>{topic}</option>
						{/each}
					</select>
				</div>
				<div class="form-field form-field--wide">
					<label for="inquiry-message">Tell me about the work</label>
					<textarea
						id="inquiry-message"
						name="message"
						rows="7"
						minlength="20"
						maxlength="4000"
						required
					></textarea>
				</div>
				<div class="bot-trap" aria-hidden="true">
					<label for="inquiry-website">Website</label>
					<input id="inquiry-website" name="website" tabindex="-1" autocomplete="off" />
				</div>
				{#if turnstileSiteKey}
					<div
						class="cf-turnstile"
						data-sitekey={turnstileSiteKey}
						data-action="portfolio-inquiry"
						data-theme="dark"
						data-size="flexible"
					></div>
				{/if}
				<div class="inquiry-form__footer">
					<p>Your details are used only to respond to this inquiry.</p>
					<button
						class="button button-light"
						type="submit"
						disabled={inquiryState === 'submitting' || !turnstileSiteKey}
					>
						{inquiryState === 'submitting' ? 'Sending…' : 'Submit inquiry'}
						<span aria-hidden="true">→</span>
					</button>
				</div>
				{#if !turnstileSiteKey}
					<p class="form-status form-status--error" role="status">
						The inquiry form is temporarily unavailable.
					</p>
				{:else if inquiryMessage}
					<p
						class:form-status--success={inquiryState === 'success'}
						class:form-status--error={inquiryState === 'error'}
						class="form-status"
						role="status"
						aria-live="polite">{inquiryMessage}</p
					>
				{/if}
			</form>
		</div>
		</div>
	</section>
</main>
