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
			case "mention-of":
				mentions.push(entry);
				break;
		}
	}

	const webmentionsSummary = document.getElementById("webmentions-summary");
	const webmentionsLikes = document.getElementById("webmentions-Likes");
	const webmentionsReposts = document.getElementById("webmentions-Reposts");
	const webmentionsComments = document.getElementById("webmentions-comments");
	const webmentionsMentions = document.getElementById("webmentions-mentions");

	if (webmentions.length) {
		webmentionsSummary.innerHTML = `${webmentions.length} Webmentions`;
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
