import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";
import {
  teal,
  tealDark,
  tealA,
  tealDarkA,
  sage,
  sageDark,
  sageA,
  sageDarkA,
} from "@radix-ui/colors";
// @ts-ignore
import OPFonts from "open-props/src/fonts";
// @ts-ignore
import OPSizes from "open-props/src/sizes";
// @ts-ignore
import OPShadows from "open-props/src/shadows";
// @ts-ignore
import OPBorders from "open-props/src/borders";

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

const splitBorderVariables = (Borders: { [key: string]: string }) => {
  const BorderSizes: { [key: string]: string } = {};
  const BorderRadii: { [key: string]: string } = {};

  for (const borderObjectKey in Borders) {
    if (borderObjectKey.includes("BorderSize"))
      BorderSizes[borderObjectKey] = Borders[borderObjectKey];

    if (borderObjectKey.includes("radius"))
      BorderRadii[borderObjectKey] = Borders[borderObjectKey];
  }

  return {
    BorderSizes,
    BorderRadii,
  };
};

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
const Borders = CSSVarObjToJSVarObj(OPBorders);
const { BorderSizes, BorderRadii } = splitBorderVariables(Borders);

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
      ...teal,
      ...tealA,
      ...sage,
      ...sageA,

      accentBase: "$teal1",
      accentBgSubtle: "$teal2",
      accentBg: "$teal3",
      accentBgHover: "$teal4",
      accentBgActive: "$teal5",
      accentLine: "$teal6",
      accentBorder: "$teal7",
      accentBorderHover: "$teal8",
      accentSolid: "$teal9",
      accentSolidHover: "$teal10",
      accentText: "$teal11",
      accentTextContrast: "$teal12",

      neutralBase: "$sage1",
      neutralBgSubtle: "$sage2",
      neutralBg: "$sage3",
      neutralBgHover: "$sage4",
      neutralBgActive: "$sage5",
      neutralLine: "$sage6",
      neutralBorder: "$sage7",
      neutralBorderHover: "$sage8",
      neutralSolid: "$sage9",
      neutralSolidHover: "$sage10",
      neutralText: "$sage11",
      neutralTextContrast: "$sage12",
    },
    fonts: {
      heading: "Tuppence, ui-serif, serif",
      body: "Pangea, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
      code: '"JetBrains Mono", Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco, Droid Sans Mono, Source Code Pro, monospace',
      ...FontFamilies,
    },
    fontSizes: FontSizes,
    fontWeights: FontWeights,
    lineHeights: FontLineheights,
    letterSpacings: FontLetterspacings,
    radii: BorderRadii,
    sizes: Sizes,
    space: Sizes,
    borderWidths: BorderSizes,
    shadows: Shadows,
  },
  media: {
    // Viewport media queries
    tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
    laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
    desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
    lgDesktopAndUp: `(min-width: ${BREAKPOINTS.desktopLgMin / 16}rem)`,

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
    ...tealDark,
    ...tealDarkA,
    ...sageDark,
    ...sageDarkA,

    accentBase: "$teal1",
    accentBgSubtle: "$teal2",
    accentBg: "$teal3",
    accentBgHover: "$teal4",
    accentBgActive: "$teal5",
    accentLine: "$teal6",
    accentBorder: "$teal7",
    accentBorderHover: "$teal8",
    accentSolid: "$teal9",
    accentSolidHover: "$teal10",
    accentText: "$teal11",
    accentTextContrast: "$teal12",

    neutralBase: "$sage1",
    neutralBgSubtle: "$sage2",
    neutralBg: "$sage3",
    neutralBgHover: "$sage4",
    neutralBgActive: "$sage5",
    neutralLine: "$sage6",
    neutralBorder: "$sage7",
    neutralBorderHover: "$sage8",
    neutralSolid: "$sage9",
    neutralSolidHover: "$sage10",
    neutralText: "$sage11",
    neutralTextContrast: "$sage12",
  },
});
