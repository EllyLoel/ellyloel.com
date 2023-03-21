module.exports = {
	date: "git Last Modified",
	layout: "post",
	permalink: "/blog/{{ title | slugify }}/",
	tags: ["blog"],
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
			parent: "Blog",
		},
	},
};
