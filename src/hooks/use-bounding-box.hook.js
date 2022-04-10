/* eslint-disable react-hooks/exhaustive-deps */

/*
  This hook tracks the size and position for
  a given HTML node. Useful for all sorts of
  whimsical effects!
*/

import { useState, useEffect } from 'react';

import { debounce, throttle } from '../utils';

const useBoundingBox = (ref, scrollDebounce = 60, resizeThrottle = 60) => {
  const [box, setBox] = useState(null);

  useEffect(() => {
    // Don't think this is possible?
    if (!ref.current) {
      return;
    }

    // Wait a sec before calculating the initial value.
    window.setTimeout(() => {
      setBox(ref.current.getBoundingClientRect());
    }, 200);

    function update() {
      const newBox = ref.current?.getBoundingClientRect();

      if (newBox) {
        setBox(newBox);
      }
    }

    const handleScroll = debounce(update, scrollDebounce);
    const handleResize = throttle(update, resizeThrottle);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return box;
};

export default useBoundingBox;
