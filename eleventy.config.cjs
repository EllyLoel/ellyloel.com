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
	["Blog", "Garden", "Projects", "TIL"].forEach((collection) => {
		eleventyConfig.addCollection(
			`${collection}SortedByDate`,
			(collectionApi) => {
				return collectionApi
					.getFilteredByTag(collection)
					.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
			}
		);
	});

	// Filters
	eleventyConfig.addPlugin(require("./src/_11ty/filters/filters.cjs"));

	// Shortcodes
	eleventyConfig.addPlugin(require("./src/_11ty/shortcodes/shortcodes.cjs"));

	// Copy/pass-through files
	eleventyConfig.addPassthroughCopy({ "src/assets/3d": "assets/3d" });
	eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
	eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
	eleventyConfig.addPassthroughCopy({ "src/assets/sounds": "assets/sounds" });
	eleventyConfig.addPassthroughCopy({ "src/assets/svg": "assets/svg" });

	return {
		dir: {
			data: "../_data", // Relative to input
			includes: "../_includes", // Relative to input
			input: "src/content",
			layouts: "../_layouts", // Relative to input
			output: "_site",
		},
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		templateFormats: ["njk", "md", "11ty.js"],
	};
};
