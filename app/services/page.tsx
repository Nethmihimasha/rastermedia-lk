'use client';

import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Palette,
  PenTool,
  Camera,
  Video,
  TrendingUp,
  Target,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    number: '01',
    icon: <Camera size={32} strokeWidth={1.5} />,
    title: 'Photography & Video Production',
    description: 'Cinematic photography and video for brands, fashion, products, and corporate projects from start to finish.',
    features: ['Product Photography', 'Commercial Shoots', 'Fashion & Editorial', 'Post-Production'],
    backgroundImage: '/images/video_1.jpg',
    color: '#5DCDDB'
  },
  {
    number: '02',
    icon: <Palette size={32} strokeWidth={1.5} />,
    title: 'Brand Strategy & Identity',
    description: 'We provide clarity and direction for brands with well-crafted messaging and visual systems.',
    features: ['Brand Strategy', 'Visual Identity', 'Messaging', 'Brand Guidelines'],
    backgroundImage: '/images/design_3.jpg',
    color: '#7DD8E5'
  },
  {
    number: '03',
    icon: <Target size={32} strokeWidth={1.5} />,
    title: 'Studio Space',
    description: 'A professional studio for photography, video, content production, and podcasts, ensuring high-quality results.',
    features: ['Studio Hire', 'Equipment', 'Production Support', 'Lighting Setup'],
    backgroundImage: '/images/album10-winter-studio-01.jpg',
    color: '#5DCDDB'
  },
  {
    number: '04',
    icon: <PenTool size={32} strokeWidth={1.5} />,
    title: 'Design',
    description: 'From logos to complete brand systems, we create designs with care, precision, and purpose.',
    features: ['Logo Design', 'Brand Systems', 'UI/UX', 'Print Design'],
    backgroundImage: '/images/design_1.jpg',
    color: '#7DD8E5'
  },
  {
    number: '05',
    icon: <TrendingUp size={32} strokeWidth={1.5} />,
    title: 'Social Media Management',
    description: 'Managing social media with creative content to engage, grow, and maintain brand presence.',
    features: ['Content Creation', 'Community Management', 'Analytics', 'Strategy'],
    backgroundImage: '/images/design_5.jpg',
    color: '#5DCDDB'
  },
  {
    number: '06',
    icon: <Video size={32} strokeWidth={1.5} />,
    title: 'Website Design & Development',
    description: 'Premium websites built for seamless performance, usability, and a strong brand presence.',
    features: ['Web Design', 'Development', 'Performance', 'SEO'],
    backgroundImage: '/images/design_9.jpg',
    color: '#7DD8E5'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into understanding your brand, goals, and target audience to create a tailored approach.',
    icon: <Target size={24} />
  },
  {
    step: '02',
    title: 'Creative Development',
    description: 'Our team brings ideas to life with innovative concepts and compelling visual solutions.',
    icon: <Palette size={24} />
  },
  {
    step: '03',
    title: 'Production & Execution',
    description: 'We execute with precision, ensuring every detail aligns with your vision and objectives.',
    icon: <Camera size={24} />
  },
  {
    step: '04',
    title: 'Launch & Optimization',
    description: 'We launch your project and continuously optimize for maximum impact and results.',
    icon: <TrendingUp size={24} />
  }
];

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>
              <span style={styles.heroLine}>Creative Solutions</span>
              <span style={styles.heroLine}>
                That <span style={styles.gradientText}>Drive Results</span>
              </span>
            </h1>
            <p style={styles.heroDescription}>
              From concept to execution, we deliver pixel-perfect creative services
              that elevate your brand and captivate your audience.
            </p>
          </div>
          <div style={styles.heroActions}>
            <Link href="/contact" style={styles.primaryButton}>
              Start Your Project
              <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </Link>
            <Link href="/portfolio" style={styles.secondaryButton}>
              View Our Work
            </Link>
          </div>
        </div>
        <div style={styles.heroVisual}>
          <div style={styles.floatingElements}>
            <div style={{ ...styles.floatingElement, ...styles.element1 }}>
              <Camera size={24} />
            </div>
            <div style={{ ...styles.floatingElement, ...styles.element2 }}>
              <Palette size={24} />
            </div>
            <div style={{ ...styles.floatingElement, ...styles.element3 }}>
              <Video size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={styles.servicesSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Our <span style={styles.gradientText}>Services</span>
            </h2>
            <p style={styles.sectionDescription}>
              Comprehensive creative solutions tailored to bring your vision to life
            </p>
          </div>

          <div style={styles.servicesGrid}>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                isHovered={hoveredService === index}
                onHover={() => setHoveredService(index)}
                onLeave={() => setHoveredService(null)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={styles.processSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Our <span style={styles.gradientText}>Process</span>
            </h2>
            <p style={styles.sectionDescription}>
              A proven methodology that ensures exceptional results every time
            </p>
          </div>

          <div style={styles.processGrid}>
            {processSteps.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ service, isHovered, onHover, onLeave }: {
  service: typeof services[0];
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      style={{
        ...styles.serviceCard,
        transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? `0 20px 40px rgba(93, 205, 219, 0.15), 0 0 0 1px ${service.color}40`
          : '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div style={styles.serviceImage}>
        <Image
          src={service.backgroundImage}
          alt={service.title}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div style={styles.serviceOverlay} />
      </div>

      <div style={styles.serviceContent}>
        <div style={styles.serviceHeader}>
          <div style={{ ...styles.serviceIcon, color: service.color }}>
            {service.icon}
          </div>
          <span style={styles.serviceNumber}>{service.number}</span>
        </div>

        <h3 style={styles.serviceTitle}>{service.title}</h3>
        <p style={styles.serviceDescription}>{service.description}</p>

        <div style={styles.serviceFeatures}>
          {service.features.map((feature, idx) => (
            <span key={idx} style={styles.serviceFeature}>
              {feature}
            </span>
          ))}
        </div>

        <div style={{
          ...styles.serviceAccent,
          backgroundColor: service.color,
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
        }} />
      </div>
    </div>
  );
}

function ProcessStep({ step, index }: { step: typeof processSteps[0]; index: number }) {
  return (
    <div style={styles.processStep}>
      <div style={styles.processIcon}>
        {step.icon}
      </div>
      <div style={styles.processContent}>
        <div style={styles.processStepNumber}>{step.step}</div>
        <h3 style={styles.processTitle}>{step.title}</h3>
        <p style={styles.processDescription}>{step.description}</p>
      </div>
      {index < processSteps.length - 1 && (
        <div style={styles.processArrow}>
          <ArrowRight size={20} />
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0F0F0F',
  },

  // Hero Section
  hero: {
    position: 'relative',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    padding: '120px 24px 80px',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
  },
  heroText: {
    maxWidth: '600px',
  },
  heroTitle: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: 'clamp(36px, 5vw, 58px)',
    fontWeight: 700,
    lineHeight: '1.1',
    color: '#FFFFFF',
    marginBottom: '24px',
  },
  heroLine: {
    display: 'block',
  },
  gradientText: {
    background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroDescription: {
    fontFamily: 'Cousine, monospace',
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#A0A0A0',
    marginBottom: '40px',
  },
  heroActions: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)',
    color: '#0F0F0F',
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: '16px',
    fontWeight: 600,
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '16px 32px',
    background: 'transparent',
    color: '#FFFFFF',
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: '16px',
    fontWeight: 600,
    textDecoration: 'none',
    border: '2px solid #5DCDDB',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  heroVisual: {
    position: 'relative',
    height: '400px',
  },
  floatingElements: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  floatingElement: {
    position: 'absolute',
    width: '60px',
    height: '60px',
    background: 'rgba(93, 205, 219, 0.1)',
    border: '1px solid rgba(93, 205, 219, 0.3)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5DCDDB',
    backdropFilter: 'blur(10px)',
    animation: 'float 6s ease-in-out infinite',
  },
  element1: {
    top: '20%',
    left: '20%',
    animationDelay: '0s',
  },
  element2: {
    top: '60%',
    right: '15%',
    animationDelay: '2s',
  },
  element3: {
    bottom: '20%',
    left: '60%',
    animationDelay: '4s',
  },

  // Container and Sections
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 24px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '80px',
  },
  sectionTitle: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: 'clamp(36px, 4vw, 52px)',
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: '16px',
  },
  sectionDescription: {
    fontFamily: 'Cousine, monospace',
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#A0A0A0',
    maxWidth: '600px',
    margin: '0 auto',
  },

  // Services Section
  servicesSection: {
    padding: '120px 0',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '32px',
  },
  serviceCard: {
    position: 'relative',
    background: '#1A1A1A',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: '1px solid rgba(93, 205, 219, 0.1)',
  },
  serviceImage: {
    position: 'relative',
    height: '200px',
    width: '100%',
  },
  serviceOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.8) 0%, rgba(15, 15, 15, 0.4) 100%)',
  },
  serviceContent: {
    padding: '32px',
    position: 'relative',
  },
  serviceHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  serviceIcon: {
    width: '48px',
    height: '48px',
    background: 'rgba(93, 205, 219, 0.1)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  serviceNumber: {
    fontFamily: 'Cousine, monospace',
    fontSize: '14px',
    fontWeight: 600,
    color: '#A0A0A0',
  },
  serviceTitle: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: '24px',
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: '12px',
  },
  serviceDescription: {
    fontFamily: 'Cousine, monospace',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#A0A0A0',
    marginBottom: '24px',
  },
  serviceFeatures: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  serviceFeature: {
    padding: '6px 12px',
    background: 'rgba(93, 205, 219, 0.1)',
    color: '#5DCDDB',
    fontSize: '12px',
    fontWeight: 500,
    borderRadius: '20px',
    fontFamily: 'Cousine, monospace',
  },
  serviceAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    width: '100%',
    transformOrigin: 'left',
    transition: 'transform 0.4s ease',
  },

  // Process Section
  processSection: {
    padding: '120px 0',
    background: 'linear-gradient(135deg, rgba(93, 205, 219, 0.02) 0%, rgba(125, 216, 229, 0.02) 100%)',
  },
  processGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
    position: 'relative',
  },
  processStep: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    padding: '32px',
    background: '#1A1A1A',
    borderRadius: '16px',
    border: '1px solid rgba(93, 205, 219, 0.1)',
    position: 'relative',
  },
  processIcon: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0F0F0F',
    flexShrink: 0,
  },
  processContent: {
    flex: 1,
  },
  processStepNumber: {
    fontFamily: 'Cousine, monospace',
    fontSize: '12px',
    fontWeight: 600,
    color: '#5DCDDB',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  processTitle: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: '20px',
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: '12px',
  },
  processDescription: {
    fontFamily: 'Cousine, monospace',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#A0A0A0',
  },
  processArrow: {
    position: 'absolute',
    right: '-20px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#5DCDDB',
    opacity: 0.5,
  },
};

// Add floating animation
const floatingKeyframes = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    33% {
      transform: translateY(-20px) rotate(5deg);
    }
    66% {
      transform: translateY(-10px) rotate(-5deg);
    }
  }
`;

// Inject keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = floatingKeyframes;
  document.head.appendChild(style);
}
