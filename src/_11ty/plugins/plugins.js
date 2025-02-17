// External imports
import { eleventyImageTransformPlugin as pluginImageTransform } from "@11ty/eleventy-img";
import pluginEmoji from "eleventy-plugin-emoji";
import pluginFavicons from "eleventy-plugin-gen-favicons";
import pluginIcons from "eleventy-plugin-icons";
// TODO: Come back to this
// import pluginInterlinker from "@photogabble/eleventy-plugin-interlinker";
import pluginNavigation from "@11ty/eleventy-navigation";
import pluginNestingToc from "eleventy-plugin-nesting-toc";
import pluginRollup from "eleventy-plugin-rollup";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxhighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginWebmentions from "eleventy-plugin-webmentions";

// Internal imports
import metadata from "../../_data/metadata.json" with { type: "json" }; // eslint-disable-line
import pluginBookmarks from "./bookmarks.js";
import pluginExcerpt from "./excerpt.js";
import pluginImage from "./image.js";
import { plugin as pluginMarkdown } from "./markdown.js";
import pluginPostcss from "./postcss.js";
import pluginUnfurl from "./unfurl.js";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
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
	// eleventyConfig.addPlugin(pluginInterlinker);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(pluginNestingToc, {
		tags: ["h2", "h3", "h4", "h5", "h6"],
		wrapper: "div",
		wrapperClass: "[ toc ][ recursive-flow ]",
	});
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
	eleventyConfig.addPlugin(pluginImageTransform);

	// Internal plugins
	eleventyConfig.addPlugin(pluginBookmarks);
	eleventyConfig.addPlugin(pluginExcerpt);
	eleventyConfig.addPlugin(pluginImage);
	eleventyConfig.addPlugin(pluginMarkdown);
	eleventyConfig.addPlugin(pluginPostcss);
	eleventyConfig.addPlugin(pluginUnfurl);
}
