module.exports = {
  layout: "post",
  permalink: "/projects/{{ title | slugify }}/",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Projects",
    },
  },
};
