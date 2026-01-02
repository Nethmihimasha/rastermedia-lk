import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.footerContent}>
          <div style={styles.footerColumn}>
            <Link href="/" style={styles.footerLogoLink}>
              <Image
                src="/images/logo.png"
                alt="Raster Media Logo"
                width={300}
                height={120}
                style={styles.footerLogoImage}
              />
            </Link>
            <p style={styles.footerDesc}>
              Responsible creativity for every pixel.
            </p>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul style={styles.footerList}>
                <li><Link href="/about_us" style={styles.footerLink} className="footer-link">about</Link></li>
                <li><Link href="/services" style={styles.footerLink} className="footer-link">services</Link></li>
                <li><Link href="/portfolio" style={styles.footerLink} className="footer-link">portfolio</Link></li>
                <li><Link href="/career" style={styles.footerLink} className="footer-link">career</Link></li>
                <li><Link href="/studio" style={styles.footerLink} className="footer-link">studio</Link></li>
                <li><Link href="/contact" style={styles.footerLink} className="footer-link">contact</Link></li>
                <li><Link href="/review" style={styles.footerLink} className="footer-link">review us</Link></li>
              </ul>
            </nav>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Portfolio</h4>
            <ul style={styles.footerList}>
              <li><Link href="/portfolio?category=photos" style={styles.footerLink} className="footer-link">Photos</Link></li>
              <li><Link href="/portfolio?category=videos" style={styles.footerLink} className="footer-link">Videos</Link></li>
              <li><Link href="/portfolio?category=design" style={styles.footerLink} className="footer-link">Design</Link></li>
              <li><Link href="/portfolio?category=projects" style={styles.footerLink} className="footer-link">Projects</Link></li>
              <li><Link href="/portfolio?category=digital" style={styles.footerLink} className="footer-link">Digital</Link></li>
            </ul>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Contact</h4>
            <ul style={styles.footerList}>
              <li style={styles.contactItem}>
                <span style={styles.icon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block'}} focusable="false" aria-hidden="true"><path d="M3 6.5A2.5 2.5 0 015.5 4h13A2.5 2.5 0 0121 6.5v11A2.5 2.5 0 0118.5 20h-13A2.5 2.5 0 013 18.5v-12z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 6.5l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <a href="mailto:rastermedia.lk@gmail.com" style={styles.footerLink} className="footer-link footer-contact-link">rastermedia.lk@gmail.com</a>
              </li>
              <li style={styles.contactItem}>
                <span style={styles.icon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block'}} focusable="false" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.12 1.05.37 2.08.74 3.06a2 2 0 01-.45 2.11l-1.2 1.2a16 16 0 006 6l1.2-1.2a2 2 0 012.11-.45c.98.37 2.01.62 3.06.74A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                <a href="tel:+94770303250" style={styles.footerLink} className="footer-link footer-contact-link">+94 77 030 3250</a>
              </li>
              <li style={styles.contactItem}>
                <span style={styles.icon} aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block'}} focusable="false" aria-hidden="true"><path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.5" fill="currentColor"/></svg>
                </span>
                <span style={styles.footerLink} className="footer-link footer-contact-link">Wattala Mabola</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© 2025 Raster Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'rgba(37, 37, 37, 0.6)',
    borderTop: 'none',
    padding: '0',
  },
  footerContainer: {
    maxWidth: '1800px',
    margin: '0 auto',
    padding: '64px 48px 0',
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
    borderTop: 'none',
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
