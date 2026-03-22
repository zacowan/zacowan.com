import { ImageResponse } from "next/og";
import { OgCard, ogAlt, ogSize } from "./og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function TwitterImage() {
	return new ImageResponse(<OgCard />, {
		...ogSize,
	});
}
