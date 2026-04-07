"use client";

import { useEffect } from 'react';

export default function NavLinkActive() {
  useEffect(() => {
    const update = () => {
      const links = document.querySelectorAll('.nav-link') as NodeListOf<HTMLAnchorElement>;
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

    history.pushState = function (data, unused, url) {
      origPush.apply(this, [data, unused, url]);
      setTimeout(update, 40);
    };

    history.replaceState = function (data, unused, url) {
      origReplace.apply(this, [data, unused, url]);
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
