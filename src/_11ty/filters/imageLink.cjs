const EleventyPluginImage = require("@11ty/eleventy-img");
const path = require("path");

module.exports = async (src) => {
	const imageExtension = src.split(".").at(-1);
	const allowedImageExtensions = ["avif", "jpeg", "jpg", "png", "svg", "webp"];

	if (!allowedImageExtensions.includes(imageExtension)) return src;

	const options = {
		cacheOptions: {
			duration: "4w",
		},
		formats: ["webp"],
		outputDir: path.join("_site", "img"),
		widths: [54],
	};
	const image = await EleventyPluginImage(src, options);

	return image?.webp?.[0]?.url;
};
