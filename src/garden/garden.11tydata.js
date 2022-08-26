module.exports = {
  layout: "post",
  permalink: "/garden/{{ title | slugify }}/",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Digital garden",
    },
  },
};
