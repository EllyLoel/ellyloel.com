const mdLinkRegEx = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/gm;

export default async (posts) => {
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

		const postTemplate = await post.template.read();
		const postContent = postTemplate?.content || "";

		if (typeof postContent === "object") continue;

		// Get all links from the post
		const outboundLinks = [...new Set(postContent.match(mdLinkRegEx))];

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
