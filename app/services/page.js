"use client";

import MagicBento from '../components/MagicBento';
import styles from './services.module.css';
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
    <div className={styles.servicesPage}>
      <section className={styles.heroSection}>
        <div className={styles.heroImageWrapper}>
          <div className={styles.heroImageOverlay} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heading1}>
            <h1 className={styles.mainTitle}>Comprehensive</h1>
            <div className={styles.gradientText}><span>Creative Solutions</span></div>
          </div>
          <p className={styles.heroParagraph}>End-to-end creative services that transform ideas into impactful experiences</p>
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
        clickEffect={false}
        particleCount={0}
        glowColor={'93, 205, 219'}
      />
      </div>
    </div>
  );
}