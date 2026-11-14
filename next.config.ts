import createWithVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
