// External imports
require("dotenv").config();

// Internal imports

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
	// Plugins
	eleventyConfig.addPlugin(require("./src/_11ty/plugins/plugins.cjs"));

	// Collections
	eleventyConfig.addCollection("allSortedByDate", (collectionApi) =>
		collectionApi
			.getAll()
			.sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
	);
	eleventyConfig.addCollection("BookmarksSortedByDate", (collectionApi) =>
		collectionApi
			.getFilteredByTag("Bookmarks")
			.sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
	);
	let collection = [];
	eleventyConfig.addCollection("notBookmarksSortedByDate", (collectionApi) => {
		collection.push(...collectionApi.getFilteredByTag("Essays"));
		collection.push(...collectionApi.getFilteredByTag("Garden"));
		collection.push(...collectionApi.getFilteredByTag("Projects"));
		collection.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
		return collection;
	});
	eleventyConfig.addCollection("postsSortedByDate", (collectionApi) => {
		collection.push(...collectionApi.getFilteredByTag("Bookmarks"));
		collection.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
		return collection;
	});

	// Filters
	eleventyConfig.addPlugin(require("./src/_11ty/filters/filters.cjs"));

	// Shortcodes
	eleventyConfig.addPlugin(require("./src/_11ty/shortcodes/shortcodes.cjs"));

	// Transforms
	eleventyConfig.addPlugin(require("./src/_11ty/transforms/transforms.cjs"));

	// Copy/pass-through files
	eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
	eleventyConfig.addPassthroughCopy({ "node_modules/color-elements/src/color-slider/color-slider.css": "css" });
	eleventyConfig.addPassthroughCopy({ "node_modules/color-elements/src/channel-slider/channel-slider.css": "css" });

	// Watch targets
	eleventyConfig.addWatchTarget("src/input/css");
	eleventyConfig.addWatchTarget("src/input/js");

	return {
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
};
