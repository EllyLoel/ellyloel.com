import {
  getIconLibrary,
  unwatchIcon,
  watchIcon
} from "./chunk.QVHXM2I3.js";
import {
  requestIcon
} from "./chunk.P52GZVKG.js";
import {
  icon_styles_default
} from "./chunk.LNQI5NZS.js";
import {
  l
} from "./chunk.7MO772SN.js";
import {
  e as e2,
  i,
  t as t2
} from "./chunk.2JQPDYNA.js";
import {
  watch
} from "./chunk.W6MGCO4G.js";
import {
  emit
} from "./chunk.UY5AQKHP.js";
import {
  e,
  n,
  t
} from "./chunk.VKNZYXSO.js";
import {
  $,
  b,
  s,
  w
} from "./chunk.WWAD5WF4.js";
import {
  __decorateClass
} from "./chunk.K2NRSETB.js";

// node_modules/lit-html/directives/unsafe-html.js
var e3 = class extends i {
  constructor(i2) {
    if (super(i2), this.it = w, i2.type !== t2.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r) {
    if (r === w || null == r)
      return this.ft = void 0, this.it = r;
    if (r === b)
      return r;
    if ("string" != typeof r)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r === this.it)
      return this.ft;
    this.it = r;
    const s2 = [r];
    return s2.raw = s2, this.ft = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
  }
};
e3.directiveName = "unsafeHTML", e3.resultType = 1;
var o = e2(e3);

// node_modules/lit-html/directives/unsafe-svg.js
var t3 = class extends e3 {
};
t3.directiveName = "unsafeSVG", t3.resultType = 2;
var o2 = e2(t3);

// src/components/icon/icon.ts
var parser;
var SlIcon = class extends s {
  constructor() {
    super(...arguments);
    this.svg = "";
    this.label = "";
    this.library = "default";
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated() {
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  getUrl() {
    const library = getIconLibrary(this.library);
    if (this.name && library) {
      return library.resolver(this.name);
    }
    return this.src;
  }
  redraw() {
    this.setIcon();
  }
  async setIcon() {
    var _a;
    const library = getIconLibrary(this.library);
    const url = this.getUrl();
    if (!parser) {
      parser = new DOMParser();
    }
    if (url) {
      try {
        const file = await requestIcon(url);
        if (url !== this.getUrl()) {
          return;
        } else if (file.ok) {
          const doc = parser.parseFromString(file.svg, "text/html");
          const svgEl = doc.body.querySelector("svg");
          if (svgEl !== null) {
            (_a = library == null ? void 0 : library.mutator) == null ? void 0 : _a.call(library, svgEl);
            this.svg = svgEl.outerHTML;
            emit(this, "sl-load");
          } else {
            this.svg = "";
            emit(this, "sl-error");
          }
        } else {
          this.svg = "";
          emit(this, "sl-error");
        }
      } catch (e4) {
        emit(this, "sl-error");
      }
    } else if (this.svg.length > 0) {
      this.svg = "";
    }
  }
  handleChange() {
    this.setIcon();
  }
  render() {
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    return $` <div
      part="base"
      class="icon"
      role=${l(hasLabel ? "img" : void 0)}
      aria-label=${l(hasLabel ? this.label : void 0)}
      aria-hidden=${l(hasLabel ? void 0 : "true")}
    >
      ${o2(this.svg)}
    </div>`;
  }
};
SlIcon.styles = icon_styles_default;
__decorateClass([
  t()
], SlIcon.prototype, "svg", 2);
__decorateClass([
  e({ reflect: true })
], SlIcon.prototype, "name", 2);
__decorateClass([
  e()
], SlIcon.prototype, "src", 2);
__decorateClass([
  e()
], SlIcon.prototype, "label", 2);
__decorateClass([
  e({ reflect: true })
], SlIcon.prototype, "library", 2);
__decorateClass([
  watch("name"),
  watch("src"),
  watch("library")
], SlIcon.prototype, "setIcon", 1);
SlIcon = __decorateClass([
  n("sl-icon")
], SlIcon);

export {
  o,
  SlIcon
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
