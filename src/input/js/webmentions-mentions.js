const renderMentions = async (mentions) => {
	const renderMention = async (mention) => {
		let meta;
		try {
			const response = await fetch(
				`https://api.microlink.io/?url=${encodeURIComponent(
					mention.url
				)}&filter=title,lang,publisher,author`
			);
			const { data } = await response.json();
			meta = data;
		} catch (error) {
			console.error(error);
		}

		if (!mention.author.name) {
			mention.author.name = meta?.author || meta?.publisher;
		}

		if (!mention.author.url) {
			mention.author.url = `https://${new URL(mention.url).hostname}`;
		}

		const author = `
<a href="${mention.author.url}" class="[ author-wrapper ]"  ${
			meta.lang !== "en" ? `lang="${meta.lang}"` : ""
		}>
	<strong class="[ author-name ]">${
		mention.author.name
			? mention.author.name
					.replaceAll("????", "")
					.replaceAll(/:\w*:/g, "")
					.trim()
			: "Anonymous"
	}</strong>
</a>
		`.trim();

		const date = new Date(mention.published || mention["wm-received"]);

		return `
<li class="[ webmention ][ flow ]">
	<div class="[ meta ]">
		${author}
		<small>
			<time class="[ dt-published ]" datetime="${date.toISOString()}">${date.toLocaleString("en-AU", { dateStyle: "long", timeStyle: "short" })}</time>
		</small>
	</div>
	<p ${meta.lang !== "en" ? `lang="${meta.lang}"` : ""}><a href="${
			mention.url
		}">${meta?.title || mention.url}</a></p>
</li>
		`.trim();
	};

	const mentionsMarkup = async () => {
		let markup = "";
		for (const mention of mentions) {
			markup += await renderMention(mention);
		}
		return markup;
	};

	return `
<details id="webmentions-mentions" class="[ details-reset ]">
	<summary class="[ h3 ]"><h3>${mentions.length} Mention${
		mentions.length > 1 ? "s" : ""
	}</h3></summary>
	<ol class="[ flow ]">
		${await mentionsMarkup()}
	</ol>
</details>
`.trim();
};

export default renderMentions;
