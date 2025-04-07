import "dotenv/config";
import filters from "./src/_11ty/filters/filters.js";
import plugins from "./src/_11ty/plugins/plugins.js";
import shortcodes from "./src/_11ty/shortcodes/shortcodes.js";
import transforms from "./src/_11ty/transforms/transforms.js";
import yaml from "js-yaml";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// Preprocessors
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
	});

	// Plugins
	eleventyConfig.addPlugin(plugins);

	// Collections
	eleventyConfig.addCollection("allSortedByDate", (collectionApi) =>
		collectionApi
			.getAll()
			.sort((a, b) => new Date(b.date) - new Date(a.date))
	);
	eleventyConfig.addCollection("BookmarksSortedByDate", (collectionApi) =>
		collectionApi
			.getFilteredByTag("Bookmarks")
			.sort((a, b) => new Date(b.date) - new Date(a.date))
	);
	eleventyConfig.addCollection("notBookmarksSortedByDate", (collectionApi) => {
		return collectionApi
			.getAll()
			.filter((item) => 
				!item.data.tags?.includes("Pages") &&
				!item.data.tags?.includes("Bookmarks")
			)
			.sort((a, b) => new Date(b.date) - new Date(a.date));
	});
	eleventyConfig.addCollection("postsSortedByDate", (collectionApi) => {
		return collectionApi
			.getAll()
			.filter((item) => !item.data.tags?.includes("Pages"))
			.sort((a, b) => new Date(b.date) - new Date(a.date));
	});

	// Filters
	eleventyConfig.addPlugin(filters);

	// Shortcodes
	eleventyConfig.addPlugin(shortcodes);

	// Transforms
	eleventyConfig.addPlugin(transforms);

	// Data extensions
	eleventyConfig.addDataExtension("yml,yaml", (contents) => yaml.load(contents));

	// Copy/pass-through files
	eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
	eleventyConfig.addPassthroughCopy("_headers");
	eleventyConfig.addPassthroughCopy("_redirects");
	eleventyConfig.addPassthroughCopy({ "node_modules/color-elements/src/color-slider/color-slider.css": "css/color-slider.css" });
	eleventyConfig.addPassthroughCopy({ "node_modules/color-elements/src/channel-slider/channel-slider.css": "css/channel-slider.css" });
	eleventyConfig.addPassthroughCopy({ "src/input/css/fonts.css": "css/fonts.css" }); // This is needed for the OG image pages

	// Watch targets
	eleventyConfig.addWatchTarget("src/input/css");
	eleventyConfig.addWatchTarget("src/input/js");

	// Server options
	eleventyConfig.setServerOptions({
		https: {
			cert: "./localhost.pem",
			key: "./localhost-key.pem",
		},
		showAllHosts: true,
	});
}

export const config = {
	dir: {
		data: "../_data", // Relative to input
		includes: "../_includes", // Relative to input
		input: "src/input",
		layouts: "../_layouts", // Relative to input
		output: "_site",
	},
	htmlTemplateEngine: "njk",
	markdownTemplateEngine: "njk",
	templateFormats: ["njk", "md", "11ty.js"],
};
