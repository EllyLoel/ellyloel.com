module.exports = {
	eleventyComputed: {
		title: (data) => data.bookmark.title,
		created: (data) => data.bookmark.created,
		modified: (data) => data.bookmark.modified,
		image: (data) => data.bookmark.image,
		eleventyNavigation: {
			key: (data) => data.bookmark.title,
			parent: "Bookmarks",
		},
	},
};
