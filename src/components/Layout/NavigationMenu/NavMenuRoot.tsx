import { Root } from "@radix-ui/react-navigation-menu";
import { styled } from "../../../../stitches.config";

const NavMenuRoot = styled(Root, {
  alignItems: "center",
  backgroundColor: "$tealA10",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  paddingInlineStart: "$size6",
  paddingInlineEnd: "$size6",
  paddingBlockStart: "$size8",
  paddingBlockEnd: "$size3",

  "& > *": {
    inlineSize: "100%",
  },

  "@laptopAndUp": {
    flexDirection: "row",
    paddingBlockStart: "$size3",
    paddingBlockEnd: "$size9",

    "& > *": {
      inlineSize: "revert",
    },
  },

  "@desktopAndUp": {
    paddingBlockStart: "$size6",
    paddingBlockEnd: "$size10",
  },

  "@lgDesktopAndUp": {
    paddingBlockEnd: "$size11",
  },

  "@supports (backdrop-filter: blur(8px))": {
    backgroundColor: "$tealA8",
  },
});

export default NavMenuRoot;
