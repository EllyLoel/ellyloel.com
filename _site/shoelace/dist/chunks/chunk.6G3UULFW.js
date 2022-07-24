import {
  $,
  y
} from "./chunk.WWAD5WF4.js";

// node_modules/lit-html/static.js
var o = Symbol.for("");
var e = (t) => {
  var r, e2;
  if ((null === (r = t) || void 0 === r ? void 0 : r.r) === o)
    return null === (e2 = t) || void 0 === e2 ? void 0 : e2._$litStatic$;
};
var l = (t, ...r) => ({ _$litStatic$: r.reduce((r2, o2, e2) => r2 + ((t2) => {
  if (void 0 !== t2._$litStatic$)
    return t2._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t2}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(o2) + t[e2 + 1], t[0]), r: o });
var a = /* @__PURE__ */ new Map();
var s = (t) => (r, ...o2) => {
  const i = o2.length;
  let l2, s2;
  const n2 = [], u2 = [];
  let c, v = 0, $2 = false;
  for (; v < i; ) {
    for (c = r[v]; v < i && void 0 !== (s2 = o2[v], l2 = e(s2)); )
      c += l2 + r[++v], $2 = true;
    u2.push(s2), n2.push(c), v++;
  }
  if (v === i && n2.push(r[i]), $2) {
    const t2 = n2.join("$$lit$$");
    void 0 === (r = a.get(t2)) && (n2.raw = n2, a.set(t2, r = n2)), o2 = u2;
  }
  return t(r, ...o2);
};
var n = s($);
var u = s(y);

export {
  l,
  n
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
