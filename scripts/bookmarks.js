#!/usr/bin/env node

import "dotenv/config";
import { existsSync, mkdirSync } from 'node:fs';
import { readFile, writeFile } from "node:fs/promises";
import EleventyFetch from "@11ty/eleventy-fetch";
import { normalize } from "node:path";
import slugify from "@sindresorhus/slugify";
import yaml from 'js-yaml';

const outputDir = normalize(`${import.meta.dirname}/../src/input/content/garden/`);

const markdownContent = (item) => {
	/* eslint-disable sort-keys */
	const frontmatter = {
		layout: 'bookmark',
		title: item.title,
		tags: item.tags,
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

	const yamlString = yaml.dump(frontmatter);
	return `---\n${yamlString}---`;
};

async function writeBookmarkToMarkdown(item) {
  const filename = `${outputDir}/${slugify(item.title)}.md`;
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
  }

  await writeFile(filename, finalContent, { encoding: "utf8" });
}

const fetchBookmarks = async () => {
	const collectionId = "33237518";
	const raindropApiUrl = `https://api.raindrop.io/rest/v1/raindrops/${collectionId}`;
	const backupFilePath = normalize(`${import.meta.dirname}/../bookmarks/backup.json`);

	try {
		const backupData = JSON.parse(
			await readFile(backupFilePath, { encoding: "utf8" })
		);
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
			(itemA, index, self) => index === self.findIndex((itemB) => itemB.id === itemA.id)
		);

		if (items.length) {
			// Ensure the output directory exists
			if (!existsSync(outputDir)) {
				mkdirSync(outputDir, { recursive: true });
			}

			for (const item of items) {
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

				await writeBookmarkToMarkdown(bookmark);
			}
		}
	} catch (error) {
		console.error("Error fetching bookmarks:", error);
	}
};

await fetchBookmarks();
