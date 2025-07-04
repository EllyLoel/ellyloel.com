---
title: Modern CSS reset
tags:
  - Seedling
  - Projects
created: 2022-06-20
modified: 2022-08-17
id: 4a46ed11c2303f9f2dbc9033281303e2
date: 2022-06-20
---
I put together a CSS Reset that uses modern CSS features such as :where(), logical properties, prefers-reduced-motion, etc. :sparkles:

Lots of inspiration from Josh W Comeau, Andy Bell, and Adam Argyle.

[Tweet](https://twitter.ellyloel.com/1538752447560110080)
[Gist](https://gist.github.com/EllyLoel/4ff8a6472247e6dd2315fd4038926522)

```css
/*
  Made by Elly Loel - https://ellyloel.com/
  With inspiration from:
    - Josh W Comeau - https://courses.joshwcomeau.com/css-for-js/treasure-trove/010-global-styles/
    - Andy Bell - https://piccalil.li/blog/a-modern-css-reset/
    - Adam Argyle - https://unpkg.com/open-props@1.3.16/normalize.min.css / https://codepen.io/argyleink/pen/KKvRORE

  Notes:
    - `:where()` is used to lower specificity for easy overriding.
*/

* {
	/* Remove default margin on everything */
	margin: 0;
	margin-block: 0;
	margin-inline: 0;
	/* Remove default padding on everything */
	padding: 0;
	padding-block: 0;
	padding-inline: 0;
	/* Calc `em` based line height, bigger line height for smaller font size and smaller line height for bigger font size: https://kittygiraudel.com/2020/05/18/using-calc-to-figure-out-optimal-line-height/ */
	line-height: calc(0.25rem + 1em + 0.25rem);
}

/* Use a more-intuitive box-sizing model on everything */
*,
::before,
::after {
	box-sizing: border-box;
}

/* Set sensible defaults for backgrounds, on all elements except fieldset progress and meter */
*:where(:not(fieldset, progress, meter)) {
	background-origin: border-box;
	background-repeat: no-repeat;
}

html {
	/* Allow percentage-based heights in the application */
	block-size: 100%;
	/* Making sure text size is only controlled by font-size */
	-webkit-text-size-adjust: none;
}

/* Smooth scrolling for users that don't prefer reduced motion */
@media (prefers-reduced-motion: no-preference) {
	html:focus-within {
		scroll-behavior: smooth;
	}
}

body {
	/* Improve text rendering */
	-webkit-font-smoothing: antialiased;
	/* https://marco.org/2012/11/15/text-rendering-optimize-legibility */
	text-rendering: optimizeSpeed;
	/* Allow percentage-based heights in the application */
	min-block-size: 100%;
	/* https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter#example_2 */
	/* scrollbar-gutter: stable both-edges; Removed until this bug is fixed: https://bugs.chromium.org/p/chromium/issues/detail?id=1318404#c2 */
}

/* Improve media defaults */
:where(img, svg, video, canvas, audio, iframe, embed, object) {
	display: block;
}
:where(img, svg, video) {
	block-size: auto;
	max-inline-size: 100%;
}

/* Remove stroke and set fill colour to the inherited font colour */
:where(svg) {
	stroke: none;
	fill: currentColor;
}

/* SVG's without a fill attribute */
:where(svg):where(:not([fill])) {
	/* Remove fill and set stroke colour to the inherited font colour */
	stroke: currentColor;
	fill: none;
	/* Rounded stroke */
	stroke-linecap: round;
	stroke-linejoin: round;
}

/* Set a size for SVG's without a width attribute */
:where(svg):where(:not([width])) {
	inline-size: 5rem;
}

/* Remove built-in form typography styles */
:where(input, button, textarea, select),
:where(input[type="file"])::-webkit-file-upload-button {
	color: inherit;
	font: inherit;
	font-size: inherit;
	letter-spacing: inherit;
	word-spacing: inherit;
}

/* Change textarea resize to vertical only and block only if the browser supports that */
:where(textarea) {
	resize: vertical;
}
@supports (resize: block) {
	:where(textarea) {
		resize: block;
	}
}

/* Fix h1 font size inside article, aside, nav, and section */
h1 {
	font-size: 2em;
}

/* Position list marker inside */
:where(ul, ol) {
	list-style-position: inside;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
:where(ul, ol)[role="list"] {
	list-style: none;
}

/* More readable underline style for anchor tags without a class. This could be set on anchor tags globally, but it can cause conflicts. */
a:not([class]) {
	text-decoration-skip-ink: auto;
}

/* Make it clear that interactive elements are interactive */
:where(
		a[href],
		area,
		button,
		input:where([type="button"], [type="submit"], [type="reset"], [type="checkbox"], [type="radio"]),
		label[for],
		select,
		summary,
		[tabindex]:not([tabindex*="-"])
	) {
	cursor: pointer;
	touch-action: manipulation;
}
:where(input[type="file"]) {
	cursor: auto;
}
:where(input[type="file"])::-webkit-file-upload-button,
:where(input[type="file"])::file-selector-button {
	cursor: pointer;
}

/* Animate focus outline */
@media (prefers-reduced-motion: no-preference) {
	:focus-visible {
		transition: outline-offset 145ms cubic-bezier(0.25, 0, 0.4, 1);
	}
	:where(:not(:active)):focus-visible {
		transition-duration: 0.25s;
	}
}
:where(:not(:active)):focus-visible {
	outline-offset: 5px;
}

/* Make sure there's not a tap highlight interactive elements */
:where(
		a[href],
		button,
		button[type],
		input[type="button"],
		input[type="submit"],
		input[type="reset"]
	),
:where(input[type="file"])::-webkit-file-upload-button,
:where(input[type="file"])::file-selector-button {
	-webkit-tap-highlight-color: transparent;
}

/* Disabled cursor for disabled buttons */
:where(
		button,
		button[type],
		input[type="button"],
		input[type="submit"],
		input[type="reset"]
	)[disabled] {
	cursor: not-allowed;
}

/* Reset UA text transform styles */
input, textarea, select, button, ::file-selector-button {
	text-transform: inherit;
}
```