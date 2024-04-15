const postcssJitProps = require("postcss-jit-props");
const openProps = require("open-props");
const postcssPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");
const postcssImport = require("postcss-import");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
	from: "src/input/css/style.css",
	map: process.env.ELEVENTY_ENV !== "production",
	// only variables that are used are in the build output (treeshaking)
	plugins: [
		postcssImport(),
		postcssJitProps(openProps),
		postcssPresetEnv({
			features: {
				"gradients-interpolation-method": true,
			},
			stage: 0,
		}),
		...(process.env.ELEVENTY_ENV === "production"
			? [
					purgecss({
						content: ["./_site/**/*.html"],
					}),
					cssnano({ preset: "default" }),
			  ]
			: []),
	],
};
