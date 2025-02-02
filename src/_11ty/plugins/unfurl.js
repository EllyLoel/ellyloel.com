import pluginUnfurl from "eleventy-plugin-unfurl";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.addPlugin(pluginUnfurl, {
		duration: "4w",
		template: async (props) => {
			return props
				? `<article class="unfurl"><p>${
						props?.author
							? `<small class="unfurl-meta"><span class="unfurl-publisher">${props.author}</span></small>`
							: ``
					}${
						props?.url || props?.title
							? `<span class="h4 unfurl-heading${
									!props?.author ? ` unfurl-meta` : ``
								}"><a class="unfurl-link" href="${props?.url}">${
									props?.title
								}</a></span>`
							: ``
					}${
						props?.description
							? `<span class="unfurl-description">${props.description}</span>`
							: ``
					}${
						props?.image?.url
							? `<img alt="" class="[ image unfurl-image ]" decoding="async" loading="lazy" eleventy:ignore src="https://res.cloudinary.com/ellyloel/image/fetch/f_auto/q_auto/ar_2.0,c_auto,g_auto/${props.image.url}" width="${props.image.width}" height="${props.image.height}">`
							: ``
					}</p></article>`
				: ``;
		},
	});
}
