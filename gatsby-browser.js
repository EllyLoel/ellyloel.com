import React from 'react';
import { AnimatePresence } from 'framer-motion';

export function wrapPageElement({ element, props }) {
  return <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>;
}
