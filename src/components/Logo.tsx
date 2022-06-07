import React from "react";
import { styled } from "../../stitches.config";

const StyledLogo = styled("span", {
  fontFamily: "'Nanum Pen Script', cursive",
  fontSize: "$fontSize5",
  fontWeight: "$fontWeight7",
  color: "$brand",
});

const Logo = () => {
  return <StyledLogo aria-hidden>&lt;e//y&gt;</StyledLogo>;
};

export default Logo;
