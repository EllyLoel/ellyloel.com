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

markdownLibrary.renderer.rules.footnote_ref = (tokens, index, options, env, self) => {
	const id = self.rules.footnote_anchor_name(tokens, index, options, env, self);
	let refid = id;

	if (tokens[index].meta.subId > 0) refid += `:${tokens[index].meta.subId}`;

	return (
		`<sup class="[ footnote-ref ]">`+
			`<a href="#fn${id}" id="fnref${refid}" class="[ badge pill outline ][ text-decoration-none padding-block-0 padding-inline-1 ]">`+
				`<span aria-hidden="true">${id}</span>`+
				`<span class="[ visually-hidden ]">To footnote ${id}</span>`+
			`</a>`+
		`</sup>`
	);
}

markdownLibrary.renderer.rules.footnote_block_open = () => (
	`<hr aria-hidden="true">`+
	`<section id="footnotes" class="[ footnotes ]" aria-labelledby="footnotes-heading">`+
	`	<h2 id="footnotes-heading" hidden>Footnotes</h2>`+
	`	<ol class="[ flow ]">`
);

markdownLibrary.renderer.rules.footnote_anchor = (tokens, index, options, env, self) => {
	let id = self.rules.footnote_anchor_name(tokens, index, options, env, self);

	if (tokens[index].meta.subId > 0) id += `:${tokens[index].meta.subId}`;

	/* ↩ with escape code to prevent display as Apple Emoji on iOS */
	return (
		` <a href="#fnref${id}" class="[ footnote-backref ]">`+
			`<span aria-hidden="true">\u21a9\uFE0E</span>`+
			`<span class="[ visually-hidden ]">Back to reference ${id}</span>`+
		`</a>`
	);
}

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export function plugin(eleventyConfig) {
	eleventyConfig.setLibrary("md", markdownLibrary);
}
export const library = markdownLibrary;
