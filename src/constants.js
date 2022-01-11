export const COLORS = {
  text: {
    light: 'hsl(0, 0%, 10%)', // near-black
    dark: 'hsl(0, 0%, 100%)', // white
  },
  background: {
    light: 'hsl(0, 0%, 100%)', // white
    dark: 'hsl(233, 13%, 14%)', // really dark navy blue
  },
  primary: {
    light: 'hsl(43, 100%, 76%)', // Yellow
    dark: 'hsl(43, 100%, 76%)', // Yellow
  },
  // Grays, scaling from least-noticeable to most-noticeable
  gray300: {
    light: 'hsl(0, 0%, 70%)',
    dark: 'hsl(0, 0%, 30%)',
  },
  gray500: {
    light: 'hsl(0, 0%, 50%)',
    dark: 'hsl(0, 0%, 50%)',
  },
  gray700: {
    light: 'hsl(0, 0%, 30%)',
    dark: 'hsl(0, 0%, 70%)',
  },
  shadow: {
    light: '0 0% 63%',
    dark: '0 0% 0%',
  },
};

export const COLOR_MODE_KEY = 'color-mode';
export const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode';
