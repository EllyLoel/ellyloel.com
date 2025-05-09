const renderNamepile = (mentions, mentionType) => {
	const namepileTitle = `${mentions.length} ${mentionType}${
		mentions.length > 1 ? "s" : ""
	}`;

	const namepileMention = (mention, index) =>
		`${
			index === mentions.length - 1
				? mentions.length > 2
					? " and "
					: mentions.length > 1
						? "and "
						: ""
				: ""
		}<a href="${mention.author.url}">${mention.author.name
			.replaceAll("????", "")
			.replaceAll(/:\w*:/g, "")
			.trim()}</a>${
			mentions.length > 2 && index !== mentions.length - 1 ? ", " : ""
		}${index === mentions.length - 1 ? "." : ""}`;

	return `
<details id="webmentions-${mentionType}s" class="[ namepile ][ details-reset ]">
	<summary class="[ h3 ]"><h3>${namepileTitle}</h3></summary>
	<p>${mentions.map(namepileMention).join("")}</p>
</details>`.trim();
};

export default renderNamepile;
