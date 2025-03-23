import { JSDOM } from "jsdom";
import metadata from "../../../_data/metadata.json" with { type: "json" };
import { group } from "d3";

// Global constants
const DOMAIN = metadata.domain;
const EXCLUDE = [
	"/microposts/",
	"/guestbook/",
];

// Caches to improve performance
const htmlLinkCache = {};

/**
 * Extracts all links with their text content from HTML
 * @param {string} htmlContent - Raw HTML content to parse
 * @returns {Set<{name: string, url: string}>} Set of link objects
 */
function extractLinksFromHtml(htmlContent) {
	// Return cached results if available
	if (htmlLinkCache[htmlContent]) {
		return htmlLinkCache[htmlContent];
	}

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

				// For internal links only return the pathname for the url
				return {
					name: link.textContent.trim(),
					url: url.hostname === DOMAIN || `www.${url.hostname}` === DOMAIN
						? url.pathname
						: url.toString(),
				}
			})
			.filter(Boolean) // Remove undefined values
		);

	// Cache results
	htmlLinkCache[htmlContent] = links;
	return links;
}

/**
 * Configuration for the 11ty template
 * @returns {Object} Template configuration data
 */
export function data() {
	return {
		eleventyExcludeFromCollections: true,
		permalink: "api/graph.json",
	}
}

/**
 * Renders a JSON file containing a graph of all internal and external
 * links found in all pages
 * @param {Object} data - 11ty data object
 * @returns {string} JSON string of the link graph
 */
export async function render(data) {
	const linkGraph = {
		links: [
			{
				source: "/chronological/",
				target: "/now/",
			},
			{
				source: "/chronological/",
				target: "/log/",
			},
			{
				source: "/chronological/",
				target: "/weeks/",
			},
			{
				source: "/chronological/",
				target: "/next/",
			},
			{
				source: "/chronological/",
				target: "/someday/",
			},
			{
				source: "/garden/",
				target: "/library/",
			},
			{
				source: "/garden/",
				target: "/antilibrary/",
			},
			{
				source: "/garden/",
				target: "/search/",
			},
		],
		nodes: [],
	};

	// Search all pages for links
	for (const page of data.collections.all) {
		if (EXCLUDE.includes(page.url) || page.url.includes("/tags/")) continue;

		const links = extractLinksFromHtml(page.content);

		// Add node for this page if one doesn't already exist
		if (!linkGraph.nodes.some((node) => node.id === page.url)) {
			linkGraph.nodes.push({
				group: page.data.tags?.[1] || page.data.tags?.[0] || "Tags",
				id: page.url,
				name: page.data.title,
				links: Array.from(links),
			});
		} else {
			// If the node already exists add the group because it wouldn't exist
			const node = linkGraph.nodes.find((node) => node.id === page.url);
			node.group = page.data.tags?.[1] || page.data.tags?.[0] || "Tags";
			Array.isArray(node.links) ? node.links.concat(Array.from(links)) : node.links = Array.from(links);
		}

		for (const link of links) {
			if (EXCLUDE.includes(link.url) || link.url.includes("/tags/")) continue;

			const isExternal = link.url.startsWith("http");

			// Add target node if it doesn't exist
			if (!linkGraph.nodes.some((node) => node.id === link.url)) {
				let otherLinks;
				if (!isExternal) {
					const content = data.collections.all.find((page) => page.url === link.url)?.content;
					otherLinks = content ? extractLinksFromHtml(content) : undefined;
				}
				linkGraph.nodes.push({
					group: isExternal ? "External" : (link.url.startsWith("/tags/") && link.url !== "/tags/") ? "Tags" : undefined,
					id: link.url,
					name: isExternal ? link.name : data.collections.all.find((page) => page.url === link.url)?.data.title || link.name,
					links: otherLinks,
				});
			}

			for (const node of linkGraph.nodes) {
				if (node.id === link.url) {
					if (node.backlinks) {
						node.backlinks.push({
							name: page.data.title,
							url: page.url,
						});
					} else {
						node.backlinks = [{
							name: page.data.title,
							url: page.url,
						}];
					}
				}
			}

			// Add link relationship
			linkGraph.links.push({
				source: page.url,
				target: link.url,
			});
		}
	}

	return JSON.stringify(linkGraph);
}
