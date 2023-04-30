module.exports = {
	layout: "post",
	permalink: "blog/{{ title | slugify }}/",
	tags: ["Blog"],
	eleventyComputed: {
		eleventyNavigation: {
			key: (data) => data.title,
			parent: "Blog",
		},
	},
};
