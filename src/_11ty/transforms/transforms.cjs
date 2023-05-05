/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
	eleventyConfig.addTransform("htmlmin", require("./htmlMin.cjs"));
};
