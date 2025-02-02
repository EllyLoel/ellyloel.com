import { minify } from "html-minifier";

export default (content) => {
	if (
		process.env.ELEVENTY_ENV === "production" &&
		this?.page?.outputPath?.endsWith(".html")
	) {
		let minified = minify(content, {
			collapseWhitespace: true,
			removeComments: true,
			useShortDoctype: true,
		});
		return minified;
	}

	return content;
}
