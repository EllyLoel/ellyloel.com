import React from "react";
import NextLink from "next/link";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

import { styled } from "../../stitches.config";
import AccessibleIcon from "./AccessibleIcon";
import Link from "./Link";
import Logo from "./Logo";

const List = styled("ul", {
  gridArea: "social-links",
  display: "flex",
  gap: "$size3",
  alignItems: "center",
  listStyle: "none",
  padding: 0,

  "& li": {
    padding: 0,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const StyledLink = styled(Link, {
  lineHeight: 1,

  '&:not([data-logo="true"])': {
    background: "none",
    borderRadius: "$radius2",
    color: "$accentBg",
    outline: "2px solid transparent",
    outlineOffset: "0px",
    padding: "$size1",
    transitionProperty: "outline, background-color",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease-in-out",

    "@motionOK": {
      outlineOffset: "-2px",
      transitionProperty: "outline, outline-offset, background-color",
    },

    "&:hover, &:focus": {
      color: "$accentBgHover",
      outline: "2px solid currentColor",
      outlineOffset: "0px",
    },

    "&::before": {
      display: "none",
    },
  },

  '&[data-logo="true"]': {
    display: "inline",
    padding: "$size1",

    "& span": {
      color: "inherit",
      zIndex: 1,
    },

    "&::before": {
      backgroundColor: "$accentText",
      blockSize: 3,
      borderRadius: "$radius2",
      bottom: 4,
      content: "''",
      left: 0,
      position: "absolute",
      right: 0,
      transitionProperty: "background-color, bottom, block-size",
      transitionDuration: "0s",
      transitionTimingFunction: "ease-in-out",

      "@motionOK": {
        transitionDuration: "0.2s",
      },
    },

    "&:hover, &:focus": {
      color: "$accentText",
      outline: "none",

      "&::before": {
        backgroundColor: "$accentBgHover",
        blockSize: "100%",
        bottom: 0,
      },
    },
  },
});

const SocialLinks = () => {
  return (
    <List>
      <li>
        <NextLink href="/" passHref>
          <StyledLink data-logo="true">
            <AccessibleIcon label="Home">
              <Logo />
            </AccessibleIcon>
          </StyledLink>
        </NextLink>
      </li>
      <li>
        <StyledLink href="https://twitter.ellyloel.com/">
          <AccessibleIcon label="Twitter">
            <FaTwitter />
          </AccessibleIcon>
        </StyledLink>
      </li>

      <li>
        <StyledLink href="https://linkedin.ellyloel.com/">
          <AccessibleIcon label="LinkedIn">
            <FaLinkedin />
          </AccessibleIcon>
        </StyledLink>
      </li>

      <li>
        <StyledLink href="mailto:hello@ellyloel.com">
          <AccessibleIcon label="Email">
            <FaEnvelope />
          </AccessibleIcon>
        </StyledLink>
      </li>
    </List>
  );
};

export default SocialLinks;
