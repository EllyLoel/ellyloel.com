import eleventyImage, { generateHTML } from "@11ty/eleventy-img";
import { join } from "path";

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.addShortcode(
		"image",
		async (
			src,
			alt,
			caption,
			noItalics,
			sizes = "(max-width: 768px) 100vw, 768px",
			widths,
			classes
		) => {
			if (alt === undefined) {
				// You bet we throw an error on missing alt (alt="" works okay)
				throw new Error(`Missing \`alt\` on image from: ${src}`);
			}

			const isLocal = src.includes("./src/assets/img/");
			const imageExists = async () => {
				try {
					return await fetch(src, { method: "HEAD" }).then((res) => res.ok);
				} catch {
					return false;
				}
			};

			const generateImage = async () => {
				// Skip optimization in development mode
				if (process.env.ELEVENTY_ENV === "development") {
					const imgSrc = src.replace("./src/", "/");
					const imgTag = `<img src="${imgSrc}" alt="${alt}" class="[ image ] ${classes}" decoding="async" loading="lazy">`;
					return caption
						? `<figure>${imgTag}<figcaption ${noItalics ? `class="no-italics"` : ``}>${caption}</figcaption></figure>`
						: imgTag;
				}

				let formats = ["webp", "jpeg", "auto"];

				let metadata = await eleventyImage(src, {
					cacheOptions: {
						duration: "4w",
					},
					formats,
					outputDir: join(eleventyConfig.dir.output, "img"),
					widths: widths || ["auto"],
				});

				let imageAttributes = {
					alt,
					class: `[ image ] ${classes}`,
					decoding: "async",
					loading: "lazy",
					sizes,
				};

				// Generate the HTML for the image
				const imageHtml = generateHTML(metadata, imageAttributes, {
					whiteSpace: "inline",
				});

				// Wrap in figure only if there's a caption
				return caption
					? `<figure>${imageHtml}<figcaption ${
							noItalics ? `class="no-italics"` : ``
					}>${caption}</figcaption></figure>`
					: imageHtml;
			};

			const generatePlaceholder = () => {
				return `<div class="image-placeholder ${classes}"></div>`;
			};

			try {
				return isLocal
					? await generateImage()
					: await imageExists().then(async (exists) =>
							exists ? await generateImage() : generatePlaceholder()
						);
			} catch (e) {
				console.log(e); // eslint-disable-line no-console
				return "";
			}
		}
	);
}
