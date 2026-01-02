"use client";

import { useEffect } from 'react';

export default function NavLinkActive() {
  useEffect(() => {
    const update = () => {
      const links = document.querySelectorAll('.nav-link');
      links.forEach((a) => {
        try {
          const url = new URL(a.href);
          a.classList.toggle('active', url.pathname === window.location.pathname);
        } catch {
          // ignore
        }
      });
    };

    update();

    const onPop = () => update();
    window.addEventListener('popstate', onPop);

    // monkey-patch pushState/replaceState to detect SPA navs
    const origPush = history.pushState;
    const origReplace = history.replaceState;

    history.pushState = function (...args) {
      origPush.apply(this, args);
      setTimeout(update, 40);
    };

    history.replaceState = function (...args) {
      origReplace.apply(this, args);
      setTimeout(update, 40);
    };

    return () => {
      window.removeEventListener('popstate', onPop);
      history.pushState = origPush;
      history.replaceState = origReplace;
    };
  }, []);

  return null;
}
