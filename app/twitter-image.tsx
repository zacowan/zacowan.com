import { ImageResponse } from "next/og";
import { getOgFonts, OgCard, ogAlt, ogSize } from "./og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default async function TwitterImage() {
	const fonts = await getOgFonts();

	return new ImageResponse(<OgCard />, {
		...ogSize,
		fonts,
	});
}
