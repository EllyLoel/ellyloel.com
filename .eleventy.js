const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = (eleventyConfig) => {
  // Copy the assets folder to the output
  eleventyConfig.addPassthroughCopy({ "src/_assets": "assets" });

  // Plugins
  eleventyConfig.addPlugin(inclusiveLangPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  return {
    dir: {
      input: "src",
      output: "public",
    },
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
