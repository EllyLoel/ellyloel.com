export default async (posts) => {
	const linkGraph = {
		links: [],
		nodes: [],
	};

	// Search all posts for links
	for (const post of posts) {
		linkGraph.nodes.push({
			group: post.data.tags?.[1] || post.data.tags?.[0],
			id: post.url,
			name: post.data.title,
			val: post.data.tags.includes("Bookmarks") ? "1" : "2",
		});

		const postTemplate = await post.template.read();
		const postContent = postTemplate.content;
		if (typeof postContent === "object") continue;

		let outboundLinks = [];
		if (postContent) {
			// Get all links from the post
			const mdLinkRegEx = /(?<!!)\[([\w\s\d]+)\]\(((?:\.|\/|https?:\/\/)[\w\d./?=#]+)\)/gm;
			const htmlLinkRegEx = /<a\s+([^>]*?\s+)?href=(["'])((?:\.|\/|https?:\/\/)[\w\d./?=#]+)\2\1>([^<]*?)<\/a>/gm;
			const mdMatches = postContent.matchAll(mdLinkRegEx);
			const htmlMatches = postContent.matchAll(htmlLinkRegEx);
			const matches = [...Array.from(mdMatches, (match) => {
				return {
					name: match[1],
					url: match[2],
				};
			}), ...Array.from(htmlMatches, (match) => {
				return {
					name: match[4],
					url: match[3],
				};
			})];
			outboundLinks.push(...matches);
		}
		if (!postContent && post.data.link) {
			outboundLinks.push({
				name: post.data.title,
				url: post.data.link
			});
		}

		for (const link of outboundLinks) {
			let group, val;
			if (link.url.startsWith("http")) {
				group = "External";
				val = "1";
			}
			if (!linkGraph.nodes.some((node) => node.id === link.url)) {
				linkGraph.nodes.push({
					group,
					id: link.url,
					name: link.name,
					val: val ?? "2",
				});
			}

			linkGraph.links.push({
				source: post.url,
				target: link.url,
			});
		}
	}

	return linkGraph;
};
