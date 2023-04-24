module.exports = {
	date: "git Last Modified",
	layout: "post",
	permalink: "garden/{{ title | slugify }}/",
	tags: ["garden"],
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
			parent: "Digital garden",
		},
	},
};
