module.exports = {
	layout: "post",
	permalink: "til/{{ title | slugify }}/",
	tags: ["TIL"],
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
			parent: "TIL",
		},
	},
};
