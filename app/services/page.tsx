'use client';

import type { CSSProperties } from 'react';
import MagicBento from '../components/MagicBento';
import {
  Palette,
  PenTool,
  Camera,
  Video,
  TrendingUp,
  Target
} from 'lucide-react';

const services = [
  {
    number: '01',
    icon: <Camera size={28} strokeWidth={1.5} />,
    title: 'Photography & Video Production',
    description: 'Cinematic photography and video for brands, fashion, products, and corporate projects from start to finish.',
    features: ['Product Photography', 'Commercial Shoots', 'Fashion & Editorial']
  },
  {
    number: '02',
    icon: <Palette size={28} strokeWidth={1.5} />,
    title: 'Brand Strategy & Identity',
    description: 'We provide clarity and direction for brands with well-crafted messaging and visual systems.',
    features: ['Brand Strategy', 'Visual Identity', 'Messaging']
  },
  {
    number: '03',
    icon: <Target size={28} strokeWidth={1.5} />,
    title: 'Studio Space',
    description: 'A professional studio for photography, video, content production, and podcasts, ensuring high-quality results.',
    features: ['Studio Hire', 'Equipment', 'Production Support']
  },
  {
    number: '04',
    icon: <PenTool size={28} strokeWidth={1.5} />,
    title: 'Design',
    description: 'From logos to complete brand systems, we create designs with care, precision, and purpose.',
    features: ['Logo Design', 'Brand Systems', 'UI/UX']
  },
  {
    number: '05',
    icon: <TrendingUp size={28} strokeWidth={1.5} />,
    title: 'Social Media Management',
    description: 'Managing social media with creative content to engage, grow, and maintain brand presence.',
    features: ['Content Creation', 'Community Management', 'Analytics']
  },
  {
    number: '06',
    icon: <Video size={28} strokeWidth={1.5} />,
    title: 'Website Design & Development',
    description: 'Premium websites built for seamless performance, usability, and a strong brand presence.',
    features: ['Web Design', 'Development', 'Performance']
  }
];

export default function ServicesPage() {
  return (
    <div style={styles.servicesPage} className="services-page-wrap">
      <section style={styles.heroSection} className="services-hero">
        <div style={styles.heroImageWrapper}>
          <div style={styles.heroImageOverlay} />
        </div>
        <div style={styles.heroContent} className="services-hero-content">
          <div style={styles.heading1}>
            <h1 style={styles.mainTitle}>Comprehensive</h1>
            <div style={styles.gradientText}><span>Creative Solutions</span></div>
          </div>
          <p style={styles.heroParagraph}>End-to-end creative services that transform ideas into impactful experiences</p>
        </div>
      </section>

      <div style={{ padding: '40px 24px' }}>
        <MagicBento
          items={services}
          enableStars={false}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          particleCount={0}
          glowColor={'93, 205, 219'}
        />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-page-wrap { padding: 0 32px !important; }
          .services-hero { min-height: 380px !important; margin-top: 20px !important; }
          .services-hero-content { padding: 0 32px !important; }
          .services-hero-content h1, .services-hero-content span { font-size: 44px !important; line-height: 52px !important; }
        }
        @media (max-width: 768px) {
          .services-page-wrap { padding: 0 24px !important; }
          .services-hero { min-height: 350px !important; padding: 60px 0 40px !important; }
          .services-hero-content { padding: 0 24px !important; }
          .services-hero-content h1, .services-hero-content span { font-size: 36px !important; line-height: 44px !important; }
        }
        @media (max-width: 480px) {
          .services-page-wrap { padding: 0 16px !important; }
          .services-hero { min-height: 320px !important; padding: 50px 0 30px !important; }
          .services-hero-content { padding: 0 16px !important; }
          .services-hero-content h1, .services-hero-content span { font-size: 28px !important; line-height: 36px !important; }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  servicesPage: { width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '0 48px 0', display: 'flex', flexDirection: 'column' },
  heroSection: { position: 'relative', textAlign: 'center', width: '100vw', marginLeft: 'calc(50% - 50vw)', height: '60vh', minHeight: '420px', marginBottom: '32px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F0F0F' },
  heroImageWrapper: { position: 'absolute', inset: 0, zIndex: 0 },
  heroImageOverlay: { position: 'absolute', inset: 0, background: 'transparent' },
  heroContent: { position: 'relative', zIndex: 2, maxWidth: '900px', padding: '0 48px' },
  heading1: { marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  mainTitle: { fontFamily: 'Erbaum, Cousine, monospace', fontWeight: 700, fontSize: '50px', lineHeight: '60px', textAlign: 'center', letterSpacing: '-0.51808px', color: '#FFFFFF', margin: 0 },
  gradientText: { display: 'inline-block' },
  heroParagraph: { fontFamily: 'Cousine, monospace', fontWeight: 400, fontSize: '15px', lineHeight: '28px', textAlign: 'center', color: '#A0A0A0', margin: '24px auto 0', maxWidth: '600px' },
};
