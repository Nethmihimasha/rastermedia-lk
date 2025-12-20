'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  return (
    <div style={styles.page}>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <FeaturedWorkSection />
      <BrandsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section style={styles.hero}>
      <div style={styles.heroVideo}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0&rel=0&modestbranding=1"
          title="Hero Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={styles.iframe}
        />
      </div>
      <div style={styles.heroOverlay}></div>
      <div style={styles.heroGrid}></div>
      <PixelPattern style={{ ...styles.pixelPattern, top: '104.53px', left: '1052.13px', transform: 'rotate(4.96deg)' }} size="large" />
      <PixelPattern style={{ ...styles.pixelPattern, bottom: '112.07px', left: '126.11px', transform: 'rotate(-2.92deg)' }} size="medium" />
      
      <div style={styles.heroContent}>
        <h1 style={styles.heroHeading}>
          <div style={styles.heroLine1}>CREATIVITY.</div>
          <div style={styles.heroLine2}>PIXEL PERFECT.</div>
        </h1>
        <p style={styles.heroDescription}>
          We build modern, pixel-sharp campaigns for brands that want to stand out.
        </p>
        <div style={styles.heroButtons}>
          <button style={styles.primaryButton}>START A PROJECT</button>
          <button style={styles.secondaryButton}>VIEW PORTFOLIO</button>
        </div>
        <div style={styles.heroDots}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{
              ...styles.dot,
              opacity: i === 2 ? 0.3 : i === 3 ? 0.33 : i === 4 ? 0.41 : 0.56 + (i * 0.21)
            }}></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: '🎨',
      title: 'Creative & Branding',
      description: 'Building distinctive brand identities that resonate with your audience.',
      hasPattern: true,
    },
    {
      icon: '✏️',
      title: 'Graphic Design',
      description: 'Pixel-perfect designs that blend creativity with strategy.',
      hasPattern: false,
    },
    {
      icon: '📷',
      title: 'Photography',
      description: 'Studio-quality imagery that captures your brand\'s essence.',
      hasPattern: true,
    },
    {
      icon: '🎥',
      title: 'Videography',
      description: 'Cinematic productions that engage audiences and bring stories to life.',
      hasPattern: true,
    },
    {
      icon: '📱',
      title: 'Social Media Advertising',
      description: 'Data-driven campaigns that amplify your reach and drive results.',
      hasPattern: true,
    },
    {
      icon: '📊',
      title: 'Campaign Strategy',
      description: 'Comprehensive marketing strategies designed to achieve your goals.',
      hasPattern: true,
    },
  ];

  return (
    <section style={styles.section}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Our <span className="gradient-text">Services</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Comprehensive creative solutions tailored to elevate your brand and drive impactful results.
          </p>
        </div>
        <div style={styles.servicesGrid}>
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, description, hasPattern }) {
  return (
    <div style={styles.serviceCard}>
      <div style={styles.serviceIcon}>{icon}</div>
      <h3 style={styles.serviceTitle}>{title}</h3>
      <p style={styles.serviceDescription}>{description}</p>
      {hasPattern && <PixelPattern style={styles.servicePattern} size="small" />}
      <div style={styles.serviceAccent}></div>
    </div>
  );
}

function StatsSection() {
  const stats = [
    { value: '12+', label: 'Years Experience' },
    { value: '500+', label: 'Happy Clients' },
    { value: '1200+', label: 'Campaigns' },
    { value: '50M+', label: 'Audience Reach' },
  ];

  return (
    <section style={styles.statsSection}>
      <div className="container">
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statItem}>
              <div style={styles.statValue} className="gradient-text">{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkSection() {
  const projects = [
    {
      category: 'Branding & Photography',
      title: 'Luxury Fashion Campaign',
      client: 'Elegance Co.',
    },
    {
      category: 'Photography & Video',
      title: 'Modern Architecture Series',
      client: 'Urban Spaces',
    },
    {
      category: 'Photography',
      title: 'Editorial Fashion Story',
      client: 'Vogue Magazine',
    },
  ];

  return (
    <section style={styles.section}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            A selection of our most impactful projects across various creative disciplines.
          </p>
        </div>
        <div style={styles.portfolioGrid}>
          {projects.map((project, index) => (
            <PortfolioCard key={index} {...project} />
          ))}
        </div>
        <div style={styles.portfolioButtonWrapper}>
          <button style={styles.portfolioButton}>View Full Portfolio</button>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ category, title, client }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={styles.portfolioCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.portfolioImage}></div>
      <div style={styles.portfolioGradient}></div>
      <div style={{
        ...styles.portfolioHover,
        opacity: isHovered ? 1 : 0,
      }}>
        <div style={styles.portfolioIcon}>🔍</div>
      </div>
      <div style={styles.portfolioContent}>
        <div style={styles.portfolioCategory}>{category}</div>
        <h3 style={styles.portfolioTitle}>{title}</h3>
        <p style={styles.portfolioClient}>{client}</p>
      </div>
    </div>
  );
}

function BrandsSection() {
  const brands = ['NIKE', 'ADIDAS', 'APPLE', 'GOOGLE', 'AMAZON', 'MICROSOFT', 'META', 'SPOTIFY', 'NETFLIX', 'TESLA'];
  
  return (
    <section style={styles.brandsSection}>
      <div className="container">
        <h3 style={styles.brandsTitle}>Trusted By Leading Brands</h3>
        <div style={styles.brandsWrapper}>
          <div style={styles.brandsTrack}>
            {[...brands, ...brands].map((brand, index) => (
              <div key={index} style={styles.brandItem}>{brand}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Raster Media transformed our brand identity completely. Their attention to detail and creative vision exceeded all expectations.",
      name: 'Sarah Johnson',
      role: 'CEO, TechFlow Inc',
    },
    {
      quote: "Working with this team has been an absolute pleasure. They brought our vision to life with stunning precision.",
      name: 'Michael Chen',
      role: 'Marketing Director, Luxe Brands',
    },
    {
      quote: "Their pixel-perfect approach and premium quality output has made them our go-to creative partner.",
      name: 'Emma Rodriguez',
      role: 'Founder, Studio Collective',
    },
  ];

  return (
    <section style={styles.testimonialsSection}>
      <div className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Hear what our clients have to say about working with us.
          </p>
        </div>
        <div style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, name, role }) {
  return (
    <div style={styles.testimonialCard}>
      <div style={styles.quoteIcon}>❝</div>
      <p style={styles.testimonialQuote}>{quote}</p>
      <div style={styles.testimonialAuthor}>
        <div style={styles.authorAvatar}></div>
        <div>
          <div style={styles.authorName}>{name}</div>
          <div style={styles.authorRole}>{role}</div>
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <section style={styles.ctaSection}>
      <PixelPattern style={{ ...styles.ctaPattern, top: '32.8px', right: '32.8px' }} size="large" />
      <PixelPattern style={{ ...styles.ctaPattern, bottom: '32.8px', left: '32.8px' }} size="medium" />
      <div style={styles.ctaContent}>
        <h2 style={styles.ctaHeading}>
          Ready to Create Something <span className="gradient-text">Extraordinary?</span>
        </h2>
        <p style={styles.ctaDescription}>
          Let's collaborate and bring your vision to life with pixel-perfect precision.
        </p>
        <button style={styles.ctaPrimaryButton} className="animate-shimmer">
          Start Your Project
        </button>
      </div>
    </section>
  );
}

function PixelPattern({ style, size = 'small' }) {
  const count = size === 'large' ? 25 : size === 'medium' ? 16 : 6;
  const gridSize = size === 'large' ? 5 : size === 'medium' ? 4 : 3;
  
  return (
    <div style={{ ...styles.pixelPatternBase, ...style }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={styles.pixel}></div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    paddingTop: '72px',
  },
  hero: {
    position: 'relative',
    width: '100%',
    height: '681.6px',
    overflow: 'hidden',
  },
  heroVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  iframe: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100vw',
    height: '100vh',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1,
  },
  heroGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 24%, rgba(93, 205, 219, 0.05) 25%, rgba(93, 205, 219, 0.05) 26%, rgba(0, 0, 0, 0) 27%, rgba(0, 0, 0, 0) 74%, rgba(93, 205, 219, 0.05) 75%, rgba(93, 205, 219, 0.05) 76%, rgba(0, 0, 0, 0) 77%), linear-gradient(90deg, rgba(0, 0, 0, 0) 24%, rgba(93, 205, 219, 0.05) 25%, rgba(93, 205, 219, 0.05) 26%, rgba(0, 0, 0, 0) 27%, rgba(0, 0, 0, 0) 74%, rgba(93, 205, 219, 0.05) 75%, rgba(93, 205, 219, 0.05) 76%, rgba(0, 0, 0, 0) 77%)',
    opacity: 0.1,
    zIndex: 2,
  },
  pixelPattern: {
    position: 'absolute',
    opacity: 0.2,
    zIndex: 3,
    animation: 'float 6s ease-in-out infinite',
  },
  heroContent: {
    position: 'relative',
    zIndex: 4,
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '40.12px 0',
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroHeading: {
    fontFamily: 'Cousine, monospace',
    fontWeight: '700',
    fontSize: '77.712px',
    lineHeight: '85px',
    letterSpacing: '-1.9428px',
    marginBottom: '30px',
  },
  heroLine1: {
    color: '#FFFFFF',
    marginBottom: '24px',
  },
  heroLine2: {
    background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0px 0px 80px rgba(93, 205, 219, 0.5))',
  },
  heroDescription: {
    fontFamily: 'Cousine, monospace',
    fontSize: '20px',
    lineHeight: '28px',
    letterSpacing: '1px',
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '768px',
    marginBottom: '40px',
  },
  heroButtons: {
    display: 'flex',
    gap: '24px',
    marginBottom: '60px',
  },
  primaryButton: {
    padding: '19.4px 40px',
    background: '#5DCDDB',
    border: 'none',
    fontFamily: 'Cousine, monospace',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.8px',
    color: '#000000',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  },
  secondaryButton: {
    padding: '21px 42.6px',
    background: 'transparent',
    border: '1.6px solid #5DCDDB',
    fontFamily: 'Cousine, monospace',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.8px',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  heroDots: {
    display: 'flex',
    gap: '28px',
    marginTop: '40px',
  },
  dot: {
    width: '12px',
    height: '12px',
    background: '#5DCDDB',
    borderRadius: '50%',
  },
  section: {
    padding: '128px 0 0',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '64px',
  },
  sectionTitle: {
    fontSize: '51.808px',
    fontWeight: '700',
    lineHeight: '60px',
    letterSpacing: '-0.51808px',
    marginBottom: '16px',
  },
  sectionSubtitle: {
    fontSize: '18px',
    lineHeight: '31px',
    color: '#A0A0A0',
    maxWidth: '672px',
    margin: '0 auto',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  serviceCard: {
    position: 'relative',
    padding: '32px',
    background: 'rgba(37, 37, 37, 0.6)',
    border: '0.8px solid rgba(93, 205, 219, 0.1)',
    minHeight: '293.5px',
    transition: 'transform 0.3s, border-color 0.3s',
    cursor: 'pointer',
  },
  serviceIcon: {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, rgba(93, 205, 219, 0.2) 0%, rgba(125, 216, 229, 0.2) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    marginBottom: '24px',
  },
  serviceTitle: {
    fontSize: '36px',
    fontWeight: '600',
    lineHeight: '43px',
    color: '#FFFFFF',
    marginBottom: '16px',
  },
  serviceDescription: {
    fontSize: '14px',
    lineHeight: '23px',
    color: '#A0A0A0',
  },
  servicePattern: {
    position: 'absolute',
    top: '24.8px',
    right: '24.8px',
    opacity: 0.5,
  },
  serviceAccent: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '0',
    height: '4px',
    background: 'linear-gradient(180deg, #5DCDDB 0%, #7DD8E5 100%)',
    transition: 'width 0.3s',
  },
  statsSection: {
    padding: '96px 0',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #1A1A1A 50%, rgba(0, 0, 0, 0) 100%)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '48px',
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '24px',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.7px',
    textTransform: 'uppercase',
    color: '#6B6B6B',
  },
  portfolioGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    marginBottom: '48px',
  },
  portfolioCard: {
    position: 'relative',
    height: '280px',
    background: '#252525',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #2A2A2A 0%, #3A3A3A 100%)',
  },
  portfolioGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)',
    opacity: 0.6,
  },
  portfolioHover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s',
  },
  portfolioIcon: {
    width: '64px',
    height: '64px',
    background: '#5DCDDB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
  },
  portfolioContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: '24px',
    width: '100%',
  },
  portfolioCategory: {
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    color: '#5DCDDB',
    marginBottom: '8px',
  },
  portfolioTitle: {
    fontSize: '36px',
    fontWeight: '600',
    lineHeight: '43px',
    color: '#FFFFFF',
    marginBottom: '8px',
  },
  portfolioClient: {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#A0A0A0',
  },
  portfolioButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  portfolioButton: {
    padding: '14.4px 25.6px',
    background: 'transparent',
    border: '1.6px solid #5DCDDB',
    color: '#5DCDDB',
    fontSize: '16px',
    lineHeight: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  brandsSection: {
    padding: '96px 0',
  },
  brandsTitle: {
    fontSize: '36px',
    fontWeight: '600',
    lineHeight: '43px',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: '48px',
  },
  brandsWrapper: {
    overflow: 'hidden',
    position: 'relative',
  },
  brandsTrack: {
    display: 'flex',
    gap: '64px',
    animation: 'slideLeft 30s linear infinite',
  },
  brandItem: {
    fontFamily: 'Cousine, monospace',
    fontSize: '32px',
    lineHeight: '48px',
    letterSpacing: '1.6px',
    color: 'rgba(255, 255, 255, 0.3)',
    whiteSpace: 'nowrap',
  },
  testimonialsSection: {
    padding: '128px 0',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #1A1A1A 50%, rgba(0, 0, 0, 0) 100%)',
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px',
  },
  testimonialCard: {
    padding: '32px',
    background: 'rgba(37, 37, 37, 0.6)',
    border: '0.8px solid rgba(93, 205, 219, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  quoteIcon: {
    fontSize: '32px',
    color: '#5DCDDB',
  },
  testimonialQuote: {
    fontSize: '18px',
    fontStyle: 'italic',
    lineHeight: '29px',
    color: '#A0A0A0',
    flex: 1,
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  authorAvatar: {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(180deg, #5DCDDB 0%, #7DD8E5 100%)',
    borderRadius: '50%',
  },
  authorName: {
    fontSize: '25.904px',
    fontWeight: '600',
    lineHeight: '34px',
    color: '#FFFFFF',
  },
  authorRole: {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#6B6B6B',
  },
  ctaSection: {
    position: 'relative',
    margin: '0 48px',
    padding: '64.8px 208px',
    background: 'rgba(37, 37, 37, 0.6)',
    border: '0.8px solid rgba(93, 205, 219, 0.1)',
    textAlign: 'center',
  },
  ctaPattern: {
    position: 'absolute',
  },
  ctaContent: {
    position: 'relative',
    zIndex: 1,
  },
  ctaHeading: {
    fontSize: '51.808px',
    fontWeight: '700',
    lineHeight: '60px',
    letterSpacing: '-0.51808px',
    marginBottom: '24px',
  },
  ctaDescription: {
    fontSize: '20px',
    lineHeight: '28px',
    color: '#A0A0A0',
    marginBottom: '40px',
  },
  ctaPrimaryButton: {
    padding: '17.6px 32px',
    background: 'linear-gradient(180deg, #5DCDDB 0%, #7DD8E5 100%)',
    border: 'none',
    fontSize: '18px',
    lineHeight: '28px',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'transform 0.3s',
  },
  pixelPatternBase: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 8px)',
    gap: '4px',
  },
  pixel: {
    width: '8px',
    height: '8px',
    background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)',
  },
};