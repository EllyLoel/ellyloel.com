import React, { FC } from "react";
import { styled } from "../../stitches.config";

const StyledLink = styled("a", {
  background: "none",
  borderRadius: 0,
  color: "$accentBg",
  cursor: "pointer",
  display: "inline-block",
  paddingInline: "0.2em",
  position: "relative",
  textDecoration: "none",
  transitionProperty: "color",
  transitionDuration: "0.2s",
  transitionTimingFunction: "ease-in-out",
  zIndex: 0,

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
    zIndex: -1,

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
});

const Favicon = styled("img", {
  position: "relative",
  display: "inline-block",
  blockSize: "0.75em",
  marginInlineEnd: "$size1",
  zIndex: 1,
  filter: "grayscale(100%)",
});

type LinkProps = {
  children: React.ReactNode;
  href?: string;
  icon?: boolean;
};

const Link: FC<LinkProps> = React.forwardRef(
  ({ children, href, icon, ...props }, forwardedRef) => (
    // @ts-ignore Not sure why it's saying ref should be href as there is already a href
    <StyledLink href={href} ref={forwardedRef} {...props}>
      {icon ? (
        <>
          <Favicon src={`https://icon.horse/icon?uri=${href}`} aria-hidden />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </StyledLink>
  )
);

export default Link;
