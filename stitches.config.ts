import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";
// @ts-ignore
import OPColors from "open-props/src/colors";
// @ts-ignore
import OPColorsHSL from "open-props/src/colors-hsl";
// @ts-ignore
import OPFonts from "open-props/src/fonts";
// @ts-ignore
import OPSizes from "open-props/src/sizes";
// @ts-ignore
import OPShadows from "open-props/src/shadows";

import { BREAKPOINTS } from "./src/constants";

const CSSVarObjToJSVarObj = (cssVarObj: { [x: string]: any }) =>
  Object.keys(cssVarObj)
    .map((key) => {
      const regex = /[-]+(.)?/g;
      const replacer = (_: any, c: string) => (c ? c.toUpperCase() : "");
      let newKey = key.replace(regex, replacer);

      newKey = newKey.slice(0, 1).toLowerCase() + newKey.slice(1);

      return { [newKey]: cssVarObj[key] };
    })
    .reduce((a, b) => Object.assign({}, a, b));

const splitFontVariables = (Fonts: { [key: string]: string }) => {
  const FontWeights: { [key: string]: string } = {};
  const FontLineheights: { [key: string]: string } = {};
  const FontLetterspacings: { [key: string]: string } = {};
  const FontSizes: { [key: string]: string } = {};
  const FontFamilies: { [key: string]: string } = {};

  for (const fontObjectKey in Fonts) {
    if (fontObjectKey.includes("fontSize"))
      FontSizes[fontObjectKey] = Fonts[fontObjectKey];

    if (fontObjectKey.includes("fontWeight"))
      FontWeights[fontObjectKey] = Fonts[fontObjectKey];

    if (fontObjectKey.includes("fontLineheight"))
      FontLineheights[fontObjectKey] = Fonts[fontObjectKey];

    if (fontObjectKey.includes("fontLetterspacing"))
      FontLetterspacings[fontObjectKey] = Fonts[fontObjectKey];

    if (fontObjectKey === ("fontMono" || "fontSans" || "fontSerif"))
      FontFamilies[fontObjectKey] = Fonts[fontObjectKey];
  }

  return {
    FontSizes,
    FontWeights,
    FontLineheights,
    FontLetterspacings,
    FontFamilies,
  };
};

const Colors = CSSVarObjToJSVarObj(OPColors);
const ColorsHSL = CSSVarObjToJSVarObj(OPColorsHSL);
const Fonts = CSSVarObjToJSVarObj(OPFonts);
const {
  FontSizes,
  FontWeights,
  FontLineheights,
  FontLetterspacings,
  FontFamilies,
} = splitFontVariables(Fonts);
const Sizes = CSSVarObjToJSVarObj(OPSizes);
const Shadows = CSSVarObjToJSVarObj(OPShadows);

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...Colors,
      ...ColorsHSL,

      brand: "$teal6",
      brandHsl: "$teal6Hsl",

      text1: "$gray8",
      text2: "$gray7",

      surface1: "$gray2",
      surface2: "$gray0",
      surface3: "$gray1",
      surface4: "$gray3",
    },
    fonts: {
      heading: "Tuppence, ui-serif, serif",
      body: '"Source Sans Pro", system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif',
      code: '"JetBrains Mono", Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco, Droid Sans Mono, Source Code Pro, monospace',
      ...FontFamilies,
    },
    fontSizes: FontSizes,
    fontWeights: FontWeights,
    lineHeights: FontLineheights,
    letterSpacings: FontLetterspacings,
    radii: Sizes,
    sizes: Sizes,
    space: Sizes,
    borderWidths: Sizes,
    shadows: Shadows,
  },
  media: {
    // Viewport media queries
    tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
    laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
    desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,

    // Capability media queries
    touch: "(hover: none) and (pointer: coarse)",
    stylus: "(hover: none) and (pointer: fine)",
    pointer: "(hover) and (pointer: coarse)",
    mouse: "(hover) and (pointer: fine)",

    HDR: "(dynamic-range: high)",

    // Preference media queries
    OSdark: "(prefers-color-scheme: dark)",
    OSlight: "(prefers-color-scheme: light)",

    motionOK: "(prefers-reduced-motion: no-preference)",
    motionNotOK: "(prefers-reduced-motion: reduce)",

    // Preference media queries extended
    highContrast: "(prefers-contrast: high)",
    lowContrast: "(prefers-contrast: low)",

    opacityOK: "(prefers-reduced-transparency: no-preference)",
    opacityNotOK: "(prefers-reduced-transparency: reduce)",

    useDataOK: "(prefers-reduced-data: no-preference)",
    useDataNotOK: "(prefers-reduced-data: reduce)",
  },
  utils: {},
});
type CSS = Stitches.CSS<typeof config>;

export const darkTheme = createTheme({
  colors: {
    ...Colors,
    ...ColorsHSL,

    brand: "$teal3",
    brandHsl: "$teal3Hsl",

    text1: "$gray1",
    text2: "$gray3",

    surface1: "$gray9",
    surface2: "$gray8",
    surface3: "$gray7",
    surface4: "$gray6",
  },
});
