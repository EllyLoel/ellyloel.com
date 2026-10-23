import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

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
		// Map virtual CSS IDs to their absolute URL paths so Rollup
		// does not convert them to relative file-system paths.
		paths(id) {
			if (id.startsWith("virtual:css:")) {
				return "/css/" + id.slice("virtual:css:".length);
			}
		},
		sourcemap: process.env.ELEVENTY_ENV !== "production",
	},
	plugins: [
		// Must run BEFORE nodeResolve so we can intercept CSS imports
		// before @rollup/plugin-node-resolve resolves them to a file path.
		// color-elements uses dynamic import("./x.css", { with: { type: "css" } })
		// with a .catch(() => new URL(...)) fallback. CSS is served as static
		// files from /css/ via Eleventy passthrough copy. We need to:
		// 1. Transform new URL("./x.css", import.meta.url) -> new URL("/css/x.css", import.meta.url)
		// 2. Mark CSS files as external so Rollup does not parse them as JS.
		{
			name: "fix-color-elements-css",
			resolveId(source) {
				if (source.endsWith(".css")) {
					const basename = source.split("/").pop();
					// Use a virtual ID so Rollup does not treat it as a file path
					return { external: true, id: "virtual:css:" + basename };
				}
			},
			transform(code, id) {
				if (id.includes("color-elements") && id.endsWith(".js")) {
					const transformed = code.replace(
						/new URL\(["']([^"']+\.css)["'],\s*import\.meta\.url\)/g,
						(_, cssPath) => {
							const basename = cssPath.split("/").pop();
							return "new URL(\"/css/" + basename + "\", import.meta.url)";
						}
					);
					return { code: transformed, map: null };
				}
			},
		},
		nodeResolve(),
		...(process.env.ELEVENTY_ENV === "production" ? [terser()] : []),
	],
};
