import React from "react";
import { styled } from "../../../stitches.config";

import AccessibleIcon from "../AccessibleIcon";

const StyledButton = styled("button", {
  appearance: "none",
  background: "none",
  padding: 0,
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$text1",
});

type IconButtonProps = {
  children: React.ReactNode;
  label: string;
  [x: string]: any;
};

const IconButton: React.FunctionComponent<IconButtonProps> = ({
  children,
  label,
  ...rest
}) => (
  <StyledButton {...rest}>
    <AccessibleIcon label={label}>{children}</AccessibleIcon>
  </StyledButton>
);

export default IconButton;
