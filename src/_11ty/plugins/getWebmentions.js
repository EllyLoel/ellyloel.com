import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import fs from "node:fs/promises";

const defaults = {
	cacheTime: 3600,
	htmlContent: true,
	sortFunction: (a, b) => (
		new Date(a.published || a["wm-received"]) -
		new Date(b.published || b["wm-received"])
	),
};

function Webmentions({
	domain,
	token,
	cacheDirectory,
	cacheTime = defaults.cacheTime,
	htmlContent = defaults.htmlContent,
	sanitizeOptions,
	sortFunction = defaults.sortFunction,
}) {
	if (!Array.isArray(domain)) {
		domain = [domain];
	}

	function getUrl(index) {
		return `https://webmention.io/api/mentions.jf2?domain=${domain[index]}&token=${token}`;
	}

	async function fetchWebmentions(index, since, page = 0) {
		const PER_PAGE = 1000;

		const params = `&per-page=${PER_PAGE}&page=${page}${
			since ? `&since=${since}` : ""
		}`;
		const url = getUrl(index) + params;
		console.log(`Getting ${url}`);
		const response = await fetch(url);

		if (response.ok) {
			const feed = await response.json();
			if (feed.children.length === PER_PAGE) {
				const olderMentions = await fetchWebmentions(index, since, page + 1);

				return [...feed.children, ...olderMentions];
			}
			return feed.children;
		}

		return [];
	}

	async function writeToCache(data) {
		const filePath = `${cacheDirectory}/webmentions.json`;
		const fileContent = JSON.stringify(data, null, 2);

		// create cache folder if it doesn't exist already
		if (!(await fs.stat(cacheDirectory).catch(() => false))) {
			await fs.mkdir(cacheDirectory);
		}
		// write data to cache json file
		await fs.writeFile(filePath, fileContent);
	}

	async function readFromCache() {
		const filePath = `${cacheDirectory}/webmentions.json`;

		if (await fs.stat(filePath).catch(() => false)) {
			const cacheFile = await fs.readFile(filePath);
			return JSON.parse(cacheFile);
		}

		return {
			children: [],
			lastFetched: null,
		};
	}

	async function clean(entry) {
		if (entry.content) {
			if (entry.content.html && htmlContent) {
				if (!entry.content.html.match(/^<\/?[a-z][\s\S]*>/)) {
					const paragraphs = entry.content.html
						.split("\n")
						.filter((p) => p.length > 0);

					entry.content.html = `<p>${paragraphs.join("</p><p>")}</p>`;
				}

				const window = new JSDOM("").window;
				const purify = DOMPurify(window);
				const sanitizedContent = purify.sanitize(
					entry.content.html,
					sanitizeOptions
				);

				entry.content.value = sanitizedContent;
			} else {
				entry.content.value = entry.content.text;

				if (htmlContent) {
					const paragraphs = entry.content.value
						.split("\n")
						.filter((p) => p.length > 0);

					entry.content.value = `<p>${paragraphs.join("</p><p>")}</p>`;
				}
			}
		}

		return entry;
	}

	async function get() {
		const webmentions = await readFromCache();

		if (
			!webmentions.lastFetched ||
			Date.now() - new Date(webmentions.lastFetched) >= cacheTime * 1000
		) {
			const feed = await Promise.all(
				domain.map((domain, index) =>
					fetchWebmentions(index, webmentions.lastFetched)
				)
			).then((feeds) => feeds.flat());

			if (feed.length > 0) {
				webmentions.lastFetched = new Date().toISOString();
				webmentions.children = [...feed, ...webmentions.children];

				await writeToCache(webmentions);
			}
		}

		webmentions.children = await Promise.all(
			webmentions.children.sort(sortFunction).map(clean)
		);

		return webmentions;
	}

	return { get };
}

export default Webmentions;
