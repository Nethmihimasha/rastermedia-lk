'use client';

import { motion } from 'motion/react';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack.client';
import styles from './services.module.css';
// Image removed from hero; keeping import commented out in case of future use
// import Image from 'next/image';
import { 
  Palette, 
  PenTool, 
  Camera, 
  Video, 
  TrendingUp, 
  Target
} from 'lucide-react';

// --- Data with Lucide Icons ---
const services = [
  {
    number: '01',
    icon: <Camera size={32} strokeWidth={1.5} />,
    title: 'Photography & Video Production',
    description: 'Cinematic photography and video for brands, fashion, products, and corporate projects from start to finish.',
    features: ['Product Photography', 'Commercial Shoots', 'Fashion & Editorial']
  },
  {
    number: '02',
    icon: <Palette size={32} strokeWidth={1.5} />,
    title: 'Brand Strategy & Identity',
    description: 'We provide clarity and direction for brands with well-crafted messaging and visual systems.',
    features: ['Brand Strategy', 'Visual Identity', 'Messaging']
  },
  {
    number: '03',
    icon: <Target size={32} strokeWidth={1.5} />,
    title: 'Studio Space',
    description: 'A professional studio for photography, video, content production, and podcasts, ensuring high-quality results.',
    features: ['Studio Hire', 'Equipment', 'Production Support']
  },
  {
    number: '04',
    icon: <PenTool size={32} strokeWidth={1.5} />,
    title: 'Design',
    description: 'From logos to complete brand systems, we create designs with care, precision, and purpose.',
    features: ['Logo Design', 'Brand Systems', 'UI/UX']
  },
  {
    number: '05',
    icon: <TrendingUp size={32} strokeWidth={1.5} />,
    title: 'Social Media Management',
    description: 'Managing social media with creative content to engage, grow, and maintain brand presence.',
    features: ['Content Creation', 'Community Management', 'Analytics']
  },
  {
    number: '06',
    icon: <Video size={32} strokeWidth={1.5} />,
    title: 'Website Design & Development',
    description: 'Premium websites built for seamless performance, usability, and a strong brand presence.',
    features: ['Web Design', 'Development', 'Performance']
  }
];

export default function ServicesPage() {
  return (
    <div className={styles.app}>
      <div className={styles.servicesPage}>
        {/* Hero Section (image removed; keep text) */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className={styles.heading1}>
                <h1 className={styles.mainTitle}>
                  Comprehensive
                </h1>
                <div className={styles.gradientText}>
                  <span>Creative Solutions</span>
                </div>
              </div>
              <p className={styles.heroParagraph}>
                End-to-end creative services that transform ideas into impactful experiences
              </p>
            </motion.div>
          </div>
        </section>

        {/* Magic Bento Section */}
        <div style={{ padding: '0 24px 80px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
            <ScrollStack useWindowScroll={true}>
              {services.map((s, idx) => (
                <ScrollStackItem key={idx}>
                  <h2 style={{marginTop:0}}>{s.title}</h2>
                  <p>{s.description}</p>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
      </div>
    </div>
  );
}