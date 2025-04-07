import EleventyPluginImage from "@11ty/eleventy-img";
import { join } from "path";

export default async (src) => {
	const imageExtension = src.split(".").at(-1);
	const allowedImageExtensions = ["avif", "jpeg", "jpg", "png", "svg", "webp"];

	if (!allowedImageExtensions.includes(imageExtension)) return src;

	const options = {
		cacheOptions: {
			duration: "4w",
		},
		formats: ["webp"],
		outputDir: join("_site", "img"),
		widths: [54],
	};
	const image = await EleventyPluginImage(src, options);

	return image?.webp?.[0]?.url;
};
