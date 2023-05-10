module.exports = {
	eleventyComputed: {
		created: (data) => data.bookmark.created,
		eleventyNavigation: {
			key: (data) => data.bookmark.title,
			parent: "Bookmarks",
		},
		image: (data) => data.bookmark.image,
		modified: (data) => data.bookmark.modified,
		title: (data) => data.bookmark.title,
	},
};
