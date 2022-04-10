/* eslint-disable react-hooks/exhaustive-deps */

/*
  A thin wrapper around “useEffect” which
  will only fire when the value changes,
  and not on mount.
*/

import { useEffect, useRef } from 'react';

export default function useEffectOnChange(callback, deps) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    callback();
  }, deps);
}
