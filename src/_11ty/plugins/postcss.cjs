// External imports
const path = require("node:path");
const postcss = require("postcss");
const postcssrc = require("postcss-load-config");

// Internal imports
const pkg = require("../../../package.json");

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = function eleventyPluginPostcss(eleventyConfig, options = {}) {
  let postcssConfig = {
    options: {},
    plugins: [],
  };

  options = Object.assign({
    templateFormats: "css",
  }, options);

  eleventyConfig.addTemplateFormats(options.templateFormats);

  eleventyConfig.addExtension(options.templateFormats, {
    compile: async (inputContent, inputPath) => {
      return async ({ page: { outputPath } }) => {
        const { options, plugins } = postcssConfig;

        return await postcss(plugins)
          .process(inputContent, { ...options, from: inputPath, to: outputPath })
          .then(result => result.css);
      };
    },
    compileOptions: {
      permalink: (inputContent, inputPath) => () => {
        if (path.parse(inputPath).name !== "style") {
          return false;
        }
      },
    },
    init: async () => {
      try {
        postcssConfig = await postcssrc();
      } catch (error) {
        console.log(`WARN: Eleventy Plugin (${pkg.name}): ${error.message}`);
      }
    },
    outputFileExtension: "css",
    useLayouts: false,
  });
}
