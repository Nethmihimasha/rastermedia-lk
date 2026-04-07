'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className={`hamburger ${isOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}>
        <nav className="mobile-menu-nav">
          <Link
            href="/"
            className={`mobile-menu-link ${pathname === '/' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/about_us"
            className={`mobile-menu-link ${pathname === '/about_us' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="/services"
            className={`mobile-menu-link ${pathname === '/services' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Services
          </Link>
          <Link
            href="/portfolio"
            className={`mobile-menu-link ${pathname === '/portfolio' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Portfolio
          </Link>
          <Link
            href="/career"
            className={`mobile-menu-link ${pathname === '/career' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Career
          </Link>
          <Link
            href="/studio"
            className={`mobile-menu-link ${pathname === '/studio' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Studio
          </Link>
          <Link
            href="/contact"
            className={`mobile-menu-link ${pathname === '/contact' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </Link>
          <Link href="/contact" className="mobile-menu-cta" onClick={closeMenu}>
            Get Started
          </Link>
        </nav>
      </div>
    </>
  );
}
