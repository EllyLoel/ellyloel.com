import { styled } from "../../../../stitches.config";
import { Trigger } from "@radix-ui/react-navigation-menu";

const NavMenuTrigger = styled(Trigger, {
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
    outlineOffset: 2,
    outline: "2px solid currentColor",

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

  '&[data-state="open"]': {
    "& > svg": {
      "& .line1": {
        opacity: 0,
      },

      "& .line2": {
        transform: "translateY(5px) translateX(-4px) rotate(45deg)",
      },

      "& .line3": {
        transform: "translateY(-4px) translateX(-4px) rotate(-45deg)",
      },
    },
  },
});

export default NavMenuTrigger;
