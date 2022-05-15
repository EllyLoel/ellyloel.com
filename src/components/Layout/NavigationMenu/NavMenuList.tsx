import { styled } from "../../../../stitches.config";
import { List } from "@radix-ui/react-navigation-menu";

const NavMenuList = styled(List, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "$size2",
  listStyle: "none",
  minBlockSize: "fit-content",
  inlineSize: "100%",
  padding: 0,
});

export default NavMenuList;
