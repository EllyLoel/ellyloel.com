import cssnano from "cssnano";
import openProps from "open-props";
import postcssImport from "postcss-import";
import postcssJitProps from "postcss-jit-props";
import postcssPresetEnv from "postcss-preset-env";

/** @type {import('postcss-load-config').Config} */
export default {
	plugins: [
		postcssImport(),
		postcssJitProps(openProps), // only variables that are used are in the build output (tree shaking)
		postcssPresetEnv({
			features: {
				"gradients-interpolation-method": true,
			},
			stage: 0,
		}),
		...(process.env.ELEVENTY_ENV === "production"
			? [cssnano({ preset: "default" })]
			: []),
	],
};
