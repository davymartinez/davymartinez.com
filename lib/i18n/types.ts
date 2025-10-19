export type Dictionary = {
	brand: {
		name: string;
		tagline: string;
	};
	meta: {
		title: string;
		description: string;
	};
	cta: {
		contact: string;
		services: string;
		seoCases: string;
	};
	nav: {
		services: string;
		seoPortfolio: string;
		trPortfolio: string;
		about: string;
		cv: string;
		blog: string;
		contact: string;
	};
	home: {
		badges: string;
		hero: string;
		chips: {
			onpage?: string; // Added in en.ts and es.ts
			content?: string; // Added in en.ts
			jsonld?: string; // Added in en.ts
			audits?: string; // Added in en.ts
			translation?: string; // Added in en.ts
		};
		availability: {
			open: string;
			limited: string;
			full: string;
		};
		cards: {
			seo: { title: string; desc: string };
			translation: { title: string; desc: string };
			blog: { title: string; desc: string };
		};

		// ✅ Added for new hero + localized service section
		headline: string; // "On-Page SEO Specialist & English-to-Spanish Translator"
		tagline: string; // "David Martínez"
		ctaPrimary: string; // "Request an SEO Audit"
		ctaSecondary: string; // "View Portfolio"

		servicesSection: {
			title: string; // "Services" / "Servicios"
			items: {
				seo: { title: string; desc: string };
				translation: { title: string; desc: string };
				blog: { title: string; desc: string };
			};
		};
	};
	services: {
		h1: string;
		seo: {
			h2: string;
			items: string[];
		};
		translation: {
			h2: string;
			items: string[];
		};
	};
	about: {
		h1: string;
		blurb1: string;
		h2: string;
		bullets: string[];
		alt: string;
	};
	cv: {
		h1: string;
		intro: string;
		items: string[];
	};
	contact: {
		h1: string;
		intro: string;
		form: {
			name: string;
			email: string;
			message: string;
			submit: string;
			sending: string;
			sent: string;
			error: string;
		};
	};
	footer: {
		copyright: string;
		pwa: string;
		robots: string;
	};
	notFound: {
		title: string;
		message: string;
		cta: string;
	};
	components: {
		availability: {
			label: string;
			open: string;
			limited: string;
			full: string;
			cta: string;
			month: string;
			slots: string;
		};
		clients: {
			seo: string;
			tr: string;
		};
	};
	blog: {
		h1: string;
		empty: string;
		readMore: string;
		backToList: string;
	};
	seoPortfolio: {
		h1: string;
		readMore: string;
	};
	caseStudy: {
		whatIAchieved: string;
		howIDidIt: string;
		howMyWorkSupportsThem: string;
		backToPortfolio: string;
		ctaTitle: string;
		ctaText: string;
		ctaButton: string;
	};
	translationPortfolio: {
		h1: string;
		tag: string;
		readMore: string;
	};
	translationCase: {
		backToPortfolio: string;
		sourceText: string;
		targetText: string;
	};
};
