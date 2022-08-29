const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const slugify = require("slugify");

// This regex finds all wikilinks in a string
const wikilinkRegEx = /\[\[\s*([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s*\]\]/g;

module.exports = {
  dateToFormat: function (date, format) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(String(format));
  },

  dateToISO: function (date) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    });
  },

  md: function (content = "") {
    return markdownIt({ html: true }).render(content);
  },

  sliceCollection: function (collection, count) {
    return collection.slice(0, count || 5);
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
        return slugify(wikilink.slice(2, -2).split("|")[0]).toLowerCase();
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
};
