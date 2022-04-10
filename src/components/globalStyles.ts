import { globalCss } from "../../stitches.config";

export const globalStyles = globalCss({
  /*
    Use a more-intuitive box-sizing model.
  */
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
  /*
    Remove default margin & border.
    Set background origin and repeat to sensible defaults 
  */
  "*": {
    margin: 0,

    "&:where(:not(fieldset, progress, meter))": {
      borderWidth: 0,
      borderStyle: "solid",
      backgroundOrigin: "border-box",
      backgroundRepeat: "no-repeat",
    },
  },
  /*
    Allow percentage-based heights in the application
  */
  ":where(html, body, #__next)": {
    blockSize: "100%",
  },
  /*
    https://kilianvalkhof.com/2022/css-html/your-css-reset-needs-text-size-adjust-probably/
  */
  ":where(html)": {
    WebkitTextSizeAdjust: "none",

    "@motionOK": {
      scrollBehavior: "smooth",
    },
  },
  /*
    Typographic tweaks!
    Add accessible line-height
    Improve text rendering
  */
  ":where(body)": {
    lineHeight: "$fontLineheight3",
    WebkitFontSmoothing: "antialiased",
    fontFamily: "$body", // Set default font
  },
  /*
    Improve media defaults
  */
  ":where(img, svg, video, canvas, audio, iframe, embed, object)": {
    display: "block",
    maxInlineSize: "100%",
  },
  ":where(img, svg, video)": {
    maxInlineSize: "100%",
    blockSize: "auto",
  },
  /*
    Remove built-in form typography styles
  */
  ':where(input, button, textarea, select), :where(input[type="file"])::-webkit-file-upload-button':
    {
      font: "inherit",
      fontSize: "inherit",
      color: "inherit",
      letterSpacing: "inherit",
    },
  /*
    Improve default input/form element styles
  */
  ":where(input, select)": {
    paddingInline: "$size2",
    paddingBlock: "$size1",
  },
  ":where(textarea)": { resize: "block" },
  ':where(input[type="checkbox"], input[type="radio"])': {
    blockSize: "$size3",
    inlineSize: "$size3",
  },
  /*
    Avoid text overflows
  */
  ":where(p, h1, h2, h3, h4, h5, h6)": {
    overflowWrap: "break-word",
  },
  /*
    Create a root stacking context
  */
  "#root, #__next": {
    isolation: "isolate",
  },
  /*
    Setup custom fonts
  */
  "@font-face": [
    {
      fontFamily: "Tuppence",
      fontStyle: "normal",
      fontWeight: 700,
      fontDisplay: "auto" /* or block, swap, fallback, optional */,
      src: 'local("Tuppence"), url("/fonts/tuppence-variable.woff2") format("woff2")' /* will be preloaded */,
      unicodeRange: "U+000-5FF" /* Latin glyphs */,
    },
    {
      fontFamily: "JetBrains Mono",
      fontStyle: "normal",
      fontWeight: 400,
      fontDisplay: "auto" /* or block, swap, fallback, optional */,
      src: 'local("JetBrains Mono"), url("/fonts/JetBrainsMono-Regular.woff2") format("woff2")' /* will be preloaded */,
    },
  ],
  /*
    Typography styles
  */
  ":where(h1, h2, h3, h4, h5, h6)": {
    fontFamily: "$heading",
    lineHeight: "$fontLineheight1",
    fontWeight: "$fontWeight9",
  },
  ":where(h1)": {
    fontSize: "$fontSize8",
    maxInlineSize: "$sizeHeader1",
  },
  ":where(h2)": {
    fontSize: "$fontSize6",
    maxInlineSize: "$sizeHeader2",
  },
  ":where(h3)": { fontSize: "$fontSize5" },
  ":where(h4)": { fontSize: "$fontSize4" },
  ":where(h5)": { fontSize: "$fontSize3" },
  ":where(h3, h4, h5, h6, dt)": {
    maxInlineSize: "$sizeHeader3",
  },
  ":where(p, ul, ol, dl, h6)": {
    fontSize: "$fontSize2",
  },
  /*
    Global transitions
  */
  "@motionOK": {
    ":focus-visible": {
      transition: "outline-offset 145ms var(--ease-2)",
    },
    ":where(:not(:active)):focus-visible": {
      transitionDuration: ".25s",
    },
  },
  /*
    Focus visible outline offset
  */
  ":where(:not(:active)):focus-visible": {
    outlineOffset: "5px",
  },
  /*
    Increase the offset for underlined text
  */
  ":where(a, u, ins, abbr)": {
    textUnderlineOffset: "1px",
  },
  /*
    Make interactive elements appear interative
  */
  ':where(a[href], area, button, input, label[for], select, summary, textarea, [tabindex]:not([tabindex*="-"]))':
    {
      cursor: "pointer",
      touchAction: "manipulation",
    },
  /*
    Link styles
  */
  ":where(a)": {
    "&:where([href])": {
      textDecorationColor: "$indigo2",

      "&:where(:visited)": {
        textDecorationColor: "$grape2",
      },
    },

    "&:where(:not(:hover))": {
      textDecoration: "inherit",
    },
  },
  /*
    Increase touch targets
  */
  ":where(a, button)": {
    position: "relative",

    "&::after": {
      $$clickTargetMinimum: "44px",
      $$insetBy: `min(
        0px,
        calc((100% - $$clickTargetMinimum) / 2)
      )`,

      content: '""',
      position: "absolute",
      top: "$$insetBy",
      left: "$$insetBy",
      right: "$$insetBy",
      bottom: "$$insetBy",
    },
  },
  /*
    Improve svg defaults
  */
  ":where(svg)": {
    stroke: "none",
    fill: "currentColor",

    "&:where(:not([fill]))": {
      stroke: "currentColor",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },

    "&:where(:not([width]))": {
      inlineSize: "$size10",
    },
  },
  /*
    Code blocks
  */
  ":where(code, kbd, samp, pre)": {
    fontFamily: "$code",
  },
  ":where(:not(pre) > code, kbd)": { whiteSpace: "nowrap" },
  ":where(pre)": {
    whiteSpace: "pre",
    minInlineSize: 0,
    maxInlineSize: "max-content",
  },
  ":where(:not(pre) > code)": {
    padding: "$size1 $size2",
    background: "$surface2",
    borderRadius: "$radius2",
  },
  ":where(kbd, var)": {
    padding: "$size1 $size2",
    borderWidth: "$borderSize1",
    backgroundColor: "$surface2",
    borderRadius: "$radius2",
  },
  /*
		Highlight text styles
	*/
  ":where(mark)": {
    borderRadius: "$radius2",
    paddingInline: "$size1",
  },
  /*
		List styles
	*/
  ":where(ol, ul)": { paddingInlineStart: "$size8" },
  ":where(li)": { paddingInlineStart: "$size2" },
  ":where(li, dd, figcaption)": { maxInlineSize: "$sizeContent2" },
  ":where(p)": { maxInlineSize: "$sizeContent3" },
  ":where(dt, summary)": { fontWeight: "$fontWeight7" },
  ":where(dt:not(:first-of-type))": {
    marginBlockStart: "$size5",
  },
  /*
		Small styles
	*/
  ":where(small)": {
    fontSize: "max(0.5em, $fontSize0)",
    maxInlineSize: "$sizeContent1",
  },
  /*
		Horizontal rule styles
	*/
  ":where(hr)": {
    marginBlock: "$sizeFluid5",
    height: "$borderSize2",
    backgroundColor: "$surface3",
  },
  /*
		Figure styles
	*/
  ":where(figure)": {
    display: "grid",
    gap: "$size2",
    placeItems: "center",

    "& > :where(figcaption)": {
      fontSize: "$fontSize1",
    },
  },
  /*
		Blockquote
	*/
  ":where(blockquote, :not(blockquote) > cite)": {
    borderInlineStartWidth: "$borderSize3",
  },
  ":where(blockquote)": {
    display: "grid",
    gap: "$size3",
    paddingBlock: "$size3",
    paddingInline: "$size4",
    maxInlineSize: "$sizeContent2",
  },
  ":where(:not(blockquote) > cite)": {
    paddingInlineStart: "$size2",
  },
  /*
		Details and summary styles
	*/
  ":where(summary)": {
    background: "$surface3",
    padding: "$size2 $size3",
    margin: "calc($size2 * -1) calc($size3 * -1)",
    borderRadius: "$radius2",
  },
  ":where(details)": {
    paddingInline: "$size3",
    paddingBlock: "$size2",
    background: "$surface2",
    borderRadius: "$radius2",
  },
  ":where(details[open] > summary)": {
    marginBottom: "$size2",
    borderEndStartRadius: 0,
    borderEndEndRadius: 0,
  },
  /*
		Fieldset styles
	*/
  ":where(fieldset)": {
    borderRadius: "$radius2",
  },
  /*
		Del (strike through) styles
	*/
  ":where(del)": {
    background: "$red9",
    color: "$red2",
  },
  /*
		Ins (del replacement) styles
	*/
  ":where(ins)": {
    background: "$green9",
    color: "$green1",
  },
  /*
		Abbreviation styles
	*/
  ":where(abbr)": {
    textDecorationColor: "$blue5",
  },
});
