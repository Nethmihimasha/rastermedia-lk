'use client';

import { useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Mic2, 
  Clock, 
  Check, 
  ArrowRight, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee,
  X,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { 
  useScrollAnimation, 
  scrollAnimationVariants, 
  staggerContainerVariants, 
  staggerItemVariants 
} from '../hooks/useScrollAnimation';

interface StudioPackage {
  price: number;
  extraHourPrice: number;
  equipment: string[];
  image: string;
  popular?: boolean;
}

interface Packages {
  [key: string]: {
    [key: string]: StudioPackage;
  };
}

const packages: Packages = {
  backdrop: {
    '1hr': {
      price: 3000,
      extraHourPrice: 2500,
      equipment: [
        'Godox 600 BM II',
        'Nanlite FC-300B',
        'Nanlite FC-120B',
        'C-stand with boom arm',
        '120 Parabolic Softbox',
        '90 Softbox',
        'Godox SB-FW 35x160cm Softbox',
        'Makeup & Dressing Room',
        'Fully Air-Conditioned',
        'Pantry Area',
        'Parking',
      ],
      image: 'https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2Njc0ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    '2hr': {
      price: 5500,
      extraHourPrice: 2500,
      equipment: [
        'Godox 600 BM II',
        'Nanlite FC-300B',
        'Nanlite FC-120B',
        'C-stand with boom arm',
        '120 Parabolic Softbox',
        '90 Softbox',
        'Godox SB-FW 35x160cm Softbox',
        'Makeup & Dressing Room',
        'Fully Air-Conditioned',
        'Pantry Area',
        'Parking',
      ],
      image: 'https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2Njc0ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      popular: true
    },
    '5hr': {
      price: 12500,
      extraHourPrice: 2500,
      equipment: [
        'Godox 600 BM II',
        'Nanlite FC-300B',
        'Nanlite FC-120B',
        'ZSYB LC60C RGB Video Light',
        'C-stand with boom arm',
        '120 Parabolic Softbox',
        '90 Softbox',
        'Godox SB-FW 35x160cm Softbox',
        'Bowens Mount Spotlight Light Projector',
        'Makeup & Dressing Room',
        'Fully Air-Conditioned',
        'Pantry Area',
        'Parking',
      ],
      image: 'https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2Njc0ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    '8hr': {
      price: 20000,
      extraHourPrice: 2500,
      equipment: [
        'Godox 600 BM II',
        'Nanlite FC-300B',
        'Nanlite FC-120B',
        'ZSYB LC60C RGB Video Light',
        'C-stand with boom arm',
        '120 Parabolic Softbox',
        '90 Softbox',
        'Godox SB-FW 35x160cm Softbox',
        'Bowens Mount Spotlight Light Projector',
        'Makeup & Dressing Room',
        'Fully Air-Conditioned',
        'Pantry Area',
        'Parking',
      ],
      image: 'https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2Njc0ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  },
  podcast: {
    '1hr': {
      price: 4000,
      extraHourPrice: 3500,
      equipment: [
        '1 Seated Sofa ×2',
        'Nanlite FC-300B',
        'Nanlite FC-120B',
        'Godox 600 BM II',
        'KF RGB Video Light',
        'Floor Lamp',
        'C-stand with boom arm',
        '120 Parabolic Softbox',
        '90 Softbox',
        'Makeup & Dressing Room',
        'Fully Air-Conditioned',
        'Pantry Area',
        'Parking'
      ],
      image: 'https://images.unsplash.com/photo-1716703433576-13ff2922db95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwc3R1ZGlvJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2NzYxNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    '2hr': {
      price: 7500,
      extraHourPrice: 3500,
      equipment: [
        '1 Seated Sofa ×2',
        'Nanlite FC-300B',
        'Nanlite FC-120B',
        'Godox 600 BM II',
        'KF RGB Video Light',
        'Floor Lamp',
        'C-stand with boom arm',
        '120 Parabolic Softbox',
        '90 Softbox',
        'Makeup & Dressing Room',
        'Fully Air-Conditioned',
        'Pantry Area',
        'Parking'
      ],
      image: 'https://images.unsplash.com/photo-1716703433576-13ff2922db95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwc3R1ZGlvJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2NzYxNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      popular: true
    },
    '5hr': {
      price: 14500,
      extraHourPrice: 3500,
      equipment: [
        '1 Seated Sofa ×2',
        'Nanlite FC-300B',
        'Nanlite FC-120B',
        'Godox 600 BM II',
        'KF RGB Video Light',
        'Floor Lamp',
        'ZSYB LC60C RGB Video Light',
        'C-stand with boom arm',
        '120 Parabolic Softbox',
        '90 Softbox',
        'Godox SB-FW 35x160cm Softbox',
        'Bowens Mount Spotlight Light Projector',
        'Makeup & Dressing Room',
        'Fully Air-Conditioned',
        'Pantry Area',
        'Parking'
      ],
      image: 'https://images.unsplash.com/photo-1716703433576-13ff2922db95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwc3R1ZGlvJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2NzYxNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    '8hr': {
      price: 22500,
      extraHourPrice: 3500,
      equipment: [
        '1 Seated Sofa ×2',
        'Nanlite FC-300B',
        'Nanlite FC-120B',
        'Godox 600 BM II',
        'KF RGB Video Light',
        'Floor Lamp',
        'ZSYB LC60C RGB Video Light',
        'C-stand with boom arm',
        '120 Parabolic Softbox',
        '90 Softbox',
        'Godox SB-FW 35x160cm Softbox',
        'Bowens Mount Spotlight Light Projector',
        'Makeup & Dressing Room',
        'Fully Air-Conditioned',
        'Pantry Area',
        'Parking'
      ],
      image: 'https://images.unsplash.com/photo-1716703433576-13ff2922db95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwc3R1ZGlvJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2NzYxNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  }
};

export default function StudioBookingPage() {
  const [packageType, setPackageType] = useState('backdrop');
  const [selectedDuration, setSelectedDuration] = useState('2hr');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPackage = packages[packageType][selectedDuration];
  const { ref: packageRef, isInView: packageInView } = useScrollAnimation();
  const { ref: locationRef, isInView: locationInView } = useScrollAnimation();

  return (
    <div style={styles.page} className="studio-page-container">
      {/* Hero Section */}
      <section style={styles.heroSection} className="studio-hero-section">
        <motion.div 
          style={styles.heroImageWrapper}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2Njc0ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Professional Studio"
            style={{ objectFit: 'cover' }}
            fill
            sizes="100vw"
            priority
          />
          <div style={styles.heroImageOverlay} />
        </motion.div>

        <div style={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 style={styles.heroTitle}>
              Book Our Professional
              <br />
              <span style={styles.gradientText}>Creative Studio</span>
            </h1>
            <p style={styles.heroSubtitle}>
              Fully-equipped studio space with professional lighting, backdrops, and equipment. 
              Perfect for photography, videography, podcasts, and creative productions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Package SelectorSection */}
      <section style={styles.packageSelectorSection} ref={packageRef} className="studio-section-padding">
        <motion.div
          style={styles.container}
          initial="hidden"
          animate={packageInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          {/* Package Type Toggle */}
          <motion.div style={styles.packageTypeToggle} variants={staggerItemVariants}>
            <motion.button
              style={{
                ...styles.toggleButton,
                ...(packageType === 'backdrop' ? styles.toggleButtonActive : {})
              }}
              onClick={() => setPackageType('backdrop')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="studio-toggle-btn"
            >
              <Camera size={20} style={{ color: packageType === 'backdrop' ? '#5DCDDB' : '#6B6B6B' }} />
              <div style={styles.toggleContent}>
                <span style={{...styles.toggleTitle, color: packageType === 'backdrop' ? '#5DCDDB' : '#FFFFFF'}}>Seamless Backdrop</span>
              </div>
            </motion.button>

            <motion.button
              style={{
                ...styles.toggleButton,
                ...(packageType === 'podcast' ? styles.toggleButtonActive : {})
              }}
              onClick={() => setPackageType('podcast')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="studio-toggle-btn"
            >
              <Mic2 size={20} style={{ color: packageType === 'podcast' ? '#5DCDDB' : '#6B6B6B' }} />
              <div style={styles.toggleContent}>
                <span style={{...styles.toggleTitle, color: packageType === 'podcast' ? '#5DCDDB' : '#FFFFFF'}}>Podcast / Interior</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Duration & Pricing Section */}
          <motion.div style={styles.durationSection} variants={staggerItemVariants}>
            <motion.div 
              style={styles.durationSelector}
              key={packageType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div style={styles.durationHeader}>
                <Clock size={22} style={{ color: '#5DCDDB' }} />
                <h3 style={styles.durationTitle}>Select Duration</h3>
              </div>

              <div style={styles.durationOptions} className="studio-duration-options">
                {Object.keys(packages[packageType]).map((duration) => {
                  const pkg = packages[packageType][duration];
                  const maxPrice = Math.max(...Object.values(packages[packageType]).map(p => p.price));
                  const pricePercentage = (pkg.price / maxPrice) * 100;

                  return (
                    <motion.div
                      key={duration}
                      style={{
                        ...styles.durationOption,
                        ...(selectedDuration === duration ? styles.durationOptionActive : {})
                      }}
                      onClick={() => setSelectedDuration(duration)}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="studio-duration-opt"
                    >
                      {pkg.popular && (
                        <div style={styles.popularPill}>Most Popular</div>
                      )}
                      <div style={styles.durationHours}>{duration}</div>
                      <div style={styles.durationPrice}>
                        <span style={styles.currency}>LKR</span>
                        <span style={styles.amount}>{pkg.price.toLocaleString()}</span>
                      </div>
                      <div style={styles.priceBar}>
                        <motion.div 
                          style={{
                            ...styles.priceBarFill,
                            width: `${pricePercentage}%`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pricePercentage}%` }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Featured Package Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${packageType}-${selectedDuration}`}
                style={styles.featuredPackage}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <div style={styles.packageVisual} className="studio-package-visual">
                  <div style={styles.packageImageWrapper}>
                    <Image src={currentPackage.image} alt="Studio Package" style={{ objectFit: 'cover' }} fill sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div style={styles.imageOverlay} />
                  </div>

                  <div style={styles.packageInfo} className="studio-package-info">
                    <div style={styles.packageHeader} className="studio-package-header">
                      <div>
                        <h2 style={styles.packageTitle}>
                          {packageType === 'backdrop' ? 'Seamless Backdrop' : 'Podcast / Interior'}
                        </h2>
                        <p style={styles.packageSubtitle}>{selectedDuration} Session</p>
                      </div>
                      <div style={styles.packagePriceBlock}>
                        <div style={styles.mainPrice}>
                          <span style={styles.currency6B}>LKR</span>
                          <span style={styles.priceAmountText}>{currentPackage.price.toLocaleString()}</span>
                        </div>
                        <div style={styles.extraHourPriceText}>
                          Extra hour: <span style={{ color: '#5DCDDB' }}>LKR {currentPackage.extraHourPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div style={styles.equipmentSection}>
                      <h3 style={styles.equipmentHeading}>
                        <Check size={20} style={{ color: '#5DCDDB' }} />
                        Included Equipment & Features
                      </h3>
                      <div style={styles.equipmentGrid} className="studio-equip-grid">
                        {currentPackage.equipment.map((item, index) => (
                          <motion.div
                            key={index}
                            style={styles.equipmentItem}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Check size={13} style={{ color: '#5DCDDB', flexShrink: 0 }} />
                            <span style={styles.equipmentName}>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      style={styles.bookNowButton}
                      onClick={() => setIsModalOpen(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="studio-book-btn"
                    >
                      Book This Package
                      <ArrowRight size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      {/* Location Section */}
      <section style={styles.locationSection} ref={locationRef} className="studio-section-padding">
        <motion.div
          style={styles.container}
          initial="hidden"
          animate={locationInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.div style={styles.locationCard} variants={staggerItemVariants} className="studio-location-card">
            <MapPin size={56} style={{ color: '#5DCDDB', flexShrink: 0 }} />
            <div style={styles.locationContent}>
              <h3 style={styles.locationTitle}>Visit Our Studio</h3>
              <p style={styles.locationAddress}>
                Raster Media Creative Studio<br />
                132 A /2/1, Old Negombo Road, Wattala
              </p>
              <div style={styles.locationFeatures}>
                <div style={styles.locationFeature}><Wifi size={18} style={{ color: '#5DCDDB' }} /><span>High-Speed WiFi</span></div>
                <div style={styles.locationFeature}><Car size={18} style={{ color: '#5DCDDB' }} /><span>Free Parking</span></div>
                <div style={styles.locationFeature}><Coffee size={18} style={{ color: '#5DCDDB' }} /><span>Refreshments</span></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <BookingModal 
            packageType={packageType} 
            selectedDuration={selectedDuration} 
            currentPackage={currentPackage} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>

      <style>{`
        .studio-toggle-btn:hover { border-color: rgba(93, 205, 219, 0.45) !important; background: rgba(93, 205, 219, 0.04) !important; }
        .studio-duration-options { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .studio-duration-opt:hover { border-color: rgba(93, 205, 219, 0.4) !important; }
        .studio-package-visual { display: grid; grid-template-columns: 480px 1fr; }
        .studio-equip-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 32px; }
        .studio-book-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(93, 205, 219, 0.5) !important; }
        .studio-book-btn:hover svg { transform: translateX(4px); }

        @media (max-width: 1400px) {
          .studio-duration-options { grid-template-columns: repeat(2, 1fr) !important; }
          .studio-hero-section { min-height: 400px !important; padding: 60px 24px !important; }
          .studio-section-padding { padding: 40px 24px !important; }
        }
        @media (max-width: 1024px) {
          .studio-package-visual { grid-template-columns: 1fr !important; }
          .studio-package-info { padding: 32px !important; }
        }
        @media (max-width: 768px) {
          .studio-duration-options { grid-template-columns: 1fr !important; }
          .studio-equip-grid { grid-template-columns: 1fr !important; }
          .studio-location-card { flex-direction: column; text-align: center; }
          .studio-package-header { flex-direction: column; align-items: flex-start !important; gap: 16px !important; }
          .studio-package-header div:last-child { text-align: left !important; }
          .studio-section-padding { padding: 32px 20px !important; }
          .studio-hero-title { font-size: 32px !important; line-height: 40px !important; }
        }
        @media (max-width: 600px) {
          .studio-duration-opt { padding: 12px !important; }
          .studio-duration-hours { font-size: 24px !important; }
          .studio-hero-section { min-height: 320px !important; padding: 40px 16px !important; }
          .studio-section-padding { padding: 24px 12px !important; }
        }
      `}</style>
    </div>
  );
}

function BookingModal({ packageType, selectedDuration, currentPackage, onClose }: any) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    additionalHours: '0',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.phone,
          message: `Package: ${packageType === 'backdrop' ? 'Seamless Backdrop' : 'Podcast / Interior'} - ${selectedDuration}\nDate: ${formData.date}\nTime: ${formData.time}\nExtra Hours: ${formData.additionalHours}\nNotes: ${formData.notes}`,
          type: 'booking',
          time: formData.time,
        }),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => { onClose(); }, 2500);
      } else {
        setSubmitStatus('error');
      }
    } catch { setSubmitStatus('error'); }
    finally { setIsSubmitting(false); }
  };

  const totalPrice = currentPackage.price + (parseInt(formData.additionalHours || '0') * currentPackage.extraHourPrice);

  return (
    <motion.div style={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div style={styles.modalContent} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="studio-modal">
        <button style={styles.closeButton} onClick={onClose}><X size={20} /></button>
        <div style={styles.modalHeader}>
          <Calendar size={48} style={{ color: '#5DCDDB' }} />
          <div>
            <h2 style={styles.modalTitle}>Book Your Session</h2>
            <p style={styles.modalSubtitle}>{packageType === 'backdrop' ? 'Seamless Backdrop' : 'Podcast / Interior'} - {selectedDuration}</p>
          </div>
        </div>

        {submitStatus === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '60px 20px', textAlign: 'center' }}
          >
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>✨</div>
            <h2 style={{ color: '#5DCDDB', fontSize: '32px', marginBottom: '12px', fontFamily: 'Erbaum, sans-serif' }}>Booking Received!</h2>
            <p style={{ color: '#A0A0A0', fontSize: '16px', marginBottom: '32px' }}>
              We&apos;ve sent a confirmation email to your inbox.<br />
              Our team will review your request and confirm availability shortly.
            </p>
            <button 
              onClick={onClose}
              style={{ ...styles.submitBtn, background: 'transparent', border: '1px solid #5DCDDB', color: '#5DCDDB' }}
            >
              Close Window
            </button>
          </motion.div>
        ) : (
          <form style={styles.bookingForm} onSubmit={handleSubmit}>
            <div style={styles.formRow} className="studio-form-row">
              <div style={styles.formGroup}><label style={styles.label}><User size={16} style={{color: '#5DCDDB'}} />Full Name<span className="required-star">*</span></label><input type="text" name="name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} style={styles.input} placeholder="John Doe" required /></div>
              <div style={styles.formGroup}><label style={styles.label}><Mail size={16} style={{color: '#5DCDDB'}} />Email<span className="required-star">*</span></label><input type="email" name="email" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} style={styles.input} placeholder="john@example.com" required /></div>
            </div>
            <div style={styles.formRow} className="studio-form-row">
              <div style={styles.formGroup}><label style={styles.label}><Phone size={16} style={{color: '#5DCDDB'}} />Phone<span className="required-star">*</span></label><input type="tel" name="phone" value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} style={styles.input} placeholder="+94 77 123 4567" required /></div>
              <div style={styles.formGroup}><label style={styles.label}><Calendar size={16} style={{color: '#5DCDDB'}} />Date<span className="required-star">*</span></label><input type="date" name="date" value={formData.date} onChange={(e)=>setFormData({...formData, date: e.target.value})} style={styles.input} min={new Date().toISOString().split('T')[0]} required /></div>
            </div>
            <div style={styles.formRow} className="studio-form-row">
              <div style={styles.formGroup}><label style={styles.label}><Clock size={16} style={{color: '#5DCDDB'}} />Time<span className="required-star">*</span></label><input type="text" name="time" value={formData.time} onChange={(e)=>setFormData({...formData, time: e.target.value})} style={styles.input} placeholder="HH:MM AM/PM" required /></div>
              <div style={styles.formGroup}><label style={styles.label}><Clock size={16} style={{color: '#5DCDDB'}} />Extra Hours</label><select name="additionalHours" value={formData.additionalHours} onChange={(e)=>setFormData({...formData, additionalHours: e.target.value})} style={styles.select}><option value="0">None</option><option value="1">+1 Hr</option><option value="2">+2 Hrs</option></select></div>
            </div>
            <div style={styles.formGroup}><label style={styles.label}><MessageSquare size={16} style={{color: '#5DCDDB'}} />Notes</label><textarea name="notes" value={formData.notes} onChange={(e)=>setFormData({...formData, notes: e.target.value})} style={styles.textarea} placeholder="Special requirements?" /></div>

            {submitStatus === 'error' && <div style={styles.errorMsg}><X size={24} /><div><strong>Failed</strong><p>Please try again or contact us.</p></div></div>}

            <div style={styles.priceSummary}>
              <div style={styles.summaryRow}><span>Base Package ({selectedDuration})</span><span>LKR {currentPackage.price.toLocaleString()}</span></div>
              <div style={{...styles.summaryRow, borderTop: '1px solid rgba(93, 205, 219, 0.2)', paddingTop: '12px', marginTop: '12px'}}><span style={{fontSize: '18px', color: '#FFFFFF'}}>Total</span><span style={{fontSize: '24px', color: '#5DCDDB'}}>LKR {totalPrice.toLocaleString()}</span></div>
            </div>

            <button type="submit" style={styles.submitBtn} disabled={isSubmitting} className="studio-book-btn">{isSubmitting ? 'Submitting...' : 'Confirm Booking'}</button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: { minHeight: '100vh', backgroundColor: '#0F0F0F', paddingTop: '140px' },
  heroSection: { width: '100%', padding: '80px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  heroImageWrapper: { position: 'absolute', inset: 0, zIndex: 0 },
  heroImageOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,15,15,0.85) 0%, rgba(15,15,15,0.75) 50%, rgba(15,15,15,0.85) 100%)' },
  heroContent: { position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' },
  heroTitle: { fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: '1.1', letterSpacing: '-0.51808px', color: '#FFFFFF', marginBottom: '24px', fontFamily: 'Erbaum, Cousine, monospace' },
  gradientText: { background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' },
  heroSubtitle: { fontSize: '18px', lineHeight: '28px', color: '#A0A0A0', maxWidth: '700px', margin: '0 auto', fontFamily: 'Erbaum, Cousine, monospace' },
  container: { maxWidth: '1400px', margin: '0 auto', padding: '0 48px' },
  packageSelectorSection: { padding: '80px 0' },
  packageTypeToggle: { display: 'flex', gap: '10px', marginBottom: '40px', justifyContent: 'center', flexWrap: 'wrap' },
  toggleButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'transparent', border: '1px solid rgba(93, 205, 219, 0.2)', borderRadius: '999px', cursor: 'pointer', transition: 'all 0.25s ease' },
  toggleButtonActive: { border: '1px solid #5DCDDB', background: 'rgba(93, 205, 219, 0.08)' },
  toggleContent: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
  toggleTitle: { fontFamily: 'Erbaum, Cousine, monospace', fontSize: '13px', transition: 'color 0.25s ease' },
  durationSection: { },
  durationSelector: { background: 'rgba(37, 37, 37, 0.3)', border: '1px solid rgba(93, 205, 219, 0.1)', padding: '28px', marginBottom: '48px' },
  durationHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' },
  durationTitle: { fontSize: '22px', color: '#FFFFFF', margin: 0, fontFamily: 'Erbaum, Cousine, monospace' },
  durationOptions: { },
  durationOption: { position: 'relative', padding: '16px 14px', background: 'rgba(20, 20, 20, 0.8)', border: '1px solid rgba(93, 205, 219, 0.2)', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', gap: '6px' },
  durationOptionActive: { border: '1px solid #5DCDDB', background: 'rgba(93, 205, 219, 0.08)' },
  popularPill: { position: 'absolute', top: '8px', right: '8px', padding: '3px 8px', background: '#5DCDDB', color: '#000', fontSize: '8px', textTransform: 'uppercase', fontWeight: 600 },
  durationHours: { fontSize: '30px', color: '#FFFFFF', marginBottom: '2px', lineHeight: 1, fontFamily: 'Erbaum, Cousine, monospace' },
  durationPrice: { display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' },
  currency: { fontSize: '11px', color: '#6B6B6B' },
  amount: { fontSize: '18px', color: '#FFFFFF' },
  priceBar: { width: '100%', height: '3px', background: 'rgba(93, 205, 219, 0.2)', marginTop: '8px', position: 'relative', overflow: 'hidden' },
  priceBarFill: { height: '100%', background: '#5DCDDB', position: 'absolute', left: 0, top: 0 },
  featuredPackage: { background: 'rgba(37, 37, 37, 0.4)', border: '1px solid rgba(93, 205, 219, 0.2)', overflow: 'hidden', marginBottom: '60px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)' },
  packageVisual: { },
  packageImageWrapper: { position: 'relative', width: '100%', height: '100%', minHeight: '600px', overflow: 'hidden' },
  imageOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15, 15, 15, 0.1) 0%, rgba(15, 15, 15, 0.4) 70%, rgba(15, 15, 15, 0.7) 100%)' },
  packageInfo: { padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px' },
  packageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(93, 205, 219, 0.15)' },
  packageTitle: { fontFamily: 'Erbaum, Cousine, monospace', fontSize: '42px', color: '#FFFFFF', margin: '0 0 8px', lineHeight: 1.2 },
  packageSubtitle: { fontSize: '16px', color: '#A0A0A0', margin: 0 },
  packagePriceBlock: { textAlign: 'right', flexShrink: 0 },
  mainPrice: { display: 'flex', alignItems: 'baseline', gap: '8px', justifyContent: 'flex-end', marginBottom: '8px' },
  currency6B: { fontSize: '16px', color: '#6B6B6B' },
  priceAmountText: { fontSize: '48px', background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 },
  extraHourPriceText: { fontSize: '14px', color: '#6B6B6B' },
  equipmentSection: { flex: 1 },
  equipmentHeading: { fontFamily: 'Erbaum, Cousine, monospace', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#FFFFFF', marginBottom: '16px', textTransform: 'uppercase' },
  equipmentGrid: { },
  equipmentItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' },
  equipmentName: { fontSize: '13px', color: '#A0A0A0', lineHeight: 1.4, flex: 1 },
  bookNowButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px 32px', background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)', border: 'none', color: '#000', fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 6px 20px rgba(93, 205, 219, 0.3)' },
  locationSection: { padding: '80px 0' },
  locationCard: { display: 'flex', alignItems: 'center', gap: '32px', padding: '48px', background: 'rgba(37, 37, 37, 0.4)', fontFamily: 'Erbaum, Cousine, monospace' },
  locationContent: { flex: 1 },
  locationTitle: { fontSize: '32px', color: '#FFFFFF', margin: '0 0 12px' },
  locationAddress: { fontSize: '16px', lineHeight: '26px', color: '#A0A0A0', margin: '0 0 20px' },
  locationFeatures: { display: 'flex', gap: '24px', flexWrap: 'wrap' },
  locationFeature: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6B6B6B' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
  modalContent: { position: 'relative', width: '100%', maxWidth: '900px', background: '#1A1A1A', border: '1px solid rgba(93, 205, 219, 0.2)', padding: '48px', maxHeight: '90vh', overflowY: 'auto' },
  closeButton: { position: 'absolute', top: '24px', right: '24px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(93,205,219,0.1)', border: '1px solid rgba(93,205,219,0.2)', color: '#fff', cursor: 'pointer' },
  modalHeader: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px solid rgba(93,205,219,0.15)' },
  modalTitle: { fontSize: '36px', color: '#fff', margin: '0 0 4px', fontFamily: 'Erbaum, Cousine, monospace' },
  modalSubtitle: { fontSize: '14px', color: '#A0A0A0', margin: 0, fontFamily: 'Erbaum, Cousine, monospace' },
  bookingForm: { display: 'flex', flexDirection: 'column', gap: '24px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  label: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#fff' },
  input: { padding: '14px 16px', background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(93,205,219,0.2)', color: '#fff', fontSize: '14px', outline: 'none' },
  select: { padding: '14px 16px', background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(93,205,219,0.2)', color: '#fff', fontSize: '14px', outline: 'none', cursor: 'pointer' },
  textarea: { padding: '14px 16px', background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(93,205,219,0.2)', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical', minHeight: '80px' },
  priceSummary: { padding: '20px', background: 'rgba(93,205,219,0.05)', border: '1px solid rgba(93,205,219,0.15)', display: 'flex', flexDirection: 'column', gap: '12px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#A0A0A0' },
  submitBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px 30px', background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)', border: 'none', color: '#000', fontSize: '15px', fontWeight: 600, cursor: 'pointer' },
  successMsg: { display: 'flex', gap: '16px', color: '#5DCDDB', background: 'rgba(93,205,219,0.1)', padding: '16px', marginBottom: '24px' },
  errorMsg: { display: 'flex', gap: '16px', color: '#ff4d4d', background: 'rgba(255,0,0,0.1)', padding: '16px', marginBottom: '24px' },
};
