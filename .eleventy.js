require("dotenv").config();
const path = require("path");
const removeMd = require("remove-markdown");
const slinkity = require("slinkity");
const markdownItAnchor = require("markdown-it-anchor");
const twemoji = require("twemoji");

const EleventyPluginNavigation = require("@11ty/eleventy-navigation");
const EleventyPluginRss = require("@11ty/eleventy-plugin-rss");
const EleventyPluginSyntaxhighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const EleventyPluginInclusiveLang = require("@11ty/eleventy-plugin-inclusive-language");
const EleventyPluginImage = require("@11ty/eleventy-img");
const EleventyPluginNestingToc = require("eleventy-plugin-nesting-toc");

const filters = require("./utils/filters.js");
const transforms = require("./utils/transforms.js");

module.exports = (eleventyConfig) => {
  // Plugins
  eleventyConfig.addPlugin(EleventyPluginNavigation);
  eleventyConfig.addPlugin(EleventyPluginRss);
  eleventyConfig.addPlugin(EleventyPluginSyntaxhighlight);
  eleventyConfig.addPlugin(EleventyPluginInclusiveLang);
  eleventyConfig.addPlugin(slinkity.plugin, slinkity.defineConfig({}));
  eleventyConfig.addPlugin(EleventyPluginNestingToc, {
    wrapper: "nav",
    tags: ["h2", "h3", "h4", "h5", "h6"],
  });

  // Customize Markdown library and settings:
  let markdownLibrary = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(require("markdown-it-ins"))
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
    .use(require("markdown-it-wikilinks"), {
      baseURL: "/",
    });
  markdownLibrary.renderer.rules.emoji = (token, idx) => {
    return twemoji.parse(token[idx].content);
  };
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Excerpts
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
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
                  ${removeMd(feedItem.excerpt).replace(/\[\[|\]\]/gm, "")}
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

  // Layouts
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("not-home", "not-home.njk");

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
