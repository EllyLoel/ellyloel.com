const EleventyFetch = require("@11ty/eleventy-fetch");
const fs = require("node:fs/promises");
const path = require("node:path");
require("dotenv").config();

module.exports = async () => {
	const publicCollectionId = "33237518";
	const raindropApiUrl = `https://api.raindrop.io/rest/v1/raindrops/${publicCollectionId}`;
	const backupFilePath = path.normalize(
		`${__dirname}/../../bookmarks/backup.json`
	);

	try {
		const backupData = JSON.parse(
			await fs.readFile(backupFilePath, { encoding: "utf8" })
		);
		const data = await EleventyFetch(raindropApiUrl, {
			directory: "bookmarks",
			duration: "0s",
			fetchOptions: {
				headers: {
					Authorization: `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`,
				},
			},
			type: "json",
		});

		const backupItems = backupData.items.map((item) => {
			if (item.tags) {
				item.tags = item.tags.split(", ");
			} else {
				item.tags = [];
			}
			return item;
		});
		const newItems = data.items.map((item) => {
			item.id = item._id;
			delete item._id;
			return item;
		});
		let items = newItems.concat(backupItems);

		items = items.filter(
			(itemA, index, self) =>
				index === self.findIndex((itemB) => itemB.id === itemA.id)
		);

		let response = [];

		if (items.length) {
			items.forEach((item) => {
				response.push({
					created: item.created,
					excerpt: item.excerpt,
					highlights: item.highlights,
					image: item.cover,
					link: item?.link || item?.url,
					modified: item?.lastUpdate,
					note: item.note,
					tags: ["Bookmarks", ...item.tags],
					title: item.title,
					type: item?.type || "",
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
