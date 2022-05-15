import React, { FC } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Link } from "@radix-ui/react-navigation-menu";

import { styled } from "../../../../stitches.config";
import AccessibleIcon from "../../AccessibleIcon";

const RadixLink = styled(Link, {
  alignItems: "center",
  backgroundColor: "$accentBg",
  borderRadius: "$radiusRound",
  color: "$accentText",
  display: "inline-flex",
  gap: "$size1",
  lineHeight: 1,
  minHeight: "fit-content",
  outline: "2px solid transparent",
  outlineOffset: "2px",
  padding: "$size2 $size3",
  textDecoration: "none",
  transitionProperty: "outline, background-color",
  transitionDuration: "0.3s",
  transitionTimingFunction: "ease-in-out",

  "@motionOK": {
    outlineOffset: "-2px",
    transitionProperty: "outline, outline-offset, background-color",
  },

  "&:hover, &:focus": {
    backgroundColor: "$accentBgHover",
    outline: "2px solid $accentBgHover",
    outlineOffset: "2px",
  },

  "&:active": {
    backgroundColor: "$accentBgActive",
    outlineOffset: "-2px",
  },

  '&[data-logo="true"]': {
    background: "none",
    borderRadius: 0,
    color: "$accentBg",
    marginInlineEnd: "$size3",
    padding: "$size1",
    position: "relative",
    transitionProperty: "color",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease-in-out",

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

  '&[data-icon="true"]': {
    background: "none",
    borderRadius: "$radius2",
    color: "$accentBg",
    outline: "2px solid transparent",
    outlineOffset: "0px",
    padding: "$size1",

    "@motionOK": {
      outlineOffset: "-2px",
    },

    "&:hover, &:focus": {
      color: "$accentBgHover",
      outline: "2px solid currentColor",
      outlineOffset: "0px",
    },
  },
});

type NavMenuLinkProps = {
  to: string;
  label: string;
  children: React.ReactNode;
};

const NavMenuLink: FC<NavMenuLinkProps> = ({
  to,
  label,
  children,
  ...rest
}) => {
  const router = useRouter();
  const isActive = router.asPath === to;
  const isLogo = to === "/";
  const isIcon = label !== "" && to.slice(0) !== "/";

  const Content = (children as string) ? (
    children
  ) : (
    <AccessibleIcon label={label}>{children}</AccessibleIcon>
  );

  const InternalLink = (
    <NextLink href={to} shallow {...rest} passHref>
      <RadixLink active={isActive} data-logo={isLogo} data-icon={isIcon}>
        {Content}
      </RadixLink>
    </NextLink>
  );

  const ExternalLink = (
    <RadixLink
      href={to}
      active={isActive}
      data-logo={isLogo}
      data-icon={isIcon}
    >
      {Content}
    </RadixLink>
  );

  return to.slice(0) === "/" ? InternalLink : ExternalLink;
};

export default NavMenuLink;
