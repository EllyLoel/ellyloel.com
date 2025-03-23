import { JSDOM } from "jsdom";
import metadata from "../../_data/metadata.json" with { type: "json" };

// Global constants
const DOMAIN = metadata.domain;

// Caches to improve performance
const htmlLinkCache = {};
const backlinksCache = new Map();

// Add a cache key to track if we need to rebuild
let lastProcessedCollection = null;

/**
 * Extracts all valid links from an HTML string
 * @param {string} htmlContent - Raw HTML content to parse
 * @returns {Set<string>} Set of normalized URLs or pathnames
 */
function extractLinksFromHtml(htmlContent) {
	// Return cached results if available
	if (htmlLinkCache[htmlContent]) {
		return htmlLinkCache[htmlContent];
	}

	// Parse HTML and extract links
	const dom = new JSDOM(htmlContent);
	const document = dom.window.document;
	const linkElements = Array.from(document.querySelectorAll("a[href]"));

	const links = new Set(
		linkElements
			.map((link) => {
				const href = link.getAttribute("href");

				// Skip anchor links
				if (href.startsWith("#")) return;

				// Normalize URLs
				const url = new URL(href, `https://${DOMAIN}`);
				url.hash = ""; // Remove hash fragments

				// For internal links only return the pathname
				return url.hostname === DOMAIN
					? url.pathname
					: url.toString();
			})
			.filter(Boolean) // Remove undefined values
	);

	// Cache results
	htmlLinkCache[htmlContent] = links;
	return links;
}

/**
 * Builds an index of backlinks for the entire collection
 * @param {Array} collection - Collection of pages
 */
function buildBacklinksCache(collection) {
	backlinksCache.clear();

	for (const page of collection) {
		const links = extractLinksFromHtml(page.content);

		for (const link of links) {
			if (!backlinksCache.has(link)) {
				backlinksCache.set(link, []);
			}
			backlinksCache.get(link).push(page);
		}
	}

	lastProcessedCollection = collection;
}

/**
 * Returns all items that link to a specific target
 * @param {Array} collection - Collection of content items
 * @param {string} target - Target URL or pathname to find backlinks for
 * @returns {Array} Array of items that link to the target
 */
export default async function getBacklinks(collection, target) {
	// Only rebuild the cache if we have a new collection
	if (lastProcessedCollection !== collection) {
		buildBacklinksCache(collection);
	}
	return backlinksCache.get(target) || [];
}
