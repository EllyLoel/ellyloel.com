const markdownItAnchor = require("markdown-it-anchor");
const EleventyPluginImage = require("@11ty/eleventy-img");
const path = require("path");
const slugify = require("@sindresorhus/slugify");

let markdownLibrary = require("markdown-it")({
	breaks: true,
	html: true,
	linkify: true,
	typographer: true,
})
	.use(require("markdown-it-ins-del"))
	.disable("strikethrough")
	.use(require("markdown-it-sup"))
	.use(require("markdown-it-footnote"))
	.use(require("markdown-it-mark"))
	.use(require("markdown-it-abbr"))
	.use(require("markdown-it-container"), "callout", {
		marker: "~",
		render: (tokens, idx) => {
			const title = tokens[idx].info.trim().match(/^callout\s+(.*)$/);
			if (tokens[idx].nesting === 1) {
				// opening tag
				return `<aside class="callout">
						<sl-icon name="info-circle"></sl-icon>
						<strong>${markdownLibrary.render(title[1])}</strong>
						<div>
					`;
			} else {
				// closing tag
				return ` </div>
					</aside>
					`;
			}
		},
	})
	.use(markdownItAnchor, {
		level: 2,
		permalink: markdownItAnchor.permalink.headerLink({
			safariReaderFix: true,
		}),
		slugify: slugify,
	})
	.use(require("markdown-it-emoji"))
	.use(
		require("markdown-it-wikilinks")({
			baseURL: "/",
			generatePageNameFromLabel: (label) =>
				slugify(label, { lower: true, customReplacements: [[`"`, `\"`]] }),
			postProcessPageName: (label) =>
				slugify(label, { lower: true, customReplacements: [[`"`, `\"`]] }),
			relativeBaseURL: "../",
			suffix: "",
			uriSuffix: "",
		})
	)
	.use(require("markdown-it-attrs"));

markdownLibrary.renderer.rules.emoji = (token, idx) =>
	`<span class="[ emoji ]">${token[idx].content}</span>`;

markdownLibrary.renderer.rules.image = function (tokens, idx) {
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

		const generated = EleventyPluginImage.generateHTML(
			metadata,
			imageAttributes,
			{ whitespaceMode: "inline" }
		);

		return figure(generated, caption);
	}

	const widths = [250, 316, 426, 460, 580, 768];
	const options = {
		cacheOptions: {
			duration: "4w",
		},
		formats: ["avif", "webp", "jpeg"],
		outputDir: path.join("_site", "img"),
		widths: widths
			.concat(widths.map((w) => w * 2)) // generate 2x sizes
			.filter((v, i, s) => s.indexOf(v) === i), // dedupe
	};

	EleventyPluginImage(src, options);

	const metadata = EleventyPluginImage.statsSync(src, options);

	const generated = EleventyPluginImage.generateHTML(
		metadata,
		imageAttributes,
		{ whitespaceMode: "inline" }
	);

	return figure(generated, caption);
};

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports.plugin = (eleventyConfig) => {
	eleventyConfig.setLibrary("md", markdownLibrary);
};
module.exports.library = markdownLibrary;
