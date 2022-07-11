module.exports = {
  layout: "base",
  permalink: "/projects/{{ title | slugify }}/",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Projects",
    },
  },
};
