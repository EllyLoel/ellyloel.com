// External imports
import path from "node:path";
import postcss from "postcss";
import postcssrc from "postcss-load-config";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default (eleventyConfig) => {
	let postcssConfig = {
		options: {},
		plugins: [],
	};

	// Recognize CSS as a "template language"
	eleventyConfig.addTemplateFormats("css");

	// Process CSS with LightningCSS
	eleventyConfig.addExtension("css", {
		compile: async function(inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			if (parsed.name !== "style") return;

			// Support @import triggering regeneration for incremental builds
			if (inputContent.includes("@import")) {
				// for each file create a list of files to look at
				const fileList = [];

				// get a list of import on the file your reading
				const importRuleRegex = /@import\s+(?:url\()?['"]?([^'"\);]+)['"]?\)?.*;/g;

				let match;
				while ((match = importRuleRegex.exec(inputContent))) {
					fileList.push(`${parsed.dir}/${match[1]}`);
				}

				this.addDependencies(inputPath, fileList);
			}

			const { options, plugins } = postcssConfig;

			let { css } = await postcss(plugins).process(
				inputContent,
				{
					...options,
					from: inputPath,
				}
			);

			return async () => css;
		},
		init: async () => {
			try {
				postcssConfig = await postcssrc();
			} catch (error) {
				console.log(`WARN: Eleventy Plugin (PostCSS): ${error.message}`); // eslint-disable-line no-console
			}
		},
		outputFileExtension: "css",
	});
};
