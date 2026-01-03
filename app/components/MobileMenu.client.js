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
          <Link href="/contact" className="mobile-menu-cta btn" onClick={closeMenu}>
            Get Started
          </Link>
        </nav>
      </div>

      <style jsx>{`
        .mobile-menu-toggle {
          display: none;
          background: transparent;
          border: none;
          padding: 8px;
          cursor: pointer;
          z-index: 10001;
          position: relative;
        }

        @media (max-width: 900px) {
          .mobile-menu-toggle {
            display: block;
          }
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 28px;
          height: 22px;
          position: relative;
        }

        .hamburger span {
          display: block;
          width: 100%;
          height: 3px;
          background: #5DCDDB;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translateY(10px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translateY(-10px);
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(15, 15, 15, 0.98);
          backdrop-filter: blur(10px);
          z-index: 10000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 24px;
          padding: 20px;
        }

        .mobile-menu-link {
          color: #A0A0A0;
          text-decoration: none;
          font-size: 24px;
          font-weight: 700;
          transition: color 0.3s ease;
          position: relative;
        }

        .mobile-menu-link.active {
          color: #5DCDDB;
        }

        .mobile-menu-link:hover {
          color: #FFFFFF;
        }

        .mobile-menu-cta {
          margin-top: 20px;
          padding: 14px 36px;
          font-size: 16px;
        }
      `}</style>
    </>
  );
}
