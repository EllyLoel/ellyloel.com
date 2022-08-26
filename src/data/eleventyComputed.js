const slugify = require("slugify");

// This regex finds all wikilinks in a string
const wikilinkRegEx = /\[\[\s*([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s*\]\]/g;

module.exports = {
  backlinks: (data) => {
    const posts = data.collections.allPostTypes;

    let backlinks = [];

    // Search all posts for links
    for (const post of posts) {
      const postContent = post.template.frontMatter.content;

      // Get all links from the post
      const outboundLinks = (
        [...new Set(postContent.match(wikilinkRegEx))] || []
      ).map((link) => {
        return link.slice(2, -2).split("|")[0];
      });

      if (outboundLinks.some((link) => link === data.title)) {
        backlinks.push({
          url: post.url,
          title: post.data.title,
          excerpt: post.template.frontMatter.excerpt,
        });
      }
    }

    return backlinks;
  },
  links: (data) => {
    const posts = data.collections.allPostTypes;

    let links = [];

    // Search all posts for links
    for (const post of posts) {
      if (post.url === data.page.url) {
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
              ? links.push({
                  source: data.page.url,
                  target: otherPost.url,
                })
              : null;
          }
        }
      }
    }

    return links;
  },
  linkGraph: (data) => {
    const posts = data.collections.allPostTypes;

    let linkGraph = [];

    // Search all posts for links
    for (const post of posts) {
      linkGraph.push(...post.data.links);
    }

    return linkGraph;
  },
};
