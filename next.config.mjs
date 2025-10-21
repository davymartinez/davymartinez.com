import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		mdxRs: true,
	},
	pageExtensions: ["ts", "tsx", "mdx"],

	async redirects() {
		return [
			{
				source: "/:path*",
				has: [
					{
						type: "host",
						value: "davymartinez.com",
					},
				],
				destination: "https://www.davymartinez.com/:path*",
				permanent: true,
			},
		];
	},
};

const withMDX = createMDX({
	extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
