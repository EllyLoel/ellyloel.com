import React from "react";

import MobileNavMenu from "./MobileNavMenu";
import DesktopNavMenu from "./DesktopNavMenu";
import useWindowDimensions from "../../../hooks/use-window-dimensions.hook";
import { BREAKPOINTS } from "../../../constants";

const NavMenu = () => {
  const { width } = useWindowDimensions();
  if (width === undefined) return null;

  return width < BREAKPOINTS.laptopMin ? <MobileNavMenu /> : <DesktopNavMenu />;
};

export default NavMenu;
