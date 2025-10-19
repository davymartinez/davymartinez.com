import type { Dictionary } from "../types";

export const dictionary = {
	brand: {
		name: "David Martínez",
		tagline: "On-Page SEO Specialist & English-to-Spanish Translator",
	},
	meta: {
		title:
			"On-Page SEO Specialist & English-to-Spanish Translator | David Martínez",
		description:
			"SEO optimization and English-to-Spanish translation services by David Martínez. Boost your site's visibility and connect with Spanish-speaking audiences.",
	},
	home: {
		// ✅ Added missing fields required by types.ts
		badges: "SEO & Translation Expertise",
		hero: "On-Page SEO and Translation Services",
		headline: "On-Page SEO Specialist & English-to-Spanish Translator",
		tagline: "David Martínez",
		ctaPrimary: "Request an SEO Audit",
		ctaSecondary: "View Portfolio",
		chips: {
			onpage: "On-Page SEO",
			content: "Content Optimization",
			jsonld: "JSON-LD",
			audits: "SEO Audits",
			translation: "EN→ES Translation",
		},
		availability: {
			open: "Open for new projects",
			limited: "Limited availability",
			full: "Fully booked",
		},
		cards: {
			seo: {
				title: "On-Page SEO",
				desc: "Technical and content optimization to improve your organic visibility.",
			},
			translation: {
				title: "English-to-Spanish Translation",
				desc: "Accurate and natural translations that strengthen your brand communication.",
			},
			blog: {
				title: "Blog",
				desc: "Articles on SEO, content, and digital marketing.",
			},
		},
		servicesSection: {
			title: "Services",
			items: {
				seo: {
					title: "On-Page SEO",
					desc: "Optimization of technical elements and on-page content to improve organic performance.",
				},
				translation: {
					title: "English-to-Spanish Translation",
					desc: "Professional translation services that preserve tone, clarity, and intent.",
				},
				blog: {
					title: "Blog",
					desc: "Insights and articles on SEO, language, and communication.",
				},
			},
		},
	},
	cta: {
		contact: "Contact",
		services: "Services",
		seoCases: "SEO Portfolio",
	},
	services: {
		h1: "Services",
		seo: {
			h2: "On-Page SEO",
			items: [
				"On-page and content audits",
				"Optimization of titles/meta, headings, entities and EEAT",
				"Information architecture and interlinking",
				"JSON-LD schema (FAQ, Article, Organization, Breadcrumb)",
				"Briefs and editing for organic impact",
			],
		},
		translation: {
			h2: "EN→ES Translation",
			items: [
				"Marketing and websites (UX, landing pages, blogs)",
				"IT and technical documentation",
				"Music and music-tech journalism",
			],
		},
	},
	about: {
		h1: "About me",
		blurb1:
			"I’m an On-Page SEO specialist and EN→ES translator. I also worked with music metadata, which gave me a detail-oriented approach to information consistency.",
		h2: "Approach",
		bullets: [
			"Content and architecture designed for users and search engines",
			"Clear processes, no fluff",
			"Measurable results",
		],
		alt: "David Martínez",
	},
	cv: {
		h1: "CV",
		intro: "Brief summary + link to PDF (optional).",
		items: [
			"SEO Associate — Sagapixel (May 2025 - present)",
			"SEO Content Specialist — Graphite (Oct 2023 - May 2025)",
			"Senior Music Metadata Editor — Gracenote (Nielsen) (Oct 2019 - May 2023)",
			"Associate Content Manager & Copywriter — Uakami Studio (Dec 2014 - Jan 2017)",
			"EN→ES Translator — Freelance (Feb 2014 – present)",
		],
	},
	contact: {
		h1: "Contact",
		intro: "Send me a message about SEO or translation projects.",
		form: {
			name: "Name",
			email: "Email",
			message: "Message",
			submit: "Send",
			sending: "Sending…",
			sent: "Thanks! I’ll get back to you soon.",
			error: "There was an error. Write me at hola@davymartinez.com",
		},
	},
	footer: {
		copyright: "© {year} David Martínez",
		pwa: "PWA",
		robots: "robots.txt",
	},
	notFound: {
		title: "Page not found",
		message: "The page you’re looking for doesn’t exist or has been moved.",
		cta: "Back to home",
	},
	components: {
		availability: {
			label: "Availability:",
			open: "Availability open for {month}",
			limited: "{slots} for {month}",
			full: "Fully booked in {month}",
			cta: "Book a call",
			month: "October",
			slots: "2 spots",
		},
		clients: {
			seo: "I’ve done SEO for:",
			tr: "I’ve translated for:",
		},
	},
	nav: {
		services: "Services",
		seoPortfolio: "SEO Portfolio",
		trPortfolio: "Translation Portfolio",
		about: "About me",
		cv: "CV",
		blog: "Blog",
		contact: "Contact",
	},
	blog: {
		h1: "Blog",
		empty: "No posts yet.",
		readMore: "Back to blog list",
		backToList: "← Back to blog",
	},
	seoPortfolio: {
		h1: "SEO Portfolio",
		readMore: "Read more →",
	},
	caseStudy: {
		backToPortfolio: "Back to SEO Portfolio",
		whatIAchieved: "What I achieved",
		howIDidIt: "How I did it",
		howMyWorkSupportsThem: "How my work supports them",
		ctaTitle: "Interested in similar results?",
		ctaText:
			"I can help you achieve measurable SEO growth through content optimization, structured data, and technical improvements.",
		ctaButton: "Let’s talk",
	},
	translationPortfolio: {
		h1: "Translation Portfolio",
		tag: "Translation",
		readMore: "Read more →",
	},
	translationCase: {
		backToPortfolio: "Back to Translation Portfolio",
		sourceText: "Source (English)",
		targetText: "Target (Spanish)",
	},
} satisfies Dictionary;
