import createWithVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
};

export default createWithVercelToolbar()(nextConfig);
