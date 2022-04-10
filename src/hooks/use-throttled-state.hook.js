/* eslint-disable react-hooks/exhaustive-deps */

/*
  Sometimes, you *don't* want a React component
  to render on every state change. This hook
  allows us to throttle a given piece of state,
  so that components can choose to render less
  often. I use this for performance purposes,
  when a component doesn't need to update
  immediately.
*/

import { useState, useCallback } from 'react';

import { throttle } from '../utils';

function useThrottledState(initialValue, throttleBy = 22) {
  const [value, setValue] = useState(initialValue);

  const throttledSetter = useCallback(
    throttle((newValue) => setValue(newValue), throttleBy),
    [throttleBy]
  );

  return [value, throttledSetter];
}

export default useThrottledState;
