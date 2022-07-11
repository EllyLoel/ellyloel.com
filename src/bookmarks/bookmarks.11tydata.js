module.exports = {
  layout: "base",
  permalink: "/bookmarks/{{ title | slugify }}/",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Bookmarks",
    },
  },
};
