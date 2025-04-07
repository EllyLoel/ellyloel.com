import EleventyFetch from "@11ty/eleventy-fetch";

// r is short for renderIf
const r = (condition, content) => {
	return condition ? content : ``;
};

const template = async (data) => {
	return r(data,
		`<article class="[ unfurl ]"><p>${r(data?.author,
			`<small class="[ unfurl-meta ]"><span class="[ unfurl-publisher ]">${data.author}</span></small>`
		)}${r(data?.url || data?.title,
			`<span class="[ unfurl-heading ${r(!data?.author,`unfurl-meta `)}][ h4 ]"><a class="[ unfurl-link ]" href="${data?.url}">${data?.title}</a></span>`)
		}${r(data?.description,
			`<span class="[ unfurl-description ]">${data.description}</span>`
		)}${r(data?.image?.url,
			`<img alt="" class="[ image unfurl-image ]" decoding="async" loading="lazy" eleventy:ignore src="https://res.cloudinary.com/ellyloel/image/fetch/f_auto/q_auto/ar_2.0,c_auto,g_auto/${data.image.url}" width="${data.image.width}" height="${data.image.height}">`
		)}</p></article>`
	);
};

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default (eleventyConfig) => {
	eleventyConfig.addAsyncShortcode("unfurl", async (link) => {
		try {
			const metadata = await EleventyFetch(
				`https://api.microlink.io/?url=${link}`,
				{
					duration: "4w",
					type: "json",
				}
			);

			return await template(metadata.data);
		} catch (error) {
			// console.error(error); // eslint-disable-line no-console
			return link;
		}
	});
}
