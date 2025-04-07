import renderComments from "./webmentions-comments";
import renderMentions from "./webmentions-mentions";
import renderNamepile from "./webmentions-namepile";

const renderWebmentions = async (webmentions) => {
	const likes = [];
	const reposts = [];
	const comments = [];
	const mentions = [];
	for (const entry of webmentions) {
		switch (entry["wm-property"]) {
			case "like-of":
				likes.push(entry);
				break;
			case "repost-of":
				reposts.push(entry);
				break;
			case "in-reply-to":
				comments.push(entry);
				break;
			case "bookmark-of":
			case "mention-of":
				mentions.push(entry);
				break;
		}
	}

	const webmentionsSummary = document.getElementById("webmentions-summary");
	const webmentionsLikes = document.querySelector("#webmentions-likes, #webmentions-Likes");
	const webmentionsReposts = document.querySelector("#webmentions-reposts, #webmentions-Reposts");
	const webmentionsComments = document.querySelector("#webmentions-comments, #webmentions-Comments");
	const webmentionsMentions = document.querySelector("#webmentions-mentions, #webmentions-Mentions");

	if (webmentions.length) {
		webmentionsSummary.innerHTML = `<h2>${webmentions.length} Webmentions</h2>`;
	}

	if (likes.length) {
		webmentionsLikes.outerHTML = renderNamepile(likes, "Like");
	}

	if (reposts.length) {
		webmentionsReposts.outerHTML = renderNamepile(reposts, "Repost");
	}

	if (comments.length) {
		webmentionsComments.outerHTML = renderComments(comments);
	}

	if (mentions.length) {
		webmentionsMentions.outerHTML = await renderMentions(mentions);
	}
};

export default renderWebmentions;
