import React from "react";

import MobileNavMenu from "./MobileNavMenu";
import DesktopNavMenu from "./DesktopNavMenu";
import useWindowDimensions from "../../../hooks/use-window-dimensions.hook";
import useHasMounted from "../../../hooks/use-has-mounted.hook";
import { BREAKPOINTS } from "../../../constants";

const NavMenu = () => {
  const hasMounted = useHasMounted();
  const { width } = useWindowDimensions();

  if (!hasMounted) return null;

  return width && width < BREAKPOINTS.laptopMin ? (
    <MobileNavMenu />
  ) : (
    <DesktopNavMenu />
  );
};

export default NavMenu;
