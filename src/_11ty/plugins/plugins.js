import pluginEmoji from "eleventy-plugin-emoji";
import pluginExcerpt from "./excerpt.js";
import pluginFavicons from "eleventy-plugin-gen-favicons";
import pluginIcons from "eleventy-plugin-icons";
import pluginImage from "./image.js";
import { eleventyImageTransformPlugin as pluginImageTransform } from "@11ty/eleventy-img";
// TODO: Come back to this
// import pluginInterlinker from "@photogabble/eleventy-plugin-interlinker";
import { plugin as pluginMarkdown } from "./markdown.js";
import pluginNavigation from "@11ty/eleventy-navigation";
import pluginNestingToc from "eleventy-plugin-nesting-toc";
import pluginPostcss from "./postcss.js";
import pluginRollup from "eleventy-plugin-rollup";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxhighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginUnfurl from "./unfurl.js";
import pluginWebmentions from "./webmentions.js";

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
		domain: ["www.ellyloel.com", "ellyloel.com"],
		mentionTypes: {
			comments: ["in-reply-to"],
			likes: ["like-of"],
			mentions: ["bookmark-of", "mention-of"],
			reposts: ["repost-of"],
		},
		sanitizeOptions: {
			allowedAttributes: ["class", "href", "title", "cite", "datetime"],
			allowedTags: ["a", "abbr", "acronym", "b", "blockquote", "cite", "code", "del", "em", "i", "ins", "img", "q", "s", "strike", "strong"],
		},
		token: process.env.WEBMENTION_IO_API_KEY,
	});
	eleventyConfig.addPlugin(pluginImageTransform, {
		sharpOptions: {
			animated: true,
		},
	});

	// Internal plugins
	eleventyConfig.addPlugin(pluginExcerpt);
	eleventyConfig.addPlugin(pluginImage);
	eleventyConfig.addPlugin(pluginMarkdown);
	eleventyConfig.addPlugin(pluginPostcss);
	eleventyConfig.addPlugin(pluginUnfurl);
}
