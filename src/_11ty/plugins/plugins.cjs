// External imports
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxhighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNestingToc = require("eleventy-plugin-nesting-toc");
const pluginFavicons = require("eleventy-plugin-gen-favicons");
const pluginVite = require("@11ty/eleventy-plugin-vite");
const pluginWebmentions = require("eleventy-plugin-webmentions");

// Internal imports
const metadata = require("../../_data/metadata.json");

module.exports = (eleventyConfig) => {
	// External plugins
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxhighlight);
	eleventyConfig.addPlugin(pluginNestingToc, {
		tags: ["h2", "h3", "h4", "h5", "h6"],
		wrapper: "nav",
		wrapperClass: "[ toc ][ recursive-flow ]",
	});
	eleventyConfig.addPlugin(pluginFavicons);
	eleventyConfig.addPlugin(pluginVite, {
		viteOptions: {
			/**
			 * @see https://github.com/vitejs/vite/blob/ee1a686abf69db8a4026ed5462615766f222c29a/packages/vite/src/node/constants.ts#L97
			 */
			assetsInclude: ["**/*.xml"],

			build: {
				sourcemap: "true",
				manifest: true,
				rollupOptions: {
					external: "/pagefind/pagefind.js",
				},
			},
		},
	});
	eleventyConfig.addPlugin(pluginWebmentions, {
		domain: metadata.domain,
		token: process.env.WEBMENTION_IO_API_KEY,
	});

	// Internal plugins
	eleventyConfig.addPlugin(require("./markdown.cjs").plugin);
	eleventyConfig.addPlugin(require("./drafts.cjs"));
	eleventyConfig.addPlugin(require("./image.cjs"));
	eleventyConfig.addPlugin(require("./wikilinks.cjs"));
	eleventyConfig.addPlugin(require("./unfurl.cjs"));
	eleventyConfig.addPlugin(require("./excerpt.cjs"));
};
