const postcssJitProps = require("postcss-jit-props");
const openProps = require("open-props");
const postcssPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");
const postcssImport = require("postcss-import");

module.exports = {
  plugins: [
    postcssImport(),
    postcssJitProps(openProps),
    postcssPresetEnv({ stage: 0 }),
    cssnano({ preset: "default" }),
  ],
};
