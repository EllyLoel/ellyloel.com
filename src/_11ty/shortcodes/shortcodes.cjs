module.exports = (eleventyConfig) => {
	eleventyConfig.addPairedShortcode("figure", require("./figure.cjs"));
	eleventyConfig.addPairedShortcode("feedBlock", require("./feedBlock.cjs"));
	eleventyConfig.addShortcode("feedItem", require("./feedItem.cjs"));
	eleventyConfig.addShortcode("gh_edit", require("./gh_edit.cjs"));
	eleventyConfig.addShortcode("svg", require("./svg.cjs"));
};
