// External imports
import DOMPurify from "dompurify";
// Internal imports
import renderWebmentions from "./webmentions";

const API_ORIGIN = "https://webmention.io/api/mentions.jf2";
const DOMAIN = "ellyloel.com";

const webmentionsElement = document.getElementById("webmentions");

const fetchMentions = async () => {
	const path = window.location.pathname.replace(/\/$/, "");
	const url = `${API_ORIGIN}?per-page=1000`
		+ `&target[]=https://${DOMAIN}${path}`
		+ `&target[]=https://www.${DOMAIN}${path}`
		+ `&target[]=https://${DOMAIN}/garden${path}`
		+ `&target[]=https://www.${DOMAIN}/garden${path}`
		+ `&target[]=https://${DOMAIN}/blog${path}`
		+ `&target[]=https://www.${DOMAIN}/blog${path}`
		+ `&target[]=https://${DOMAIN}/bookmarks${path}`
		+ `&target[]=https://www.${DOMAIN}/bookmarks${path}`
		+ `&target[]=https://${DOMAIN}/projects${path}`
		+ `&target[]=https://www.${DOMAIN}/projects${path}`
		+ `&target[]=https://${DOMAIN}/til${path}`
		+ `&target[]=https://www.${DOMAIN}/til${path}`
		+ `&target[]=https://${DOMAIN}${path}/`
		+ `&target[]=https://www.${DOMAIN}${path}/`
		+ `&target[]=https://${DOMAIN}/garden${path}/`
		+ `&target[]=https://www.${DOMAIN}/garden${path}/`
		+ `&target[]=https://${DOMAIN}/blog${path}/`
		+ `&target[]=https://www.${DOMAIN}/blog${path}/`
		+ `&target[]=https://${DOMAIN}/bookmarks${path}/`
		+ `&target[]=https://www.${DOMAIN}/bookmarks${path}/`
		+ `&target[]=https://${DOMAIN}/projects${path}/`
		+ `&target[]=https://www.${DOMAIN}/projects${path}/`
		+ `&target[]=https://${DOMAIN}/til${path}/`
		+ `&target[]=https://www.${DOMAIN}/til${path}/`;

	try {
		const response = await fetch(url);
		const feed = await response.json();
		return feed.children || [];
	} catch (error) {
		return console.error(error);
	}
};

const processMentions = (webmentions) => {
	return webmentions
		.sort(
			(a, b) =>
				new Date(a.published || a["wm-received"]) -
				new Date(b.published || b["wm-received"])
		)
		.map(cleanMentions);
};

const cleanMentions = (entry) => {
	if (entry.content) {
		const { html, text } = entry.content;
		const config = {
			ALLOWED_ATTR: ["class", "href", "title", "cite", "datetime"],
			ALLOWED_TAGS: ["a", "abbr", "acronym", "b", "blockquote", "cite", "code", "del", "em", "i", "ins", "img", "q", "s", "strike", "strong"],
		};

		if (html || text) {
			entry.content.value = DOMPurify.sanitize(html || text, config);
		}
	}

	return entry;
};

// initialize webmentions
(async function () {
	// if there's no root node on the page, abort
	if (!webmentionsElement) return false;

	const data = await fetchMentions();
	const webmentions = processMentions(data);

	if (!webmentions.length) return false;

	const webmentionsSummaryElement = document.querySelector("#webmentions-summary");
	const oldWebmentionsCount = parseInt(webmentionsSummaryElement.textContent.trim().split(" ")[0]);

	if (oldWebmentionsCount >= webmentions.length) return false;

	renderWebmentions(webmentions);
})();
