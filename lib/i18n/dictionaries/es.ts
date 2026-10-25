import type { Dictionary } from "../types";

export const dictionary = {
	brand: {
		name: "David Martínez",
		tagline: "Especialista en On-Page SEO y Traductor Inglés-Español",
	},
	meta: {
		title:
			"Especialista en On-Page SEO y Traductor Inglés→Español | David Martínez",
		description:
			"Servicios de optimización SEO y traducción inglés-español por David Martínez. Aumenta la visibilidad de tu sitio y conectá con audiencias hispanohablantes.",
	},
	home: {
		// ✅ Added required fields
		badges: "SEO y Traducción Profesional",
		hero: "Te ayudo a llegar a tus lectores desde los buscadores y a comunicar en español lo que tu marca dice en inglés.",
		headline: "SEO que conecta. Traducciones que se leen con naturalidad.",
		tagline: "David Martínez",
		ctaPrimary: "Solicitar auditoría SEO",
		ctaSecondary: "Ver portafolio",
		chips: {
			onpage: "SEO On-Page",
			content: "Optimización de contenido",
			jsonld: "JSON-LD",
			audits: "Auditorías SEO",
			translation: "Traducción EN→ES",
		},
		availability: {
			open: "Disponible para nuevos proyectos",
			limited: "Disponibilidad limitada",
			full: "Agenda completa",
		},
		cards: {
			seo: {
				title: "SEO de tu contenido",
				desc: "Optimización técnica y de contenido para mejorar tu visibilidad en buscadores.",
			},
			translation: {
				title: "Traducción del inglés al español",
				desc: "Traducciones precisas y naturales que potencian la comunicación de tu marca.",
			},
			blog: {
				title: "Blog",
				desc: "Artículos sobre SEO, contenido y marketing digital.",
			},
		},
		servicesSection: {
			title: "Servicios",
			items: {
				seo: {
					title: "SEO de tu contenido",
					desc: "Optimización técnica y de contenido para mejorar tu visibilidad en buscadores.",
				},
				translation: {
					title: "Traducción del inglés al español",
					desc: "Traducciones precisas y naturales que potencian la comunicación de tu marca.",
				},
				blog: {
					title: "Blog",
					desc: "Artículos sobre SEO, contenido y marketing digital.",
				},
			},
		},
	},
	cta: {
		contact: "Contacto",
		services: "Servicios",
		seoCases: "Portafolio SEO",
	},
	services: {
		h1: "Servicios",
		seo: {
			h2: "On-Page SEO",
			items: [
				"Auditorías on-page y de contenido",
				"Optimización de title/meta, headings, entidades y EEAT",
				"Arquitectura de la información e interlinking",
				"Schema JSON-LD (FAQ, Article, Organization, Breadcrumb)",
				"Briefs y edición para impacto orgánico",
			],
		},
		translation: {
			h2: "Traducción EN→ES",
			items: [
				"Marketing y sitios web (UX, landing pages, blogs)",
				"IT y documentación técnica",
				"Periodismo musical y tecnología musical",
			],
		},
	},
	about: {
		h1: "Sobre mí",
		blurb1:
			"Soy especialista en On-Page SEO y traductor EN→ES. También trabajé con metadata musical, lo que me dio un enfoque muy cuidadoso del detalle y la coherencia de la información.",
		h2: "Enfoque",
		bullets: [
			"Contenido y arquitectura pensados para personas y buscadores",
			"Procesos claros, sin humo",
			"Resultados medibles",
		],
		alt: "David Martínez",
	},
	cv: {
		h1: "CV",
		intro: "Resumen breve + enlace a PDF (opcional).",
		items: [
			"SEO Planner — Evolvics (Syneos Health) (Jun 2026 - presente)",
			"SEO Strategist — Taco (Mar 2026 - Jun 2026)",
			"SEO Associate — Sagapixel (May 2025 - Nov 2025)",
			"SEO Content Specialist — Graphite (Oct 2023 - May 2025)",
			"Editor Senior de Metadata Musical — Gracenote (Nielsen) (Oct 2019 - May 2023)",
			"Associate Content Manager & Copywriter — Uakami Studio (Dic 2014 - Ene 2017)",
			"Traductor EN→ES — Freelance (Feb 2014 – presente)",
		],
	},
	contact: {
		h1: "Contacto",
		intro: "Envíame un mensaje para proyectos de SEO o traducción.",
		form: {
			name: "Nombre",
			email: "Email",
			message: "Mensaje",
			submit: "Enviar mensaje",
			sending: "Enviando…",
			sent: "Mensaje enviado. Te responderé pronto.",
			error: "Hubo un error. Escribime a hola@davymartinez.com",
		},
	},
	footer: {
		copyright: "© {year} David Martínez",
		pwa: "PWA",
		robots: "robots.txt",
	},
	notFound: {
		title: "Página no encontrada",
		message: "La página que buscas no existe o fue movida.",
		cta: "Volver al inicio",
	},
	components: {
		availability: {
			label: "Disponibilidad:",
			open: "Disponibilidad abierta para {month}",
			limited: "{slots} para {month}",
			full: "Agenda completa en {month}",
			cta: "Reservar consulta",
			month: "Octubre",
			slots: "2 cupos",
		},
		clients: {
			seo: "He hecho SEO para:",
			tr: "He traducido para:",
		},
	},
	nav: {
		services: "Servicios",
		seoPortfolio: "Portafolio SEO",
		trPortfolio: "Portafolio de Traducción",
		about: "Sobre mí",
		cv: "CV",
		blog: "Blog",
		contact: "Contacto",
	},
	blog: {
		h1: "Blog",
		empty: "Aún no hay artículos publicados.",
		readMore: "Volver al listado del blog",
		backToList: "← Volver al blog",
	},
	seoPortfolio: {
		h1: "Portfolio SEO",
		readMore: "Leer más →",
	},
	caseStudy: {
		backToPortfolio: "Volver al portafolio SEO",
		whatIAchieved: "Lo que logré",
		howIDidIt: "Cómo lo hice",
		howMyWorkSupportsThem: "Cómo mi trabajo los apoya",
		ctaTitle: "¿Querés resultados similares?",
		ctaText:
			"Puedo ayudarte a lograr un crecimiento SEO medible mediante optimización de contenido, datos estructurados y mejoras técnicas.",
		ctaButton: "Hablemos",
	},
	translationPortfolio: {
		h1: "Portafolio de Traducción",
		tag: "Traducción",
		readMore: "Leer más →",
	},
	translationCase: {
		backToPortfolio: "Volver al Portafolio de Traducción",
		sourceText: "Texto original (inglés)",
		targetText: "Texto traducido (español)",
	},
} satisfies Dictionary;
