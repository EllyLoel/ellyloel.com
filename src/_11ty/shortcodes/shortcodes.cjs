/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
	eleventyConfig.addPairedShortcode("figure", require("./figure.cjs"));
	eleventyConfig.addPairedShortcode("feedBlock", require("./feedBlock.cjs"));
	eleventyConfig.addShortcode("gh_edit", require("./gh_edit.cjs"));
	eleventyConfig.addPairedShortcode("md", require("./md.cjs"));
	eleventyConfig.addShortcode("svg", require("./svg.cjs"));
};
