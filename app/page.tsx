'use client';

import { useState, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { reviews } from '../src/data/reviews';

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
          src="https://www.youtube.com/embed/OmHLohPk6b0?autoplay=1&mute=1&loop=1&playlist=OmHLohPk6b0&controls=0&rel=0&modestbranding=1"
          title="Hero Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={styles.iframe}
        />
      </div>
      <div style={styles.heroOverlay}></div>
      <div style={styles.heroGrid}></div>
      
      
      
      <div style={styles.heroContent} className="hero-content">
        <h1 style={styles.heroHeading} className="hero-heading">
          <div style={styles.heroLine1}>Responsible <span style={styles.gradientText}>Creativity</span></div>
          <div style={styles.heroLine1}>for Every <span style={styles.gradientText}>Pixel</span></div>
        </h1>
        <p style={styles.heroDescription}>
          We build modern, pixel-sharp campaigns for brands that want to stand out.
        </p>
        <div style={styles.heroButtons} className="hero-buttons">
          <Link href="/contact" className="btn btn--home" aria-label="Start a project">START A PROJECT</Link>
          <Link href="/studio" className="btn btn--home" aria-label="Book studio space">BOOK STUDIO SPACE</Link>
        </div>
        <div style={styles.heroDots}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{
              ...styles.dot,
              opacity: i === 0 ? 0.77 : i === 1 ? 0.56 : i === 2 ? 0.3 : i === 3 ? 0.33 : 0.41
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
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M21 7l-5 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      title: 'Photography & Video Production',
      description: 'BCinematic photography and video for brands, fashion, products, and corporate projects from start to finish.',
      hasPattern: true,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      title: 'Brand Strategy & Identity',
      description: 'We provide clarity and direction for brands with well-crafted messaging and visual systems.',
      hasPattern: true,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="2" y="3" width="20" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M8 21v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      title: 'Studio Space',
      description: 'A professional studio for photography, video, content production, and podcasts, ensuring high quality results.',
      hasPattern: true,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M3 21v-7l13-9 5 7v9H3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M14 10l7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      title: 'Design',
      description: 'From logos to complete brand systems, we create designs with care, precision, and purpose.',
      hasPattern: true,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M3 11v6a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M21 7v10a2 2 0 0 1-2 2h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M8 11a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      title: 'Social Media Management',
      description: 'Managing social media with creative content to engage, grow, and maintain brand presence.',
      hasPattern: true,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect x="3" y="4" width="18" height="14" rx="1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M8 4v4M16 4v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      title: 'Website Design & Development',
      description: 'Premium websites built for seamless performance, usability, and a strong brand presence.',
      hasPattern: true,
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Our <span style={styles.gradientText}>Services</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Comprehensive creative solutions tailored to elevate your brand and drive impactful results.
          </p>
        </div>
        <div style={styles.servicesGrid} className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, description, hasPattern }: { icon: React.ReactNode; title: string; description: string; hasPattern?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        ...styles.serviceCard,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        borderColor: isHovered ? '#5DCDDB' : 'rgba(93, 205, 219, 0.1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.serviceIcon}>{icon}</div>
      <h3 style={styles.serviceTitle}>{title}</h3>
      <p style={styles.serviceDescription}>{description}</p>
      {hasPattern && (
        <PixelPattern 
          style={{ 
            position: 'absolute',
            top: '24px', 
            right: '24px',
            opacity: 0.3
          }} 
          size="small" 
        />
      )}
      <div style={{
        ...styles.serviceAccent,
        width: isHovered ? '100%' : '0',
      }}></div>
    </div>
  );
}

// Count-up animation hook
function useCountUp(end: string | number, duration: number = 2000, startCounting: boolean = false): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    
    const startTime = Date.now();
    const endValue = typeof end === 'string' ? parseInt(end.replace(/\D/g, '')) : Number(end);
    
    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * endValue);
      
      setCount(currentCount);
      
      if (progress === 1) {
        clearInterval(timer);
        setCount(endValue);
      }
    }, 16); // ~60fps
    
    return () => clearInterval(timer);
  }, [end, duration, startCounting]);
  
  return count;
}

function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { value: '9', suffix: '+', label: 'YEARS EXPERIENCE' },
    { value: '120', suffix: '+', label: 'BRANDS' },
    { value: '300', suffix: '+', label: 'CAMPAIGNS' },
    { value: '5', suffix: 'M+', label: 'COLLABORATORS' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const node = sectionRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} style={styles.statsSection}>
      <div style={styles.container}>
        <div style={styles.statsGrid} className="stats-grid">
          {stats.map((stat, index) => (
            <StatItem 
              key={index} 
              {...stat} 
              startCounting={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label, startCounting }: { value: string | number; suffix?: string; label: string; startCounting?: boolean }) {
  const count = useCountUp(value, 2000, startCounting);

  return (
    <div style={styles.statItem}>
      <div style={{...styles.statValue, ...styles.gradientText}}>
        {count}{suffix}
      </div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function FeaturedWorkSection() {

  const projects = [
    {
      title: 'Winter Christmas Shoot',
      client: 'Winter Collection',
      category: 'Editorial',
      image: '/images/portfoliopic1.jpg',
      albumSlug: 'winter-christmas',
    },
    {
      title: 'Martex Corporate Shoot',
      client: 'Martex',
      category: 'Commercial',
      image: '/images/portfoliopic2.jpg',
      albumSlug: 'martex-corporate',
    },
    {
      title: 'Winter Classic Shoot',
      client: 'Winter Collection',
      category: 'Fashion',
      image: '/images/portfoliopic3.jpg',
      albumSlug: 'winter-classic',
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Featured <span style={styles.gradientText}>Work</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            A selection of our most impactful projects across various creative disciplines.
          </p>
        </div>
        <div style={styles.portfolioGrid} className="portfolio-grid">
          {projects.map((project, index) => (
            <PortfolioCard key={index} {...project} />
          ))}
        </div>
        <div style={styles.portfolioButtonWrapper}>
          <Link href="/portfolio" className="btn btn--home">VIEW FULL PORTFOLIO</Link>
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ category, title, client, image, albumSlug }: { category: string; title: string; client: string; image: string; albumSlug?: string }) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        if (albumSlug) {
          router.push(`/portfolio?album=${encodeURIComponent(albumSlug)}`);
        } else {
          router.push('/portfolio');
        }
      }}
      onKeyDown={(e) => { if (e.key === 'Enter') { if (albumSlug) router.push(`/portfolio?album=${encodeURIComponent(albumSlug)}`); else router.push('/portfolio'); } }}
      style={{
        ...styles.portfolioCard,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        borderColor: isHovered ? 'rgba(93, 205, 219, 0.5)' : 'rgba(93, 205, 219, 0.1)',
        boxShadow: isHovered ? '0 12px 40px rgba(93, 205, 219, 0.15)' : 'none',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        ...styles.portfolioImage,
        position: 'relative',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.5s ease',
      }}>
        {image ? <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} quality={75} /> : null}
      </div>
      <div style={{
        ...styles.portfolioGradient,
        opacity: isHovered ? 0.85 : 0.6,
        transition: 'opacity 0.3s ease',
      }}></div>
      <div style={{
        ...styles.portfolioContent,
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.4s ease',
      }}>
        {/* category label removed per request */}
        <h3 style={styles.portfolioTitle}>{title}</h3>
        <p style={styles.portfolioClient}>{client}</p>
      </div>
    </div>
  );
}

function BrandsSection() {
  const brands = ['WINTER COLLECTION', 'MARTEX', 'VILLA JAY', 'CLASSIC JACKET', 'BASILUR'];
  
  return (
    <section style={styles.brandsSection}>
      <div style={styles.container}>
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
  // Carousel showing 3 testimonials at a time, with cloned edges for seamless looping
  const testimonials = (reviews as any[]).map((r: any) => ({ quote: r.text, name: r.author, role: r.role || 'Client', rating: r.rating || 5, time: r.time || '', avatar: r.avatar || '' }));

  function getVisible() {
    if (typeof window === 'undefined') return 3;
    const w = window.innerWidth;
    if (w < 600) return 1;
    if (w < 1000) return 2;
    return 3;
  }

  // Use a server-safe default for initial render to avoid hydration
  // mismatches, then update on the client after mount.
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    setVisible(getVisible());
  }, []);
  const slideWidth = 100 / visible; // percent

  // build cloned list for seamless infinite scrolling
  const items = [
    ...testimonials.slice(-visible),
    ...testimonials,
    ...testimonials.slice(0, visible),
  ];

  const baseIndex = visible; // starting offset into items
  const [index, setIndex] = useState(baseIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const length = testimonials.length;
  const trackRef = useRef(null);

  // keep visible in sync with viewport
  useEffect(() => {
    const onResize = () => {
      const nv = getVisible();
      setVisible(nv);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // snap to new base index on visible change
  useEffect(() => {
    const id = setTimeout(() => {
      setIsAnimating(false);
      setIndex(visible);
      setTimeout(() => setIsAnimating(true), 40);
    }, 0);
    return () => clearTimeout(id);
  }, [visible]);

  // autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((i) => i + 1);
      setIsAnimating(true);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  function prev() {
    setIndex((i) => i - 1);
    setIsAnimating(true);
  }

  function next() {
    setIndex((i) => i + 1);
    setIsAnimating(true);
  }

  function handleTransitionEnd() {
    // if we've moved into the appended clones region, snap back to real items without animation
    if (index >= baseIndex + length) {
      setIsAnimating(false);
      setIndex(baseIndex);
      // re-enable animation on next tick
      setTimeout(() => setIsAnimating(true), 40);
    }

    // if we've moved into the prepended clones region, snap to the end
    if (index <= baseIndex - 1) {
      setIsAnimating(false);
      setIndex(baseIndex + length - 1);
      setTimeout(() => setIsAnimating(true), 40);
    }
  }

  const centerIndex = index + Math.floor(visible / 2);

  return (
    <section style={styles.testimonialsSection}>
      <div style={styles.container}>
          <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            Client <span style={styles.gradientText}>Testimonials</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Hear what our clients have to say about working with us.
          </p>
          <div style={styles.reviewButtonWrapper}>
            <a href="/review" target="_blank" rel="noopener noreferrer" className="btn btn--home" aria-label="Leave a review">LEAVE A REVIEW</a>
          </div>
        </div>

        <div
          style={styles.testimonialsSlider}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            aria-label="Previous testimonial"
            style={{ ...styles.testimonialArrow, ...styles.testimonialArrowLeft }}
            onClick={prev}
          >
            ‹
          </button>

<div style={styles.testimonialsViewport}>
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            style={{
              ...styles.testimonialsTrack,
              transform: `translateX(-${index * slideWidth}%)`,
              transition: isAnimating ? 'transform 600ms cubic-bezier(0.2,0.8,0.2,1)' : 'none',
            }}
          >
            {items.map((testimonial, i) => {
              const isCenter = i === centerIndex;
              return (
                <div
                  key={`${testimonial.name}-${i}`}
                  style={{
                    ...styles.testimonialSlide,
                    flex: `0 0 ${slideWidth}%`,
                    ...(isCenter ? styles.testimonialActive : styles.testimonialInactive),
                  }}
                  aria-hidden={!isCenter && (i < index || i > index + visible - 1)}
                >
                  <TestimonialCard {...testimonial} />
                </div>
              );
            })}
          </div>
          </div>

          <button
            aria-label="Next testimonial"
            style={{ ...styles.testimonialArrow, ...styles.testimonialArrowRight }}
            onClick={next}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, name, role, rating, time }: { quote: string; name: string; role?: string; rating?: number; time?: string }) {
  const initials = (name || '').split(' ').map(n => n[0]).slice(0,2).join('');

  return (
    <div style={styles.testimonialCard}>
      <div style={styles.quoteIcon}>❝</div>
      <p style={styles.testimonialQuote}>{quote}</p>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
        <div style={styles.testimonialAuthor}>
          <div style={{...styles.authorAvatar, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:600, color:'#000'}}>
            {initials}
          </div>
          <div>
            <div style={styles.authorName}>{name}</div>
            <div style={styles.authorRole}>{role}</div>
          </div>
        </div>

        <div style={{textAlign:'right'}}>
          <div style={{color:'#5DCDDB', fontSize:16, marginBottom:6}}>{'★'.repeat(rating || 5)}</div>
          {time ? <div style={{fontSize:12, color:'#6B6B6B'}}>{time}</div> : null}
        </div>
      </div>

      
    </div>
  );
}

function CTASection() {
  return (
    <section style={styles.ctaSection} className="cta-section-home">

      <div style={styles.ctaContent} className="cta-content-home">
        <h2 style={styles.ctaHeading} className="cta-heading-home">
          Ready to Create Something <span style={styles.gradientText}>Extraordinary?</span>
        </h2>
        <p style={styles.ctaDescription} className="cta-description-home">
          Let us collaborate and bring your vision to life with pixel-perfect precision.
        </p>
        <Link href="/contact" className="btn btn--home animate-shimmer cta-button-home">Start Your Project</Link>
      </div>
    </section>
  );
}

function PixelPattern({ style, size = 'small' }: { style?: React.CSSProperties; size?: 'small' | 'medium' | 'large' }) {
  const gridConfig = {
    small: { rows: 3, cols: 3, pixelSize: 8, gap: 4 },
    medium: { rows: 4, cols: 4, pixelSize: 10, gap: 5 },
    large: { rows: 5, cols: 5, pixelSize: 12, gap: 6 },
  };

  const config = gridConfig[size];
  const totalPixels = config.rows * config.cols;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${config.cols}, ${config.pixelSize}px)`,
        gap: `${config.gap}px`,
        ...style,
      }}
    >
      {Array.from({ length: totalPixels }).map((_, i) => (
        <div 
          key={i} 
          style={{
            width: `${config.pixelSize}px`,
            height: `${config.pixelSize}px`,
            background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)',
          }}
        ></div>
      ))}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    paddingTop: '72px',
  },
  container: {
    maxWidth: '1800px',
    margin: '0 auto',
    padding: '0 48px',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  hero: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    minHeight: '600px',
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
    width: '177.77vh',
    minWidth: '100%',
    height: '56.25vw',
    minHeight: '100%',
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
    backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 24%, rgba(93, 205, 219, 0.05) 25%, rgba(93, 205, 219, 0.05) 26%, rgba(0, 0, 0, 0) 27%, rgba(0, 0, 0, 0) 74%, rgba(93, 205, 219, 0.05) 75%, rgba(93, 205, 219, 0.05) 76%, rgba(0, 0, 0, 0) 77%), linear-gradient(90deg, rgba(0, 0, 0, 0) 24%, rgba(93, 205, 219, 0.05) 25%, rgba(93, 205, 219, 0.05) 26%, rgba(0, 0, 0, 0) 27%, rgba(0, 0, 0, 0) 74%, rgba(93, 205, 219, 0.05) 75%, rgba(93, 205, 219, 0.05) 76%, rgba(0, 0, 0, 0) 77%)',
    backgroundSize: '50px 50px',
    opacity: 0.1,
    zIndex: 2,
  },
  heroContent: {
    position: 'relative',
    zIndex: 4,
    maxWidth: '1800px',
    margin: '0 auto',
    padding: '40px 48px',
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroHeading: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontWeight: 700,
    fontSize: '75px',
    lineHeight: '85px',
    letterSpacing: '-1.9428px',
    marginBottom: '30px',
  },
  heroLine1: {
    color: '#FFFFFF',
    marginBottom: '22px',
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
    maxWidth: '1800px',
    marginBottom: '40px',
  },
  heroButtons: {
    display: 'flex',
    gap: '24px',
    marginBottom: '60px',
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
    borderRadius: '0',
  },
  section: {
    padding: '128px 0',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '64px',
  },
  sectionTitle: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: '51.808px',
    fontWeight: 700,
    lineHeight: '60px',
    letterSpacing: '-0.51808px',
    marginBottom: '16px',
    color: '#FFFFFF',
  },
  sectionSubtitle: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: '18px',
    lineHeight: '31px',
    color: '#A0A0A0',
    maxWidth: '1800px',
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
    transition: 'all 0.3s',
    cursor: 'default',
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
    color: '#5DCDDB',
  },
  serviceTitle: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: '36px',
    fontWeight: 600,
    lineHeight: '43px',
    color: '#FFFFFF',
    marginBottom: '16px',
  },
  serviceDescription: {
    fontSize: '14px',
    lineHeight: '23px',
    color: '#A0A0A0',
  },
  serviceAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '4px',
    background: 'linear-gradient(180deg, #5DCDDB 0%, #7DD8E5 100%)',
    transition: 'width 0.3s',
  },
  statsSection: {
    padding: '128px 0',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #1A1A1A 50%, rgba(0, 0, 0, 0) 100%)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '80px',
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: '64px',
    fontWeight: 700,
    lineHeight: '72px',
    marginBottom: '16px',
  },
  statLabel: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.7px',
    textTransform: 'uppercase',
    color: '#6B6B6B',
  },
  portfolioGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '48px',
  },
  portfolioCard: {
    position: 'relative',
    height: '400px',
    background: '#252525',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '0.8px solid rgba(93, 205, 219, 0.1)',
    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s ease, box-shadow 0.3s ease',
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #2A2A2A 0%, #3A3A3A 100%)',
    overflow: 'hidden',
    position: 'relative',
  },
  portfolioImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
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

  portfolioIcon: {
    width: '64px',
    height: '64px',
    background: '#5DCDDB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
  },
  portfolioHover: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
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
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: 'var(--card-title-size)',
    fontWeight: 600,
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

  brandsSection: {
    padding: '128px 0',
  },
  brandsTitle: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: 'var(--section-title-size)',
    fontWeight: 600,
    lineHeight: '43px',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: '100px',
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
    padding: '100px 0',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #1A1A1A 50%, rgba(0, 0, 0, 0) 100%)',
  },
  /* Slider styles for testimonials */
  testimonialsSlider: {
    position: 'relative',
    overflow: 'visible',
    width: '100%',
    maxWidth: '1100px',
    marginTop: '24px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '0',
  },
  testimonialsTrack: {
    display: 'flex',
    gap: '0',
    alignItems: 'stretch',
    transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
    willChange: 'transform',
  },
  reviewButtonWrapper: {
    marginTop: '18px',
    display: 'flex',
    justifyContent: 'center',
  },
  reviewButton: {
    marginTop: '8px',
    padding: '12px 22px',
    borderRadius: '0',
    border: '1.6px solid #5DCDDB',
    color: '#5DCDDB',
    background: 'transparent',
    fontWeight: 700,
    cursor: 'pointer',
  },
  testimonialsViewport: {
    overflow: 'hidden',
    width: '100%',
  },
  testimonialSlide: {
    flex: `0 0 ${100 / 3}%`,
    boxSizing: 'border-box',
    padding: '0 12px',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease',
    display: 'flex',
    alignItems: 'stretch',
  },
  testimonialActive: {
    transform: 'scale(1.04)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
    opacity: 1,
  },
  testimonialInactive: {
    transform: 'scale(0.98)',
    boxShadow: 'none',
    opacity: 0.82,
  },
  testimonialArrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 8,
    background: '#5DCDDB',
    color: '#000000',
    border: 'none',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '22px',
    boxShadow: '0 8px 20px rgba(93,205,219,0.16)',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
  },
  testimonialArrowLeft: {
    left: '-24px',
  },
  testimonialArrowRight: {
    right: '-24px',
  },
  testimonialCard: {
    padding: '18px',
    background: 'rgba(37, 37, 37, 0.6)',
    border: '0.8px solid rgba(93, 205, 219, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '16px',
    minHeight: '200px',
  },
  quoteIcon: {
    fontSize: '20px',
    color: '#5DCDDB',
  },
  testimonialQuote: {
    fontSize: 'var(--body-size)',
    fontStyle: 'normal',
    lineHeight: '26px',
    color: '#A0A0A0',
    minHeight: '80px',
    marginBottom: '8px',
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
    overflow: 'hidden',
    flexShrink: 0,
    position: 'relative',
  },
  authorAvatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  authorName: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    color: '#FFFFFF',
  },
  authorRole: {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#6B6B6B',
  },
  ctaSection: {
    position: 'relative',
    margin: '0 48px 128px',
    padding: '80px 48px',
    background: 'rgba(37, 37, 37, 0.6)',
    border: '0.8px solid rgba(93, 205, 219, 0.1)',
    textAlign: 'center',
  },
  ctaContent: {
    position: 'relative',
    zIndex: 1,
  },
  ctaHeading: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: 'var(--section-title-size)',
    fontWeight: 700,
    lineHeight: '60px',
    letterSpacing: '-0.51808px',
    marginBottom: '24px',
    color: '#FFFFFF',
  },
  ctaDescription: {
    fontSize: 'var(--body-size)',
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
    fontWeight: 600,
    borderRadius: '0',
  },
};