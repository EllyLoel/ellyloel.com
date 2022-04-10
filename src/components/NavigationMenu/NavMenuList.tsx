import { styled } from "../../../stitches.config";
import { List } from "@radix-ui/react-navigation-menu";

const NavMenuList = styled(List, {
  all: "unset",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "white",
  padding: 4,
  borderRadius: 6,
  listStyle: "none",
  boxShadow: `$shadow3`,
});

export default NavMenuList;
