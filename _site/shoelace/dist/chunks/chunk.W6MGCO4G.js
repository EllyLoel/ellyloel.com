import {
  __spreadValues
} from "./chunk.K2NRSETB.js";

// src/internal/watch.ts
function watch(propName, options) {
  const resolvedOptions = __spreadValues({
    waitUntilFirstUpdate: false
  }, options);
  return (proto, decoratedFnName) => {
    const { update } = proto;
    if (propName in proto) {
      const propNameKey = propName;
      proto.update = function(changedProps) {
        if (changedProps.has(propNameKey)) {
          const oldValue = changedProps.get(propNameKey);
          const newValue = this[propNameKey];
          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              this[decoratedFnName](oldValue, newValue);
            }
          }
        }
        update.call(this, changedProps);
      };
    }
  };
}

export {
  watch
};
