import { useEffect } from 'react';
import { animate, onScroll, stagger } from 'animejs';
import { ArrowRight, CheckCircle2, BriefcaseBusiness, Download, ExternalLink, GitBranch, Mail, Sparkles } from 'lucide-react';
import { capabilities, contactLinks, githubRepos, navItems, projects, signatureStats, workHighlights } from './profileData.js';

function App() {
	useEffect(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduceMotion) {
			document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
			return undefined;
		}

		const animations = [
			animate('.hero-copy > *', {
				opacity: [0, 1],
				y: [24, 0],
				delay: stagger(90),
				duration: 850,
				ease: 'outExpo'
			}),
			animate('.hero-visual', {
				opacity: [0, 1],
				scale: [0.96, 1],
				duration: 900,
				delay: 180,
				ease: 'outExpo'
			}),
			animate('.code-token', {
				opacity: [0.35, 1],
				y: [8, 0],
				delay: stagger(55),
				duration: 650,
				ease: 'outCubic'
			}),
			animate('.pulse-node', {
				scale: [1, 0.82, 1],
				opacity: [0.45, 1, 0.45],
				delay: stagger(260),
				duration: 1800,
				loop: true,
				ease: 'inOutSine'
			})
		];

		const revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					entry.target.classList.add('is-visible');
					animate(entry.target, {
						opacity: [0, 1],
						y: [28, 0],
						duration: 760,
						ease: 'outCubic'
					});
					revealObserver.unobserve(entry.target);
				});
			},
			{ threshold: 0.18 }
		);

		document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));

		const progressAnimation = animate('.timeline-progress', {
			scaleY: [0, 1],
			autoplay: onScroll({
				target: '.timeline-shell',
				enter: 'top 78%',
				leave: 'bottom 28%',
				sync: true
			}),
			ease: 'linear'
		});

		const progressBar = document.querySelector('.scroll-progress');
		let rafId = 0;
		const updateProgress = () => {
			cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
				const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
				animate(progressBar, {
					scaleX: progress,
					duration: 250,
					ease: 'outQuad'
				});
			});
		};

		updateProgress();
		window.addEventListener('scroll', updateProgress, { passive: true });

		return () => {
			revealObserver.disconnect();
			window.removeEventListener('scroll', updateProgress);
			cancelAnimationFrame(rafId);
			progressAnimation?.pause?.();
			animations.forEach((animation) => animation?.pause?.());
		};
	}, []);

	return (
		<div className="min-h-screen overflow-x-hidden bg-ink text-white">
			<div className="scroll-progress fixed left-0 top-0 z-[60] h-1 w-full origin-left scale-x-0 bg-red" />
			<SiteHeader />
			<main>
				<HeroSection />
				<SignalStrip />
				<StackSection />
				<WorkSection />
				<ProjectsSection />
				<GithubSection />
				<ContactSection />
			</main>
		</div>
	);
}

function SiteHeader() {
	return (
		<header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
			<nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<a href="#top" className="group flex items-center gap-3" aria-label="Eric Sayer home">
					<span className="grid h-10 w-10 place-items-center shadow-hard">
						<img src="/favicon.svg" alt="" className="h-10 w-10" />
					</span>
					<span className="hidden text-sm font-semibold text-white sm:block">Eric Sayer</span>
				</a>
				<div className="hidden items-center gap-1 md:flex">
					{navItems.map(([label, href]) => (
						<a key={href} href={href} className="nav-link">
							{label}
						</a>
					))}
				</div>
				<a href={contactLinks.github} className="icon-button" aria-label="Open Eric Sayer on GitHub">
					<GitBranch size={19} />
				</a>
			</nav>
		</header>
	);
}

function HeroSection() {
	return (
		<section id="top" className="relative isolate overflow-hidden pt-24">
			<div className="absolute inset-0 -z-20">
				<img src="/media/eric-workstation.jpg" alt="" className="h-full w-full object-cover object-center opacity-55" loading="eager" />
				<div className="absolute inset-0 bg-[rgba(3,8,18,0.62)]" />
			</div>
			<div className="absolute inset-x-0 top-16 -z-10 h-px bg-white/10" />
			<div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 md:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-20 lg:pt-16">
				<div className="hero-copy max-w-3xl">
					<div className="inline-flex items-center gap-2 border border-white/15 bg-white/8 px-3 py-2 text-sm font-semibold text-white shadow-hard backdrop-blur">
						<Sparkles size={16} className="text-blue" />
						Full-stack JavaScript developer
					</div>
					<h1 className="mt-7 text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">Eric Sayer builds sharp product software.</h1>
					<p className="mt-7 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
						I build React, React Native/Expo, Node.js, API, database, and deployment workflows with the practical edge of an instructor, technical consultant, and product builder.
					</p>
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<a href="#work" className="primary-button">
							See the work <ArrowRight size={18} />
						</a>
						<a href={contactLinks.resume} className="secondary-button" target="_blank" rel="noreferrer">
							Resume <Download size={18} />
						</a>
					</div>
					<div className="mt-10 grid gap-3 sm:grid-cols-3">
						{signatureStats.map((stat) => (
							<div key={stat.label} className="metric-tile">
								<div className="text-3xl font-black text-white">{stat.value}</div>
								<p className="mt-2 text-sm leading-5 text-white/68">{stat.label}</p>
							</div>
						))}
					</div>
				</div>

				<div className="hero-visual grid gap-5">
					<div className="profile-frame">
						<img src="/media/eric-profile.jpg" alt="Eric Sayer" className="h-full min-h-[380px] w-full scale-[1.12] object-cover object-[58%_40%]" />
						<div className="absolute bottom-4 left-4 right-4 border border-white/15 bg-ink/85 p-4 backdrop-blur">
							<p className="font-mono text-xs text-blue">github.com/sayex</p>
							<p className="mt-1 text-sm text-white/72">React, mobile, backend, cloud, mentoring.</p>
						</div>
					</div>
					<CodePanel />
				</div>
			</div>
		</section>
	);
}

function CodePanel() {
	const lines = [
		['const', ' focus ', '= ', '"ship useful software";'],
		['await', ' build({', ' product, api, mobile });'],
		['return', ' clarity ', '+ ', 'momentum;']
	];

	return (
		<div className="terminal-panel" aria-label="Developer focus code sample">
			<div className="mb-4 flex items-center justify-between">
				<div className="flex gap-2">
					<span className="h-3 w-3 rounded-full bg-red" />
					<span className="h-3 w-3 rounded-full bg-blue" />
					<span className="h-3 w-3 rounded-full bg-white" />
				</div>
				<span className="font-mono text-xs text-white/50">sayex.profile.js</span>
			</div>
			<pre className="overflow-hidden font-mono text-sm leading-7 text-white/78">
				{lines.map((line, rowIndex) => (
					<code key={line.join('')} className="block">
						<span className="mr-4 text-white/30">{String(rowIndex + 1).padStart(2, '0')}</span>
						{line.map((token, index) => (
							<span key={`${token}-${index}`} className={`code-token ${index === 0 ? 'text-red' : index === line.length - 1 ? 'text-blue-soft' : 'text-white/76'}`}>
								{token}
							</span>
						))}
					</code>
				))}
			</pre>
		</div>
	);
}

function SignalStrip() {
	return (
		<section className="border-y border-white/10 bg-white text-ink">
			<div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 md:grid-cols-3 lg:px-8">
				{['Production-minded builds', 'Teaching-grade clarity', 'Business-aware delivery'].map((item, index) => (
					<div key={item} className="flex items-center gap-3 text-sm font-bold">
						<span className={`pulse-node h-3 w-3 rounded-full ${index === 1 ? 'bg-blue' : 'bg-red'}`} />
						{item}
					</div>
				))}
			</div>
		</section>
	);
}

function StackSection() {
	return (
		<section id="stack" className="section-shell">
			<SectionIntro
				eyebrow="Technical range"
				title="Full-stack depth with a teacher's communication layer."
				copy="The site is shaped around the same mix that shows up in the résumé: production software, clear explanation, business translation, and enough ops context to get work deployed."
			/>
			<div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{capabilities.map(({ icon: Icon, title, copy }) => (
					<article key={title} className="feature-card" data-reveal>
						<div className="feature-icon">
							<Icon size={22} />
						</div>
						<h3 className="mt-5 text-xl font-black text-white">{title}</h3>
						<p className="mt-3 leading-7 text-white/68">{copy}</p>
					</article>
				))}
			</div>
		</section>
	);
}

function WorkSection() {
	return (
		<section id="work" className="section-shell timeline-shell">
			<SectionIntro
				eyebrow="Experience"
				title="A career built across code, instruction, support, and operations."
				copy="The through line is pragmatic delivery: understand the business, build the system, document the decisions, and help the people around the code get stronger."
			/>
			<div className="relative mt-12">
				<div className="absolute left-5 top-0 hidden h-full w-px bg-white/10 md:block" />
				<div className="timeline-progress absolute left-5 top-0 hidden h-full w-px origin-top scale-y-0 bg-red md:block" />
				<div className="space-y-6">
					{workHighlights.map(({ period, role, company, icon: Icon, points }) => (
						<article key={`${role}-${company}`} className="timeline-item" data-reveal>
							<div className="timeline-marker">
								<Icon size={20} />
							</div>
							<div className="min-w-0">
								<p className="font-mono text-sm text-blue-soft">{period}</p>
								<h3 className="mt-2 text-2xl font-black text-white">{role}</h3>
								<p className="mt-1 font-semibold text-white/72">{company}</p>
								<ul className="mt-5 grid gap-3">
									{points.map((point) => (
										<li key={point} className="flex gap-3 text-white/68">
											<CheckCircle2 className="mt-1 shrink-0 text-red" size={18} />
											<span className="leading-7">{point}</span>
										</li>
									))}
								</ul>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

function ProjectsSection() {
	return (
		<section className="bg-white py-20 text-ink sm:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<SectionIntro
					eyebrow="Selected builds"
					title="Project work that connects software to real-world use."
					copy="The portfolio section leans into applied work: event platforms, vendor systems, APIs, reporting, and collaborative full-stack applications."
					light
				/>
				<div className="mt-10 grid gap-4 lg:grid-cols-2">
					{projects.map(({ name, type, description, stack, href, icon: Icon }) => (
						<article key={name} className="project-card" data-reveal>
							<div className="flex items-start justify-between gap-4">
								<div className="grid h-12 w-12 shrink-0 place-items-center bg-ink text-white">
									<Icon size={22} />
								</div>
								{href ? (
									<a href={href} className="icon-button-light" target="_blank" rel="noreferrer" aria-label={`${name} on GitHub`}>
										<ExternalLink size={18} />
									</a>
								) : null}
							</div>
							<p className="mt-6 font-mono text-sm text-red-dark">{type}</p>
							<h3 className="mt-2 text-2xl font-black text-ink">{name}</h3>
							<p className="mt-4 leading-7 text-ink/70">{description}</p>
							<div className="mt-6 flex flex-wrap gap-2">
								{stack.map((item) => (
									<span key={item} className="tech-pill-light">
										{item}
									</span>
								))}
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

function GithubSection() {
	return (
		<section id="github" className="section-shell">
			<div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
				<div data-reveal>
					<SectionIntro
						eyebrow="GitHub"
						title="Connected to the public developer trail."
						copy="The GitHub profile is wired into the site with direct project links and a focused set of repositories that align with the résumé."
					/>
					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<a href={contactLinks.github} className="primary-button" target="_blank" rel="noreferrer">
							Open GitHub <GitBranch size={18} />
						</a>
						<a href={contactLinks.linkedin} className="secondary-button" target="_blank" rel="noreferrer">
							LinkedIn <BriefcaseBusiness size={18} />
						</a>
					</div>
				</div>
				<div className="repo-grid" data-reveal>
					{githubRepos.map((repo) => (
						<a key={repo.name} href={repo.url} target="_blank" rel="noreferrer" className="repo-row">
							<span className="font-mono text-sm text-white/55">sayex/</span>
							<strong className="text-lg text-white">{repo.name}</strong>
							<ExternalLink className="ml-auto text-blue-soft" size={18} />
						</a>
					))}
				</div>
			</div>
		</section>
	);
}

function ContactSection() {
	return (
		<section id="contact" className="relative overflow-hidden border-t border-white/10 bg-red py-20 text-white sm:py-24">
			<div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
				<div data-reveal>
					<p className="font-mono text-sm font-bold text-white/76">Available for software builds, product work, and technical leadership</p>
					<h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Bring me the messy technical problem. I’ll help turn it into working software.</h2>
				</div>
				<div className="contact-panel" data-reveal>
					<a href={contactLinks.email} className="contact-link">
						<Mail size={19} />
						me@ericsayer.com
					</a>
					<a href={contactLinks.github} className="contact-link" target="_blank" rel="noreferrer">
						<GitBranch size={19} />
						github.com/sayex
					</a>
					<a href={contactLinks.linkedin} className="contact-link" target="_blank" rel="noreferrer">
						<BriefcaseBusiness size={19} />
						linkedin.com/in/ericsayer
					</a>
				</div>
			</div>
		</section>
	);
}

function SectionIntro({ eyebrow, title, copy, light = false }) {
	return (
		<div className="max-w-3xl" data-reveal>
			<p className={`font-mono text-sm font-bold ${light ? 'text-red-dark' : 'text-blue-soft'}`}>{eyebrow}</p>
			<h2 className={`mt-3 text-4xl font-black leading-tight sm:text-5xl ${light ? 'text-ink' : 'text-white'}`}>{title}</h2>
			<p className={`mt-5 text-lg leading-8 ${light ? 'text-ink/70' : 'text-white/68'}`}>{copy}</p>
		</div>
	);
}

export default App;
