const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const slugify = require("slugify");
const EleventyPluginImage = require("@11ty/eleventy-img");
const path = require("path");

// This regex finds all wikilinks in a string
const wikilinkRegEx = /\[\[\s*([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s*\]\]/g;

module.exports = {
  dateToLocaleDateFull: function (date) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toLocaleString(
      DateTime.DATE_FULL
    );
  },

  dateToFormat: function (date, format) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(String(format));
  },

  dateToISO: function (date) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toISODate();
  },

  md: function (content = "") {
    return markdownIt({ html: true }).render(content);
  },

  sliceCollection: function (collection) {
    return collection.slice(0, 8);
  },

  sortAlphabetically: function (pages) {
    return [...pages].sort(function (a, b) {
      if (a.data.title < b.data.title) return -1;
      if (a.data.title > b.data.title) return 1;
      return 0;
    });
  },

  sentenceCase: function (string = "") {
    return string[0].toUpperCase() + string.substring(1);
  },

  sortByCreated: function (posts) {
    return [...posts].sort(function (a, b) {
      if (a.data.created > b.data.created) return -1;
      if (a.data.created < b.data.created) return 1;
      return 0;
    });
  },

  sortByModified: function (posts) {
    return [...posts].sort(function (a, b) {
      if (a.data.modified > b.data.modified) return -1;
      if (a.data.modified < b.data.modified) return 1;
      return 0;
    });
  },

  linkGraph: function (posts) {
    const linkGraph = {
      nodes: [],
      links: [],
    };

    // Search all posts for links
    for (const post of posts) {
      linkGraph.nodes.push({
        id: post.url,
        group: post.url.split("/")[1],
        name: post.data.title,
        val: "2",
      });

      const postContent = post.template.frontMatter.content;

      // Get all links from the post
      const outboundLinks = (
        [...new Set(postContent.match(wikilinkRegEx))] || []
      ).map((wikilink) => {
        return slugify(wikilink.slice(2, -2).split("|")[0], { lower: true });
      });

      for (const link of outboundLinks) {
        for (const otherPost of posts) {
          otherPost.url.includes(link)
            ? linkGraph.links.push({
                source: post.url,
                target: otherPost.url,
              })
            : null;
        }
      }
    }

    return linkGraph;
  },

  imageLink: async (src) => {
    const imageExtension = src.split(".").at(-1);
    const allowedImageExtensions = [
      "avif",
      "jpeg",
      "jpg",
      "png",
      "svg",
      "webp",
    ];

    if (!allowedImageExtensions.includes(imageExtension)) return src;

    const options = {
      widths: [54],
      formats: ["webp"],
      outputDir: path.join("_site", "img"),
      cacheOptions: {
        duration: "4w",
      },
    };
    const image = await EleventyPluginImage(src, options);

    return image?.webp?.[0]?.url;
  },

  removeRandomLink: (markup) =>
    markup
      .replace(`<a href="https://www.ellyloel.com/"></a>`, ``)
      .replace(`<a href="https://elly.to/"></a>`, ``),
};
