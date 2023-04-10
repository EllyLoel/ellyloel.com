const EleventyFetch = require("@11ty/eleventy-fetch");
require("dotenv").config();

module.exports = async () => {
	const publicCollectionId = "33237518";
	const raindropApiUrl = `https://api.raindrop.io/rest/v1/raindrops/${publicCollectionId}`;

	try {
		const data = await EleventyFetch(raindropApiUrl, {
			duration: "1d",
			type: "json",
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`,
				},
			},
		});

		const items = data.items;

		let response = [];

		if (items.length) {
			items.forEach((item) => {
				response.push({
					cover: item.cover,
					created: item.created,
					excerpt: item.excerpt,
					lastUpdate: item.lastUpdate,
					link: item.link,
					note: item.note,
					tags: item.tags,
					title: item.title,
					type: item.type,
				});
			});

			const newestItemDate = new Date(
				Math.max(...response.map((item) => new Date(item?.lastUpdate || "")))
			);

			return {
				newestItemDate,
				items: response,
			};
		}
	} catch (error) {
		console.log(`\n${error}\n`);
		return [];
	}
};
