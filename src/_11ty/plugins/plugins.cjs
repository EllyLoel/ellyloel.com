// External imports
const pluginEmoji = require("eleventy-plugin-emoji");
const pluginFavicons = require("eleventy-plugin-gen-favicons");
const pluginIcons = require("eleventy-plugin-icons");
const pluginInterlinker = require("@photogabble/eleventy-plugin-interlinker");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginNestingToc = require("eleventy-plugin-nesting-toc");
const pluginPostCss = require("eleventy-plugin-postcss");
const pluginRollup = require("eleventy-plugin-rollup");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxhighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginWebmentions = require("eleventy-plugin-webmentions");

// Internal imports
const metadata = require("../../_data/metadata.json");

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
	// External plugins
	eleventyConfig.addPlugin(pluginEmoji, {
		className: "[ emoji ]",
	});
	eleventyConfig.addPlugin(pluginFavicons);
	eleventyConfig.addPlugin(pluginIcons, {
		icon: {
			insertAttributes: {
				"aria-hidden": "true",
			},
		},
		sources: {
			fab: "node_modules/@fortawesome/fontawesome-free/svgs/brands",
			far: "node_modules/@fortawesome/fontawesome-free/svgs/regular",
			fas: "node_modules/@fortawesome/fontawesome-free/svgs/solid",
			local: "src/assets/svg",
		},
	});
	eleventyConfig.addPlugin(pluginIcons, {
		icon: {
			insertAttributes: {
				role: "img",
			},
			shortcode: "labelledIcon",
		},
		sources: {
			fab: "node_modules/@fortawesome/fontawesome-free/svgs/brands",
			far: "node_modules/@fortawesome/fontawesome-free/svgs/regular",
			fas: "node_modules/@fortawesome/fontawesome-free/svgs/solid",
			local: "src/assets/svg",
		},
	});
	eleventyConfig.addPlugin(pluginIcons, {
		icon: {
			class: (name, source) => `inline-icon icon-${name}`,
			insertAttributes: {
				"aria-hidden": "true",
			},
			shortcode: "inlineIcon",
		},
		sources: {
			fab: "node_modules/@fortawesome/fontawesome-free/svgs/brands",
			far: "node_modules/@fortawesome/fontawesome-free/svgs/regular",
			fas: "node_modules/@fortawesome/fontawesome-free/svgs/solid",
			local: "src/assets/svg",
		},
	});
	eleventyConfig.addPlugin(pluginIcons, {
		icon: {
			class: (name, source) => `inline-icon icon-${name}`,
			insertAttributes: {
				role: "img",
			},
			shortcode: "labelledInlineIcon",
		},
		sources: {
			fab: "node_modules/@fortawesome/fontawesome-free/svgs/brands",
			far: "node_modules/@fortawesome/fontawesome-free/svgs/regular",
			fas: "node_modules/@fortawesome/fontawesome-free/svgs/solid",
			local: "src/assets/svg",
		},
	});
	eleventyConfig.addPlugin(pluginInterlinker);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(pluginNestingToc, {
		tags: ["h2", "h3", "h4", "h5", "h6"],
		wrapper: "div",
		wrapperClass: "[ toc ][ recursive-flow ]",
	});
	eleventyConfig.addPlugin(pluginPostCss);
	eleventyConfig.addPlugin(pluginRollup, {
		rollupOptions: "rollup.config.js",
		scriptGenerator: (file, attributes = {}) => {
			let attributesString = " ";
			for (const [key, value] of Object.entries(attributes)) {
				attributesString += `${key}="${value}" `;
			}
			return `<script src="${file}" type="module"${attributesString.trimEnd()}></script>`;
		},
	});
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxhighlight);
	eleventyConfig.addPlugin(pluginWebmentions, {
		cacheDirectory: "./.cache",
		domain: metadata.domain,
		mentionTypes: {
			comments: ["in-reply-to"],
			likes: ["like-of"],
			mentions: ["bookmark-of", "mention-of"],
			reposts: ["repost-of"],
		},
		token: process.env.WEBMENTION_IO_API_KEY,
		truncate: false,
	});

	// Internal plugins
	eleventyConfig.addPlugin(require("./excerpt.cjs"));
	eleventyConfig.addPlugin(require("./image.cjs"));
	eleventyConfig.addPlugin(require("./markdown.cjs").plugin);
	eleventyConfig.addPlugin(require("./unfurl.cjs"));
};
