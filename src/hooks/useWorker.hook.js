/* eslint-disable react-hooks/rules-of-hooks */

/*
  Spawns and terminates a Web Worker.
*/

import { useRef, useEffect } from 'react';

const useWorker = (WorkerConstructor) => {
  // In SSR mode, just return a dummy object
  if (typeof window === 'undefined') {
    return {};
  }

  // Create a worker. This will be a long-lived worker, we use for all drawing.
  const worker = useRef(null);
  if (worker.current === null) {
    worker.current = new WorkerConstructor();
  }

  useEffect(() => {
    return () => {
      if (worker.current) {
        worker.current.terminate();
      }
    };
  }, []);

  return worker.current;
};

export default useWorker;
