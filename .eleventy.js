const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");

module.exports = (eleventyConfig) => {
  // Copy the assets folder to the output
  eleventyConfig.addPassthroughCopy({ "src/_assets": "assets" });

  // Plugins
  eleventyConfig.addPlugin(inclusiveLangPlugin);

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
