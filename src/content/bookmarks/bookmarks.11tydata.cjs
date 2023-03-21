module.exports = {
	date: "git Last Modified",
	layout: "post",
	permalink: "/bookmarks/{{ title | slugify }}/",
	tags: ["bookmarks"],
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
			parent: "Bookmarks",
		},
	},
};
