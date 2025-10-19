import Link from "next/link";

export function LogoDM() {
	return (
		<Link
			href="/"
			className="flex items-center gap-2 group"
			aria-label="Inicio"
		>
			{/* Initials mark */}
			<span className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-card shadow-sm">
				<span className="font-extrabold tracking-tight text-accent group-hover:scale-110 transition-transform">
					DM
				</span>
			</span>
			{/* Wordmark */}
			<span className="hidden md:inline font-semibold tracking-tight">
				<span className="text-gradient">David</span> Martínez
			</span>
		</Link>
	);
}
