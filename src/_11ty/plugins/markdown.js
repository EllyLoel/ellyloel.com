import markdownit from "markdown-it";
import markdownitAbbr from "markdown-it-abbr";
import markdownitAnchor from "markdown-it-anchor";
import markdownitAttribution from "markdown-it-attribution";
import markdownitAttrs from "markdown-it-attrs";
import markdownitContainer from "markdown-it-container";
import markdownitFigure from "./markdownFigure.js";
import markdownitFootnote from "markdown-it-footnote";
import markdownitInsDel from "markdown-it-ins-del";
import markdownitMark from "markdown-it-mark";
import markdownitSup from "markdown-it-sup";
import slugify from "@sindresorhus/slugify";

let markdownLibrary = markdownit({
	breaks: true,
	html: true,
	linkify: true,
	typographer: true,
})
	.use(markdownitInsDel)
	.disable("strikethrough")
	.use(markdownitSup)
	.use(markdownitFootnote)
	.use(markdownitMark)
	.use(markdownitAbbr)
	.use(markdownitContainer, "callout", {
		marker: "~",
		render: (tokens, idx) => {
			const title = tokens[idx].info.trim().match(/^callout\s?(.*)$/);
			if (tokens[idx].nesting === 1) {
				// opening tag
				return `<aside class="[ callout ][ flow ]">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="inline-icon" aria-hidden="true">
						<path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
					</svg>
					${title[1] ? markdownLibrary.renderInline(title[1]) : ``}`.trim();
			} else {
				// closing tag
				return `</aside>`;
			}
		},
	})
	.use(markdownitAnchor, {
		level: 2,
		slugify: slugify,
	})
	.use(markdownitAttrs)
	.use(markdownitAttribution, {
		classNameAttribution: null,
		classNameContainer: null,
		marker: "—",
		removeMarker: false,
	})
	.use(markdownitFigure, {
		figcaption: true,
	});

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export function plugin(eleventyConfig) {
	eleventyConfig.setLibrary("md", markdownLibrary);
}
export const library = markdownLibrary;
