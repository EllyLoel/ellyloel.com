import React, { useContext } from "react";

import { styled, darkTheme } from "../../stitches.config";
import { globalStyles } from "./globalStyles";
import { ThemeContext } from "./ThemeContext";
import { NavMenu } from "./NavigationMenu";

const BackgroundDots = styled("div", {
  inset: "0",
  position: "absolute",
  zIndex: "-1", // Behind everything

  $$dotSize: "1px",
  $$dotSpace: "22px",
  backgroundImage: `
    linear-gradient(90deg, $surface1 calc($$dotSpace - $$dotSize), transparent 1%), 
    linear-gradient($surface1 calc($$dotSpace - $$dotSize), transparent 1%)`,
  backgroundPosition: "center",
  backgroundColor: "$text2",
  backgroundSize: "$$dotSpace $$dotSpace",
  backgroundRepeat: "repeat",
});

const BackgroundGradients = styled("div", {
  inset: "0",
  position: "absolute",
  zIndex: "-1", // Behind everything but above the background dots (DOM order)

  backgroundImage: `
    radial-gradient(circle at 15% 50%, hsl($brandHsl / 25%), hsl($brandHsl / 0%) 25%),
    radial-gradient(circle at 85% 30%, hsl($brandHsl / 25%), hsl($brandHsl / 0%) 25%)`,
  backgroundSize: "100vw 100vh",
  backgroundRepeat: "no-repeat",
});

const Main = styled("main", {
  position: "relative",
  minBlockSize: "100%",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  globalStyles();
  const { colorMode } = useContext(ThemeContext);

  const className =
    colorMode === "dark" ||
    (colorMode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? darkTheme
      : "";

  return (
    <>
      <BackgroundDots /> {/* Behind everything */}
      <BackgroundGradients />{" "}
      {/* Behind everything but above the background dots */}
      {/* Rest of page content */}
      <NavMenu />
      <Main className={className}>{children}</Main>
      {/* TODO: add footer */}
    </>
  );
};

export default Layout;
