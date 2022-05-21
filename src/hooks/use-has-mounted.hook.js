/* eslint-disable react-hooks/exhaustive-deps */

/*
  https://www.joshwcomeau.com/react/the-perils-of-rehydration/#abstractions
	Checking if mounted to help with rehydration issues
*/

import { useEffect, useState } from "react";

export default function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
