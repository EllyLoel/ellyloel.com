import {
  radio_button_styles_default
} from "./chunk.2HI5ZYWQ.js";
import {
  defaultValue
} from "./chunk.XM2NSF2I.js";
import {
  FormSubmitController
} from "./chunk.67FQMIF5.js";
import {
  n as n2
} from "./chunk.6G3UULFW.js";
import {
  HasSlotController
} from "./chunk.3IYPB6RR.js";
import {
  o
} from "./chunk.IAELDRGJ.js";
import {
  l
} from "./chunk.7MO772SN.js";
import {
  watch
} from "./chunk.W6MGCO4G.js";
import {
  emit
} from "./chunk.UY5AQKHP.js";
import {
  e,
  i,
  n,
  t
} from "./chunk.VKNZYXSO.js";
import {
  s
} from "./chunk.WWAD5WF4.js";
import {
  __decorateClass
} from "./chunk.K2NRSETB.js";

// src/components/radio-button/radio-button.ts
var SlRadioButton = class extends s {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      value: (control) => control.checked ? control.value : void 0,
      defaultValue: (control) => control.defaultChecked,
      setValue: (control, checked) => control.checked = checked
    });
    this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
    this.hasFocus = false;
    this.disabled = false;
    this.checked = false;
    this.invalid = false;
    this.defaultChecked = false;
    this.size = "medium";
    this.pill = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "radio");
  }
  click() {
    this.input.click();
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  reportValidity() {
    return this.hiddenInput.reportValidity();
  }
  setCustomValidity(message) {
    this.hiddenInput.setCustomValidity(message);
  }
  handleBlur() {
    this.hasFocus = false;
    emit(this, "sl-blur");
  }
  handleClick() {
    if (!this.disabled) {
      this.checked = true;
    }
  }
  handleFocus() {
    this.hasFocus = true;
    emit(this, "sl-focus");
  }
  handleCheckedChange() {
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
    if (this.hasUpdated) {
      emit(this, "sl-change");
    }
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    if (this.hasUpdated) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }
  render() {
    return n2`
      <div part="base">
        <input class="hidden-input" type="radio" aria-hidden="true" tabindex="-1" />
        <button
          part="button"
          class=${o({
      button: true,
      "button--default": true,
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--checked": this.checked,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--outline": true,
      "button--pill": this.pill,
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
          ?disabled=${this.disabled}
          type="button"
          name=${l(this.name)}
          value=${l(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <span part="prefix" class="button__prefix">
            <slot name="prefix"></slot>
          </span>
          <span part="label" class="button__label">
            <slot></slot>
          </span>
          <span part="suffix" class="button__suffix">
            <slot name="suffix"></slot>
          </span>
        </button>
      </div>
    `;
  }
};
SlRadioButton.styles = radio_button_styles_default;
__decorateClass([
  i(".button")
], SlRadioButton.prototype, "input", 2);
__decorateClass([
  i(".hidden-input")
], SlRadioButton.prototype, "hiddenInput", 2);
__decorateClass([
  t()
], SlRadioButton.prototype, "hasFocus", 2);
__decorateClass([
  e()
], SlRadioButton.prototype, "name", 2);
__decorateClass([
  e()
], SlRadioButton.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRadioButton.prototype, "disabled", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRadioButton.prototype, "checked", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRadioButton.prototype, "invalid", 2);
__decorateClass([
  defaultValue("checked")
], SlRadioButton.prototype, "defaultChecked", 2);
__decorateClass([
  watch("checked")
], SlRadioButton.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlRadioButton.prototype, "handleDisabledChange", 1);
__decorateClass([
  e({ reflect: true })
], SlRadioButton.prototype, "size", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], SlRadioButton.prototype, "pill", 2);
SlRadioButton = __decorateClass([
  n("sl-radio-button")
], SlRadioButton);

export {
  SlRadioButton
};
