const postcss = require("postcss");
const postcssrc = require("postcss-load-config");

class Config {
	constructor() {
		this._plugins = [];
		this._options = {};
	}

	async tryLoad(loader = postcssrc) {
		try {
			const { plugins, options } = await loader();

			this._plugins = plugins;
			this._options = options;
		} catch (e) {
			console.log(e);
		}
	}

	getPlugins() {
		return this._plugins;
	}

	getOptions() {
		return this._options;
	}

	getProcessorConfig(from, to) {
		return { ...this._options, from, to };
	}
}

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
	eleventyConfig.addTemplateFormats("css");

	eleventyConfig.addExtension("css", {
		outputFileExtension: "css",
		init: async () => {
			await Config.tryLoad();
		},
		compile: async (input, inputPath) => {
			return async ({ page }) => {
				const plugins = Config.getPlugins();
				const config = Config.getProcessorConfig(inputPath, page.outputPath);

				return postcss(plugins)
					.process(input, config)
					.then((result) => result.css);
			};
		},
	});
};
