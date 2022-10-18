module.exports = {
  layout: "post",
  date: "git Last Modified",
  permalink: "/garden/{{ title | slugify }}/",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "Digital garden",
    },
  },
};
