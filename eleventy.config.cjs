/* eslint-disable no-useless-escape */

// External imports
require("dotenv").config();
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxhighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNestingToc = require("eleventy-plugin-nesting-toc");
const pluginFaviconsPlugin = require("eleventy-plugin-gen-favicons");
const pluginWebmentions = require("eleventy-plugin-webmentions");

// Internal imports
const metadata = require("./src/_data/metadata.json");

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
	eleventyConfig.addPlugin(pluginFaviconsPlugin);
	eleventyConfig.addPlugin(pluginWebmentions, {
		domain: metadata.domain,
		token: process.env.WEBMENTION_IO_API_KEY,
	});

	// Internal plugins
	eleventyConfig.addPlugin(require("./src/_11ty/plugins/markdown.cjs").plugin);
	eleventyConfig.addPlugin(require("./src/_11ty/plugins/drafts.cjs"));
	eleventyConfig.addPlugin(require("./src/_11ty/plugins/image.cjs"));
	eleventyConfig.addPlugin(require("./src/_11ty/plugins/wikilinks.cjs"));
	eleventyConfig.addPlugin(require("./src/_11ty/plugins/unfurl.cjs"));
	eleventyConfig.addPlugin(require("./src/_11ty/plugins/excerpt.cjs"));

	// Collections
	const collections = ["blog", "garden", "bookmarks", "projects", "til"];
	const globs = [];
	for (const collectionName of collections) {
		const glob = `./src/${collectionName}/*.md`;
		eleventyConfig.addCollection(collectionName, (collection) =>
			collection.getFilteredByGlob(glob)
		);
		globs.push(glob);
	}
	eleventyConfig.addCollection("allPostTypes", (collection) =>
		collection.getFilteredByGlob(globs)
	);

	// Filters
	eleventyConfig.addFilter(
		"addNonBreakingSpace",
		require("./src/_11ty/filters/addNonBreakingSpace.cjs")
	);
	eleventyConfig.addFilter(
		"dateToFormat",
		require("./src/_11ty/filters/dateToFormat.cjs")
	);
	eleventyConfig.addFilter(
		"dateToISO",
		require("./src/_11ty/filters/dateToISO.cjs")
	);
	eleventyConfig.addFilter(
		"dateToLocaleDateFull",
		require("./src/_11ty/filters/dateToLocaleDateFull.cjs")
	);
	eleventyConfig.addFilter(
		"excerpt",
		require("./src/_11ty/filters/excerpt.cjs")
	);
	eleventyConfig.addFilter(
		"filterTagList",
		require("./src/_11ty/filters/filterTagList.cjs")
	);
	eleventyConfig.addFilter(
		"getAllTags",
		require("./src/_11ty/filters/getAllTags.cjs")
	);
	eleventyConfig.addFilter(
		"htmlDateString",
		require("./src/_11ty/filters/htmlDateString.cjs")
	);
	eleventyConfig.addFilter(
		"imageLink",
		require("./src/_11ty/filters/imageLink.cjs")
	);
	eleventyConfig.addFilter("limit", require("./src/_11ty/filters/limit.cjs"));
	eleventyConfig.addFilter(
		"linkGraph",
		require("./src/_11ty/filters/linkGraph.cjs")
	);
	eleventyConfig.addFilter("md", require("./src/_11ty/filters/md.cjs"));
	eleventyConfig.addFilter("newUrl", require("./src/_11ty/filters/newUrl.cjs"));
	eleventyConfig.addFilter(
		"readableDate",
		require("./src/_11ty/filters/readableDate.cjs")
	);
	eleventyConfig.addFilter(
		"removeRandomLink",
		require("./src/_11ty/filters/removeRandomLink.cjs")
	);
	eleventyConfig.addFilter(
		"sortAlphabetically",
		require("./src/_11ty/filters/sortAlphabetically.cjs")
	);
	eleventyConfig.addFilter(
		"sortByCreated",
		require("./src/_11ty/filters/sortByCreated.cjs")
	);
	eleventyConfig.addFilter(
		"sortByModified",
		require("./src/_11ty/filters/sortByModified.cjs")
	);
	eleventyConfig.addFilter("unique", require("./src/_11ty/filters/unique.cjs"));

	// Shortcodes
	eleventyConfig.addPairedShortcode(
		"figure",
		require("./src/_11ty/shortcodes/figure.cjs")
	);
	eleventyConfig.addPairedShortcode(
		"feedBlock",
		require("./src/_11ty/shortcodes/feedBlock.cjs")
	);
	eleventyConfig.addShortcode(
		"feedItem",
		require("./src/_11ty/shortcodes/feedItem.cjs")
	);
	eleventyConfig.addShortcode(
		"gh_edit",
		require("./src/_11ty/shortcodes/gh_edit.cjs")
	);
	eleventyConfig.addShortcode("svg", require("./src/_11ty/shortcodes/svg.cjs"));

	process.on("unhandledRejection", (error) => {
		console.error(error); // This prints error with stack included (as for normal errors)
		throw error; // Following best practices re-throw error and let the process exit with error code
	});

	// Copy/pass-through files
	eleventyConfig.addPassthroughCopy({ public: "/" });
	eleventyConfig.addPassthroughCopy({ "src/css": "css" });
	eleventyConfig.addPassthroughCopy({ "src/js": "js" });

	return {
		dir: {
			data: "_data",
			includes: "_includes",
			input: "src",
			layouts: "_layouts",
			output: "_site",
		},
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		templateFormats: ["njk", "md", "11ty.js"],
	};
};
