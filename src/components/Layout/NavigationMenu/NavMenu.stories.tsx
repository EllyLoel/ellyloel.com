import React from "react";

import Nav, {
  MobileNavMenu as MobileNav,
  DesktopNavMenu as DesktopNav,
} from ".";

export default {
  title: "Layout/Navigation Menu",
  component: Nav,
};

export const ResponsiveNavMenu = () => <Nav />;
export const MobileNavMenu = () => <MobileNav />;
export const DesktopNavMenu = () => <DesktopNav />;

ResponsiveNavMenu.story = {
  parameters: {
    nextRouter: {
      path: "/",
      asPath: "/",
      query: {},
    },
  },
};

MobileNavMenu.story = {
  parameters: {
    nextRouter: {
      path: "/",
      asPath: "/",
      query: {},
    },
  },
};

DesktopNavMenu.story = {
  parameters: {
    nextRouter: {
      path: "/",
      asPath: "/",
      query: {},
    },
  },
};
