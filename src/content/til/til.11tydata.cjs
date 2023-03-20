module.exports = {
	date: "git Last Modified",
	layout: "post",
	permalink: "/til/{{ title | slugify }}/",
	tags: ["til"],
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
			parent: "TIL",
		},
	},
};
