import React, { useRef, useEffect, useState } from "react";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

import { styled } from "../../../../stitches.config";
import Logo from "../../Logo";
import AccessibleIcon from "../../AccessibleIcon";
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
  maskImage: "url(./images/swoosh-mobile.svg)",
  maskSize: "max(calc(calc(900 / 16) * 1rem), 100vw)",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "10% 0%",
  WebkitMaskPosition: "10% 0%",
  position: "fixed",
  zIndex: 1,

  "&[data-open='true']": {
    blockSize: "fit-content",
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
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

const MobileNavMenu = () => {
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleInteraction = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    let button = event?.target as HTMLButtonElement;
    button?.dataset?.state === "closed" ? setOpen(true) : setOpen(false);
  };

  return (
    <NavMask data-open={open ? "true" : "false"}>
      <NavMenuRoot id="nav">
        <NavMenuList css={{ justifyContent: "space-between" }}>
          <NavMenuItem>
            <NavMenuLink to="/" label="Home">
              <Logo />
            </NavMenuLink>
          </NavMenuItem>

          <NavMenuItem css={{ marginBlockStart: "6px" }}>
            <NavMenuTrigger
              ref={triggerRef}
              onPointerMove={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
              onClick={handleInteraction}
              onKeyDown={handleInteraction}
            >
              <AccessibleIcon
                label={open ? "Close navigation menu" : "Open navigation menu"}
              >
                <Icon width="32" height="32" viewBox="0 0 24 24">
                  <line className="line1" x1="3" y1="12" x2="21" y2="12"></line>
                  <line className="line2" x1="3" y1="6" x2="21" y2="6"></line>
                  <line className="line3" x1="3" y1="18" x2="21" y2="18"></line>
                </Icon>
              </AccessibleIcon>
            </NavMenuTrigger>
            <NavMenuContent
              onPointerEnter={(event) => event.preventDefault()}
              onPointerLeave={(event) => event.preventDefault()}
            >
              <NavMenuSub orientation="vertical">
                <NavMenuList
                  css={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingBlockStart: "$size1",
                  }}
                >
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

                <NavMenuList
                  css={{ flexDirection: "column", marginInlineEnd: "$size2" }}
                >
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
