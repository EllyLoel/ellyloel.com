const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItWikilinks = require("markdown-it-wikilinks");
const markdownItEmoji = require("markdown-it-emoji");
const twemoji = require("twemoji");
const removeMd = require("remove-markdown");

const EleventyPluginNavigation = require("@11ty/eleventy-navigation");
const EleventyPluginRss = require("@11ty/eleventy-plugin-rss");
const EleventyPluginSyntaxhighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const EleventyPluginInclusiveLang = require("@11ty/eleventy-plugin-inclusive-language");
const EleventyPluginVite = require("@11ty/eleventy-plugin-vite");

const rollupPluginCritical = require("rollup-plugin-critical").default;

const filters = require("./utils/filters.js");
const transforms = require("./utils/transforms.js");

module.exports = (eleventyConfig) => {
  // Plugins
  eleventyConfig.addPlugin(EleventyPluginNavigation);
  eleventyConfig.addPlugin(EleventyPluginRss);
  eleventyConfig.addPlugin(EleventyPluginSyntaxhighlight);
  eleventyConfig.addPlugin(EleventyPluginInclusiveLang);
  eleventyConfig.addPlugin(EleventyPluginVite, {
    tempFolderName: ".11ty-vite", // Default name of the temp folder

    // Vite options (equal to vite.config.js inside project root)
    viteOptions: {
      publicDir: "public",
      clearScreen: false,
      server: {
        mode: "development",
        middlewareMode: true,
      },
      appType: "custom",
      assetsInclude: ["**/*.xml", "**/*.txt"],
      build: {
        mode: "production",
        sourcemap: "true",
        manifest: true,
        // This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
        rollupOptions: {
          output: {
            assetFileNames: "assets/css/main.[hash].css",
            chunkFileNames: "assets/js/[name].[hash].js",
            entryFileNames: "assets/js/[name].[hash].js",
          },
          plugins: [
            rollupPluginCritical({
              criticalUrl: "./_site/",
              criticalBase: "./_site/",
              criticalPages: [
                { uri: "index.html", template: "index" },
                { uri: "blog/index.html", template: "blog" },
                { uri: "bookmarks/index.html", template: "bookmarks" },
                { uri: "garden/index.html", template: "garden" },
                { uri: "projects/index.html", template: "projects" },
                { uri: "about/index.html", template: "about" },
                { uri: "now/index.html", template: "now" },
                { uri: "speaking/index.html", template: "speaking" },
                { uri: "uses/index.html", template: "uses" },
                { uri: "404.html", template: "404" },
              ],
              criticalConfig: {
                inline: true,
                dimensions: [
                  {
                    height: 900,
                    width: 375,
                  },
                  {
                    height: 720,
                    width: 1280,
                  },
                  {
                    height: 1080,
                    width: 1920,
                  },
                ],
              },
            }),
          ],
        },
      },
    },
  });

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownItWikilinks)
    .use(markdownItEmoji)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "direct-link",
        symbol: "🔗",
        level: [1, 2, 3, 4],
      }),
      slugify: eleventyConfig.getFilter("slugify"),
    });
  markdownLibrary.renderer.rules.emoji = (token, idx) =>
    twemoji.parse(token[idx].content);
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

  // Layouts
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("not-home", "not-home.njk");
  eleventyConfig.addLayoutAlias("post", "post.njk");
  eleventyConfig.addLayoutAlias("note", "note.njk");
  eleventyConfig.addLayoutAlias("bookmark", "bookmark.njk");
  eleventyConfig.addLayoutAlias("project", "project.njk");

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy({
    "/node_modules/@shoelace-style/shoelace/dist/assets": "public/shoelace",
  });

  return {
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      // better not use "public" as the name of the output folder (see above...)
      output: "_site",
      includes: "includes",
      layouts: "layouts",
      data: "data",
    },
  };
};
