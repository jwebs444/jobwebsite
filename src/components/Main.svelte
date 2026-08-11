<script lang="ts">
	import { onMount } from 'svelte';
	import ProjectCard from './ProjectCard.svelte';
	import { featuredProjects } from '$lib/projects';
	import { inquiryTopics } from '$lib/inquiry';

	export let turnstileSiteKey = '';

	let inquiryState: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
	let inquiryMessage = '';
	let turnstileState: 'loading' | 'ready' | 'error' = 'loading';
	let turnstileMessage = 'Security check is loading…';
	let turnstileWidgetId: string | undefined;

	function resetSecurityCheck() {
		if (!turnstileWidgetId) return;
		turnstileState = 'loading';
		turnstileMessage = 'Preparing a new security check…';
		window.turnstile?.reset(turnstileWidgetId);
	}

	onMount(() => {
		if (!turnstileSiteKey) return;

		let cancelled = false;
		let retryTimer: ReturnType<typeof setTimeout> | undefined;

		const renderSecurityCheck = () => {
			if (cancelled) return;
			if (!window.turnstile?.render) {
				retryTimer = setTimeout(renderSecurityCheck, 100);
				return;
			}

			turnstileWidgetId = window.turnstile.render('#inquiry-turnstile', {
				sitekey: turnstileSiteKey,
				action: 'portfolio-inquiry',
				theme: 'dark',
				size: 'flexible',
				appearance: 'always',
				callback: () => {
					turnstileState = 'ready';
					turnstileMessage = 'Security check complete. You can send your inquiry.';
				},
				'error-callback': () => {
					turnstileState = 'error';
					turnstileMessage = 'The security check could not load. Refresh this page and try again.';
				},
				'expired-callback': () => {
					turnstileState = 'loading';
					turnstileMessage = 'Security check expired. Preparing a new check…';
				},
				'timeout-callback': () => {
					turnstileState = 'loading';
					turnstileMessage = 'Security check timed out. Preparing a new check…';
				}
			});
		};

		renderSecurityCheck();

		return () => {
			cancelled = true;
			if (retryTimer) clearTimeout(retryTimer);
			if (turnstileWidgetId) window.turnstile?.remove(turnstileWidgetId);
		};
	});

	async function submitInquiry(event: SubmitEvent) {
		event.preventDefault();
		if (turnstileState !== 'ready') {
			inquiryState = 'error';
			inquiryMessage =
				'The security check is still loading. Wait for it to complete, then submit again.';
			return;
		}

		const form = event.currentTarget as HTMLFormElement;
		inquiryState = 'submitting';
		inquiryMessage = '';

		try {
			const response = await fetch('/api/inquiry', { method: 'POST', body: new FormData(form) });
			const result = (await response.json()) as { ok: boolean; message: string };
			inquiryMessage = result.message;
			inquiryState = result.ok ? 'success' : 'error';

			if (result.ok) {
				form.reset();
				if (turnstileWidgetId) window.turnstile?.remove(turnstileWidgetId);
				turnstileWidgetId = undefined;
			}
		} catch {
			inquiryState = 'error';
			inquiryMessage = 'The message could not be sent right now. Please try again shortly.';
		} finally {
			if (inquiryState !== 'success') resetSecurityCheck();
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
				'Direct day-to-day systems, process improvements, and technology decisions across a hoist and crane business.'
		},
		{
			period: '2021 — 2024',
			role: 'Virtualization Engineer',
			company: 'Upstart LP',
			description:
				'Designed and maintained virtualization systems and advised an investment partnership on technology decisions.'
		},
		{
			period: 'Aug 2020 — Jan 2022',
			role: 'Graduate Teaching Assistant, Philosophy',
			company: 'Northern Illinois University',
			description:
				'Supported undergraduate philosophy courses and translated complex arguments into clear, approachable instruction.'
		},
		{
			period: '2018 — 2021',
			role: 'Personal Chef',
			company: 'Self-employed',
			description:
				'Managed the full client lifecycle for an in-home private-chef service, from planning and delivery through billing and daily operations.'
		},
		{
			period: '2017 — 2018',
			role: 'Sous Chef',
			company: 'Livia',
			description:
				'Led teams of more than ten through high-volume service while maintaining coordination, quality, and calm execution.'
		}
	];

	const capabilities = [
		{
			number: '01',
			title: 'Find the real problem',
			body: 'I trace bottlenecks and unclear ownership before deciding what to change.'
		},
		{
			number: '02',
			title: 'Make complexity usable',
			body: 'I translate technical and analytical detail into decisions a team can act on.'
		},
		{
			number: '03',
			title: 'Build for the next person',
			body: 'I leave behind tested tools, clear documentation, and systems people can maintain.'
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
			<img src="/images/jason-canyon.jpg" alt="Jason Weber smiling during a canyon expedition" />
			<p class="portrait-caption">Curious by nature.<br />Practical by training.</p>
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
					Psychology, philosophy, kitchens, entrepreneurship, industrial operations, and software
					taught me to stay curious and take calm ownership when the path is unclear. Outside work,
					I explore deserts, make photographs, write, and build field tools through
					<a href="https://mrcrowmeister.com" target="_blank" rel="noreferrer">Mr. Crowmeister</a>.
				</p>
			</div>

			<div class="capability-grid">
				{#each capabilities as capability (capability.number)}
					<article>
						<p>{capability.number}</p>
						<h3>{capability.title}</h3>
						<span>{capability.body}</span>
					</article>
				{/each}
			</div>
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
			{#each featuredProjects as project (project.href)}
				<ProjectCard {project} />
			{/each}
		</div>
	</section>

	<section class="experience section-shell" id="experience" aria-labelledby="experience-title">
		<div class="section-heading section-heading--compact">
			<div>
				<p class="eyebrow">Experience</p>
				<h2 id="experience-title">A career built by doing the hard thing.</h2>
			</div>
		</div>

		<div class="timeline">
			{#each experience as item (item.period)}
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

	<section class="credentials section-shell" aria-labelledby="credentials-title">
		<div class="credentials-heading">
			<h2 id="credentials-title">Outcomes & Education</h2>
			<p class="credentials-summary">What I’ve delivered. What I’ve learned.</p>
		</div>
		<div class="credentials-columns">
			<div class="credentials-group">
				<p class="credentials-label">Selected outcomes</p>
				<div class="outcome-list">
					{#each selectedImpact as item, index (item.title)}
						<article>
							<p>0{index + 1}</p>
							<div>
								<h3>{item.title}</h3>
								<span>{item.body}</span>
							</div>
						</article>
					{/each}
				</div>
			</div>
			<div class="credentials-group">
				<p class="credentials-label">Education</p>
				<div class="education-list">
					<article>
						<p>2018 — 2022</p>
						<div>
							<h3>Bachelor’s degrees in Psychology & Philosophy</h3>
							<span>Northern Illinois University</span>
						</div>
					</article>
					<article>
						<p>2022</p>
						<div>
							<h3>Wilderness First Responder</h3>
							<span>Desert Mountain Medicine</span>
						</div>
					</article>
					<article>
						<p>2022</p>
						<div>
							<h3>Canyoneering Leadership & Rescue</h3>
							<span>Uber Adventures on behalf of Association for Canyoneering Education</span>
						</div>
					</article>
					<article>
						<p>2023</p>
						<div>
							<h3>Python, SQL & DevOps Bootcamp</h3>
							<span>NuCamp</span>
						</div>
					</article>
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
					<p>
						Tell me what you are working through, where it is stuck, and what a useful outcome looks
						like.
					</p>
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
				{#if inquiryState === 'success'}
					<div class="inquiry-success" role="status" aria-live="polite">
						<p>Inquiry sent</p>
						<h3>{inquiryMessage}</h3>
						<span>I’ll respond as soon as I can.</span>
					</div>
				{:else}
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
								{#each inquiryTopics as topic (topic)}
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
								required></textarea>
						</div>
						<div class="bot-trap" aria-hidden="true">
							<label for="inquiry-website">Website</label>
							<input id="inquiry-website" name="website" tabindex="-1" autocomplete="off" />
						</div>
						{#if turnstileSiteKey}
							<div
								class:verification-panel--ready={turnstileState === 'ready'}
								class:verification-panel--error={turnstileState === 'error'}
								class="verification-panel"
							>
								<div class="verification-panel__heading">
									<span>Security check</span>
									<p role="status" aria-live="polite">{turnstileMessage}</p>
								</div>
								<div id="inquiry-turnstile"></div>
							</div>
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
								class:form-status--error={inquiryState === 'error'}
								class="form-status"
								role="status"
								aria-live="polite"
							>
								{inquiryMessage}
							</p>
						{/if}
					</form>
				{/if}
			</div>
		</div>
	</section>
</main>
