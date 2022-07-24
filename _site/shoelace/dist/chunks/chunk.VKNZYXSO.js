import {
  __spreadProps,
  __spreadValues
} from "./chunk.K2NRSETB.js";

// node_modules/@lit/reactive-element/decorators/custom-element.js
var n = (n3) => (e4) => "function" == typeof e4 ? ((n4, e5) => (window.customElements.define(n4, e5), e5))(n3, e4) : ((n4, e5) => {
  const { kind: t2, elements: i3 } = e5;
  return { kind: t2, elements: i3, finisher(e6) {
    window.customElements.define(n4, e6);
  } };
})(n3, e4);

// node_modules/@lit/reactive-element/decorators/property.js
var i = (i3, e4) => "method" === e4.kind && e4.descriptor && !("value" in e4.descriptor) ? __spreadProps(__spreadValues({}, e4), { finisher(n3) {
  n3.createProperty(e4.key, i3);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e4.key, initializer() {
  "function" == typeof e4.initializer && (this[e4.key] = e4.initializer.call(this));
}, finisher(n3) {
  n3.createProperty(e4.key, i3);
} };
function e(e4) {
  return (n3, t2) => void 0 !== t2 ? ((i3, e5, n4) => {
    e5.constructor.createProperty(n4, i3);
  })(e4, n3, t2) : i(e4, n3);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t(t2) {
  return e(__spreadProps(__spreadValues({}, t2), { state: true }));
}

// node_modules/@lit/reactive-element/decorators/base.js
var o = ({ finisher: e4, descriptor: t2 }) => (o2, n3) => {
  var r;
  if (void 0 === n3) {
    const n4 = null !== (r = o2.originalKey) && void 0 !== r ? r : o2.key, i3 = null != t2 ? { kind: "method", placement: "prototype", key: n4, descriptor: t2(o2.key) } : __spreadProps(__spreadValues({}, o2), { key: n4 });
    return null != e4 && (i3.finisher = function(t3) {
      e4(t3, n4);
    }), i3;
  }
  {
    const r2 = o2.constructor;
    void 0 !== t2 && Object.defineProperty(o2, n3, t2(n3)), null == e4 || e4(r2, n3);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function i2(i3, n3) {
  return o({ descriptor: (o2) => {
    const t2 = { get() {
      var o3, n4;
      return null !== (n4 = null === (o3 = this.renderRoot) || void 0 === o3 ? void 0 : o3.querySelector(i3)) && void 0 !== n4 ? n4 : null;
    }, enumerable: true, configurable: true };
    if (n3) {
      const n4 = "symbol" == typeof o2 ? Symbol() : "__" + o2;
      t2.get = function() {
        var o3, t3;
        return void 0 === this[n4] && (this[n4] = null !== (t3 = null === (o3 = this.renderRoot) || void 0 === o3 ? void 0 : o3.querySelector(i3)) && void 0 !== t3 ? t3 : null), this[n4];
      };
    }
    return t2;
  } });
}

// node_modules/@lit/reactive-element/decorators/query-async.js
function e2(e4) {
  return o({ descriptor: (r) => ({ async get() {
    var r2;
    return await this.updateComplete, null === (r2 = this.renderRoot) || void 0 === r2 ? void 0 : r2.querySelector(e4);
  }, enumerable: true, configurable: true }) });
}

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n2;
var e3 = null != (null === (n2 = window.HTMLSlotElement) || void 0 === n2 ? void 0 : n2.prototype.assignedElements) ? (o2, n3) => o2.assignedElements(n3) : (o2, n3) => o2.assignedNodes(n3).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);

export {
  n,
  e,
  t,
  i2 as i,
  e2
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
