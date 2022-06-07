import React, { useContext, useRef } from "react";

import { styled, darkTheme } from "../../../stitches.config";
import { globalStyles } from "../globalStyles";
import { ThemeContext } from "../ThemeContext";
import { MobileNavMenu } from "./NavigationMenu";
import { DesktopNavMenu } from "./NavigationMenu";
import Footer from "./Footer";
import useSize from "../../hooks/useSize.hook";

const BackgroundDots = styled("div", {
  gridColumn: "1 / -1",
  gridRow: "1 / -1",
  zIndex: "-1", // Behind everything

  $$dotSize: "1px",
  $$dotSpace: "22px",
  backgroundImage: `
    linear-gradient(90deg, $accentBase calc($$dotSpace - $$dotSize), transparent 1%), 
    linear-gradient($accentBase calc($$dotSpace - $$dotSize), transparent 1%)`,
  backgroundPosition: "center",
  backgroundColor: "$accentSolid",
  backgroundSize: "$$dotSpace $$dotSpace",
  backgroundRepeat: "repeat",
});

const BackgroundGradients = styled("div", {
  gridColumn: "1 / 4",
  gridRow: "1 / 4",
  zIndex: "-1", // Behind everything but above the background dots (DOM order)

  backgroundImage: `
    radial-gradient(circle at 15% 50%, $tealA3, $tealA1 25%),
    radial-gradient(circle at 85% 30%, $tealA3, $tealA1 25%)`,
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
});

const Header = styled("header", {
  gridRow: "1 / 2",
});

const Main = styled("main", {
  gridRow: "2 / 3",
  minBlockSize: "100%",
  position: "relative",
  display: "grid",
  gap: "$size12",
  color: "$accentTextContrast",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  globalStyles();
  const { colorMode } = useContext(ThemeContext);
  const navRef = useRef<HTMLDivElement>(null);
  const size = useSize(navRef);

  const className =
    colorMode === "dark" ||
    (colorMode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? darkTheme
      : "";

  return (
    <>
      <BackgroundDots className="full-bleed" /> {/* Behind everything */}
      <BackgroundGradients className="full-bleed" />
      {/* Behind everything but above the background dots */}
      {/* Rest of page content */}
      <Header
        className="full-bleed"
        css={{ blockSize: size ? size["height"] : 0 }}
      >
        <MobileNavMenu navRef={navRef} />
        <DesktopNavMenu navRef={navRef} />
      </Header>
      <Main className={className}>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
