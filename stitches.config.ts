import { createStitches } from '@stitches/react';

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
      'text-light': 'hsl(0, 0%, 10%)',
      'text-dark': 'hsl(0, 0%, 100%)',
      'background-light': 'hsl(0, 0%, 100%)',
      'background-dark': 'hsl(233, 13%, 14%)',
      'primary-light': 'hsl(43, 100%, 76%)',
      'primary-dark': 'hsl(43, 100%, 76%)',
      // Grays, scaling from least-noticeable to most-noticeable
      'gray300-light': 'hsl(0, 0%, 70%)',
      'gray300-dark': 'hsl(0, 0%, 30%)',
      'gray500-light': 'hsl(0, 0%, 50%)',
      'gray500-dark': 'hsl(0, 0%, 50%)',
      'gray700-light': 'hsl(0, 0%, 30%)',
      'gray700-dark': 'hsl(0, 0%, 70%)',
      // Greens, scaling from least-noticeable to most-noticeable
      'green300-light': 'hsl(71, 55%, 70%)',
      'green300-dark': 'hsl(71, 55%, 30%)',
      'green500-light': 'hsl(71, 55%, 50%)',
      'green500-dark': 'hsl(71, 55%, 50%)',
      'green700-light': 'hsl(71, 55%, 30%)',
      'green700-dark': 'hsl(71, 55%, 70%)',
      'shadow-light': '0 0% 63%',
      'shadow-dark': '0 0% 0%',
    },
  },
  media: {
    mobileSmall: '(min-width: 320px)',
    mobileLarge: '(min-width: 460px)',
    tabletSmall: '(min-width: 640px)',
    tabletLarge: '(min-width: 768px)',
    laptopSmall: '(min-width: 960px)',
    laptopLarge: '(min-width: 1200px)',
    desktopSmall: '(min-width: 1440px)',
    desktopLarge: '(min-width: 1920px)',
    desktopXLarge: '(min-width: 2560px)',
  },
  utils: {
    marginX: (value) => ({ marginLeft: value, marginRight: value }),
    marginY: (value) => ({ marginTop: value, marginBottom: value }),
    paddingX: (value) => ({ paddingLeft: value, paddingRight: value }),
    paddingY: (value) => ({ paddingTop: value, paddingBottom: value }),
  },
});
