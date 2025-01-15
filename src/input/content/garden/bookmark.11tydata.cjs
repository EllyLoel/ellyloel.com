module.exports = {
	eleventyComputed: {
		created: (data) => data.bookmark.created,
		image: (data) => data.bookmark.image,
		modified: (data) => data.bookmark.modified,
		title: (data) => data.bookmark.title,
	},
};
