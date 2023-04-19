const removeMd = require("remove-markdown");

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: (file) => {
			const firstTwoSentences = file.content
				.split(/\.\s/gm)
				.slice(0, 2)
				.join(". ");
			const first160Characters = file.content.split("").slice(0, 160).join("");
			const contentBeforeHTML = file.content.split("<").slice(0, 1).join("");
			let exceprt =
				file.content.includes("<") && contentBeforeHTML.length < 160
					? contentBeforeHTML
					: firstTwoSentences.length > 160
					? first160Characters
					: firstTwoSentences;
			exceprt = removeMd(exceprt, { gfm: true })
				.replace(/\[\[|\]\]/gm, "")
				.replace(/(\^\[)[^\[\]]+(\])/gm, (match) =>
					match === "^[" ? " (" : ")"
				)
				.replace(/(\()[^\(\)+]+(\)){1}/gm, "")
				.replace(/(\[])[^\[\]+]+(\]){1}/gm, "")
				.replace(
					/https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/gm,
					""
				)
				.replace(/\[|\]/gm, "")
				.replace(/:::.+:?:?:?/gm, "")
				.replace(/{%.+%?}?/gm, "")
				.split(/\.\s/gm)
				.slice(0, -1)
				.join(" ");
			file.excerpt = exceprt;
		},
	});
};
