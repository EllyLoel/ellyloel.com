import React, { useRef, useEffect, useState } from "react";
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
  bottom: 0,
  inlineSize: "100%",
  minBlockSize: "fit-content",
  maskImage: "url(./images/swoosh.svg)",
  maskSize: "max(calc(calc(900 / 16) * 1rem), 100vw)",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "bottom",
  WebkitMaskPosition: "bottom",
  position: "fixed",
  transform: "scale(1, -1)",
  transformOrigin: "center",
  zIndex: 1,

  "&[data-state='open']": {
    maskImage: "unset",
    maskSize: "unset",
    maskRepeat: "unset",
    WebkitMaskRepeat: "unset",
    maskPosition: "unset",
    WebkitMaskPosition: "unset",
  },

  "@supports (backdrop-filter: blur(8px))": {
    backdropFilter: "blur(8px)",
  },
});

const Icon = styled("svg", {
  stroke: "$accentBg",
  strokeWidth: 2,

  "& .line1": {
    transition: "opacity 0.2s ease-in-out",
  },

  "& .line2": {
    transformOrigin: "center",
    transition: "transform 0.2s ease-in-out",
  },

  "& .line3": {
    transformOrigin: "center",
    transition: "transform 0.2s ease-in-out",
  },
});

const ViewportPosition = styled("div", {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  bottom: "100%",
  left: 0,
});

const MobileNavMenu = () => {
  const triggerRef = useRef(null);

  useEffect(() => {
    console.log(triggerRef); // TODO: figure out how to get updated data-state value
  }, [triggerRef]);

  return (
    <NavMask>
      <NavMenuRoot
        id="nav"
        css={{
          transform: "scale(1, -1)",
          transformOrigin: "center",
          paddingBlockStart: "$size8",
          paddingBlockEnd: "$size3",

          "& > *": {
            inlineSize: "100%",
          },
        }}
      >
        <NavMenuList css={{ justifyContent: "space-between" }}>
          <NavMenuItem>
            <NavMenuLink to="/" label="Home">
              <Logo />
            </NavMenuLink>
          </NavMenuItem>

          <NavMenuItem>
            <NavMenuTrigger ref={triggerRef}>
              <Icon width="32" height="32" viewBox="0 0 24 24">
                <line className="line1" x1="3" y1="12" x2="21" y2="12"></line>
                <line className="line2" x1="3" y1="6" x2="21" y2="6"></line>
                <line className="line3" x1="3" y1="18" x2="21" y2="18"></line>
              </Icon>
            </NavMenuTrigger>
            <NavMenuContent disableOutsidePointerEvents={true}>
              <NavMenuSub orientation="vertical">
                <NavMenuList style={{ flexDirection: "column" }}>
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
                    <NavMenuLink
                      to="https://twitter.ellyloel.com/"
                      label="Twitter"
                    >
                      <FaTwitter />
                    </NavMenuLink>
                  </NavMenuItem>

                  <NavMenuItem>
                    <NavMenuLink
                      to="https://linkedin.ellyloel.com/"
                      label="LinkedIn"
                    >
                      <FaLinkedin />
                    </NavMenuLink>
                  </NavMenuItem>

                  <NavMenuItem>
                    <NavMenuLink to="mailto:hello@ellyloel.com" label="Email">
                      <FaEnvelope />
                    </NavMenuLink>
                  </NavMenuItem>
                </NavMenuList>
              </NavMenuSub>
            </NavMenuContent>
          </NavMenuItem>
        </NavMenuList>

        <ViewportPosition>
          <NavMenuViewport />
        </ViewportPosition>
      </NavMenuRoot>
    </NavMask>
  );
};

export default MobileNavMenu;
