import Image from "next/image";
import clsx from "clsx";

export function DuotoneAvatar({
	src = "/avatar.jpg",
	alt = "David Martínez",
	className = "",
	glow = true,
}: {
	src?: string;
	alt?: string;
	className?: string;
	glow?: boolean;
}) {
	return (
		<div className="relative">
			{glow && <div className="avatar-glow" aria-hidden="true" />}
			<div
				className={clsx(
					"relative isolate rounded-2xl overflow-hidden border border-border bg-card shadow w-40 h-40 md:w-56 md:h-56",
					className
				)}
			>
				<Image
					src={src}
					alt={alt}
					fill
					sizes="(min-width: 768px) 14rem, 10rem"
					className="object-cover grayscale [filter:contrast(1.15)_saturate(1.1)]"
				/>
				{/* Gradient overlay to create the duotone */}
				<div className="absolute inset-0 bg-gradient-to-tr from-accent to-sky-500 mix-blend-multiply opacity-90 dark:opacity-80" />
				{/* Soft light wash to lift highlights */}
				<div className="absolute inset-0 bg-white mix-blend-screen opacity-40 dark:opacity-10" />
			</div>
		</div>
	);
}
