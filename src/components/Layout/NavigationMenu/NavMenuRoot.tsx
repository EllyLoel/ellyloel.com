import { Root } from "@radix-ui/react-navigation-menu";
import { styled } from "../../../../stitches.config";

const NavMenuRoot = styled(Root, {
  alignItems: "center",
  backgroundColor: "$tealA9",
  display: "flex",
  justifyContent: "space-between",
  padding: "$size3 $size6",
  paddingBlockEnd: "$size9",

  "@supports (backdrop-filter: blur(8px))": {
    backgroundColor: "$tealA7",
  },
});

export default NavMenuRoot;
