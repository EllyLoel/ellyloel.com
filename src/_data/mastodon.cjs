const Parser = require("rss-parser");

const metadata = require("./metadata.json");

module.exports = async () => {
	let parser = new Parser({
		customFields: {
			item: [["media:content", "media:content", { keepArray: true }]],
		},
	});
	let feed = await parser.parseURL(`${metadata.author.links.Mastodon}.rss`);
	return feed;
};
