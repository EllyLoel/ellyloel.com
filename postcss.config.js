const postcssJitProps = require("postcss-jit-props");
const openProps = require("open-props");
const postcssPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");

module.exports = {
  // only variables that are used are in the build output (treeshaking)
  plugins: [
    postcssJitProps(openProps),
    postcssPresetEnv({ stage: 0 }),
    cssnano({ preset: "default" }),
  ],
};
