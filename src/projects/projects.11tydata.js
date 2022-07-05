module.exports = {
  layout: "base.njk",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Projects",
    },
  },
};
