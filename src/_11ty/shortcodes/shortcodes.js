import feedBlock from "./feedBlock.js";
import figure from "./figure.js";
import gh_edit from "./gh_edit.js";
import md from "./md.js";
import random from "./random.js";
import svg from "./svg.js";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.addPairedShortcode("figure", figure);
	eleventyConfig.addPairedShortcode("feedBlock", feedBlock);
	eleventyConfig.addShortcode("gh_edit", gh_edit);
	eleventyConfig.addPairedShortcode("md", md);
	eleventyConfig.addShortcode("random", random);
	eleventyConfig.addShortcode("svg", svg);
}
