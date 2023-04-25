module.exports = {
	eleventyComputed: {
		title: (data) => data.bookmark.title,
		created: (data) => data.bookmark.created,
		modified: (data) => data.bookmark.lastUpdate,
		tags: (data) => ["Bookmarks", ...data.bookmark.tags],
		eleventyNavigation: {
			key: (data) => data.bookmark.title,
			parent: "Bookmarks",
		},
	},
};
