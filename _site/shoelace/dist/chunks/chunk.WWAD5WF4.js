// node_modules/@lit/reactive-element/css-tag.js
var t = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var e = Symbol();
var n = /* @__PURE__ */ new Map();
var s = class {
  constructor(t3, n5) {
    if (this._$cssResult$ = true, n5 !== e)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3;
  }
  get styleSheet() {
    let e4 = n.get(this.cssText);
    return t && void 0 === e4 && (n.set(this.cssText, e4 = new CSSStyleSheet()), e4.replaceSync(this.cssText)), e4;
  }
  toString() {
    return this.cssText;
  }
};
var o = (t3) => new s("string" == typeof t3 ? t3 : t3 + "", e);
var r = (t3, ...n5) => {
  const o5 = 1 === t3.length ? t3[0] : n5.reduce((e4, n6, s5) => e4 + ((t4) => {
    if (true === t4._$cssResult$)
      return t4.cssText;
    if ("number" == typeof t4)
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n6) + t3[s5 + 1], t3[0]);
  return new s(o5, e);
};
var i = (e4, n5) => {
  t ? e4.adoptedStyleSheets = n5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n5.forEach((t3) => {
    const n6 = document.createElement("style"), s5 = window.litNonce;
    void 0 !== s5 && n6.setAttribute("nonce", s5), n6.textContent = t3.cssText, e4.appendChild(n6);
  });
};
var S = t ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const n5 of t4.cssRules)
    e4 += n5.cssText;
  return o(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var s2;
var e2 = window.trustedTypes;
var r2 = e2 ? e2.emptyScript : "";
var h = window.reactiveElementPolyfillSupport;
var o2 = { toAttribute(t3, i3) {
  switch (i3) {
    case Boolean:
      t3 = t3 ? r2 : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i3) {
  let s5 = t3;
  switch (i3) {
    case Boolean:
      s5 = null !== t3;
      break;
    case Number:
      s5 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s5 = JSON.parse(t3);
      } catch (t4) {
        s5 = null;
      }
  }
  return s5;
} };
var n2 = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
var a = class extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t3) {
    var i3;
    null !== (i3 = this.l) && void 0 !== i3 || (this.l = []), this.l.push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i3, s5) => {
      const e4 = this._$Eh(s5, i3);
      void 0 !== e4 && (this._$Eu.set(e4, s5), t3.push(e4));
    }), t3;
  }
  static createProperty(t3, i3 = l) {
    if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s5 = "symbol" == typeof t3 ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i3);
      void 0 !== e4 && Object.defineProperty(this.prototype, t3, e4);
    }
  }
  static getPropertyDescriptor(t3, i3, s5) {
    return { get() {
      return this[i3];
    }, set(e4) {
      const r4 = this[t3];
      this[i3] = e4, this.requestUpdate(t3, r4, s5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s5 of i3)
        this.createProperty(s5, t4[s5]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i3) {
    const s5 = [];
    if (Array.isArray(i3)) {
      const e4 = new Set(i3.flat(1 / 0).reverse());
      for (const i4 of e4)
        s5.unshift(S(i4));
    } else
      void 0 !== i3 && s5.push(S(i3));
    return s5;
  }
  static _$Eh(t3, i3) {
    const s5 = i3.attribute;
    return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  o() {
    var t3;
    this._$Ep = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), null === (t3 = this.constructor.l) || void 0 === t3 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i3, s5;
    (null !== (i3 = this._$Eg) && void 0 !== i3 ? i3 : this._$Eg = []).push(t3), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t3.hostConnected) || void 0 === s5 || s5.call(t3));
  }
  removeController(t3) {
    var i3;
    null === (i3 = this._$Eg) || void 0 === i3 || i3.splice(this._$Eg.indexOf(t3) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t3, i3) => {
      this.hasOwnProperty(i3) && (this._$Et.set(i3, this[i3]), delete this[i3]);
    });
  }
  createRenderRoot() {
    var t3;
    const s5 = null !== (t3 = this.shadowRoot) && void 0 !== t3 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return i(s5, this.constructor.elementStyles), s5;
  }
  connectedCallback() {
    var t3;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t3 = this._$Eg) || void 0 === t3 || t3.forEach((t4) => {
      var i3;
      return null === (i3 = t4.hostConnected) || void 0 === i3 ? void 0 : i3.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    null === (t3 = this._$Eg) || void 0 === t3 || t3.forEach((t4) => {
      var i3;
      return null === (i3 = t4.hostDisconnected) || void 0 === i3 ? void 0 : i3.call(t4);
    });
  }
  attributeChangedCallback(t3, i3, s5) {
    this._$AK(t3, s5);
  }
  _$ES(t3, i3, s5 = l) {
    var e4, r4;
    const h3 = this.constructor._$Eh(t3, s5);
    if (void 0 !== h3 && true === s5.reflect) {
      const n5 = (null !== (r4 = null === (e4 = s5.converter) || void 0 === e4 ? void 0 : e4.toAttribute) && void 0 !== r4 ? r4 : o2.toAttribute)(i3, s5.type);
      this._$Ei = t3, null == n5 ? this.removeAttribute(h3) : this.setAttribute(h3, n5), this._$Ei = null;
    }
  }
  _$AK(t3, i3) {
    var s5, e4, r4;
    const h3 = this.constructor, n5 = h3._$Eu.get(t3);
    if (void 0 !== n5 && this._$Ei !== n5) {
      const t4 = h3.getPropertyOptions(n5), l4 = t4.converter, a3 = null !== (r4 = null !== (e4 = null === (s5 = l4) || void 0 === s5 ? void 0 : s5.fromAttribute) && void 0 !== e4 ? e4 : "function" == typeof l4 ? l4 : null) && void 0 !== r4 ? r4 : o2.fromAttribute;
      this._$Ei = n5, this[n5] = a3(i3, t4.type), this._$Ei = null;
    }
  }
  requestUpdate(t3, i3, s5) {
    let e4 = true;
    void 0 !== t3 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || n2)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), true === s5.reflect && this._$Ei !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t4, i4) => this[i4] = t4), this._$Et = void 0);
    let i3 = false;
    const s5 = this._$AL;
    try {
      i3 = this.shouldUpdate(s5), i3 ? (this.willUpdate(s5), null === (t3 = this._$Eg) || void 0 === t3 || t3.forEach((t4) => {
        var i4;
        return null === (i4 = t4.hostUpdate) || void 0 === i4 ? void 0 : i4.call(t4);
      }), this.update(s5)) : this._$EU();
    } catch (t4) {
      throw i3 = false, this._$EU(), t4;
    }
    i3 && this._$AE(s5);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i3;
    null === (i3 = this._$Eg) || void 0 === i3 || i3.forEach((t4) => {
      var i4;
      return null === (i4 = t4.hostUpdated) || void 0 === i4 ? void 0 : i4.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    void 0 !== this._$EC && (this._$EC.forEach((t4, i3) => this._$ES(i3, this[i3], t4)), this._$EC = void 0), this._$EU();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
a.finalized = true, a.elementProperties = /* @__PURE__ */ new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, null == h || h({ ReactiveElement: a }), (null !== (s2 = globalThis.reactiveElementVersions) && void 0 !== s2 ? s2 : globalThis.reactiveElementVersions = []).push("1.3.2");

// node_modules/lit-html/lit-html.js
var t2;
var i2 = globalThis.trustedTypes;
var s3 = i2 ? i2.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var e3 = `lit$${(Math.random() + "").slice(9)}$`;
var o3 = "?" + e3;
var n3 = `<${o3}>`;
var l2 = document;
var h2 = (t3 = "") => l2.createComment(t3);
var r3 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var d = Array.isArray;
var u = (t3) => {
  var i3;
  return d(t3) || "function" == typeof (null === (i3 = t3) || void 0 === i3 ? void 0 : i3[Symbol.iterator]);
};
var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var a2 = />/g;
var f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
var _ = /'/g;
var m = /"/g;
var g = /^(?:script|style|textarea|title)$/i;
var p = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
var $ = p(1);
var y = p(2);
var b = Symbol.for("lit-noChange");
var w = Symbol.for("lit-nothing");
var T = /* @__PURE__ */ new WeakMap();
var x = (t3, i3, s5) => {
  var e4, o5;
  const n5 = null !== (e4 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e4 ? e4 : i3;
  let l4 = n5._$litPart$;
  if (void 0 === l4) {
    const t4 = null !== (o5 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o5 ? o5 : null;
    n5._$litPart$ = l4 = new N(i3.insertBefore(h2(), t4), t4, void 0, null != s5 ? s5 : {});
  }
  return l4._$AI(t3), l4;
};
var A = l2.createTreeWalker(l2, 129, null, false);
var C = (t3, i3) => {
  const o5 = t3.length - 1, l4 = [];
  let h3, r4 = 2 === i3 ? "<svg>" : "", d2 = c;
  for (let i4 = 0; i4 < o5; i4++) {
    const s5 = t3[i4];
    let o6, u3, p2 = -1, $2 = 0;
    for (; $2 < s5.length && (d2.lastIndex = $2, u3 = d2.exec(s5), null !== u3); )
      $2 = d2.lastIndex, d2 === c ? "!--" === u3[1] ? d2 = v : void 0 !== u3[1] ? d2 = a2 : void 0 !== u3[2] ? (g.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d2 = f) : void 0 !== u3[3] && (d2 = f) : d2 === f ? ">" === u3[0] ? (d2 = null != h3 ? h3 : c, p2 = -1) : void 0 === u3[1] ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o6 = u3[1], d2 = void 0 === u3[3] ? f : '"' === u3[3] ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a2 ? d2 = c : (d2 = f, h3 = void 0);
    const y2 = d2 === f && t3[i4 + 1].startsWith("/>") ? " " : "";
    r4 += d2 === c ? s5 + n3 : p2 >= 0 ? (l4.push(o6), s5.slice(0, p2) + "$lit$" + s5.slice(p2) + e3 + y2) : s5 + e3 + (-2 === p2 ? (l4.push(void 0), i4) : y2);
  }
  const u2 = r4 + (t3[o5] || "<?>") + (2 === i3 ? "</svg>" : "");
  if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== s3 ? s3.createHTML(u2) : u2, l4];
};
var E = class {
  constructor({ strings: t3, _$litType$: s5 }, n5) {
    let l4;
    this.parts = [];
    let r4 = 0, d2 = 0;
    const u2 = t3.length - 1, c2 = this.parts, [v2, a3] = C(t3, s5);
    if (this.el = E.createElement(v2, n5), A.currentNode = this.el.content, 2 === s5) {
      const t4 = this.el.content, i3 = t4.firstChild;
      i3.remove(), t4.append(...i3.childNodes);
    }
    for (; null !== (l4 = A.nextNode()) && c2.length < u2; ) {
      if (1 === l4.nodeType) {
        if (l4.hasAttributes()) {
          const t4 = [];
          for (const i3 of l4.getAttributeNames())
            if (i3.endsWith("$lit$") || i3.startsWith(e3)) {
              const s6 = a3[d2++];
              if (t4.push(i3), void 0 !== s6) {
                const t5 = l4.getAttribute(s6.toLowerCase() + "$lit$").split(e3), i4 = /([.?@])?(.*)/.exec(s6);
                c2.push({ type: 1, index: r4, name: i4[2], strings: t5, ctor: "." === i4[1] ? M : "?" === i4[1] ? H : "@" === i4[1] ? I : S2 });
              } else
                c2.push({ type: 6, index: r4 });
            }
          for (const i3 of t4)
            l4.removeAttribute(i3);
        }
        if (g.test(l4.tagName)) {
          const t4 = l4.textContent.split(e3), s6 = t4.length - 1;
          if (s6 > 0) {
            l4.textContent = i2 ? i2.emptyScript : "";
            for (let i3 = 0; i3 < s6; i3++)
              l4.append(t4[i3], h2()), A.nextNode(), c2.push({ type: 2, index: ++r4 });
            l4.append(t4[s6], h2());
          }
        }
      } else if (8 === l4.nodeType)
        if (l4.data === o3)
          c2.push({ type: 2, index: r4 });
        else {
          let t4 = -1;
          for (; -1 !== (t4 = l4.data.indexOf(e3, t4 + 1)); )
            c2.push({ type: 7, index: r4 }), t4 += e3.length - 1;
        }
      r4++;
    }
  }
  static createElement(t3, i3) {
    const s5 = l2.createElement("template");
    return s5.innerHTML = t3, s5;
  }
};
function P(t3, i3, s5 = t3, e4) {
  var o5, n5, l4, h3;
  if (i3 === b)
    return i3;
  let d2 = void 0 !== e4 ? null === (o5 = s5._$Cl) || void 0 === o5 ? void 0 : o5[e4] : s5._$Cu;
  const u2 = r3(i3) ? void 0 : i3._$litDirective$;
  return (null == d2 ? void 0 : d2.constructor) !== u2 && (null === (n5 = null == d2 ? void 0 : d2._$AO) || void 0 === n5 || n5.call(d2, false), void 0 === u2 ? d2 = void 0 : (d2 = new u2(t3), d2._$AT(t3, s5, e4)), void 0 !== e4 ? (null !== (l4 = (h3 = s5)._$Cl) && void 0 !== l4 ? l4 : h3._$Cl = [])[e4] = d2 : s5._$Cu = d2), void 0 !== d2 && (i3 = P(t3, d2._$AS(t3, i3.values), d2, e4)), i3;
}
var V = class {
  constructor(t3, i3) {
    this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t3) {
    var i3;
    const { el: { content: s5 }, parts: e4 } = this._$AD, o5 = (null !== (i3 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i3 ? i3 : l2).importNode(s5, true);
    A.currentNode = o5;
    let n5 = A.nextNode(), h3 = 0, r4 = 0, d2 = e4[0];
    for (; void 0 !== d2; ) {
      if (h3 === d2.index) {
        let i4;
        2 === d2.type ? i4 = new N(n5, n5.nextSibling, this, t3) : 1 === d2.type ? i4 = new d2.ctor(n5, d2.name, d2.strings, this, t3) : 6 === d2.type && (i4 = new L(n5, this, t3)), this.v.push(i4), d2 = e4[++r4];
      }
      h3 !== (null == d2 ? void 0 : d2.index) && (n5 = A.nextNode(), h3++);
    }
    return o5;
  }
  m(t3) {
    let i3 = 0;
    for (const s5 of this.v)
      void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
  }
};
var N = class {
  constructor(t3, i3, s5, e4) {
    var o5;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e4, this._$Cg = null === (o5 = null == e4 ? void 0 : e4.isConnected) || void 0 === o5 || o5;
  }
  get _$AU() {
    var t3, i3;
    return null !== (i3 = null === (t3 = this._$AM) || void 0 === t3 ? void 0 : t3._$AU) && void 0 !== i3 ? i3 : this._$Cg;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === t3.nodeType && (t3 = i3.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i3 = this) {
    t3 = P(this, t3, i3), r3(t3) ? t3 === w || null == t3 || "" === t3 ? (this._$AH !== w && this._$AR(), this._$AH = w) : t3 !== this._$AH && t3 !== b && this.$(t3) : void 0 !== t3._$litType$ ? this.T(t3) : void 0 !== t3.nodeType ? this.k(t3) : u(t3) ? this.S(t3) : this.$(t3);
  }
  M(t3, i3 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i3);
  }
  k(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.M(t3));
  }
  $(t3) {
    this._$AH !== w && r3(this._$AH) ? this._$AA.nextSibling.data = t3 : this.k(l2.createTextNode(t3)), this._$AH = t3;
  }
  T(t3) {
    var i3;
    const { values: s5, _$litType$: e4 } = t3, o5 = "number" == typeof e4 ? this._$AC(t3) : (void 0 === e4.el && (e4.el = E.createElement(e4.h, this.options)), e4);
    if ((null === (i3 = this._$AH) || void 0 === i3 ? void 0 : i3._$AD) === o5)
      this._$AH.m(s5);
    else {
      const t4 = new V(o5, this), i4 = t4.p(this.options);
      t4.m(s5), this.k(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = T.get(t3.strings);
    return void 0 === i3 && T.set(t3.strings, i3 = new E(t3)), i3;
  }
  S(t3) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s5, e4 = 0;
    for (const o5 of t3)
      e4 === i3.length ? i3.push(s5 = new N(this.M(h2()), this.M(h2()), this, this.options)) : s5 = i3[e4], s5._$AI(o5), e4++;
    e4 < i3.length && (this._$AR(s5 && s5._$AB.nextSibling, e4), i3.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, i3) {
    var s5;
    for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var i3;
    void 0 === this._$AM && (this._$Cg = t3, null === (i3 = this._$AP) || void 0 === i3 || i3.call(this, t3));
  }
};
var S2 = class {
  constructor(t3, i3, s5, e4, o5) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e4, this.options = o5, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i3 = this, s5, e4) {
    const o5 = this.strings;
    let n5 = false;
    if (void 0 === o5)
      t3 = P(this, t3, i3, 0), n5 = !r3(t3) || t3 !== this._$AH && t3 !== b, n5 && (this._$AH = t3);
    else {
      const e5 = t3;
      let l4, h3;
      for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
        h3 = P(this, e5[s5 + l4], i3, l4), h3 === b && (h3 = this._$AH[l4]), n5 || (n5 = !r3(h3) || h3 !== this._$AH[l4]), h3 === w ? t3 = w : t3 !== w && (t3 += (null != h3 ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
    }
    n5 && !e4 && this.C(t3);
  }
  C(t3) {
    t3 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
  }
};
var M = class extends S2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t3) {
    this.element[this.name] = t3 === w ? void 0 : t3;
  }
};
var k = i2 ? i2.emptyScript : "";
var H = class extends S2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t3) {
    t3 && t3 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
};
var I = class extends S2 {
  constructor(t3, i3, s5, e4, o5) {
    super(t3, i3, s5, e4, o5), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s5;
    if ((t3 = null !== (s5 = P(this, t3, i3, 0)) && void 0 !== s5 ? s5 : w) === b)
      return;
    const e4 = this._$AH, o5 = t3 === w && e4 !== w || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== w && (e4 === w || o5);
    o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i3, s5;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i3 = this.options) || void 0 === i3 ? void 0 : i3.host) && void 0 !== s5 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var L = class {
  constructor(t3, i3, s5) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    P(this, t3);
  }
};
var R = { L: "$lit$", P: e3, V: o3, I: 1, N: C, R: V, j: u, D: P, H: N, F: S2, O: H, W: I, B: M, Z: L };
var z = window.litHtmlPolyfillSupport;
null == z || z(E, N), (null !== (t2 = globalThis.litHtmlVersions) && void 0 !== t2 ? t2 : globalThis.litHtmlVersions = []).push("2.2.4");

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends a {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t3, e4;
    const i3 = super.createRenderRoot();
    return null !== (t3 = (e4 = this.renderOptions).renderBefore) && void 0 !== t3 || (e4.renderBefore = i3.firstChild), i3;
  }
  update(t3) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = x(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), null === (t3 = this._$Dt) || void 0 === t3 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), null === (t3 = this._$Dt) || void 0 === t3 || t3.setConnected(false);
  }
  render() {
    return b;
  }
};
s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
null == n4 || n4({ LitElement: s4 });
(null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.2.0");

export {
  r,
  o2 as o,
  $,
  y,
  b,
  w,
  R,
  s4 as s
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
