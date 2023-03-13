/**
 * @see https://gist.github.com/dirtystylus/d488ea82fec9ebda8308a288015d019b
 * @param {string} figure
 * @param {string} caption
 * @param {string} className
 * @returns {string}
 */
module.exports = (figure, caption, className) => {
	const classMarkup = className ? ` class="${className}"` : "";
	const captionMarkup = caption ? `<figcaption>${caption}</figcaption>` : "";
	return `<figure${classMarkup}>${figure}${captionMarkup}</figure>`;
};
