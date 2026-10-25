import Image from "next/image";
import clsx from "clsx";

export function DuotoneAvatar({
	src = "/avatar.jpg",
	alt = "David Martínez",
	className = "",
}: {
	src?: string;
	alt?: string;
	className?: string;
	glow?: boolean;
}) {
	return (
		<div className="relative">
			<div
				className={clsx(
					"relative isolate rounded-2xl overflow-hidden border border-border bg-card w-40 h-40 md:w-56 md:h-56",
					className,
				)}
			>
				<Image
					src={src}
					alt={alt}
					fill
					sizes="(min-width: 768px) 14rem, 10rem"
					className="object-cover"
				/>
			</div>
		</div>
	);
}
