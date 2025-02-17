import fetchBookmarks from "../../_data/bookmarks.js";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	const collectionId = "33237518";

	const bookmarks = await fetchBookmarks(collectionId);

	for (const tag of bookmarks.allTags) {
		eleventyConfig.addCollection(tag, (collectionApi) => {
			return (bookmarks.items || []).filter((bookmark) => (
				bookmark.tags?.includes(tag)
			));
		});
	};

	eleventyConfig.addGlobalData("bookmarks", bookmarks);
}
