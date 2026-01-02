import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import NavLinkActive from './components/NavLinkActive.client';
import Footer from './components/Footer';

export const metadata = {
  title: 'Raster Media - Pixel Perfect Creative Solutions',
  description: 'Modern, pixel-sharp campaigns for brands that want to stand out',
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
      <div style={styles.headerContainer}>
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
        <nav style={styles.nav} className="nav">
  <Link href="/" style={styles.navLink} className="nav-link">Home</Link>
  <Link href="/about_us" style={styles.navLink} className="nav-link">About</Link>
  <Link href="/services" style={styles.navLink} className="nav-link">Services</Link>
  <Link href="/portfolio" style={styles.navLink} className="nav-link">Portfolio</Link>
  <Link href="/career" style={styles.navLink} className="nav-link">Career</Link>
  <Link href="/studio" style={styles.navLink} className="nav-link">Studio</Link>
  <Link href="/contact" style={styles.navLink} className="nav-link">Contact</Link>
  
</nav>
        <NavLinkActive />
        <Link href="/contact" style={styles.ctaButton} aria-label="Get Started - Contact Us">Get Started</Link>
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
    zIndex: 1000,
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
    paddingBottom: '64px',
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
  footer: {
    backgroundColor: '#0F0F0F',
    borderTop: '0.8px solid #000000',
    padding: '64px 0 0',
  },
  footerContainer: {
    maxWidth: '1800px',
    margin: '0 auto',
    padding: '0 48px',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '48px',
    marginBottom: '48px',
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  footerLogoLink: {
    textDecoration: 'none',
    display: 'block',
  },
  footerLogoImage: {
    width: 'auto',
    height: 'auto',
    maxHeight: '60px',
    objectFit: 'contain',
  },
  footerDesc: {
    color: '#6B6B6B',
    fontSize: '14px',
    lineHeight: '20px',
  },
  footerHeading: {
    fontSize: '25.904px',
    fontWeight: '600',
    lineHeight: '34px',
    color: '#FFFFFF',
  },
  footerList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  footerLink: {
    color: '#6B6B6B',
    fontSize: '14px',
    textDecoration: 'none',
    transition: 'color 0.3s',
    cursor: 'pointer',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    color: '#5DCDDB',
    verticalAlign: 'middle',
    lineHeight: '1',
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '24px',
    paddingBottom: '20px',
    borderTop: '0.8px solid rgba(255, 255, 255, 0.05)',
  },
  copyright: {
    color: '#6B6B6B',
    fontSize: '14px',
  },
  socialLinks: {
    display: 'flex',
    gap: '24px',
  },
  socialLink: {
    color: '#5DCDDB',
    fontSize: '20px',
    textDecoration: 'none',
    transition: 'color 0.3s',
    cursor: 'pointer',
  },
};

