require("dotenv").config();
const path = require("path");
const removeMd = require("remove-markdown");
const slinkity = require("slinkity");

const EleventyPluginNavigation = require("@11ty/eleventy-navigation");
const EleventyPluginRss = require("@11ty/eleventy-plugin-rss");
const EleventyPluginSyntaxhighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
// const EleventyPluginInclusiveLang = require("@11ty/eleventy-plugin-inclusive-language");
const EleventyPluginImage = require("@11ty/eleventy-img");
const EleventyPluginNestingToc = require("eleventy-plugin-nesting-toc");
const EleventyPluginBrokenLinks = require("eleventy-plugin-broken-links");
const EleventyPluginFaviconsPlugin = require("eleventy-plugin-gen-favicons");
const EleventyPluginUnfurl = require("eleventy-plugin-unfurl");

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
    headingText: "Table of contents",
  });
  eleventyConfig.addPlugin(EleventyPluginBrokenLinks, {
    loggingLevel: 1,
  });
  eleventyConfig.addPlugin(EleventyPluginFaviconsPlugin, {});
  eleventyConfig.addPlugin(EleventyPluginUnfurl, {
    template: (props) => {
      return props
        ? `<article class="unfurl">${
            props?.url || props?.title
              ? `<h4 class="unfurl__heading"><a class="unfurl__link" href="${props?.url}">${props?.title}</a></h4>`
              : ``
          }${
            props?.image?.url
              ? `<img class="unfurl__image" src="${props.image.url}" width="2400" height="1256" alt=""/>`
              : ``
          }${
            props?.description
              ? `<p class="unfurl__description">${props.description}</p>`
              : ``
          }${
            props?.author
              ? `<small class="unfurl__meta">${
                  props?.author
                    ? `<span class="unfurl__publisher">${props.author}</span>`
                    : ``
                }</small>`
              : ``
          }</article>`
        : ``;
    },
  });

  const markdownLibrary = markdown(eleventyConfig);
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Excerpts
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: (file, options) => {
      const firstTwoSentences = file.content.split(". ").slice(0, 2).join(". ");
      const first160Characters = file.content.split("").slice(0, 160).join("");
      const contentBeforeHTML = file.content.split("<").slice(0, 1).join("");
      const exceprt = file.content.includes("<")
        ? contentBeforeHTML
        : firstTwoSentences.length > 160
        ? first160Characters
        : firstTwoSentences;
      file.excerpt = removeMd(exceprt, { gfm: true })
        .replace(/\[\[|\]\]/gm, "")
        .replace(/(\^\[)[^\[\]]+(\])/gm, (match) =>
          match === "^[" ? " (" : ")"
        )
        .replace(/(\()[^\(\)+]+(\)){1}/gm, "")
        .replace(/(\[])[^\[\]+]+(\]){1}/gm, "")
        .replace(
          /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/gm,
          ""
        );
    },
  });

  // Collections
  const collections = ["blog", "garden", "bookmarks", "projects"];
  for (const collectionName of collections) {
    eleventyConfig.addCollection(collectionName, (collection) =>
      [
        ...collection.getFilteredByGlob(`./src/${collectionName}/*.md`),
      ].reverse()
    );
  }

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
        <section class="[ ${feed.title.toLowerCase()} ] [ feed-block flow ]">
          <h2>
            <a href="${feed.url}">${feed.title}</a>
          </h2>
          <ul class="[ flow ]">
            ${content}
          </ul>
        </section>
      `;
    }
  );
  eleventyConfig.addNunjucksShortcode("feedItem", function (feedItem) {
    return `
      <li>
        <sl-card class="[ feed-item-card ]">
        ${
          feedItem.excerpt
            ? `
                <div slot="header" class="[ feed-item-card-title ]">
                  <p><a href="${feedItem.url}">${feedItem.title}</a></p>
                </div>
                <p>
                  ${markdownLibrary.render(feedItem.excerpt)}
                </p>
              `
            : `
                <div class="[ feed-item-card-title ]">
                  <p><a href="${feedItem.url}">${feedItem.title}</a></p>
                </div>
              `
        }
        </sl-card>
      </li>
    `;
  });
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

      // let lowsrc = metadata.jpeg[0];
      // let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

      // let getSrcset = (imageFormat) =>
      //   imageFormat.map((entry) => entry.srcset).join(", ");

      // let sources = Object.values(metadata)
      //   .map((imageFormat) => {
      //     let srcset = getSrcset(imageFormat);
      //     return `<source type="${imageFormat[0].sourceType}" srcset="${srcset}" sizes="${sizes}">`;
      //   })
      //   .join("");

      // let img = `<img src="${lowsrc.url}" width="${highsrc.width}" height="${highsrc.height}" alt="${alt}" loading="lazy" decoding="async">`;

      // return `<picture class="[ image ]">${sources}${img}</picture>`;
    }
  );
  eleventyConfig.addNunjucksShortcode("gh_edit", function (page) {
    const inputPath = page.inputPath.replace(/^\.\//, "").replace(/\s/g, "%20");
    return `
      <a href="https://github.com/ellyloel/ellyloel.com/edit/main/${inputPath}">
        <sl-icon library="fa" name="fas-edit" class="[ emoji ]"></sl-icon> Edit this page
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
