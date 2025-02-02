/**
 * @see https://gist.github.com/dirtystylus/d488ea82fec9ebda8308a288015d019b
 * @param {string} figure
 * @param {string} caption
 * @param {string} className
 * @returns {string}
 */
export default (content, caption, className) => {
	const classMarkup = className ? ` class="${className}"` : "";
	const captionMarkup = caption ? `<figcaption>${caption}</figcaption>` : "";
	return `<figure${classMarkup}>${content}${captionMarkup}</figure>`;
};
