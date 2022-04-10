import React from "react";
import { styled } from "../../stitches.config";
import itemStyles from "./NavigationMenu/ItemStyles";

const StyledLink = styled("a", {
  ...itemStyles,
  textDecoration: "none",

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

const Link: React.FunctionComponent<LinkProps> = React.forwardRef(
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
