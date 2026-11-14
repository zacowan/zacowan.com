import {
	createHash,
	createHmac,
	randomBytes,
	timingSafeEqual,
} from "node:crypto";
export const hash = (value: string) =>
	createHash("sha256").update(value).digest("hex");
export const randomToken = () => randomBytes(32).toString("base64url");
export const challengeFor = (verifier: string) =>
	createHash("sha256").update(verifier).digest("base64url");
export function equalSecret(a: string, b: string) {
	return timingSafeEqual(Buffer.from(hash(a)), Buffer.from(hash(b)));
}
export function signConsent(payload: object, secret: string) {
	const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
	return `${body}.${createHmac("sha256", secret).update(body).digest("base64url")}`;
}
export function verifyConsent(
	token: string,
	secret: string,
): Record<string, unknown> | null {
	const [body, signature, extra] = token.split(".");
	if (
		!body ||
		!signature ||
		extra ||
		!equalSecret(
			signature,
			createHmac("sha256", secret).update(body).digest("base64url"),
		)
	)
		return null;
	try {
		const payload = JSON.parse(Buffer.from(body, "base64url").toString());
		return typeof payload.expires === "number" && payload.expires > Date.now()
			? payload
			: null;
	} catch {
		return null;
	}
}
export function validRedirect(value: string) {
	try {
		const url = new URL(value);
		return (
			!url.hash &&
			!url.username &&
			!url.password &&
			(url.protocol === "https:" ||
				(url.protocol === "http:" &&
					["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)))
		);
	} catch {
		return false;
	}
}
