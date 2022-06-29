import React from "react";
import { styled } from "../../stitches.config";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: "inline-flex",
  backgroundColor: "$accentBg",
  borderRadius: 4,
  boxShadow: `0 2px 10px $accentLine`,
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: "unset",
  backgroundColor: "white",
  color: "$accentText",
  height: 35,
  width: 35,
  display: "flex",
  fontSize: 15,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 1,

  "&:first-child": {
    marginLeft: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  "&:last-child": {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },

  "&:hover": {
    backgroundColor: "$accentBgHover",
  },

  "&[data-state=on]": {
    backgroundColor: "$accentBgActive",
    color: "$accentText",
  },

  "&:focus": {
    position: "relative",
    boxShadow: `0 0 0 2px $accentBorder`,
  },
});

export const ToggleGroup = StyledToggleGroup;
export const ToggleGroupItem = StyledItem;

const ToggleGroupDemo = () => (
  <ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">
    <ToggleGroupItem value="left" aria-label="Left aligned">
      Seedling
    </ToggleGroupItem>
    <ToggleGroupItem value="center" aria-label="Center aligned">
      Budding
    </ToggleGroupItem>
    <ToggleGroupItem value="right" aria-label="Right aligned">
      Evergreen
    </ToggleGroupItem>
  </ToggleGroup>
);

export default ToggleGroupDemo;
