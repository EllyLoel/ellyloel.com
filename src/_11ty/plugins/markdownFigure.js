const validFigCaptionValues = new Set([true, false, "alt", "title"]);

function removeAttributeFromList(attrs, attribute) {
	const arr = Array.isArray(attrs) ? attrs : [];

	return arr.filter(([k]) => k !== attribute);
}

function removeAttributeFromImage(image, attribute) {
	if (image && image.attrs) {
		image.attrs = removeAttributeFromList(image.attrs, attribute);
	}
}

function findCaptionText(captionType, image) {
	if (!validFigCaptionValues.has(captionType)) {
		throw new TypeError(`figcaption must be one of: ${[...validFigCaptionValues]}.`);
	}

	if (captionType === "alt") {
		return image.content;
	}

	const captionObj = image.attrs.find(([k]) => k === "title");
	if (Array.isArray(captionObj) && captionObj[1]) {
		removeAttributeFromImage(image, "title");
		return captionObj[1];
	}

	return undefined;
}

export default function imageFiguresPlugin(md, options) {
	options = options || {};

	function imageFigures(state) {
		// do not process first and last token
		for (let i = 1, l = state.tokens.length; i < (l - 1); ++i) {
			const token = state.tokens[i];

			if (token.type !== "inline") {
				continue;
			}
			// children: image alone, or link_open -> image -> link_close
			if (!token.children || (token.children.length !== 1 && token.children.length !== 3)) {
				continue;
			}
			// one child, should be img
			if (token.children.length === 1 && token.children[0].type !== "image") {
				continue;
			}
			// three children, should be image enclosed in link
			if (token.children.length === 3) {
				const [childrenA, childrenB, childrenC] = token.children;
				const isEnclosed = childrenA.type !== "link_open" ||
					childrenB.type !== "image" ||
					childrenC.type !== "link_close";

				if (isEnclosed) {
					continue;
				}
			}
			// prev token is paragraph open
			if (i !== 0 && state.tokens[i - 1].type !== "paragraph_open") {
				continue;
			}
			// next token is paragraph close
			if (i !== (l - 1) && state.tokens[i + 1].type !== "paragraph_close") {
				continue;
			}

			// We have inline token containing an image only.
			// Previous token is paragraph open.
			// Next token is paragraph close.
			// Lets replace the paragraph tokens with figure tokens.
			const figure = state.tokens[i - 1];
			figure.type = "figure_open";
			figure.tag = "figure";
			state.tokens[i + 1].type = "figure_close";
			state.tokens[i + 1].tag = "figure";
			let image;

			if (options.link && token.children.length === 1) {
				[image] = token.children;
				const link = new state.Token("link_open", "a", 1);
				link.attrPush(["href", image.attrGet("src")]);

				token.children.unshift(link);
				token.children.push(new state.Token("link_close", "a", -1));
			}

			// for linked images, image is one off
			image = token.children.length === 1 ? token.children[0] : token.children[1];

			if (options.figcaption) {
				const figCaption = findCaptionText(options.figcaption, image);

				if (figCaption) {
					const [captionContent] = md.parseInline(figCaption, state.env);
					token.children.push(
						new state.Token("figcaption_open", "figcaption", 1)
					);
					token.children.push(...captionContent.children);
					token.children.push(
						new state.Token("figcaption_close", "figcaption", -1)
					);

					if (image.attrs) {
						image.attrs = removeAttributeFromList(image.attrs, "title");
					}
				}
			}

			if (options.copyAttrs && image.attrs) {
				const f = options.copyAttrs === true ? "" : options.copyAttrs;
				// Copying so any further changes aren't duplicated
				figure.attrs = image.attrs
					.filter(([k]) => k.match(f))
					.map(a => Array.from(a));
			}

			if (options.classes && typeof options.classes === "string") {
				let hasClass = false;

				for (let j = 0, length = image.attrs.length; j < length && !hasClass; j++) {
					const attrPair = image.attrs[j];

					if (attrPair[0] === "class") {
						attrPair[1] = `${attrPair[1]} ${options.classes}`;
						hasClass = true;
					}
				}

				if (!hasClass) {
					image.attrs.push(["class", options.classes]);
				}
			}
		}
	}

	md.core.ruler.before("linkify", "image_figures", imageFigures);
}
