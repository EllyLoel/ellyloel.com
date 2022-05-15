import React, { FC } from "react";
import { styled } from "../../stitches.config";

const StyledLink = styled("a", {
  padding: "8px 12px",
  userSelect: "none",
  borderRadius: 4,
  color: "$brand",
  textDecoration: "none",

  "&:focus-visible": {
    position: "relative",
    outline: "2px solid hsl($brandHsl / 0.6)",
  },

  "&:hover": {
    backgroundColor: "hsl($brandHsl / 0.125)",
  },

  "&[data-active], &:hover": {
    textDecoration: "underline",
    textDecorationColor: "$brand",
  },
});

const Favicon = styled("img", {});

type LinkProps = {
  children: React.ReactNode;
  href: string;
  icon: boolean;
};

const Link: FC<LinkProps> = React.forwardRef(
  ({ children, href, icon, ...props }, forwardedRef) => (
    // @ts-ignore Not sure why it's saying ref should be href as there is already a href
    <StyledLink href={href} ref={forwardedRef} {...props}>
      {icon && (
        <Favicon src={`https://icon.horse/icon?uri=${href}`} aria-hidden />
      )}
      {children}
    </StyledLink>
  )
);

export default Link;
