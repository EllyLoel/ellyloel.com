module.exports = {
  layout: "post",
  date: "git Last Modified",
  permalink: "/til/{{ title | slugify }}/",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "TIL",
    },
  },
};
