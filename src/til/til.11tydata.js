module.exports = {
  layout: "post",
  permalink: "/til/{{ title | slugify }}/",
  eleventyComputed: {
    eleventyNavigation: {
      key: (data) => data.title,
      parent: "TIL",
    },
  },
};
