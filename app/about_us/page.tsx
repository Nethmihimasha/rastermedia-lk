'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { 
  useScrollAnimation, 
  scrollAnimationVariants, 
  staggerContainerVariants, 
  staggerItemVariants 
} from '../hooks/useScrollAnimation';

export default function AboutPage() {
  return (
    <div style={styles.page} className="about-page">
      <HeroSection />
      <StorySection />
      <MissionVisionSection />
      <WhyChooseUsSection />
      <BehindTheScenesSection />
      <TechnologyStackSection />
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * var(--marquee-distance))); }
        }

        .bts-card-effect:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 12px 30px rgba(2, 6, 23, 0.5) !important;
          outline: none !important;
        }
        
        .bts-card-effect:hover .play-overlay-icon {
          transform: translate(-50%, -50%) scale(1.06) !important;
          background: rgba(0,0,0,0.55) !important;
        }

        .about-tech-ribbon::before,
        .about-tech-ribbon::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 140px;
          pointer-events: none;
          z-index: 3;
        }

        .about-tech-ribbon::before {
          left: 0;
          background: linear-gradient(to right, rgba(26,26,26,1) 0%, rgba(26,26,26,0) 100%);
        }

        .about-tech-ribbon::after {
          right: 0;
          background: linear-gradient(to left, rgba(26,26,26,1) 0%, rgba(26,26,26,0) 100%);
        }

        @media (max-width: 1024px) {
          .about-page { padding-top: 100px !important; }
          .about-hero-heading { font-size: 44px !important; line-height: 52px !important; }
          .about-hero { padding: 60px 32px !important; }
          .about-story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-story-image { width: 100% !important; height: 400px !important; }
          .about-mv-grid, .about-values-grid, .about-bts-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .about-mv-card { padding: 36px !important; }
          .about-tech-ribbon::before, .about-tech-ribbon::after { width: 64px !important; }
          .about-section-padding { padding: 60px 32px !important; }
        }

        @media (max-width: 768px) {
          .about-page { padding-top: 90px !important; }
          .about-hero-heading { font-size: 36px !important; line-height: 44px !important; }
          .about-hero-description { font-size: 16px !important; line-height: 26px !important; }
          .about-hero { padding: 50px 24px !important; }
          .about-section-padding { padding: 50px 24px !important; }
          .about-section-title, .about-bts-title { font-size: 32px !important; line-height: 40px !important; margin-bottom: 20px !important; }
          .about-value-title, .about-mv-title { font-size: 26px !important; line-height: 34px !important; }
          .about-mv-card, .about-value-card { padding: 28px !important; min-height: auto !important; }
          .about-story-image { height: 300px !important; }
          .about-story-grid { gap: 32px !important; }
          .about-mv-grid, .about-values-grid { gap: 20px !important; }
        }

        @media (max-width: 480px) {
          .about-page { padding-top: 80px !important; }
          .about-hero { padding: 40px 16px !important; }
          .about-hero-heading { font-size: 28px !important; line-height: 36px !important; }
          .about-hero-description { font-size: 15px !important; line-height: 24px !important; }
          .about-section-padding { padding: 40px 16px !important; }
          .about-section-title, .about-bts-title { font-size: 28px !important; line-height: 36px !important; }
          .about-value-title, .about-mv-title, .about-story-title { font-size: 22px !important; line-height: 30px !important; }
          .about-mv-card, .about-value-card { padding: 20px !important; }
          .about-story-text, .about-mv-text, .about-value-text { font-size: 15px !important; line-height: 24px !important; }
          .about-story-image { height: 250px !important; }
        }
      `}</style>
    </div>
  );
}

function HeroSection() {
  return (
    <section style={styles.hero} className="about-hero about-section-padding">
      <div style={styles.heroContent}>
        <h1 style={styles.heroHeading} className="about-hero-heading">
          <span>Crafting </span>
          <span className="gradient-text">Pixel-Perfect</span>
          <span> Brand Experiences</span>
        </h1>
        <p style={styles.heroDescription} className="about-hero-description">
          We&apos;re a team of creative professionals dedicated to transforming ideas into reality through innovative design, strategic thinking, and flawless execution.
        </p>
      </div>
    </section>
  );
}

function StorySection() {
  const { ref, isInView } = useScrollAnimation();
  
  return (
    <section style={styles.storySection} className="about-section-padding" ref={ref}>
      <motion.div
        className="container"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={scrollAnimationVariants}
      >
        <div style={styles.storyGrid} className="about-story-grid">
          <div style={styles.storyImage} className="about-story-image">
            <Image
              src="/images/about.jpg"
              alt="Our Story"
              fill
              style={styles.storyImg}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div style={styles.storyContent}>
            <h2 style={styles.storyTitle} className="about-story-title">Our Story</h2>
            <p style={styles.storyText} className="about-story-text">
              Raster Media began with a simple thought. Every idea starts small. Every design begins with a single pixel. We believed that if we took responsibility for each pixel, the final work would speak for itself.
            </p>
            <p style={styles.storyText} className="about-story-text">
               Over the years, we proved that belief through every project we delivered. Today, Raster Media is a 
                hybrid creative studio where strategy meets design and production. Every idea is crafted with 
                care, every project is managed with intention, and every outcome reflects our standard.
                confidence, creating work that feels relevant today and meaningful tomorrow.
            </p>
          
            <div style={styles.storyPattern}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} style={styles.pixel}></div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function MissionVisionSection() {
  const { ref, isInView } = useScrollAnimation();
  
  return (
    <section style={styles.missionVisionSection} className="about-section-padding" ref={ref}>
      <motion.div
        className="container"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <div style={styles.mvGrid} className="about-mv-grid">
          <motion.div style={styles.mvCard} className="about-mv-card" variants={staggerItemVariants}>
            <div style={styles.mvIcon}>
              <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" role="img">
                <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="4" fill="none" />
                <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.95" />
                <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.8" />
              </svg>
            </div>
            <h3 style={styles.mvTitle} className="about-mv-title">Our Mission</h3>
            <p style={styles.mvText} className="about-mv-text">
              To empower brands with creative solutions that inspire audiences, challenge conventions, and 
              deliver measurable impact through responsible creativity and precise execution.
            </p>
          </motion.div>
          <motion.div style={styles.mvCard} className="about-mv-card" variants={staggerItemVariants}>
            <div style={styles.mvIcon}>
              <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" role="img">
                <path d="M2 32C12 12 52 12 62 32c-10 20-50 20-60 0z" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="32" cy="32" r="8" fill="currentColor" />
              </svg>
            </div>
            <h3 style={styles.mvTitle} className="about-mv-title">Our Vision</h3> 
            <p style={styles.mvText} className="about-mv-text">
              To be the world&apos;s most trusted creative partner, building brands among the top 10 globally 
              through innovative design, strategic thinking, and unwavering commitment to excellence.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ValueIcon({ name }: { name: string }) {
  switch (name) {
    case 'lightbulb':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" preserveAspectRatio="xMidYMid meet">
          <path d="M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 3a6 6 0 00-6 6c0 2 .9 3.6 2.2 4.8.8.7 1.3 1.7 1.3 2.8v.4h5v-.4c0-1.1.5-2.1 1.3-2.8A6 6 0 0018 9a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 21h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'handshake':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" preserveAspectRatio="xMidYMid meet">
          <path d="M3 12l3.5 3.5a2 2 0 002.8 0L14 11l2.2 2.2a2 2 0 002.8 0L21 11" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 9l3-3 3 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'bolt':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" preserveAspectRatio="xMidYMid meet">
          <path d="M13 2L5 14h6l-2 8 10-12h-6l2-8z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'target':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" preserveAspectRatio="xMidYMid meet">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

function WhyChooseUsSection() {
  const { ref, isInView } = useScrollAnimation();
  
  const values = [
    {
      icon: 'lightbulb',
      title: 'Innovation First',
      description: 'We push creative boundaries and embrace cutting-edge technologies to deliver fresh solutions.'
    },
    {
      icon: 'handshake',
      title: 'Trust & Transparency',
      description: 'Building long-term partnerships through honest communication and reliable delivery.'
    },
    {
      icon: 'bolt',
      title: 'Excellence Driven',
      description: 'Every pixel matters. We\'re committed to delivering nothing short of exceptional quality.'
    },
    {
      icon: 'target',
      title: 'Collaborative Spirit',
      description: 'Your vision combined with our expertise creates truly remarkable results.'
    }
  ];

  return (
    <section style={styles.whySection} className="about-section-padding" ref={ref}>
      <motion.div
        className="container"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle} className="about-section-title">
            Why <span className="gradient-text">Choose Us</span>
          </h2>
          <p style={styles.sectionSubtitle} className="about-section-subtitle">
            We bring together creativity, strategy, and technology to deliver exceptional results.
          </p>
        </div>
        <div style={styles.valuesGrid} className="about-values-grid">
          {values.map((value, index) => (
            <motion.div key={index} style={styles.valueCard} className="about-value-card" variants={staggerItemVariants}>
              <div style={styles.valueIcon}><ValueIcon name={value.icon} /></div>
              <h3 style={styles.valueTitle} className="about-value-title">{value.title}</h3>
              <p style={styles.valueText} className="about-value-text">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function BehindTheScenesSection() {
  const [openVideo, setOpenVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!openVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenVideo(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openVideo]);

  return (
    <section style={styles.btsSection} className="about-section-padding">
      <div className="container">
        <h2 style={styles.btsTitle} className="about-bts-title">
          Behind <span className="gradient-text">The Scenes</span>
        </h2>
        <div style={styles.btsGrid} className="about-bts-grid">
          <button
            type="button"
            onClick={() => setOpenVideo('lSGSBUobk2U')}
            style={styles.btsCard}
            className="bts-card-effect"
            aria-label="Play YouTube Short lSGSBUobk2U"
          >
            <div style={{ ...styles.btsImage, backgroundImage: `url('https://i.ytimg.com/vi/lSGSBUobk2U/hqdefault.jpg')` }}>
              <div style={styles.playOverlay} className="play-overlay-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" width="32" height="32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M22 16v32l28-16z" fill="#fff" />
                </svg>
              </div>
            </div>
            <div style={styles.btsGradient}></div>
            <div style={styles.btsContent}>
              <div style={styles.btsCategory}>Video</div>
              <h3 style={styles.btsTitleMini}>Shorts: Behind the Scenes</h3>
            </div>
          </button>

          <a
            href="https://www.youtube.com/shorts/n5y-MjIwUh0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open YouTube Short n5y-MjIwUh0"
            style={styles.btsCard}
            className="bts-card-effect"
          >
            <div style={{ ...styles.btsImage, backgroundImage: `url('https://i.ytimg.com/vi/n5y-MjIwUh0/hqdefault.jpg')` }}>
              <div style={styles.playOverlay} className="play-overlay-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" width="32" height="32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M22 16v32l28-16z" fill="#fff" />
                </svg>
              </div>
            </div>
            <div style={styles.btsGradient}></div>
            <div style={styles.btsContent}>
              <div style={styles.btsCategory}>Video</div>
              <h3 style={styles.btsTitleMini}>Shorts: Behind the Scenes (1)</h3>
            </div>
          </a>

          <a
            href="https://www.youtube.com/shorts/xNJEw8xTqc8"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open YouTube Short xNJEw8xTqc8"
            style={styles.btsCard}
            className="bts-card-effect"
          >
            <div style={{ ...styles.btsImage, backgroundImage: `url('https://i.ytimg.com/vi/xNJEw8xTqc8/hqdefault.jpg')` }}>
              <div style={styles.playOverlay} className="play-overlay-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" width="32" height="32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M22 16v32l28-16z" fill="#fff" />
                </svg>
              </div>
            </div>
            <div style={styles.btsGradient}></div>
            <div style={styles.btsContent}>
              <div style={styles.btsCategory}>Video</div>
              <h3 style={styles.btsTitleMini}>Shorts: Behind the Scenes (2)</h3>
            </div>
          </a>
        </div>
      </div>
      
      {openVideo && (
        <div style={styles.modalOverlay} onClick={() => setOpenVideo(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setOpenVideo(null)}>×</button>
            <div style={styles.videoWrapper}>
              <iframe
                src={`https://www.youtube.com/embed/${openVideo}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function TechnologyStackSection() {
  const creativeTech = [
    'Adobe Suit', 'Davince Resolve', 'Meta Ads Manager', 'Mail Chimp', 'Figma', 
    'Midjourney', 'Canva Pro', 'Milanote', 'wordpress', 'next.js', 'react.js'
  ];

  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const speedPxPerSec = 40;
    const setupTrack = (track: HTMLDivElement | null) => {
      if (!track) return;
      const totalWidth = track.scrollWidth;
      if (!totalWidth) return;
      const singleWidth = totalWidth / 2;
      track.style.setProperty('--marquee-distance', `${singleWidth}px`);
      const duration = Math.max(8, singleWidth / speedPxPerSec);
      track.style.setProperty('--marquee-duration', `${duration}s`);
    };

    const ro = new ResizeObserver(() => setupTrack(leftRef.current));
    if (leftRef.current) ro.observe(leftRef.current);
    setupTrack(leftRef.current);

    const onResize = () => setupTrack(leftRef.current);
    window.addEventListener('resize', onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section style={styles.techSection} className="about-section-padding">
      <div style={styles.container}>
        <h2 style={styles.techTitle} className="about-section-title">Our Technology Stack</h2>
        <p style={styles.techSubtitle} className="about-section-subtitle">Industry-leading tools and technologies to bring your vision to life.</p>

        <div style={styles.techGroups}>
          <div style={styles.techGroup}>
            <div style={styles.techRibbon} className="about-tech-ribbon">
              <div 
                ref={leftRef} 
                style={styles.techTrack}
                className="about-tech-track-left"
                aria-hidden
              >
                {[...creativeTech, ...creativeTech].map((tech, i) => (
                  <div key={i} style={styles.techItem}>
                    <div style={styles.techDot}></div>
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    paddingTop: '140px',
  },
  hero: {
    padding: '80px 48px',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  heroHeading: {
    fontSize: '50px',
    fontWeight: 700,
    lineHeight: '60px',
    marginBottom: '32px',
    color: '#FFFFFF',
    fontFamily: 'Erbaum, Cousine, monospace',
  },
  heroDescription: {
    fontSize: '15px',
    lineHeight: '31px',
    color: '#A0A0A0',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  storySection: {
    padding: '80px 48px',
  },
  storyGrid: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '700px 1fr',
    gap: '64px',
    alignItems: 'start',
  },
  storyImage: {
    position: 'relative',
    height: '560px',
    borderRadius: '12px',
    overflow: 'hidden',
    background: 'linear-gradient(45deg, #2A2A2A 0%, #3A3A3A 100%)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
  },
  storyImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transformOrigin: 'center',
  },
  storyContent: {
    position: 'relative',
    maxWidth: '760px',
    paddingTop: '8px',
  },
  storyTitle: {
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: '43px',
    letterSpacing: '-0.5px',
    color: '#FFFFFF',
    marginBottom: '20px',
    fontFamily: 'Erbaum, Cousine, monospace',
  },
  storyText: {
    fontSize: '15px',
    lineHeight: '32px',
    color: '#A0A0A0',
    marginBottom: '22px',
    maxWidth: '720px',
  },
  storyPattern: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 8px)',
    gap: '6px',
    marginTop: '36px',
  },
  pixel: {
    width: '8px',
    height: '8px',
    background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)',
  },
  missionVisionSection: {
    padding: '80px 48px',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #1A1A1A 50%, rgba(0, 0, 0, 0) 100%)',
  },
  mvGrid: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '48px',
  },
  mvCard: {
    padding: '48px',
    background: 'rgba(37, 37, 37, 0.6)',
    border: '0.8px solid rgba(93, 205, 219, 0.1)',
    minHeight: '351.2px',
  },
  mvIcon: {
    width: '48px',
    height: '48px',
    marginBottom: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5DCDDB',
  },
  mvTitle: {
    fontSize: '30px',
    fontWeight: 600,
    lineHeight: '43px',
    color: '#FFFFFF',
    marginBottom: '16px',
    fontFamily: 'Erbaum, Cousine, monospace',
  },
  mvText: {
    fontSize: '15px',
    lineHeight: '31px',
    color: '#A0A0A0',
  },
  whySection: {
    padding: '80px 48px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '64px',
  },
  sectionTitle: {
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: '60px',
    letterSpacing: '-0.51808px',
    marginBottom: '16px',
    fontFamily: 'Erbaum, Cousine, monospace',
  },
  sectionSubtitle: {
    fontSize: '15px',
    lineHeight: '31px',
    color: '#A0A0A0',
    maxWidth: '1400px',
    margin: '0 auto',
    fontFamily: 'Erbaum, Cousine, monospace',
  },
  valuesGrid: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '32px',
  },
  valueCard: {
    padding: '32px',
    background: 'rgba(37, 37, 37, 0.6)',
    border: '0.8px solid rgba(93, 205, 219, 0.1)',
    minHeight: '266px',
  },
  valueIcon: {
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, rgba(93, 205, 219, 0.08) 0%, rgba(125, 216, 229, 0.08) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    color: '#5DCDDB',
  },
  valueTitle: {
    fontSize: '30px',
    fontWeight: 600,
    lineHeight: '43px',
    color: '#FFFFFF',
    marginBottom: '16px',
    fontFamily: 'Erbaum, Cousine, monospace',
  },
  valueText: {
    fontSize: '15px',
    lineHeight: '31px',
    color: '#A0A0A0',
  },
  btsSection: {
    padding: '80px 48px',
  },
  btsTitle: {
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: '60px',
    letterSpacing: '-0.51808px',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: '64px',
    fontFamily: 'Erbaum, Cousine, monospace',
  },
  btsGrid: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  btsCard: {
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '432px',
    background: '#252525',
    overflow: 'hidden',
    cursor: 'pointer',
    borderRadius: '8px',
    border: '0.8px solid rgba(93, 205, 219, 0.06)',
    transition: 'transform 200ms ease, box-shadow 200ms ease',
    padding: 0,
    textAlign: 'left',
  },
  btsImage: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  playOverlay: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '76px',
    height: '76px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.45)',
    boxShadow: '0 8px 24px rgba(2,6,23,0.5)',
    transition: 'transform 180ms ease, background 180ms ease',
  },
  btsGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
    pointerEvents: 'none',
  },
  btsContent: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    zIndex: 6,
    color: '#fff',
  },
  btsCategory: {
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    color: '#5DCDDB',
    marginBottom: '6px',
  },
  btsTitleMini: {
    fontSize: '20px',
    fontWeight: 600,
    margin: 0,
    color: '#fff',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.72)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '24px',
  },
  modalContent: {
    position: 'relative',
    width: '100%',
    maxWidth: '980px',
    outline: 'none',
  },
  modalClose: {
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#fff',
    border: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 6px 18px rgba(2,6,23,0.35)',
    zIndex: 10,
    color: '#000',
  },
  videoWrapper: {
    position: 'relative',
    paddingTop: '56.25%',
    height: 0,
    overflow: 'hidden',
    borderRadius: '8px',
  },
  techSection: {
    padding: '80px 48px',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #1A1A1A 50%, rgba(0, 0, 0, 0) 100%)',
    overflow: 'hidden',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: 0,
  },
  techTitle: {
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: '8px',
    fontFamily: 'Erbaum, Cousine, monospace',
  },
  techSubtitle: {
    textAlign: 'center',
    fontSize: '15px',
    color: '#A0A0A0',
    marginBottom: '32px',
    fontFamily: 'Erbaum, Cousine, monospace',
  },
  techGroups: {
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
    alignItems: 'center',
    marginBottom: '32px',
  },
  techGroup: {
    width: '100%',
  },
  techRibbon: {
    position: 'relative',
    overflow: 'hidden',
    padding: '12px 0',
  },
  techTrack: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    gap: '24px',
    width: 'max-content',
    willChange: 'transform',
    animation: 'marquee var(--marquee-duration, 28s) linear infinite',
  },
  techItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    padding: '0 32px',
    height: '52px',
    background: 'rgba(37, 37, 37, 0.6)',
    border: '0.8px solid rgba(93, 205, 219, 0.06)',
    whiteSpace: 'nowrap',
    fontSize: '15px',
    lineHeight: '24px',
    color: '#A0A0A0',
    borderRadius: '4px',
  },
  techDot: {
    width: '6px',
    height: '6px',
    background: '#5DCDDB',
    borderRadius: '50%',
    flexShrink: 0,
  },
};
