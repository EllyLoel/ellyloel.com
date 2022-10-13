require("dotenv").config();
const path = require("path");
const fs = require("node:fs/promises");
const removeMd = require("remove-markdown");
const slinkity = require("slinkity");
const { DateTime } = require("luxon");

const EleventyPluginNavigation = require("@11ty/eleventy-navigation");
const EleventyPluginRss = require("@11ty/eleventy-plugin-rss");
const EleventyPluginSyntaxhighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
// const EleventyPluginInclusiveLang = require("@11ty/eleventy-plugin-inclusive-language");
const EleventyPluginImage = require("@11ty/eleventy-img");
const EleventyPluginNestingToc = require("eleventy-plugin-nesting-toc");
// const EleventyPluginBrokenLinks = require("eleventy-plugin-broken-links");
const EleventyPluginFaviconsPlugin = require("eleventy-plugin-gen-favicons");
const EleventyPluginUnfurl = require("eleventy-plugin-unfurl");
const EleventyPluginWebmentions = require("eleventy-plugin-webmentions");

const filters = require("./utils/filters.js");
const markdown = require("./utils/markdown.js");
const transforms = require("./utils/transforms.js");

module.exports = (eleventyConfig) => {
  // Plugins
  eleventyConfig.addPlugin(EleventyPluginNavigation);
  eleventyConfig.addPlugin(EleventyPluginRss);
  eleventyConfig.addPlugin(EleventyPluginSyntaxhighlight);
  // eleventyConfig.addPlugin(EleventyPluginInclusiveLang);
  eleventyConfig.addPlugin(slinkity.plugin, slinkity.defineConfig({}));
  eleventyConfig.addPlugin(EleventyPluginNestingToc, {
    wrapper: "nav",
    wrapperClass: "[ toc ][ recursive-flow ]",
    tags: ["h2", "h3", "h4", "h5", "h6"],
  });
  // eleventyConfig.addPlugin(EleventyPluginBrokenLinks, {
  //   loggingLevel: 1,
  // });
  eleventyConfig.addPlugin(EleventyPluginFaviconsPlugin, {});
  eleventyConfig.addPlugin(EleventyPluginUnfurl, {
    template: async (props) => {
      const imageAttributes = {
        class: "[ image unfurl__image ]",
        alt: "",
        sizes: "(max-width: 768px) 100vw, 768px",
        loading: "lazy",
        decoding: "async",
      };

      const metadata = props?.image?.url
        ? await EleventyPluginImage(props?.image?.url, {
            widths: [300, 600, 1000],
            formats: ["avif", "webp", "jpeg"],
            outputDir: path.join("_site", "img"),
          })
        : {};

      const image = props?.image?.url
        ? EleventyPluginImage.generateHTML(metadata, imageAttributes, {
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
  eleventyConfig.addPlugin(EleventyPluginWebmentions, {
    domain: "ellyloel.com",
    token: process.env.WEBMENTION_IO_API_KEY,
  });

  const markdownLibrary = markdown(eleventyConfig);
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Excerpts
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: (file, options) => {
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
      const image = feedItem?.image
        ? `<div slot="image">${EleventyPluginImage.generateHTML(
            await EleventyPluginImage(feedItem.image, {
              widths: [300, 600, 1000],
              formats: ["avif", "webp", "jpeg"],
              outputDir: path.join("_site", "img"),
            }),
            {
              class: "[ image ]",
              alt: "",
              sizes: "450px",
              loading: "lazy",
              decoding: "async",
            },
            {
              whiteSpace: "inline",
            }
          )}</div>`
        : ``;

      const date = feedItem?.created ? feedItem.created : feedItem?.modified;

      const isoDate = date
        ? DateTime.fromJSDate(date, { zone: "utc" }).toISO({
            includeOffset: false,
            suppressMilliseconds: true,
          })
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
    async function (src, alt, sizes = "(max-width: 768px) 100vw, 768px") {
      if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
      }

      let metadata = await EleventyPluginImage(src, {
        widths: [300, 600, 1000],
        formats: ["avif", "webp", "jpeg"],
        outputDir: path.join("_site", "img"),
      });

      let imageAttributes = {
        class: "[ image ]",
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };

      return EleventyPluginImage.generateHTML(metadata, imageAttributes, {
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
  eleventyConfig.addShortcode("sscg", ({ overlayText, overlayTag }) => {
    const values = {
      cloudName: "ellyloel",
      publicId: "og-image_b8pgrc.avif",
      overlayText,
      overlayTag,
      fontFace: "Work%20Sans",
      fontWeight: "700",
      fontColour: "0f0f0f",
      fontSize: 75,
      fontLineSpacing: -10,
      position: "north_east",
      x: 100,
      y: 100,
      tagx: 100,
      tagy: 500,
      width: 800,
    };
    const sanitiseText = escape(encodeURIComponent(values.overlayText));
    const sanitiseTag = escape(encodeURIComponent(values.overlayTag));
    const url = `https://res.cloudinary.com/${
      values.cloudName
    }/image/upload/w_1200,h_669,c_fit,q_auto,f_auto/w_${
      values.width
    },c_fit,co_rgb:${values.fontColour},g_${values.position},x_${values.x},y_${
      values.y
    },l_text:${values.fontFace}_${values.fontSize}_line_spacing_${
      values.fontLineSpacing
    }${values.fontWeight ? `_${values.fontWeight}` : ``}:${sanitiseText}/w_${
      values.width
    },c_fit,co_rgb:${values.fontColour},g_${values.position},x_${
      values.tagx
    },y_${values.tagy},l_text:${values.fontFace}_48:${sanitiseTag}/${
      values.publicId
    }`;
    return url;
  });
  eleventyConfig.addAsyncShortcode("svg", async (path, alt = "") => {
    try {
      const data = await fs.readFile(path, { encoding: "utf8" });
      if (alt) {
        return `<figure>${data}<figcaption>${alt}</figcaption></figure>`;
      }
      return `<figure>${data}</figure>`;
    } catch (err) {
      console.error(err);
      return;
    }
  });

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy("public");

  return {
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      includes: "includes",
      layouts: "layouts",
      data: "data",
    },
  };
};
