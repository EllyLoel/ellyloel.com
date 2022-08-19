require("dotenv").config();
const path = require("path");
const removeMd = require("remove-markdown");
const slinkity = require("slinkity");
const markdownItAnchor = require("markdown-it-anchor");
const twemoji = require("twemoji");

const EleventyPluginNavigation = require("@11ty/eleventy-navigation");
const EleventyPluginRss = require("@11ty/eleventy-plugin-rss");
const EleventyPluginSyntaxhighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
// const EleventyPluginInclusiveLang = require("@11ty/eleventy-plugin-inclusive-language");
const EleventyPluginImage = require("@11ty/eleventy-img");
const EleventyPluginNestingToc = require("eleventy-plugin-nesting-toc");
const EleventyPluginBrokenLinks = require("eleventy-plugin-broken-links");
const EleventyPluginFaviconsPlugin = require("eleventy-plugin-gen-favicons");

const filters = require("./utils/filters.js");
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
    tags: ["h2", "h3", "h4", "h5", "h6"],
  });
  eleventyConfig.addPlugin(EleventyPluginBrokenLinks, {
    loggingLevel: 1,
  });
  eleventyConfig.addPlugin(EleventyPluginFaviconsPlugin, {});

  // Customize Markdown library and settings:
  let markdownLibrary = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(require("markdown-it-ins-del"))
    .disable("strikethrough")
    .use(require("markdown-it-sup"))
    .use(require("markdown-it-footnote"))
    .use(require("markdown-it-mark"))
    .use(require("markdown-it-abbr"))
    .use(require("markdown-it-emoji"))
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "direct-link",
        symbol: "🔗",
        level: [1, 2, 3, 4],
      }),
      slugify: eleventyConfig.getFilter("slugify"),
    })
    .use(
      require("markdown-it-wikilinks")({
        baseURL: "/",
        relativeBaseURL: "../",
        suffix: "",
        uriSuffix: "",
      })
    );
  markdownLibrary.renderer.rules.emoji = (token, idx) => {
    return twemoji.parse(token[idx].content);
  };
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Excerpts
  const excerpt = (file, options) => {
    const firstTwoSentences = file.content.split(".").slice(0, 2).join(". ");
    const first160Characters = file.content.split("").slice(0, 160).join("");
    file.excerpt = removeMd(
      firstTwoSentences.length > 160 ? first160Characters : firstTwoSentences
    ).replace(/\[\[|\]\]/gm, "");
  };
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: excerpt,
  });

  // Collections
  eleventyConfig.addCollection("blog", (collection) =>
    [...collection.getFilteredByGlob("./src/blog/*.md")].reverse()
  );
  eleventyConfig.addCollection("garden", (collection) =>
    [...collection.getFilteredByGlob("./src/garden/*.md")].reverse()
  );
  eleventyConfig.addCollection("bookmarks", (collection) =>
    [...collection.getFilteredByGlob("./src/bookmarks/*.md")].reverse()
  );
  eleventyConfig.addCollection("projects", (collection) =>
    [...collection.getFilteredByGlob("./src/projects/*.md")].reverse()
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
                  ${feedItem.excerpt}
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
    async function (src, alt, sizes = "100vw") {
      if (alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
      }

      let metadata = await EleventyPluginImage(src, {
        widths: [300, 600, 1000],
        formats: ["avif", "jpeg"],
        outputDir: path.join("_site", "img"),
      });

      let lowsrc = metadata.jpeg[0];
      let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

      let getSrcset = (imageFormat) =>
        imageFormat.map((entry) => entry.srcset).join(", ");

      let sources = Object.values(metadata)
        .map((imageFormat) => {
          let srcset = getSrcset(imageFormat);
          return `<source type="${imageFormat[0].sourceType}" srcset="${srcset}" sizes="${sizes}">`;
        })
        .join("");

      let img = `<img src="${lowsrc.url}" width="${highsrc.width}" height="${highsrc.height}" alt="${alt}" loading="lazy" decoding="async">`;

      return `<picture class="[ image ]">${sources}${img}</picture>`;
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

  // Layouts
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias(
    "base-without-header",
    "base-without-header.njk"
  );

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
