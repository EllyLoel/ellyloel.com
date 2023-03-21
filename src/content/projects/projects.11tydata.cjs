module.exports = {
	date: "git Last Modified",
	layout: "post",
	permalink: "/projects/{{ title | slugify }}/",
	tags: ["projects"],
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
			parent: "Projects",
		},
	},
};
