import {
  menu_label_styles_default
} from "./chunk.ZKONOT72.js";
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

// src/components/menu-label/menu-label.ts
var SlMenuLabel = class extends s {
  render() {
    return $`
      <div part="base" class="menu-label">
        <slot></slot>
      </div>
    `;
  }
};
SlMenuLabel.styles = menu_label_styles_default;
SlMenuLabel = __decorateClass([
  n("sl-menu-label")
], SlMenuLabel);

export {
  SlMenuLabel
};
