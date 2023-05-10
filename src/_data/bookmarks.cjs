const EleventyFetch = require("@11ty/eleventy-fetch");
require("dotenv").config();

module.exports = async () => {
	const publicCollectionId = "33237518";
	const raindropApiUrl = `https://api.raindrop.io/rest/v1/raindrops/${publicCollectionId}`;

	try {
		const data = await EleventyFetch(raindropApiUrl, {
			duration: "1d",
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`,
				},
			},
			type: "json",
		});

		const items = data.items;

		let response = [];

		if (items.length) {
			items.forEach((item) => {
				response.push({
					created: item.created,
					excerpt: item.excerpt,
					highlights: item.highlights,
					image: item.cover,
					link: item.link,
					modified: item.lastUpdate,
					note: item.note,
					tags: ["Bookmarks", ...item.tags],
					title: item.title,
					type: item.type,
				});
			});

			const newestItemDate = new Date(
				Math.max(...response.map((item) => new Date(item?.modified || "")))
			);

			return {
				items: response,
				newestItemDate,
			};
		}
	} catch (error) {
		console.log(`\n${error}\n`);
		return [];
	}
};
