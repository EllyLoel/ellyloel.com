#!/usr/bin/env node
/* eslint-disable no-console */

import "dotenv/config";
import { existsSync, mkdirSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import EleventyFetch from "@11ty/eleventy-fetch";
import { normalize } from "node:path";
import process from "node:process";
import slugify from "@sindresorhus/slugify";
import yaml from "js-yaml";

const outputDir = normalize(`${import.meta.dirname}/../src/input/content/garden/`);

const markdownContent = (item) => {
	/* eslint-disable sort-keys */
	const frontmatter = {
		layout: 'bookmark',
		title: item.title,
		tags: item.tags,
		date: item.created,
		created: item.created,
		modified: item.modified,
		link: item.link,
		id: item.id,
	};
	/* eslint-enable sort-keys */

	if (item.note) frontmatter.note = item.note;

	if (item.excerpt) frontmatter.excerpt = item.excerpt;

	if (item.image) frontmatter.image = item.image;

	if (item.highlights?.length > 0) frontmatter.highlights = item.highlights;

	const yamlString = yaml.dump(frontmatter, {
			lineWidth: -1,
			schema: yaml.JSON_SCHEMA,
		});
	return `---\n${yamlString}---`;
};

async function writeBookmarkToMarkdown(item, index) {
	const filename = `${outputDir}${slugify(item.title)}.md`;
	let existingContent = "";
	if (existsSync(filename)) {
		existingContent = await readFile(filename, { encoding: "utf8" });
	}

	const content = markdownContent(item);

	let finalContent = content;

	if (existingContent) {
		const endOfFrontmatter = existingContent.indexOf("---", 3);
		if (endOfFrontmatter !== -1) {
			const existingContentBody = existingContent.substring(endOfFrontmatter + 3);
			finalContent = content + existingContentBody;
		}
		console.log(`${index+1} Updating bookmark: ${filename}`);
	} else {
		console.log(`${index+1} Creating bookmark: ${filename}`);
	}

	await writeFile(filename, finalContent, { encoding: "utf8" });
}

const fetchBookmarks = async (fetchAll) => {
	const collectionId = "33237518";
	const perPage = 50;
	let allItems = [];
	let page = 0;
	let hasMoreItems = true;

	try {
		while (hasMoreItems) {
			const raindropApiUrl = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}?perpage=${perPage}&page=${page}`;
			
			console.log(`Fetching page ${page+1} of bookmarks...`);
			
			const data = await EleventyFetch(raindropApiUrl, {
				directory: ".cache",
				duration: process.env.ELEVENTY_ENV === "production" ? "0s" : "1d",
				fetchOptions: {
					headers: {
						Authorization: `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`,
					},
				},
				type: "json",
			});

			const items = data.items.map((item) => {
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

			allItems = [...allItems, ...items];
			
			// If we're not fetching all or there are no more items, break the loop
			if (!fetchAll || data.items.length < perPage) {
				hasMoreItems = false;
			} else {
				page++;
			}
		}

		// Remove duplicates
		allItems = allItems.filter(
			(itemA, index, self) => index === self.findIndex((itemB) => itemB.id === itemA.id)
		);

		if (allItems.length) {
			// Ensure the output directory exists
			if (!existsSync(outputDir)) {
				mkdirSync(outputDir, { recursive: true });
			}

			console.log(`Processing ${allItems.length} bookmarks...`);

			for (const [index, item] of allItems.entries()) {
				const bookmark = {
					created: item.created,
					excerpt: item.excerpt,
					highlights: item.highlights,
					id: item.id,
					image: item.cover,
					link: item?.link || item?.url,
					modified: item?.lastUpdate,
					note: item.note,
					tags: ["Bookmarks", ...item.tags],
					title: item.title,
				};

				await writeBookmarkToMarkdown(bookmark, index);
			}
		}
	} catch (error) {
		console.error("Error fetching bookmarks:", error);
	}
};

await fetchBookmarks(process.argv?.[2] === "-a" || process.argv?.[2] === "--all");
