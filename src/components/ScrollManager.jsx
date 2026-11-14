'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Scrolls to a #section after navigation, and to the top on page changes. */
const ScrollManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => clearTimeout(timer);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname]);

  return null;
};

export default ScrollManager;
