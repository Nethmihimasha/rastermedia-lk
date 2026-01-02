"use client";

import { useLayoutEffect } from 'react';

export default function CleanBodyAttributes() {
  useLayoutEffect(() => {
    // Remove known extension attributes (e.g., Grammarly) that cause hydration mismatches
    const attrs = Array.from(document.body.attributes).map(a => a.name);
    const toRemove = attrs.filter(name => name.startsWith('data-gr') || name === 'data-new-gr-c-s-check-loaded' || name === 'data-gr-ext-installed');
    toRemove.forEach(name => document.body.removeAttribute(name));
  }, []);

  return null;
}
