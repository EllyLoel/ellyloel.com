/* eslint-disable no-useless-escape */
const slugify = require("@sindresorhus/slugify");

// This regex finds all wikilinks in a string
const wikilinkRegEx = /\[\[\s*([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s*\]\]/g;

module.exports = (posts) => {
	const linkGraph = {
		links: [],
		nodes: [],
	};

	// Search all posts for links
	for (const post of posts) {
		linkGraph.nodes.push({
			group: post.url.split("/")[1],
			id: post.url,
			name: post.data.title,
			val: "2",
		});

		const postContent = post.template.frontMatter.content;

		// Get all links from the post
		const outboundLinks = (
			[...new Set(postContent.match(wikilinkRegEx))] || []
		).map((wikilink) => {
			return slugify(wikilink.slice(2, -2).split("|")[0], { lower: true });
		});

		for (const link of outboundLinks) {
			for (const otherPost of posts) {
				otherPost.url.includes(link)
					? linkGraph.links.push({
							source: post.url,
							target: otherPost.url,
					  })
					: null;
			}
		}
	}

	return linkGraph;
};
