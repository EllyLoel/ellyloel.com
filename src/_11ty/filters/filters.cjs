/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
	eleventyConfig.addFilter(
		"addNonBreakingSpace",
		require("./addNonBreakingSpace.cjs")
	);
	eleventyConfig.addFilter("dateObj", require("./dateObj.cjs"));
	eleventyConfig.addFilter("dateToFormat", require("./dateToFormat.cjs"));
	eleventyConfig.addFilter("dateToISO", require("./dateToISO.cjs"));
	eleventyConfig.addFilter(
		"dateToLocaleDateFull",
		require("./dateToLocaleDateFull.cjs")
	);
	eleventyConfig.addFilter("dateToRelative", require("./dateToRelative.cjs"));
	eleventyConfig.addFilter("excerpt", require("./excerpt.cjs"));
	eleventyConfig.addFilter("filterTagList", require("./filterTagList.cjs"));
	eleventyConfig.addFilter("getAllTags", require("./getAllTags.cjs"));
	eleventyConfig.addFilter(
		"getLatestCollectionItemDate",
		require("./getLatestCollectionItemDate.cjs")
	);
	eleventyConfig.addFilter("getUrlExtension", require("./getUrlExtension.cjs"));
	eleventyConfig.addFilter("htmlDateString", require("./htmlDateString.cjs"));
	eleventyConfig.addFilter("imageLink", require("./imageLink.cjs"));
	eleventyConfig.addFilter("limit", require("./limit.cjs"));
	eleventyConfig.addFilter("linkGraph", require("./linkGraph.cjs"));
	eleventyConfig.addFilter("md", require("./md.cjs"));
	eleventyConfig.addFilter("newUrl", require("./newUrl.cjs"));
	eleventyConfig.addFilter("objKeys", require("./objKeys.cjs"));
	eleventyConfig.addFilter("readableDate", require("./readableDate.cjs"));
	eleventyConfig.addFilter(
		"removeRandomLink",
		require("./removeRandomLink.cjs")
	);
	eleventyConfig.addFilter("split", require("./split.cjs"));
	eleventyConfig.addFilter("unique", require("./unique.cjs"));
};
