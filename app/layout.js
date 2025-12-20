import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Raster Media - Pixel Perfect Creative Solutions',
  description: 'Modern, pixel-sharp campaigns for brands that want to stand out',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.headerContainer}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}></div>
          <span style={styles.logoText}>RASTER MEDIA</span>
        </div>
        <nav style={styles.nav}>
          <Link href="/" style={styles.navLink}>Home</Link>
          <Link href="/about" style={styles.navLink}>About</Link>
          <Link href="/services" style={styles.navLink}>Services</Link>
          <Link href="/portfolio" style={styles.navLink}>Portfolio</Link>
          <Link href="/contact" style={styles.navLink}>Contact</Link>
        </nav>
        <button style={styles.ctaButton}>Get Started</button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.footerContent}>
          <div style={styles.footerColumn}>
            <div style={styles.footerLogo}></div>
            <p style={styles.footerDesc}>
              Responsible creativity for every pixel. Building brands that resonate.
            </p>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Quick Links</h4>
            <ul style={styles.footerList}>
              <li><Link href="/about" style={styles.footerLink}>About</Link></li>
              <li><Link href="/services" style={styles.footerLink}>Services</Link></li>
              <li><Link href="/portfolio" style={styles.footerLink}>Portfolio</Link></li>
              <li><Link href="/careers" style={styles.footerLink}>Careers</Link></li>
              <li><Link href="/booking" style={styles.footerLink}>Studio Booking</Link></li>
            </ul>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Portfolio</h4>
            <ul style={styles.footerList}>
              <li><Link href="/portfolio/branding" style={styles.footerLink}>Branding Projects</Link></li>
              <li><Link href="/portfolio/photography" style={styles.footerLink}>Photography</Link></li>
              <li><Link href="/portfolio/video" style={styles.footerLink}>Video Production</Link></li>
              <li><Link href="/portfolio/digital" style={styles.footerLink}>Digital Campaigns</Link></li>
              <li><Link href="/portfolio/cases" style={styles.footerLink}>Case Studies</Link></li>
            </ul>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Contact</h4>
            <ul style={styles.footerList}>
              <li style={styles.contactItem}>
                <span style={styles.icon}>✉</span>
                <span style={styles.footerLink}>hello@rastermedia.com</span>
              </li>
              <li style={styles.contactItem}>
                <span style={styles.icon}>📞</span>
                <span style={styles.footerLink}>+1 (555) 123-4567</span>
              </li>
              <li style={styles.contactItem}>
                <span style={styles.icon}>📍</span>
                <span style={styles.footerLink}>123 Creative Street, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© 2024 Raster Media. All rights reserved.</p>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink}>🔗</a>
            <a href="#" style={styles.socialLink}>📘</a>
            <a href="#" style={styles.socialLink}>📷</a>
          </div>
        </div>
      </div>
    </footer>
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
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '20px 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)',
    borderRadius: '4px',
  },
  logoText: {
    fontFamily: 'Cousine, monospace',
    fontSize: '18px',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#FFFFFF',
  },
  nav: {
    display: 'flex',
    gap: '32px',
  },
  navLink: {
    color: '#A0A0A0',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '400',
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
  },
  footer: {
    backgroundColor: '#1A1A1A',
    borderTop: '0.8px solid #000000',
    padding: '64px 0 0',
  },
  footerContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 48px',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '48px',
    marginBottom: '48px',
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  footerLogo: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)',
    borderRadius: '4px',
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
    fontSize: '18px',
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '24px',
    paddingBottom: '24px',
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
    color: '#6B6B6B',
    fontSize: '20px',
    textDecoration: 'none',
    transition: 'color 0.3s',
    cursor: 'pointer',
  },
};