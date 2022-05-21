import { styled, keyframes } from "../../../../stitches.config";
import { Content } from "@radix-ui/react-navigation-menu";

const enterFromBottom = keyframes({
  from: { transform: "translateY(-100%)" },
  to: { transform: "translateY(0)" },
});

const enterFromTop = keyframes({
  from: { transform: "translateY(100%)" },
  to: { transform: "translateY(0)" },
});

const exitToBottom = keyframes({
  from: { transform: "translateY(0)" },
  to: { transform: "translateY(-100%)" },
});

const exitToTop = keyframes({
  from: { transform: "translateY(0)" },
  to: { transform: "translateY(100%)" },
});

const NavMenuContent = styled(Content, {
  paddingBlockStart: "$size3",

  // "@media (prefers-reduced-motion: no-preference)": {
  //   animationDuration: "250ms",
  //   animationTimingFunction: "ease-in-out",
  //   '&[data-motion="from-start"]': { animationName: enterFromBottom },
  //   '&[data-motion="from-end"]': { animationName: enterFromTop },
  //   '&[data-motion="to-start"]': { animationName: exitToBottom },
  //   '&[data-motion="to-end"]': { animationName: exitToTop },
  // },
});

export default NavMenuContent;
