'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
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
import styles from './StudioBookingPage.module.css';

export default function StudioBookingPage() {
  const [packageType, setPackageType] = useState('backdrop');
  const [selectedDuration, setSelectedDuration] = useState('2hr');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const packages = {
    backdrop: {
      '1hr': {
        price: 5000,
        extraHourPrice: 3000,
        equipment: [
          '2x Jinbei 400W Lights',
          '2x Light Stands',
          '2x Softboxes',
          '1x Reflector',
          'Seamless Paper Backdrop',
          'Multiple Backdrop Colors',
          'C-Stands & Clamps',
          'Sandbags'
        ],
        image: 'https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2Njc0ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      '2hr': {
        price: 7000,
        extraHourPrice: 3000,
        equipment: [
          '2x Jinbei 400W Lights',
          '2x Light Stands',
          '2x Softboxes',
          '1x Reflector',
          'Seamless Paper Backdrop',
          'Multiple Backdrop Colors',
          'C-Stands & Clamps',
          'Sandbags',
          'Background Stand',
          'Extension Cords'
        ],
        image: 'https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2Njc0ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        popular: true
      },
      '5hr': {
        price: 15000,
        extraHourPrice: 3000,
        equipment: [
          '2x Jinbei 400W Lights',
          '2x Light Stands',
          '2x Softboxes',
          '1x Reflector',
          'Seamless Paper Backdrop',
          'Multiple Backdrop Colors',
          'C-Stands & Clamps',
          'Sandbags',
          'Background Stand',
          'Extension Cords',
          'Hair Light Setup',
          'Grid & Modifiers'
        ],
        image: 'https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2Njc0ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      '8hr': {
        price: 22000,
        extraHourPrice: 3000,
        equipment: [
          '2x Jinbei 400W Lights',
          '2x Light Stands',
          '2x Softboxes',
          '1x Reflector',
          'Seamless Paper Backdrop',
          'Multiple Backdrop Colors',
          'C-Stands & Clamps',
          'Sandbags',
          'Background Stand',
          'Extension Cords',
          'Hair Light Setup',
          'Grid & Modifiers',
          'Color Gels',
          'Full Day Access'
        ],
        image: 'https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2Njc0ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080'
      }
    },
    podcast: {
      '1hr': {
        price: 4000,
        extraHourPrice: 2500,
        equipment: [
          'Interior Setup',
          'Ambient Lighting',
          '1x Camera Setup',
          'Basic Audio Recording',
          'Comfortable Seating',
          'Props & Decorations'
        ],
        image: 'https://images.unsplash.com/photo-1716703433576-13ff2922db95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwc3R1ZGlvJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2NzYxNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      '2hr': {
        price: 6000,
        extraHourPrice: 2500,
        equipment: [
          'Interior Setup',
          'Ambient Lighting',
          '1x Camera Setup',
          'Professional Audio Recording',
          'Comfortable Seating',
          'Props & Decorations',
          'Microphone Stands',
          'Headphones'
        ],
        image: 'https://images.unsplash.com/photo-1716703433576-13ff2922db95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwc3R1ZGlvJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2NzYxNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        popular: true
      },
      '5hr': {
        price: 12000,
        extraHourPrice: 2500,
        equipment: [
          'Interior Setup',
          'Ambient Lighting',
          '2x Camera Setup',
          'Professional Audio Recording',
          'Comfortable Seating',
          'Props & Decorations',
          'Microphone Stands',
          'Headphones',
          'Monitor Display',
          'Green Screen Option'
        ],
        image: 'https://images.unsplash.com/photo-1716703433576-13ff2922db95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwc3R1ZGlvJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2NzYxNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      '8hr': {
        price: 18000,
        extraHourPrice: 2500,
        equipment: [
          'Interior Setup',
          'Ambient Lighting',
          '2x Camera Setup',
          'Professional Audio Recording',
          'Comfortable Seating',
          'Props & Decorations',
          'Microphone Stands',
          'Headphones',
          'Monitor Display',
          'Green Screen Option',
          'Live Streaming Setup',
          'Full Day Access'
        ],
        image: 'https://images.unsplash.com/photo-1716703433576-13ff2922db95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwc3R1ZGlvJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2NzYxNzA3fDA&ixlib=rb-4.1.0&q=80&w=1080'
      }
    }
  };

  const currentPackage = packages[packageType][selectedDuration];
  const featuredRef = useRef(null);

  function HeroSection() {
    return (
      <section className={styles.heroSection}>
        {/* Single Hero Image */}
        <motion.div 
          className={styles.heroImageWrapper}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1615458509633-f15b61bdacb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDF8fHx8MTc2Njc0ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Professional Studio"
            className={styles.heroImage}
            fill
            sizes="100vw"
            priority
          />
          <div className={styles.heroImageOverlay} />
        </motion.div>

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className={styles.heroTitle}>
              Book Our Professional
              <br />
              <span className={styles.gradientText}>Creative Studio</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Fully-equipped studio space with professional lighting, backdrops, and equipment. 
              Perfect for photography, videography, podcasts, and creative productions.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  function PackageSelector() {
    return (
      <section className={styles.packageSelectorSection}>
        <div className={styles.container}>
          {/* Package Type Toggle */}
          <div className={styles.packageTypeToggle}>
            <motion.button
              className={`${styles.toggleButton} ${packageType === 'backdrop' ? styles.active : ''}`}
              onClick={() => setPackageType('backdrop')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Camera className={styles.toggleIcon} />
              <div className={styles.toggleContent}>
                <span className={styles.toggleTitle}>Seamless Backdrop</span>
                <span className={styles.toggleDesc}>Photography & Videography</span>
              </div>
            </motion.button>

            <motion.button
              className={`${styles.toggleButton} ${packageType === 'podcast' ? styles.active : ''}`}
              onClick={() => setPackageType('podcast')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mic2 className={styles.toggleIcon} />
              <div className={styles.toggleContent}>
                <span className={styles.toggleTitle}>Podcast / Interior</span>
                <span className={styles.toggleDesc}>Content Creation & Interviews</span>
              </div>
            </motion.button>
          </div>

          {/* Duration Selector */}
          <motion.div 
            className={styles.durationSelector}
            key={packageType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.durationHeader}>
              <Clock className={styles.durationIcon} />
              <h3 className={styles.durationTitle}>Select Duration</h3>
            </div>

            <div className={styles.durationOptions}>
              {Object.keys(packages[packageType]).map((duration) => {
                const pkg = packages[packageType][duration];
                const maxPrice = Math.max(...Object.values(packages[packageType]).map(p => p.price));
                const pricePercentage = (pkg.price / maxPrice) * 100;

                return (
                  <motion.div
                    key={duration}
                    className={`${styles.durationOption} ${selectedDuration === duration ? styles.active : ''}`}
                    onClick={() => {
                      setSelectedDuration(duration);
                      // scroll the featured package into view after selection
                      setTimeout(() => {
                        try {
                          featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } catch (e) {}
                      }, 80);
                    }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {pkg.popular && (
                      <div className={styles.popularPill}>Most Popular</div>
                    )}
                    <div className={styles.durationHours}>{duration}</div>
                    <div className={styles.durationPrice}>
                      <span className={styles.currency}>LKR</span>
                      <span className={styles.amount}>{pkg.price.toLocaleString()}</span>
                    </div>
                    <div className={styles.priceBar}>
                      <motion.div 
                        className={styles.priceBarFill}
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
              className={styles.featuredPackage}
              ref={featuredRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.packageVisual}>
                <div className={styles.packageImageWrapper}>
                  <Image src={currentPackage.image} alt="Studio Package" className={styles.packageImage} fill sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className={styles.imageOverlay} />
                </div>

                <div className={styles.packageInfo}>
                  <div className={styles.packageHeader}>
                    <div>
                      <h2 className={styles.packageTitle}>
                        {packageType === 'backdrop' ? 'Seamless Backdrop Package' : 'Podcast / Interior Package'}
                      </h2>
                      <p className={styles.packageSubtitle}>{selectedDuration} Session</p>
                    </div>
                    <div className={styles.packagePriceBlock}>
                      <div className={styles.mainPrice}>
                        <span className={styles.currency}>LKR</span>
                        <span className={styles.priceAmount}>{currentPackage.price.toLocaleString()}</span>
                      </div>
                      <div className={styles.extraHourPrice}>
                        Extra hour: <span className={styles.highlight}>LKR {currentPackage.extraHourPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.equipmentSection}>
                    <h3 className={styles.equipmentHeading}>
                      <Check size={20} />
                      Included Equipment & Features
                    </h3>
                    <div className={styles.equipmentGrid}>
                      {currentPackage.equipment.map((item, index) => (
                        <motion.div
                          key={index}
                          className={styles.equipmentItem}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Check className={styles.equipmentIcon} size={20} />
                          <span className={styles.equipmentName}>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    className={styles.bookNowButton}
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book This Package
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    );
  }

  function LocationSection() {
    return (
      <section className={styles.locationSection}>
        <div className={styles.container}>
          <div className={styles.locationCard}>
            <MapPin size={56} className={styles.locationIcon} />
            <div className={styles.locationContent}>
              <h3 className={styles.locationTitle}>Visit Our Studio</h3>
              <p className={styles.locationAddress}>
                Raster Media Creative Studio<br />
                123 Main Street, Colombo, Sri Lanka
              </p>
              <div className={styles.locationFeatures}>
                <div className={styles.locationFeature}>
                  <Wifi size={18} />
                  <span>High-Speed WiFi</span>
                </div>
                <div className={styles.locationFeature}>
                  <Car size={18} />
                  <span>Free Parking</span>
                </div>
                <div className={styles.locationFeature}>
                  <Coffee size={18} />
                  <span>Refreshments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function BookingModal() {
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
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const response = await fetch('/api/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.name,
            email: formData.email,
            phone: formData.phone,
            packageType: packageType === 'backdrop'
              ? 'Seamless Backdrop Package'
              : 'Podcast / Interior Package',
            preferredDate: formData.date,
            preferredTime: formData.time,
            additionalHours: parseInt(formData.additionalHours),
            additionalNotes: formData.notes,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setSubmitStatus('success');
          setTimeout(() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              date: '',
              time: '',
              additionalHours: '0',
              notes: ''
            });
            setSubmitStatus(null);
            setIsModalOpen(false);
          }, 2500);
        } else {
          setSubmitStatus('error');
          console.error('Booking error:', data.error);
        }
      } catch (error) {
        setSubmitStatus('error');
        console.error('Network error:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const totalPrice = currentPackage.price + (parseInt(formData.additionalHours || 0) * currentPackage.extraHourPrice);

    return (
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>

              <div className={styles.modalHeader}>
                <Calendar size={48} className={styles.modalIcon} />
                <div>
                  <h2 className={styles.modalTitle}>Book Your Studio Session</h2>
                  <p className={styles.modalSubtitle}>
                    {packageType === 'backdrop' ? 'Seamless Backdrop Package' : 'Podcast / Interior Package'} - {selectedDuration}
                  </p>
                </div>
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.successMessage}
                >
                  <Check size={24} />
                  <div>
                    <strong>Booking request received!</strong>
                    <p>We sent you a confirmation email and will confirm availability shortly.</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.errorMessage}
                >
                  <X size={24} />
                  <div>
                    <strong>Submission failed</strong>
                    <p>Please try again or contact us directly.</p>
                  </div>
                </motion.div>
              )}

              <form className={styles.bookingForm} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <User size={16} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="John Doe"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Mail size={16} />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="john@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Phone size={16} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="+94 77 123 4567"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Calendar size={16} />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={styles.input}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Clock size={16} />
                      Preferred Time
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={styles.select}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select time</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      <Clock size={16} />
                      Additional Hours
                    </label>
                    <select
                      name="additionalHours"
                      value={formData.additionalHours}
                      onChange={handleChange}
                      className={styles.select}
                      disabled={isSubmitting}
                    >
                      <option value="0">None</option>
                      <option value="1">+1 Hour (LKR {currentPackage.extraHourPrice.toLocaleString()})</option>
                      <option value="2">+2 Hours (LKR {(currentPackage.extraHourPrice * 2).toLocaleString()})</option>
                      <option value="3">+3 Hours (LKR {(currentPackage.extraHourPrice * 3).toLocaleString()})</option>
                      <option value="4">+4 Hours (LKR {(currentPackage.extraHourPrice * 4).toLocaleString()})</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <MessageSquare size={16} />
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Any special requirements or questions?"
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.priceSummary}>
                  <div className={styles.summaryRow}>
                    <span>Base Package ({selectedDuration})</span>
                    <span className={styles.summaryPrice}>LKR {currentPackage.price.toLocaleString()}</span>
                  </div>
                  {parseInt(formData.additionalHours) > 0 && (
                    <div className={styles.summaryRow}>
                      <span>Additional Hours ({formData.additionalHours})</span>
                      <span className={styles.summaryPrice}>
                        LKR {(currentPackage.extraHourPrice * parseInt(formData.additionalHours)).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className={styles.summaryRow} style={{ borderTop: '1px solid rgba(93, 205, 219, 0.2)', paddingTop: '12px', marginTop: '12px' }}>
                    <span style={{ fontSize: '18px', color: '#FFFFFF' }}>Total</span>
                    <span className={styles.summaryPrice} style={{ fontSize: '24px' }}>
                      LKR {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting…' : (
                    <>
                      Confirm Booking
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <p className={styles.formNote}>
                  * Final confirmation will be sent via email after reviewing your booking request.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className={styles.page}>
      <HeroSection />
      <PackageSelector />
      <LocationSection />
      <BookingModal />
    </div>
  );
}
