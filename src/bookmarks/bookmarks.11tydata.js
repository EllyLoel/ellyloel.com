module.exports = {
  layout: "post",
  permalink: "/bookmarks/{{ title | slugify }}/",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Bookmarks",
    },
  },
};
