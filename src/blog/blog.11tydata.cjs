module.exports = {
	layout: "post",
	date: "git Last Modified",
	permalink: "/blog/{{ title | slugify }}/",
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
			parent: "Blog",
		},
	},
};
