module.exports = {
	eleventyComputed: {
		title: (data) => data.bookmark.title,
		eleventyNavigation: {
			key: (data) => data.bookmark.title,
			parent: "Bookmarks",
		},
	},
};
