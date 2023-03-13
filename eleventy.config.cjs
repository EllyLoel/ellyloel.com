/* eslint-disable no-useless-escape */
require("dotenv").config();
const path = require("path");
const fsp = require("node:fs/promises");
const removeMd = require("remove-markdown");
const slinkity = require("slinkity");
const { DateTime } = require("luxon");

const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxhighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginImage = require("@11ty/eleventy-img");
const pluginNestingToc = require("eleventy-plugin-nesting-toc");
const pluginFaviconsPlugin = require("eleventy-plugin-gen-favicons");
const pluginUnfurl = require("eleventy-plugin-unfurl");
const pluginWebmentions = require("eleventy-plugin-webmentions");
const pluginFetch = require("@11ty/eleventy-fetch");

const filters = require("./utils/filters.cjs");
const markdown = require("./utils/markdown.cjs");
const transforms = require("./utils/transforms.cjs");

module.exports = (eleventyConfig) => {
	// Plugins
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxhighlight);
	eleventyConfig.addPlugin(slinkity.plugin, slinkity.defineConfig({}));
	eleventyConfig.addPlugin(pluginNestingToc, {
		tags: ["h2", "h3", "h4", "h5", "h6"],
		wrapper: "nav",
		wrapperClass: "[ toc ][ recursive-flow ]",
	});
	eleventyConfig.addPlugin(pluginFaviconsPlugin, {});
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
							? `<h4 class="unfurl__heading${
									!props?.author ? ` unfurl__meta` : ``
							  }"><a class="unfurl__link" href="${props?.url}">${
									props?.title
							  }</a></h4>`
							: ``
				  }${
						props?.description
							? `<p class="unfurl__description">${props.description}</p>`
							: ``
				  }${image}</article>`
				: ``;
		},
	});
	eleventyConfig.addPlugin(pluginWebmentions, {
		domain: "www.ellyloel.com",
		token: process.env.WEBMENTION_IO_API_KEY,
	});

	const markdownLibrary = markdown(eleventyConfig);
	eleventyConfig.setLibrary("md", markdownLibrary);

	// Excerpts
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

	// Collections
	const collections = ["blog", "garden", "bookmarks", "projects", "til"];
	const globs = [];
	for (const collectionName of collections) {
		const glob = `./src/${collectionName}/*.md`;
		eleventyConfig.addCollection(collectionName, (collection) =>
			collection.getFilteredByGlob(glob)
		);
		globs.push(glob);
	}
	eleventyConfig.addCollection("allPostTypes", (collection) =>
		collection.getFilteredByGlob(globs)
	);

	// Filters
	Object.keys(filters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filters[filterName]);
	});

	// Transforms
	Object.keys(transforms).forEach((transformName) => {
		eleventyConfig.addTransform(transformName, transforms[transformName]);
	});

	// Shortcodes
	eleventyConfig.addNunjucksShortcode("year", function () {
		return `${new Date().getFullYear()}`;
	});
	eleventyConfig.addPairedNunjucksShortcode(
		"feedBlock",
		function (content, feed) {
			return `
        <section class="[ ${feed.title
					.replace(/\s/gm, "-")
					.toLowerCase()} ] [ feed-block flow ]">
          <h2>
            ${
							feed?.url ? `<a href="${feed.url}">${feed.title}</a>` : feed.title
						}
          </h2>
          <ul class="[ feed ]">
            ${content}
          </ul>
        </section>
      `;
		}
	);
	eleventyConfig.addNunjucksAsyncShortcode(
		"feedItem",
		async function (feedItem) {
			let image = ``;
			if (
				(feedItem?.image &&
					!feedItem?.image?.includes("v1.opengraph.11ty.dev")) ||
				(feedItem?.image?.includes("v1.opengraph.11ty.dev") &&
					Buffer.byteLength(await pluginFetch(feedItem.image)) !== 0)
			) {
				image = `<div slot="image">${pluginImage.generateHTML(
					await pluginImage(feedItem.image, {
						cacheOptions: {
							duration: "4w",
						},
						formats: ["avif", "webp", "jpeg"],
						outputDir: path.join("_site", "img"),
						widths: [300, 600, 1000],
					}),
					{
						alt: "",
						class: "[ image ]",
						decoding: "async",
						loading: "lazy",
						sizes: "450px",
					},
					{
						whiteSpace: "inline",
					}
				)}</div>`;
			}

			const date = feedItem?.created ? feedItem.created : feedItem?.modified;

			const isoDate = date
				? DateTime.fromJSDate(date, { zone: "utc" }).toISODate()
				: ``;

			const fullDate = date
				? DateTime.fromJSDate(date, { zone: "utc" }).toLocaleString(
						DateTime.DATE_FULL
				  )
				: ``;

			const label = feedItem?.created ? `Created` : `Last modified`;

			const stage = feedItem?.stage
				? `<span>
          <sl-tooltip content="${
						feedItem.stage[0].toUpperCase() + feedItem.stage.substring(1)
					}">
            <sl-icon class="[ icon ]" library="fa" name="fas-${
							feedItem.stage === "seedling" ? "seedling" : ""
						}${feedItem.stage === "budding" ? "spa" : ""}${
						feedItem.stage === "evergreen" ? "tree" : ""
				  }${feedItem.stage === "draft" ? "file-pen" : ""}${
						feedItem.stage === "complete" ? "circle-check" : ""
				  }" label="${
						feedItem.stage[0].toUpperCase() + feedItem.stage.substring(1)
				  }"></sl-icon>
          </sl-tooltip>
        </span>`
				: ``;

			return `<li class="${feedItem?.stage || ""}">
        <sl-card class="[ feed-item-card ]">
          ${image}
          <div ${
						feedItem.excerpt ? `slot="header"` : ``
					} class="[ feed-item-card-title ]">
            <p>
              ${stage}
              <a href="${feedItem.url}">${feedItem.title}</a>
            </p>
          </div>
          ${
						feedItem.excerpt
							? markdownLibrary.render(`${feedItem.excerpt} &#8230;`)
							: ``
					}
          ${
						date || feedItem?.collection
							? `<div slot="footer" class="[ flex align-center ]">
                  ${
										date
											? `
                          <sl-tooltip content="${label} ${fullDate}">
                            <span class="[ flex align-center gap-1ch ]">
                              <sl-icon class="[ icon ]" library="fa" name="far-calendar${
																feedItem?.created ? `` : `-plus`
															}" label="${label}"></sl-icon>
                              <sl-relative-time class="[ date ]" date="${isoDate}" style="line-height: 1;"></sl-relative-time>
                            </span>
                          </sl-tooltip>
                        `
											: ``
									}
                  ${
										feedItem?.collection
											? `<a href="/${feedItem.collectionUrl.split("/")[1]}/">
                      <sl-badge variant="neutral" pill>
                        ${feedItem.collection}
                      </sl-badge>
                    </a>`
											: ``
									}
                </div>`
							: ``
					}
        </sl-card>
      </li>`;
		}
	);
	eleventyConfig.addNunjucksAsyncShortcode(
		"image",
		async function (
			src,
			alt,
			caption,
			noItalics,
			sizes = "(max-width: 768px) 100vw, 768px"
		) {
			if (alt === undefined) {
				// You bet we throw an error on missing alt (alt="" works okay)
				throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
			}

			let metadata = await pluginImage(src, {
				cacheOptions: {
					duration: "4w",
				},
				formats: ["avif", "webp", "jpeg"],
				outputDir: path.join("_site", "img"),
				widths: [300, 600, 1000],
			});

			let imageAttributes = {
				alt,
				class: "[ image ]",
				decoding: "async",
				loading: "lazy",
				sizes,
			};

			if (caption) {
				return `<figure>${pluginImage.generateHTML(metadata, imageAttributes, {
					whiteSpace: "inline",
				})}<figcaption ${
					noItalics ? `class="no-italics"` : ``
				}>${caption}</figcaption></figure>`;
			}

			return pluginImage.generateHTML(metadata, imageAttributes, {
				whiteSpace: "inline",
			});
		}
	);
	eleventyConfig.addNunjucksShortcode("gh_edit", function (page) {
		const inputPath = page.inputPath.replace(/^\.\//, "").replace(/\s/g, "%20");
		return `
      <a href="https://github.com/ellyloel/ellyloel.com/edit/main/${inputPath}">
        <sl-icon library="fa" name="fas-pen-to-square" class="[ icon ]"></sl-icon> Edit this page
      </a>
    `;
	});
	eleventyConfig.addAsyncShortcode("svg", async (path, alt = "") => {
		try {
			const data = await fsp.readFile(path, { encoding: "utf8" });
			if (alt) {
				return `<figure>${data}<figcaption>${alt}</figcaption></figure>`;
			}
			return `<figure>${data}</figure>`;
		} catch (err) {
			console.error(err);
			return;
		}
	});

	process.on("unhandledRejection", (error) => {
		console.error(error); // This prints error with stack included (as for normal errors)
		throw error; // Following best practices re-throw error and let the process exit with error code
	});

	// Copy/pass-through files
	eleventyConfig.addPassthroughCopy("public");

	return {
		dir: {
			data: "data",
			includes: "includes",
			input: "src",
			layouts: "layouts",
			output: "_site",
		},
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		templateFormats: ["njk", "md", "11ty.js"],
	};
};
