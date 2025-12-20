'use client';

import styles from './about.module.css';

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
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeading}>
          <span>Crafting </span>
          <span className="gradient-text">Pixel-Perfect</span>
          <span> Brand Experiences</span>
        </h1>
        <p className={styles.heroDescription}>
          We're a team of creative professionals dedicated to transforming ideas into reality through innovative design, strategic thinking, and flawless execution.
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
          <div className={styles.storyImage}></div>
          <div className={styles.storyContent}>
            <h2 className={styles.storyTitle}>Our Story</h2>
            <p className={styles.storyText}>
              Founded in 2012, Raster Media emerged from a simple belief: every brand deserves creative solutions that go beyond the ordinary. What started as a small design studio has grown into a full-service creative agency.
            </p>
            <p className={styles.storyText}>
              Our name reflects our philosophy—every pixel, every element, and every detail matters. We combine artistic vision with technical precision to deliver work that stands the test of time.
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
              <div className={styles.iconCircle}></div>
            </div>
            <h3 className={styles.mvTitle}>Our Mission</h3>
            <p className={styles.mvText}>
              To empower brands with creative solutions that challenge conventions, inspire audiences, and deliver measurable results that exceed expectations.
            </p>
          </div>
          <div className={styles.mvCard}>
            <div className={styles.mvIcon}>
              <div className={styles.iconTarget}></div>
            </div>
            <h3 className={styles.mvTitle}>Our Vision</h3>
            <p className={styles.mvText}>
              To be the world's most trusted creative partner, renowned for innovation, excellence, and our unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  const values = [
    {
      icon: '💡',
      title: 'Innovation First',
      description: 'We push creative boundaries and embrace cutting-edge technologies to deliver fresh solutions.'
    },
    {
      icon: '🤝',
      title: 'Trust & Transparency',
      description: 'Building long-term partnerships through honest communication and reliable delivery.'
    },
    {
      icon: '⚡',
      title: 'Excellence Driven',
      description: 'Every pixel matters. We\'re committed to delivering nothing short of exceptional quality.'
    },
    {
      icon: '🎯',
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
              <div className={styles.valueIcon}>{value.icon}</div>
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
  return (
    <section className={styles.btsSection}>
      <div className="container">
        <h2 className={styles.btsTitle}>
          Behind <span className="gradient-text">The Scenes</span>
        </h2>
        <div className={styles.btsGrid}>
          <div className={styles.btsImage}></div>
          <div className={styles.btsImage}></div>
        </div>
      </div>
    </section>
  );
}

function TechnologyStackSection() {
  const technologies = [
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Adobe InDesign',
    'Figma',
    'Adobe Premiere Pro',
    'After Effects',
    'Adobe Lightroom',
    'Cinema 4D',
    'React.js',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'WordPress',
    'Webflow',
    'Shopify'
  ];

  return (
    <section className={styles.techSection}>
      <div className={styles.techRibbon}>
        <div className={styles.techTrack}>
          {[...technologies, ...technologies].map((tech, index) => (
            <div key={index} className={styles.techItem}>
              <div className={styles.techDot}></div>
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.techNote}>
        Expanding into custom software development & web solutions
      </div>
    </section>
  );
}