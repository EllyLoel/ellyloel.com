module.exports = {
  layout: "base",
  permalink: "/blog/{{ title | slugify }}/",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Blog",
    },
  },
};
