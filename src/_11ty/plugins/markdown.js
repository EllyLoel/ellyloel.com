import EleventyPluginImage, { generateHTML, statsSync } from "@11ty/eleventy-img";
import { join } from "path";
import markdownit from "markdown-it";
import markdownitAbbr from "markdown-it-abbr";
import markdownitAnchor from "markdown-it-anchor";
import markdownitAttrs from "markdown-it-attrs";
import markdownitContainer from "markdown-it-container";
import markdownitFootnote from "markdown-it-footnote";
import markdownitInsDel from "markdown-it-ins-del";
import markdownitMark from "markdown-it-mark";
import markdownitSup from "markdown-it-sup";
import markdownitWikilinks from "markdown-it-wikilinks";
import slugify from "@sindresorhus/slugify";

let markdownLibrary = markdownit({
	breaks: true,
	html: true,
	linkify: true,
	typographer: true,
})
	.use(markdownitInsDel)
	.disable("strikethrough")
	.use(markdownitSup)
	.use(markdownitFootnote)
	.use(markdownitMark)
	.use(markdownitAbbr)
	.use(markdownitContainer, "callout", {
		marker: "~",
		render: (tokens, idx) => {
			const title = tokens[idx].info.trim().match(/^callout\s?(.*)$/);
			if (tokens[idx].nesting === 1) {
				// opening tag
				return `<aside class="[ callout ][ flow ]">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="inline-icon" aria-hidden="true">
						<path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
					</svg>
					${title[1] ? markdownLibrary.renderInline(title[1]) : ``}`.trim();
			} else {
				// closing tag
				return `</aside>`;
			}
		},
	})
	.use(markdownitAnchor, {
		level: 2,
		slugify: slugify,
	})
	.use(markdownitWikilinks({
			baseURL: "/",
			generatePageNameFromLabel: (label) =>
				// eslint-disable-next-line no-useless-escape
				slugify(label, { customReplacements: [[`"`, `\"`]], lower: true }),
			postProcessPageName: (label) =>
				// eslint-disable-next-line no-useless-escape
				slugify(label, { customReplacements: [[`"`, `\"`]], lower: true }),
			relativeBaseURL: "../",
			suffix: "",
			uriSuffix: "",
		})
	)
	.use(markdownitAttrs);

markdownLibrary.renderer.rules.image = function(tokens, idx) {
	// responsive images with 11ty image
	// this overrides the default image renderer

	function figure(html, caption) {
		if (caption) {
			return `<figure>${html}<figcaption>${caption}</figcaption></figure>`;
		}
		return `<figure>${html}</figure>`;
	}

	const token = tokens[idx];
	let src = token.attrGet("src");
	const alt = token.content;
	let caption = "";
	for (let i = 1; i < tokens.length; i++) {
		if (tokens[i].type === "em_open") {
			tokens[i].hidden = true;
		}
		if (tokens[i].type === "text") {
			caption += tokens[i].content;
			tokens[i].content = "";
			tokens[i].hidden = true;
		}
		if (tokens[i].type === "link_open") {
			caption += `<a href="${tokens[i].attrs[0][1]}">`;
			tokens[i].hidden = true;
		}
		if (tokens[i].type === "link_close") {
			caption += `</a>`;
			tokens[i].hidden = true;
		}
		if (tokens[i].type === "em_close" || tokens[i].type === "softbreak") {
			tokens[i].hidden = true;
			break;
		}
	}

	const imageAttributes = {
		alt,
		class: "[ image ]",
		decoding: "async",
		loading: "lazy",
		sizes: "(max-width: 768px) 100vw, 768px",
	};

	if (src.startsWith("http")) {
		const metadata = { jpeg: [{ url: src }] };

		const generated = generateHTML(
			metadata,
			imageAttributes,
			{ whitespaceMode: "inline" }
		);

		return figure(generated, caption);
	}

	if (process.env.ELEVENTY_ENV === "development") {
		const imgSrc = src.replace("./src/", "/");
		return `<img src="${imgSrc}" alt="${alt}" loading="lazy">`;
	}

	const widths = [250, 316, 426, 460, 580, 768];
	const options = {
		cacheOptions: {
			duration: "4w",
		},
		formats: ["webp", "jpeg", "auto"],
		outputDir: join("_site", "img"),
		widths: widths
			.concat(widths.map((w) => w * 2)) // generate 2x sizes
			.filter((v, i, s) => s.indexOf(v) === i), // dedupe
	};

	EleventyPluginImage(src, options);

	const metadata = statsSync(src, options);

	const generated = generateHTML(
		metadata,
		imageAttributes,
		{ whitespaceMode: "inline" }
	);

	return figure(generated, caption);
};

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export function plugin(eleventyConfig) {
	eleventyConfig.setLibrary("md", markdownLibrary);
}
export const library = markdownLibrary;
