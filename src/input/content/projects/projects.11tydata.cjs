module.exports = {
	layout: "post",
	permalink: "projects/{{ title | slugify }}/",
	tags: ["Projects"],
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
			parent: "Projects",
		},
	},
};
