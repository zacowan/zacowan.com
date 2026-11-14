import assert from "node:assert/strict";
import test from "node:test";
import {
	addEntryInput,
	ratingLabel,
	updateEntryInput,
} from "../lib/lists/validation.ts";
import {
	challengeFor,
	equalSecret,
	signConsent,
	validRedirect,
	verifyConsent,
} from "../lib/lists/crypto.ts";

test("ratings accept half-points out of ten and reject invalid scores", () => {
	const rating = addEntryInput.shape.rating;
	for (const value of [0, 0.5, 8.5, 10, null])
		assert.equal(rating.safeParse(value).success, true);
	for (const value of [-1, 10.5, 8.3, NaN, "8"])
		assert.equal(rating.safeParse(value).success, false);
	assert.equal(ratingLabel(17), "8.5/10");
	assert.equal(ratingLabel(null), "Unrated");
	assert.equal(
		updateEntryInput.shape.rating.safeParse(undefined).success,
		true,
	);
	assert.equal(updateEntryInput.shape.rating.safeParse(null).success, true);
});
test("entry URLs disallow script and data protocols; dates must be real", () => {
	assert.equal(
		addEntryInput.shape.url.safeParse("javascript:alert(1)").success,
		false,
	);
	assert.equal(
		addEntryInput.shape.url.safeParse("data:text/html,hello").success,
		false,
	);
	assert.equal(
		addEntryInput.shape.url.safeParse("https://example.com/movie").success,
		true,
	);
	assert.equal(
		addEntryInput.shape.experiencedOn.safeParse("2026-02-30").success,
		false,
	);
});
test("OAuth redirect URIs require HTTPS or loopback HTTP without fragments or credentials", () => {
	for (const url of [
		"https://chatgpt.com/connector_platform/oauth/callback",
		"http://127.0.0.1:1234/callback",
		"http://localhost:3000/callback",
	])
		assert.equal(validRedirect(url), true);
	for (const url of [
		"http://example.com/callback",
		"https://user:pass@example.com/",
		"https://example.com/#callback",
		"javascript:alert(1)",
		"//example.com",
	])
		assert.equal(validRedirect(url), false);
});
test("PKCE S256 matches RFC 7636 example", () => {
	assert.equal(
		challengeFor("dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"),
		"E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM",
	);
});
test("consent signatures reject tampering, expiration, and different keys", () => {
	const token = signConsent(
		{ expires: Date.now() + 60000, csrf: "nonce", query: "?client_id=abc" },
		"secret",
	);
	assert.equal(verifyConsent(token, "secret")?.csrf, "nonce");
	assert.equal(verifyConsent(`${token}x`, "secret"), null);
	assert.equal(verifyConsent(token, "other"), null);
	assert.equal(
		verifyConsent(signConsent({ expires: 0 }, "secret"), "secret"),
		null,
	);
	assert.equal(equalSecret("a", "a"), true);
	assert.equal(equalSecret("a", "ab"), false);
});
