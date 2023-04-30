import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
	external: ["/pagefind/pagefind.js"],
	onwarn: (warning, warn) => {
		// Suppress non-actionable warning caused by TypeScript boilerplate:
		if (!["THIS_IS_UNDEFINED", "CIRCULAR_DEPENDENCY"].includes(warning.code)) {
			warn(warning);
		}
	},
	output: {
		dir: "_site/js",
		sourcemap: process.env.ELEVENTY_ENV !== "production",
	},
	plugins: [
		nodeResolve(),
		...(process.env.ELEVENTY_ENV === "production" ? [terser()] : []),
	],
};
