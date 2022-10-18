const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const postcssPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");

module.exports = {
  // only vars used are in build output
  plugins: [
    postcssJitProps(OpenProps),
    postcssPresetEnv({ stage: 0 }),
    cssnano({ preset: "default" }),
  ],
};
