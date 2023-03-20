module.exports = {
	layout: "post",
	date: "git Last Modified",
	permalink: "/bookmarks/{{ title | slugify }}/",
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
			parent: "Bookmarks",
		},
	},
};
