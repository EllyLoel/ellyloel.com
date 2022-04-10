import React from "react";

import { styled } from "../../stitches.config";
import { IconButton } from "./Button";

const StyledIconLink = styled(IconButton, {});

type IconLinkProps = {
  children: React.ReactNode;
  href: string;
  label: string;
  onClick: () => void;
};

const IconLink: React.FunctionComponent<IconLinkProps> = React.forwardRef(
  ({ children, href, label, onClick }, ref) => (
    <StyledIconLink
      as="a"
      href={href}
      label={label}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </StyledIconLink>
  )
);

export default IconLink;
