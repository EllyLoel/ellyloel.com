import {
  visually_hidden_styles_default
} from "./chunk.I3ZYOLFS.js";
import {
  n
} from "./chunk.VKNZYXSO.js";
import {
  $,
  s
} from "./chunk.WWAD5WF4.js";
import {
  __decorateClass
} from "./chunk.K2NRSETB.js";

// src/components/visually-hidden/visually-hidden.ts
var SlVisuallyHidden = class extends s {
  render() {
    return $` <slot></slot> `;
  }
};
SlVisuallyHidden.styles = visually_hidden_styles_default;
SlVisuallyHidden = __decorateClass([
  n("sl-visually-hidden")
], SlVisuallyHidden);

export {
  SlVisuallyHidden
};
