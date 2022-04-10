import { styled, keyframes } from "../../../stitches.config";
import { Content } from "@radix-ui/react-navigation-menu";

const enterFromLeft = keyframes({
  from: { transform: "translateX(-100%)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const enterFromRight = keyframes({
  from: { transform: "translateX(100%)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const exitToLeft = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(-100%)", opacity: 0 },
});

const exitToRight = keyframes({
  from: { transform: "translateX(0)", opacity: 1 },
  to: { transform: "translateX(100%)", opacity: 0 },
});

const NavMenuContent = styled(Content, {
  position: "absolute",
  top: 0,
  left: 0,

  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "250ms",
    animationTimingFunction: "ease",
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
    '&[data-motion="to-start"]': { animationName: exitToLeft },
    '&[data-motion="to-end"]': { animationName: exitToRight },
  },
});

export default NavMenuContent;
