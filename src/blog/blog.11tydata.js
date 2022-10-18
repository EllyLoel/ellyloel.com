module.exports = {
  layout: "post",
  permalink: "/blog/{{ title | slugify }}/",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Blog",
    },
  },
};
