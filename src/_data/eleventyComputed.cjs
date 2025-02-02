// This regex finds all wikilinks in a string
// eslint-disable-next-line no-useless-escape
const wikilinkRegEx = /\[\[\s*([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s*\]\]/g;

module.exports = {
	backlinks: (data) => {
		const posts = data.collections.allSortedByDate;

		let backlinks = [];

		// Search all posts for links
		for (const post of posts) {
			const postContent = post.template.frontMatter.content;

			// Get all links from the post
			const outboundLinks = (
				[...new Set(postContent.match(wikilinkRegEx))] || []
			).map((link) => {
				return link.slice(2, -2).split("|")[0];
			});

			if (outboundLinks.some((link) => link === data.title)) {
				backlinks.push({
					excerpt: post.template.frontMatter.excerpt,
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
