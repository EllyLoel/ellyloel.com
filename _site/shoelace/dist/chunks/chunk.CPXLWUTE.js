import {
  autoIncrement
} from "./chunk.KFR7NC2M.js";
import {
  tab_styles_default
} from "./chunk.C6LYGBDK.js";
import {
  LocalizeController
} from "./chunk.6WMYSCDC.js";
import {
  o
} from "./chunk.IAELDRGJ.js";
import {
  emit
} from "./chunk.UY5AQKHP.js";
import {
  e,
  i,
  n
} from "./chunk.VKNZYXSO.js";
import {
  $,
  s
} from "./chunk.WWAD5WF4.js";
import {
  __decorateClass
} from "./chunk.K2NRSETB.js";

// src/components/tab/tab.ts
var SlTab = class extends s {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.attrId = autoIncrement();
    this.componentId = `sl-tab-${this.attrId}`;
    this.panel = "";
    this.active = false;
    this.closable = false;
    this.disabled = false;
  }
  focus(options) {
    this.tab.focus(options);
  }
  blur() {
    this.tab.blur();
  }
  handleCloseClick() {
    emit(this, "sl-close");
  }
  render() {
    this.id = this.id.length > 0 ? this.id : this.componentId;
    return $`
      <div
        part="base"
        class=${o({
      tab: true,
      "tab--active": this.active,
      "tab--closable": this.closable,
      "tab--disabled": this.disabled
    })}
        role="tab"
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-selected=${this.active ? "true" : "false"}
        tabindex=${this.disabled || !this.active ? "-1" : "0"}
      >
        <slot></slot>
        ${this.closable ? $`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            ` : ""}
      </div>
    `;
  }
};
SlTab.styles = tab_styles_default;
__decorateClass([
  i(".tab")
], SlTab.prototype, "tab", 2);
__decorateClass([
  e({ reflect: true })
], SlTab.prototype, "panel", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTab.prototype, "active", 2);
__decorateClass([
  e({ type: Boolean })
], SlTab.prototype, "closable", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlTab.prototype, "disabled", 2);
__decorateClass([
  e()
], SlTab.prototype, "lang", 2);
SlTab = __decorateClass([
  n("sl-tab")
], SlTab);

export {
  SlTab
};
