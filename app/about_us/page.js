'use client';

import Image from 'next/image';
import styles from './about.module.css';
import { useEffect, useRef, useState } from 'react';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <HeroSection />
      <StorySection />
      <MissionVisionSection />
      <WhyChooseUsSection />
      <BehindTheScenesSection />
      <TechnologyStackSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Foreground Content */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeading}>
          <span>Crafting </span>
          <span className="gradient-text">Pixel-Perfect</span>
          <span> Brand Experiences</span>
        </h1>
        <p className={styles.heroDescription}>
          We&apos;re a team of creative professionals dedicated to transforming ideas into reality through innovative design, strategic thinking, and flawless execution.
        </p>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className={styles.storySection}>
      <div className="container">
        <div className={styles.storyGrid}>
          <div className={styles.storyImage}>
            <Image
              src="/images/about.jpg"
              alt="Our Story"
              fill
              className={styles.storyImg}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className={styles.storyContent}>
            <h2 className={styles.storyTitle}>Our Story</h2>
            <p className={styles.storyText}>
              Raster Media began with a simple thought. Every idea starts small. Every design begins with a single pixel. We believed that if we took responsibility for each pixel, the final work would speak for itself.

            </p>
            <p className={styles.storyText}>
               Over the years, we proved that belief through every project we delivered. Today, Raster Media is a 
                hybrid creative studio where strategy meets design and production. Every idea is crafted with 
                care, every project is managed with intention, and every outcome reflects our standard.
                confidence, creating work that feels relevant today and meaningful tomorrow.
            </p>
          
            <div className={styles.storyPattern}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={styles.pixel}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  return (
    <section className={styles.missionVisionSection}>
      <div className="container">
        <div className={styles.mvGrid}>
          <div className={styles.mvCard}>
            <div className={styles.mvIcon}>
              {/* mission icon (SVG, uses global blue via currentColor) */}
              <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" role="img">
                <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="4" fill="none" />
                <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.95" />
                <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.8" />
              </svg>
            </div>
            <h3 className={styles.mvTitle}>Our Mission</h3>
            <p className={styles.mvText}>
              To empower brands with creative solutions that inspire audiences, challenge conventions, and 
              deliver measurable impact through responsible creativity and precise execution.
            </p>
          </div>
          <div className={styles.mvCard}>
            <div className={styles.mvIcon}>
              {/* vision icon (SVG, uses global blue via currentColor) */}
              <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" role="img">
                <path d="M2 32C12 12 52 12 62 32c-10 20-50 20-60 0z" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="32" cy="32" r="8" fill="currentColor" />
              </svg>
            </div>
            <h3 className={styles.mvTitle}>Our Vision</h3> 
            <p className={styles.mvText}>
              To be the world&apos;s most trusted creative partner, building brands among the top 10 globally 
              through innovative design, strategic thinking, and unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// small helper to render inline SVG icons for WhyChooseUs
function ValueIcon({ name }) {
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
    <section className={styles.whySection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Why <span className="gradient-text">Choose Us</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            We bring together creativity, strategy, and technology to deliver exceptional results.
          </p>
        </div>
        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.valueIcon}><ValueIcon name={value.icon} /></div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueText}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BehindTheScenesSection() {
  const [openVideo, setOpenVideo] = useState(null);

  useEffect(() => {
    if (!openVideo) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenVideo(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openVideo]);

  return (
    <section className={styles.btsSection}>
      <div className="container">
        <h2 className={styles.btsTitle}>
          Behind <span className="gradient-text">The Scenes</span>
        </h2>
        <div className={styles.btsGrid}>
          {/* Card 1: YouTube Short (lSGSBUobk2U) — opens modal */}
          <button
            type="button"
            onClick={() => setOpenVideo('lSGSBUobk2U')}
            className={styles.btsCard}
            aria-label="Play YouTube Short lSGSBUobk2U"
          >
            <div className={styles.btsImage} style={{ backgroundImage: `url('https://i.ytimg.com/vi/lSGSBUobk2U/hqdefault.jpg')` }}>
              <div className={styles.playOverlay} aria-hidden="true">
                <svg viewBox="0 0 64 64" width="32" height="32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M22 16v32l28-16z" fill="#fff" />
                </svg>
              </div>
            </div>
            <div className={styles.btsGradient}></div>
            <div className={styles.btsContent}>
              <div className={styles.btsCategory}>Video</div>
              <h3 className={styles.btsTitle}>Shorts: Behind the Scenes</h3>
            </div>
          </button>

          {/* Card 2: YouTube Short (n5y-MjIwUh0) */}
          <a
            href="https://www.youtube.com/shorts/n5y-MjIwUh0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open YouTube Short n5y-MjIwUh0"
            className={styles.btsCard}
          >
            <div className={styles.btsImage} style={{ backgroundImage: `url('https://i.ytimg.com/vi/n5y-MjIwUh0/hqdefault.jpg')` }}>
              <div className={styles.playOverlay} aria-hidden="true">
                <svg viewBox="0 0 64 64" width="32" height="32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M22 16v32l28-16z" fill="#fff" />
                </svg>
              </div>
            </div>
            <div className={styles.btsGradient}></div>
            <div className={styles.btsContent}>
              <div className={styles.btsCategory}>Video</div>
              <h3 className={styles.btsTitle}>Shorts: Behind the Scenes (1)</h3>
            </div>
          </a>

          {/* Card 3: YouTube Short (xNJEw8xTqc8) */}
          <a
            href="https://www.youtube.com/shorts/xNJEw8xTqc8"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open YouTube Short xNJEw8xTqc8"
            className={styles.btsCard}
          >
            <div className={styles.btsImage} style={{ backgroundImage: `url('https://i.ytimg.com/vi/xNJEw8xTqc8/hqdefault.jpg')` }}>
              <div className={styles.playOverlay} aria-hidden="true">
                <svg viewBox="0 0 64 64" width="32" height="32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M22 16v32l28-16z" fill="#fff" />
                </svg>
              </div>
            </div>
            <div className={styles.btsGradient}></div>
            <div className={styles.btsContent}>
              <div className={styles.btsCategory}>Video</div>
              <h3 className={styles.btsTitle}>Shorts: Behind the Scenes (2)</h3>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function TechnologyStackSection() {
  const creativeTech = [
    'Adobe Suit',
    'Davince Resolve',
    'Meta Ads Manager',
    'Mail Chimp',
    'Figma',
    'Midjourney',
    'Canva Pro',
    'Milanote',
    'wordpress',
    'next.js',
    'react.js'
  ];



  const leftRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const speedPxPerSec = 40; // slower speed for smoother motion (lower = slower)

    const setupTrack = (track) => {
      if (!track) return;
      // We duplicate items in the markup, so total scrollWidth == 2 * single set width
      const totalWidth = track.scrollWidth;
      if (!totalWidth) return;
      const singleWidth = totalWidth / 2;
      // set CSS variables used by CSS animation
      track.style.setProperty('--marquee-distance', `${singleWidth}px`);
      // compute duration from distance and speed, clamp to a reasonable minimum
      const duration = Math.max(8, singleWidth / speedPxPerSec);
      track.style.setProperty('--marquee-duration', `${duration}s`);
    };

    const ro = new ResizeObserver(() => {
      setupTrack(leftRef.current);
    });

    if (leftRef.current) ro.observe(leftRef.current);

    // initial setup
    setupTrack(leftRef.current);

    const onResize = () => {
      setupTrack(leftRef.current);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    };
  }, []);

  return (
    <section className={styles.techSection}>
      <div className={styles.container}>
        <h2 className={styles.techTitle}>Our Technology Stack</h2>
        <p className={styles.techSubtitle}>Industry-leading tools and technologies to bring your vision to life.</p>

        <div className={styles.techGroups}>
          <div className={styles.techGroup}>
            
            <div className={styles.techRibbon}>
              <div ref={leftRef} className={`${styles.techTrack} ${styles.techTrackLeft}`} aria-hidden>
                {[...creativeTech, ...creativeTech].map((tech, i) => (
                  <div key={i} className={styles.techItem}>
                    <div className={styles.techDot}></div>
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