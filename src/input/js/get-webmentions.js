// External imports
import DOMPurify from "dompurify";
// Internal imports
import renderWebmentions from "./webmentions";

const API_ORIGIN = "https://webmention.io/api/mentions.jf2";
const BASE_URL = "https://www.ellyloel.com";

const webmentionsElement = document.getElementById("webmentions");

const fetchMentions = async () => {
	const target = BASE_URL + window.location.pathname;
	const url = `${API_ORIGIN}?per-page=1000&target=${target}`;

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
			ALLOWED_TAGS: [
				"a",
				"abbr",
				"acronym",
				"b",
				"blockquote",
				"cite",
				"code",
				"del",
				"em",
				"i",
				"ins",
				"img",
				"q",
				"s",
				"strike",
				"strong",
			],
			USE_PROFILES: { html: true },
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
	if (webmentions.length) renderWebmentions(webmentions);
})();
