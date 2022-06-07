import { styled } from "../../../stitches.config";

const Button = styled("button", {
  background: "none",
  padding: 0,
  userSelect: "none",
  borderRadius: "$radius2",
  color: "$accentBgHover",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  outlineOffset: 0,

  "&:hover, &:focus": {
    outline: "2px solid currentColor",
    outlineOffset: 2,

    "& > svg": {
      color: "inherit",
      stroke: "currentColor",
    },
  },

  "&:active": {
    outlineOffset: 0,

    "& > svg": {
      stroke: "$accentBgActive",
    },
  },
});

export default Button;
