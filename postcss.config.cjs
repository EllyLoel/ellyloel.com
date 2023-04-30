const postcssJitProps = require("postcss-jit-props");
const openProps = require("open-props");
const postcssPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");
const postcssImport = require("postcss-import");

module.exports = {
	from: "src/assets/css/style.css",
	map: process.env.ELEVENTY_ENV !== "production",
	// only variables that are used are in the build output (treeshaking)
	plugins: [
		postcssImport(),
		postcssJitProps(openProps),
		postcssPresetEnv({ stage: 0 }),
		...(process.env.ELEVENTY_ENV === "production"
			? [cssnano({ preset: "default" })]
			: []),
	],
};
