import cssnano from "cssnano";
import openProps from "open-props";
import postcssImport from "postcss-import";
import postcssJitProps from "postcss-jit-props";
import postcssPresetEnv from "postcss-preset-env";

/** @type {import('postcss-load-config').Config} */
export default {
	plugins: [
		postcssImport(),
		postcssJitProps({
			...openProps,
			layer: "variables.open-props"
		}), // only variables that are used are in the build output (tree shaking)
		...(process.env.ELEVENTY_ENV === "production"
			? [
				cssnano({ preset: "default" }),
				postcssPresetEnv({
					features: {
						"gradients-interpolation-method": true,
					},
					stage: 0,
				}),
			]
			: []),
	],
};
