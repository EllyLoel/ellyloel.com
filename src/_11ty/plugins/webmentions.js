import filterWebmentions from "./filterWebmentions.js";
import getWebmentions from "./getWebmentions.js";

export default async (eleventyConfig, options = {}) => {
	const webmentions = getWebmentions(options);
	const filters = filterWebmentions(options);

	const data = webmentions.get();

	eleventyConfig.addGlobalData("webmentions", async () => {
		const { children } = await data;
		return children;
	});

	eleventyConfig.addGlobalData("webmentionsLastFetched", async () => {
		const { lastFetched } = await data;
		return new Date(lastFetched);
	});

	eleventyConfig.addFilter("webmentionsForPage", filters.mentions);
	eleventyConfig.addFilter("webmentionCountForPage", filters.count);
};
