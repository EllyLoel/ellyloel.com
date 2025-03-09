const mdLinkRegEx = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/gm;

export default {
	backlinks: async (data) => {
		const posts = data.collections.allSortedByDate;

		let backlinks = [];

		// Search all posts for links
		for (const post of posts) {
			const postTemplate = await post.template.read();
			const postContent = postTemplate?.content || "";

			if (typeof postContent === "object") continue;

			// Get all links from the post
			const outboundLinks = [...new Set(postContent.match(mdLinkRegEx))];

			if (outboundLinks.some((link) => link === data.title)) {
				backlinks.push({
					excerpt: postTemplate.excerpt,
					title: post.data.title,
					url: post.url,
				});
			}
		}

		return backlinks;
	},
	canonical: (data) => new URL(data.page.url, data.metadata.url).href,
	date: function (data) {
		if (data?.created) return this.dateToISO(new Date(data?.created));
		return this.dateToISO("2001-08-16");
	},
};
