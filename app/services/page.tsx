'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Palette, 
  Target, 
  PenTool, 
  TrendingUp, 
  Video,
  ArrowRight
} from 'lucide-react';
import type { CSSProperties } from 'react';

const services = [
  {
    id: '01',
    icon: <Camera size={28} strokeWidth={1.5} />,
    title: 'Photography & Video Production',
    description: 'Cinematic photography and video for brands, fashion, products, and corporate projects from start to finish.',
    features: ['Product Photography', 'Commercial Shoots', 'Fashion & Editorial', 'Post-Production'],
    color: '#5DCDDB'
  },
  {
    id: '02',
    icon: <Palette size={28} strokeWidth={1.5} />,
    title: 'Brand Strategy & Identity',
    description: 'We provide clarity and direction for brands with well-crafted messaging and visual systems.',
    features: ['Brand Strategy', 'Visual Identity', 'Messaging', 'Brand Guidelines'],
    color: '#7DD8E5'
  },
  {
    id: '03',
    icon: <Target size={28} strokeWidth={1.5} />,
    title: 'Studio Space',
    description: 'A professional studio for photography, video, content production, and podcasts, ensuring high-quality results.',
    features: ['Studio Hire', 'Equipment', 'Production Support', 'Lighting Setup'],
    color: '#5DCDDB'
  },
  {
    id: '04',
    icon: <PenTool size={28} strokeWidth={1.5} />,
    title: 'Design',
    description: 'From logos to complete brand systems, we create designs with care, precision, and purpose.',
    features: ['Logo Design', 'Brand Systems', 'UI/UX', 'Print Design'],
    color: '#7DD8E5'
  },
  {
    id: '05',
    icon: <TrendingUp size={28} strokeWidth={1.5} />,
    title: 'Social Media Management',
    description: 'Managing social media with creative content to engage, grow, and maintain brand presence.',
    features: ['Content Creation', 'Community Management', 'Analytics', 'Strategy'],
    color: '#5DCDDB'
  },
  {
    id: '06',
    icon: <Video size={28} strokeWidth={1.5} />,
    title: 'Website Design & Development',
    description: 'Premium websites built for seamless performance, usability, and a strong brand presence.',
    features: ['Web Design', 'Development', 'Performance', 'SEO'],
    color: '#7DD8E5'
  }
];

export default function ServicesPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <main style={styles.page}>
      {/* Minimal Header */}
      <section style={styles.headerSection}>
        <motion.div 
          style={styles.headerContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 style={styles.title}>
            Creative Solutions <br />
            <span style={styles.accentText}>That Drive Results</span>
          </h1>
          <p style={styles.subtitle}>
            From concept to execution, we deliver pixel-perfect creative services 
            that elevate your brand and captivate your audience.
          </p>
        </motion.div>
      </section>

      {/* Interactive Interactive Grid */}
      <section style={styles.gridSection}>
        <div style={styles.gridContainer}>
          <div style={styles.servicesGrid}>
            {services.map((service) => (
              <ServiceCard 
                key={service.id}
                service={service}
                isHovered={hoveredId === service.id}
                isAnyHovered={hoveredId !== null}
                onHover={() => setHoveredId(service.id)}
                onLeave={() => setHoveredId(null)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Subtle Bottom CTA */}
      <section style={styles.ctaSection}>
        <motion.div 
          style={styles.ctaBox}
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <p style={styles.ctaText}>Ready to start your next chapter?</p>
          <a href="/contact" style={styles.ctaLink}>
            Let&apos;s talk 
            <ArrowRight size={18} style={{ marginLeft: '12px' }} />
          </a>
        </motion.div>
      </section>
    </main>
  );
}

function ServiceCard({ service, isHovered, isAnyHovered, onHover, onLeave }: any) {
  return (
    <motion.div
      style={{
        ...styles.card,
        opacity: isAnyHovered && !isHovered ? 0.3 : 1,
        filter: isAnyHovered && !isHovered ? 'grayscale(0.5) blur(2px)' : 'none',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div style={styles.cardTop}>
        <div style={{ ...styles.iconContainer, color: service.color }}>
          {service.icon}
        </div>
        <span style={styles.idText}>{service.id}</span>
      </div>

      <div style={styles.cardBody}>
        <h3 style={styles.cardTitle}>{service.title}</h3>
        <p style={styles.cardDescription}>{service.description}</p>
        
        <div style={styles.featureList}>
          {service.features.map((feature: string, i: number) => (
            <span key={i} style={styles.featureTag}>
              {feature}
            </span>
          ))}
        </div>
      </div>

      {isHovered && (
        <motion.div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            border: `1px solid ${service.color}40`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    backgroundColor: '#0F0F0F',
    minHeight: '100vh',
    padding: '160px 24px 100px',
    color: '#FFFFFF',
    fontFamily: 'Cousine, monospace',
    overflowX: 'hidden',
  },
  headerSection: {
    marginBottom: '100px',
    textAlign: 'center',
  },
  headerContainer: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: 'clamp(32px, 5vw, 64px)',
    fontWeight: 700,
    lineHeight: '1.1',
    marginBottom: '32px',
    letterSpacing: '-0.02em',
  },
  accentText: {
    background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: 'clamp(16px, 2vw, 18px)',
    color: '#888',
    lineHeight: '1.7',
    maxWidth: '600px',
    margin: '0 auto',
  },
  gridSection: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  gridContainer: {
    width: '100%',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '24px',
  },
  card: {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '24px',
    padding: '48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'default',
    minHeight: '400px',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    background: 'rgba(255, 255, 255, 0.03)',
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  idText: {
    fontSize: '14px',
    color: '#444',
    fontWeight: 600,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cardTitle: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: '24px',
    fontWeight: 600,
    color: '#FFF',
  },
  cardDescription: {
    fontSize: '15px',
    color: '#999',
    lineHeight: '1.6',
  },
  featureList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '12px',
  },
  featureTag: {
    fontSize: '11px',
    color: '#666',
    padding: '6px 12px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '100px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  ctaSection: {
    marginTop: '120px',
    textAlign: 'center',
    paddingBottom: '60px',
  },
  ctaBox: {
    display: 'inline-block',
    padding: '40px 60px',
    background: 'rgba(93, 205, 219, 0.02)',
    border: '1px solid rgba(93, 205, 219, 0.1)',
    borderRadius: '32px',
  },
  ctaText: {
    fontSize: '16px',
    color: '#888',
    marginBottom: '16px',
  },
  ctaLink: {
    fontFamily: 'Erbaum, Cousine, monospace',
    fontSize: '24px',
    color: '#5DCDDB',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: 600,
    transition: 'color 0.3s ease',
  },
};
