import "dotenv/config";
import EleventyFetch from "@11ty/eleventy-fetch";
import { normalize } from "node:path";
import { readFile } from "node:fs/promises";

export default async (collectionId = "33237518") => {
	if (typeof collectionId !== "string") {
		collectionId = "33237518";
	}

	const raindropApiUrl = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}`;
	const backupFilePath = normalize(`${import.meta.dirname}/../../bookmarks/backup.json`);

	try {
		const backupData = JSON.parse(
			await readFile(backupFilePath, { encoding: "utf8" })
		);
		const data = await EleventyFetch(raindropApiUrl, {
			directory: "bookmarks",
			duration: process.env.ELEVENTY_ENV === "production" ? "0s" : "1d",
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
			if (item.highlights.length > 0) {
				for (let i = 0; i < item.highlights.length; i++) {
					if (typeof item.highlights[i] === "string") continue;
					item.highlights[i] = item.highlights[i].text;
				}
			}
			item.id = item._id;
			delete item._id;
			return item;
		});
		let items = newItems.concat(backupItems);

		items = items.filter(
			(itemA, index, self) =>
				index === self.findIndex((itemB) => itemB.id === itemA.id)
		);

		let response = new Set([]);
		let allTags = new Set(["Bookmarks"]);

		if (items.length) {
			for (const item of items) {
				for (const tag of item.tags ?? []) {
					allTags.add(tag);
				}
				
				response.add({
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
			}

			// I think there's an infinite loop or something recursive happening that's causing issues
			const responseArr = Array.from(response);
			const newestItemDate = new Date(
				Math.max(...responseArr.map((item) => new Date(item?.modified || "")))
			);

			return {
				allTags: Array.from(allTags).sort(),
				items: responseArr,
				newestItemDate,
			};
		}
	} catch (error) {
		console.error("Error fetching bookmarks:", error);
		return {
			allTags: [],
			items: [],
			newestItemDate: "",
		};
	}
};
