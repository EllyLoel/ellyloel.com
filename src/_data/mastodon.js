import Parser from "rss-parser";

import metadata from "./metadata.json" with { type: "json" }; // eslint-disable-line

export default async () => {
	let parser = new Parser({
		customFields: {
			item: [["media:content", "media:content", { keepArray: true }]],
		},
	});
	let feed = await parser.parseURL(`${metadata.author.links.Mastodon}.rss`);
	return feed;
};
