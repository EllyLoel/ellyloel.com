module.exports = {
	layout: "post",
	permalink: "garden/{{ title | slugify }}/",
	tags: ["Garden"],
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
			parent: "Digital garden",
		},
	},
};
