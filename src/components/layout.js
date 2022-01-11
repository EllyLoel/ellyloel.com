// IMPORTS ////////////////////////////////////////////////////////////////////

import * as React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

import { ThemeProvider } from './theme-context';

// STYLES /////////////////////////////////////////////////////////////////////

const Global = createGlobalStyle`
  :root {
    --bg-blue: #84ffdc;
    --bg-purple: #dc84ff;
    --gradient-1: rgba(132, 255, 220, 0.25);
    --gradient-2: rgba(220, 132, 255, 0.25);
    --shadow-elevation-low:
      0.3px 0.5px 0.7px hsl(var(--color-shadow) / 0.34),
      0.4px 0.8px 1px -1.2px hsl(var(--color-shadow) / 0.34),
      1px 2px 2.5px -2.5px hsl(var(--color-shadow) / 0.34);
    --shadow-elevation-medium:
      0.3px 0.5px 0.7px hsl(var(--color-shadow) / 0.36),
      0.8px 1.6px 2px -0.8px hsl(var(--color-shadow) / 0.36),
      2.1px 4.1px 5.2px -1.7px hsl(var(--color-shadow) / 0.36),
      5px 10px 12.6px -2.5px hsl(var(--color-shadow) / 0.36);
    --shadow-elevation-high:
      0.3px 0.5px 0.7px hsl(var(--color-shadow) / 0.34),
      1.5px 2.9px 3.7px -0.4px hsl(var(--color-shadow) / 0.34),
      2.7px 5.4px 6.8px -0.7px hsl(var(--color-shadow) / 0.34),
      4.5px 8.9px 11.2px -1.1px hsl(var(--color-shadow) / 0.34),
      7.1px 14.3px 18px -1.4px hsl(var(--color-shadow) / 0.34),
      11.2px 22.3px 28.1px -1.8px hsl(var(--color-shadow) / 0.34),
      17px 33.9px 42.7px -2.1px hsl(var(--color-shadow) / 0.34),
      25px 50px 62.9px -2.5px hsl(var(--color-shadow) / 0.34);
  }

  * {
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
    color: var(--color-text);
  }

  html {
    scroll-behavior: smooth;
    max-width: 100vw;
    height: 100vh;
  }

  body {
    max-width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  #___gatsby {
    height: 100vh;
  }

  #gatsby-focus-wrapper {
    height: 100vh;
  }
`;

const BackgroundDots = styled.div`
  inset: 0;
  position: absolute;
  z-index: -2;

  --dot-size: 1px;
  --dot-space: 22px;

  background: linear-gradient(
        90deg,
        var(--color-background) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center,
    linear-gradient(
        var(--color-background) calc(var(--dot-space) - var(--dot-size)),
        transparent 1%
      )
      center,
    var(--color-text);
  background-size: var(--dot-space) var(--dot-space);
`;

const BackgroundGradients = styled.div`
  inset: 0;
  position: absolute;
  z-index: -1;

  background: radial-gradient(
      circle at 15% 50%,
      var(--gradient-2),
      transparent 25%
    ),
    radial-gradient(circle at 85% 30%, var(--gradient-1), transparent 25%);
  background-size: 100vw 100vh;
  background-repeat: no-repeat;

  /* opacity: 0.5;
  background: linear-gradient(180deg, #ffb7b7 0%, #727272 100%),
    radial-gradient(60.91% 100% at 50% 0%, #ffd1d1 0%, #260000 100%),
    linear-gradient(238.72deg, #ffdddd 0%, #720066 100%),
    linear-gradient(127.43deg, #00ffff 0%, #ff4444 100%),
    radial-gradient(100.22% 100% at 70.57% 0%, #ff0000 0%, #00ffe0 100%),
    linear-gradient(127.43deg, #b7d500 0%, #3300ff 100%);
  background-blend-mode: screen, overlay, hard-light, color-burn, color-dodge,
    normal; */
`;

const Main = styled(motion.main)`
  position: relative;
  min-height: 100%;
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'landing'
    'projects'
    'about'
    'contact';
`;

// COMPONENTS /////////////////////////////////////////////////////////////////

const Layout = ({ children, path }) => (
  <ThemeProvider>
    <Global />
    <Main
      key={path}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        mass: 0.35,
        stiffness: 75,
        duration: 0.3,
      }}
    >
      <BackgroundGradients />
      <BackgroundDots />
      {children}
    </Main>
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
