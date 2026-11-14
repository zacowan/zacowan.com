import createWithVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async headers() {
		// Keep representation negotiation in the final Vercel response as well as proxy rewrites.
		const headers = [
			{
				key: "Vary",
				value:
					"Accept, RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Accept-Encoding",
			},
		];
		return ["/", "/lists/:path*", "/lists.md"].map((source) => ({
			source,
			headers,
		}));
	},
	turbopack: {
		rules: {
			"*.wgsl": {
				loaders: ["@vgpu/wgsl/loader-webpack"],
				as: "*.js",
			},
		},
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.wgsl$/,
			loader: "@vgpu/wgsl/loader-webpack",
		});
		return config;
	},
};

export default createWithVercelToolbar()(nextConfig);
