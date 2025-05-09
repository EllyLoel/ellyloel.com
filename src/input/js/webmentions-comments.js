const renderComments = (comments) => {
	const renderComment = (comment) => {
		const authorWrapperTag = comment.author.url ? "a" : "span";
		const author = `
<${authorWrapperTag} ${
			comment.author.url ? `href="${comment.author.url}"` : ""
		} class="[ author-wrapper ]">
	<strong class="[ author-name ]">${comment.author.name
		.replaceAll("????", "")
		.replaceAll(/:\w*:/g, "")
		.trim()}</strong>
</${authorWrapperTag}>
		`.trim();

		const date = new Date(comment.published || comment["wm-received"]);

		return `
<li class="[ webmention ][ flow ]">
	<div class="[ meta ]">
		${
			comment.author && comment.author.name
				? author
				: `<span class="[ author-wrapper ]">
				<strong class="[ author-name ]">Anonymous</strong>
			</span>`
		}
		<small>
			<a href="${comment.url}">
				<time class="[ dt-published ]" datetime="${date.toISOString()}">${date.toLocaleString("en-AU", { dateStyle: "long", timeStyle: "short" })}</time>
			</a>
		</small>
	</div>
	${
		comment.content
			? comment.content.value
					.replaceAll("????", "")
					.replaceAll(/<a[^>]+><\/a>/gm, "")
			: ""
	}
</li>
		`.trim();
	};

	return `
<details id="webmentions-comments" class="[ details-reset ]">
	<summary class="[ h3 ]"><h3>${comments.length} Comment${
		comments.length > 1 ? "s" : ""
	}</h3></summary>
	<ol class="[ flow ]">
		${comments.map(renderComment).join("")}
	</ol>
</details>
`.trim();
};

export default renderComments;
