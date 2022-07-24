import {
  divider_styles_default
} from "./chunk.3BXSLVOI.js";
import {
  watch
} from "./chunk.W6MGCO4G.js";
import {
  e,
  n
} from "./chunk.VKNZYXSO.js";
import {
  s
} from "./chunk.WWAD5WF4.js";
import {
  __decorateClass
} from "./chunk.K2NRSETB.js";

// src/components/divider/divider.ts
var SlDivider = class extends s {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  firstUpdated() {
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
  }
};
SlDivider.styles = divider_styles_default;
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlDivider.prototype, "vertical", 2);
__decorateClass([
  watch("vertical")
], SlDivider.prototype, "handleVerticalChange", 1);
SlDivider = __decorateClass([
  n("sl-divider")
], SlDivider);

export {
  SlDivider
};
