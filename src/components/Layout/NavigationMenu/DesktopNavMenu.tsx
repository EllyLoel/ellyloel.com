import React from "react";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

import { styled } from "../../../../stitches.config";
import Logo from "../../Logo";
import {
  NavMenuContent,
  NavMenuIndicator,
  NavMenuItem,
  NavMenuLink,
  NavMenuList,
  NavMenuRoot,
  NavMenuSub,
  NavMenuTrigger,
  NavMenuViewport,
} from "./index";

const NavMask = styled("div", {
  position: "fixed",
  zIndex: 1,
  top: 0,
  inlineSize: "100%",
  minBlockSize: "fit-content",
  maskImage: "url(./images/swoosh.svg)",
  maskSize: "100vw",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "bottom",
  WebkitMaskPosition: "bottom",

  "@supports (backdrop-filter: blur(8px))": {
    backdropFilter: "blur(8px)",
  },
});

const DesktopNavMenu = () => (
  <NavMask>
    <NavMenuRoot id="nav">
      <NavMenuList>
        <NavMenuItem>
          <NavMenuLink to="/" label="Home">
            <Logo />
          </NavMenuLink>
        </NavMenuItem>

        <NavMenuItem>
          <NavMenuLink to="/about" label="">
            <i className="twa twa-woman-technologist-medium-light-skin-tone"></i>{" "}
            About
          </NavMenuLink>
        </NavMenuItem>

        <NavMenuItem>
          <NavMenuLink to="/garden" label="">
            <i className="twa twa-herb"></i> Digital garden
          </NavMenuLink>
        </NavMenuItem>
      </NavMenuList>
      <NavMenuList>
        <NavMenuItem>
          <NavMenuLink to="https://twitter.ellyloel.com/" label="Twitter">
            <FaTwitter />
          </NavMenuLink>
        </NavMenuItem>

        <NavMenuItem>
          <NavMenuLink to="https://linkedin.ellyloel.com/" label="LinkedIn">
            <FaLinkedin />
          </NavMenuLink>
        </NavMenuItem>

        <NavMenuItem>
          <NavMenuLink to="mailto:hello@ellyloel.com" label="Email">
            <FaEnvelope />
          </NavMenuLink>
        </NavMenuItem>
      </NavMenuList>
    </NavMenuRoot>
  </NavMask>
);

export default DesktopNavMenu;
