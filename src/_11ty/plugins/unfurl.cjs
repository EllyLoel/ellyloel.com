const path = require("path");
const pluginImage = require("@11ty/eleventy-img");
const pluginUnfurl = require("eleventy-plugin-unfurl");

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
	eleventyConfig.addPlugin(pluginUnfurl, {
		duration: "4w",
		template: async (props) => {
			const imageAttributes = {
				alt: "",
				class: "[ image unfurl__image ]",
				decoding: "async",
				loading: "lazy",
				sizes: "(max-width: 768px) 100vw, 768px",
			};

			const metadata = props?.image?.url
				? await pluginImage(props?.image?.url, {
						cacheOptions: {
							duration: "4w",
						},
						formats: ["avif", "webp", "jpeg"],
						outputDir: path.join("_site", "img"),
						widths: [300, 600, 1000],
				  })
				: {};

			const image = props?.image?.url
				? pluginImage.generateHTML(metadata, imageAttributes, {
						whitespaceMode: "inline",
				  })
				: "";

			return props
				? `<article class="unfurl">${
						props?.author
							? `<small class="unfurl__meta"><span class="unfurl__publisher">${props.author}</span></small>`
							: ``
				  }${
						props?.url || props?.title
							? `<span class="h4 unfurl__heading${
									!props?.author ? ` unfurl__meta` : ``
							  }"><a class="unfurl__link" href="${props?.url}">${
									props?.title
							  }</a></span>`
							: ``
				  }${
						props?.description
							? `<p class="unfurl__description">${props.description}</p>`
							: ``
				  }${image}</article>`
				: ``;
		},
	});
};
