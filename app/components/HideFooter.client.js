"use client";

import { useEffect } from 'react';

export default function HideFooter() {
  useEffect(() => {
    document.body.classList.add('hide-footer');
    return () => document.body.classList.remove('hide-footer');
  }, []);

  return null;
}
