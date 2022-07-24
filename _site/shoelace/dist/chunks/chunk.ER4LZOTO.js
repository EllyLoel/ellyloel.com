import {
  SlTooltip
} from "./chunk.S7TGEC2J.js";

// src/react/tooltip/index.ts
import * as React from "react";
import { createComponent } from "@lit-labs/react";
var tooltip_default = createComponent(React, "sl-tooltip", SlTooltip, {
  onSlShow: "sl-show",
  onSlAfterShow: "sl-after-show",
  onSlHide: "sl-hide",
  onSlAfterHide: "sl-after-hide"
});

export {
  tooltip_default
};
