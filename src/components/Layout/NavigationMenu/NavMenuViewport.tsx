import { styled, keyframes } from "../../../../stitches.config";
import { Viewport } from "@radix-ui/react-navigation-menu";

const scaleIn = keyframes({
  from: { transform: "translateY(100%)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: "translateY(0)", opacity: 1 },
  to: { transform: "translateY(100%)", opacity: 0 },
});

const NavMenuViewport = styled(Viewport, {
  position: "relative",
  transformOrigin: "top center",
  inlineSize: "100%",

  // "@media (prefers-reduced-motion: no-preference)": {
  //   transition: "width, height, 300ms ease",
  //   '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
  //   '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  // },
});

export default NavMenuViewport;
