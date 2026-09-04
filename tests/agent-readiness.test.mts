import assert from "node:assert/strict";
import test from "node:test";
import { appendVary, preferredMediaType } from "../lib/accept.ts";
import {
	experience,
	homepageMarkdown,
	llmsText,
	notFoundMarkdown,
	personJsonLd,
	profile,
	recentShips,
	SITE_URL,
} from "../lib/site-content.ts";

test("negotiates HTML and Markdown with quality values and specificity", () => {
	assert.equal(preferredMediaType(null), "text/html");
	assert.equal(preferredMediaType("*/*"), "text/html");
	assert.equal(preferredMediaType("text/markdown"), "text/markdown");
	assert.equal(
		preferredMediaType("text/html;q=0.5, text/markdown;q=0.9"),
		"text/markdown",
	);
	assert.equal(preferredMediaType("text/markdown;q=0, text/html"), "text/html");
	assert.equal(preferredMediaType("text/html;q=0, */*;q=1"), "text/markdown");
	assert.equal(preferredMediaType("application/pdf"), null);
});

test("adds Accept to Vary without replacing framework values", () => {
	const headers = new Headers({ Vary: "rsc, Accept-Encoding" });
	appendVary(headers, "Accept");
	appendVary(headers, "Accept");
	assert.equal(headers.get("Vary"), "rsc, Accept-Encoding, Accept");
});

test("homepage source contains substantial, structured agent content", () => {
	const meaningfulText =
		[profile.name, profile.role, ...profile.summary].join(" ") +
		experience.flat().join(" ") +
		recentShips.flatMap((ship) => [ship.title, ship.description]).join(" ");
	assert.ok(meaningfulText.length >= 500);
	assert.match(homepageMarkdown, /^# Zach Cowan\n/m);
	assert.match(homepageMarkdown, /^## Experience$/m);
	assert.match(homepageMarkdown, /^## Recent work$/m);
});

test("machine-readable identity and recovery documents are complete", () => {
	assert.equal(personJsonLd["@type"], "Person");
	assert.equal(personJsonLd.url, SITE_URL);
	assert.equal(personJsonLd.name, "Zach Cowan");
	assert.match(llmsText, /^# Zach Cowan\n/);
	assert.match(
		llmsText,
		new RegExp(`${SITE_URL.replace(".", "\\.")}/index\\.md`),
	);
	assert.match(notFoundMarkdown, /^# 404: Page not found\n/);
	assert.match(notFoundMarkdown, /\/sitemap\.xml/);
	assert.match(notFoundMarkdown, /\/llms\.txt/);
});
