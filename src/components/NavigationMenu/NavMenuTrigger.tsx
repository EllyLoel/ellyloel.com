import { styled } from "../../../stitches.config";
import { Trigger } from "@radix-ui/react-navigation-menu";

import itemStyles from "./ItemStyles";

const NavMenuTrigger = styled(Trigger, {
  ...itemStyles,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
});

export default NavMenuTrigger;
