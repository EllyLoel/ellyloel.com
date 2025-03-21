import { JSDOM } from "jsdom";
import metadata from "../../_data/metadata.json" with { type: "json" };

const domain = metadata.domain;
const cache = {};

/**
 * Extract links from html, not including hash parts
 */
function getLinks(html) {
	if (cache[html]) {
		return cache[html];
	}

	const dom = new JSDOM(html);
	const document = dom.window.document;

	const result = new Set([...document.querySelectorAll("a[href]")]
		.map(x => {
			let href = x.getAttribute("href");

			// Normalise internal links
			const url = new URL(href, `https://${domain}`);
			if (url.hostname == domain) {
				return url.pathname;
			}

			url.hash = "";
			return url.toString();
		}));
	cache[html] = result;
	return result;
}

export default async function(collection, target) {
	return collection.filter((item) => getLinks(item.content).has(target));
}
