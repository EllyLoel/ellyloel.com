import htmlMin from "./htmlMin.js";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.addTransform("htmlmin", htmlMin);
}
