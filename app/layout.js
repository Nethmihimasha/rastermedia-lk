import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import NavLinkActive from './components/NavLinkActive.client';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu.client';

export const metadata = {
  title: 'Raster Media - Pixel Perfect Creative Solutions',
  description: 'Modern, pixel-sharp campaigns for brands that want to stand out',
  icons: {
    icon: '/monogram.png',
    shortcut: '/monogram.png',
    apple: '/monogram.png'
  }
};

import CleanBodyAttributes from './components/CleanBodyAttributes.client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/erbaum/Erbaum-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/erbaum/Erbaum-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/monogram.png" />
        <link rel="shortcut icon" href="/monogram.png" />
        <style>{`
          .hero-heading { font-family: 'Erbaum', 'Cousine', monospace !important; }
          .btn { font-family: 'Erbaum', 'Cousine', monospace !important; }
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <CleanBodyAttributes />
        <Header />
        <main style={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.headerContainer} className="header-container">
        <Link href="/" style={styles.logoLink}>
          <div style={styles.logo}>
            <Image
              src="/images/logo.png"
              alt="Raster Media Logo"
              width={180}
              height={60}
              style={styles.logoImage}
              priority
            />
          </div>
        </Link>
        <nav style={styles.nav} className="nav desktop-nav">
  <Link href="/" style={styles.navLink} className="nav-link">Home</Link>
  <Link href="/about_us" style={styles.navLink} className="nav-link">About</Link>
  <Link href="/services" style={styles.navLink} className="nav-link">Services</Link>
  <Link href="/portfolio" style={styles.navLink} className="nav-link">Portfolio</Link>
  <Link href="/career" style={styles.navLink} className="nav-link">Career</Link>
  <Link href="/studio" style={styles.navLink} className="nav-link">Studio</Link>
  <Link href="/contact" style={styles.navLink} className="nav-link">Contact</Link>
  
</nav>
        <NavLinkActive />
        <Link href="/contact" style={styles.ctaButton} className="desktop-cta" aria-label="Get Started - Contact Us">Get Started</Link>
        <MobileMenu />
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(15, 15, 15, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '0.8px solid rgba(93, 205, 219, 0.1)',
    zIndex: 10002,
  },
  headerContainer: {
    maxWidth: '1800px',
    margin: '0 auto',
    padding: '10px 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  main: {
    paddingBottom: '0',
  },
  logoLink: {
    textDecoration: 'none',
    display: 'block',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: 'auto',
    height: 'auto',
    maxHeight: '60px',
    objectFit: 'contain',
  },
  nav: {
    display: 'flex',
    gap: '32px',
  },
  navLink: {
    color: '#A0A0A0',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'color 0.3s',
    cursor: 'pointer',
  },
  ctaButton: {
    padding: '12px 24px',
    background: 'linear-gradient(180deg, #5DCDDB 0%, #7DD8E5 100%)',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.3s',
    textDecoration: 'none',
    display: 'inline-block'
  },
};

