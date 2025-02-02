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
	eleventyConfig.addCollection("notBookmarksSortedByDate", (collectionApi) => {
		return collectionApi
			.getAll()
			.filter((item) => 
				!item.data.tags?.includes("Pages") &&
				!item.data.tags?.includes("Bookmarks")
			)
			.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
	});
	eleventyConfig.addCollection("postsSortedByDate", (collectionApi) => {
		return collectionApi
			.getAll()
			.filter((item) => !item.data.tags?.includes("Pages"))
			.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
	});

	// Filters
	eleventyConfig.addPlugin(require("./src/_11ty/filters/filters.cjs"));

	// Shortcodes
	eleventyConfig.addPlugin(require("./src/_11ty/shortcodes/shortcodes.cjs"));

	// Transforms
	eleventyConfig.addPlugin(require("./src/_11ty/transforms/transforms.cjs"));

	// Copy/pass-through files
	eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
	eleventyConfig.addPassthroughCopy({ "node_modules/color-elements/src/color-slider/color-slider.css": "css/color-slider.css" });
	eleventyConfig.addPassthroughCopy({ "node_modules/color-elements/src/channel-slider/channel-slider.css": "css/channel-slider.css" });

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
