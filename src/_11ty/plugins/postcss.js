// External imports
import { parse } from "node:path";
import postcss from "postcss";
import postcssrc from "postcss-load-config";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default async (eleventyConfig) => {
	let postcssConfig = {
		options: {},
		plugins: [],
	};

	eleventyConfig.addTemplateFormats("css");

	eleventyConfig.addExtension("css", {
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
				if (parse(inputPath).name !== "style") {
					return false;
				}
			},
		},
		init: async () => {
			try {
				postcssConfig = await postcssrc();
			} catch (error) {
				console.log(`WARN: Eleventy Plugin (PostCSS): ${error.message}`); // eslint-disable-line no-console
			}
		},
		outputFileExtension: "css",
		useLayouts: false,
	});
};
