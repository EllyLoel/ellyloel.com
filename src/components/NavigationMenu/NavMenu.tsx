import React from "react";
import { Root as NavMenuRoot } from "@radix-ui/react-navigation-menu";

import { styled } from "../../../stitches.config";
import IconLink from "../IconLink";
import Logo from "../Logo";
import {
  NavMenuContent,
  NavMenuIndicator,
  NavMenuItem,
  NavMenuLink,
  NavMenuList,
  NavMenuSub,
  NavMenuTrigger,
  NavMenuViewport,
} from "./index";

const NavMenu = () => (
  <NavMenuRoot>
    <NavMenuList>
      <NavMenuItem>
        <NavMenuLink to="/" label="Home">
          <Logo />
        </NavMenuLink>
      </NavMenuItem>
      <NavMenuItem>
        <NavMenuLink to="/about" label="">
          About
        </NavMenuLink>
      </NavMenuItem>
    </NavMenuList>
  </NavMenuRoot>
);

export default NavMenu;
