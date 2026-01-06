'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import styles from './contact.module.css';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { useScrollAnimation, scrollAnimationVariants, staggerContainerVariants, staggerItemVariants } from '../hooks/useScrollAnimation';

export default function ContactPage() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Message sent successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          message: '',
        });
      } else {
        setMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const { ref: contactRef, isInView: contactInView } = useScrollAnimation();
  const { ref: studioRef, isInView: studioInView } = useScrollAnimation();

  return (
    <div className={styles.app}>
      <div className={styles.contactPage}>
        {/* Hero Section with Image */}
        <section className={styles.heroSection}>
          <motion.div 
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero image removed — keep overlay so the text remains readable */}
            <div className={styles.heroImageOverlay} />
          </motion.div>

          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className={styles.heading1}>
                <h1 className={styles.mainTitle}>
                  Let us Create Something
                </h1>
                <div className={styles.gradientText}>
                  <span>Extraordinary</span>
                </div>
              </div>
              <p className={styles.heroParagraph}>
                Have a project in mind? We&apos;d love to hear from you
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className={styles.mainSection} ref={contactRef}>
          <motion.div
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            style={{ display: 'contents' }}
          >
                <div className={styles.studioMapWrapper} style={{ position: 'relative', overflow: 'hidden', minHeight: 280 }}>
            <motion.div className={styles.leftColumn} variants={staggerItemVariants}>
              {/* Contact Information */}
              <div className={styles.contactInfoCard}>
              <h2 className={styles.cardTitle}>Contact Information</h2>
              
              <div className={styles.contactList}>
                {/* Email */}
                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                    <Mail size={20} className={styles.icon} />
                  </div>
                  <div className={styles.contactDetails}>
                    <p className={styles.label}>Email</p>
                    <a href="mailto:rastermedia.lk@gmail.com" className={styles.link}>
                      rastermedia.lk@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                    <Phone size={20} className={styles.icon} />
                  </div>
                  <div className={styles.contactDetails}>
                    <p className={styles.label}>Phone</p>
                    <a href="https://wa.me/94770303250" target="_blank" rel="noopener noreferrer" className={styles.link}>
                      +94 77 030 3250
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className={styles.contactItem}>
                  <div className={styles.iconBox}>
                    <MapPin size={20} className={styles.icon} />
                  </div>
                  <div className={styles.contactDetails}>
                    <p className={styles.label}>Office</p>
                    <div className={styles.address}>
                      <p>132 A /2/1, Old Negombo Road</p>
                      <p>Wattala</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
                <div className={styles.socialSection}>
                  <h3 className={styles.socialTitle}>Follow Us</h3>
                  <div className={styles.socialLinks}>
                    <a href="https://www.instagram.com/raster_media_?igsh=bnExcThrZ2MyNHJi" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                      {/* Instagram icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="18" cy="6" r="1" fill="currentColor"/></svg>
                    </a>
                    <a href="https://www.facebook.com/share/17Gn6EseZz/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                      {/* Facebook icon */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="2"/></svg>
                    </a>
                    <a href="https://youtube.com/@raster_media?si=mDS9jD73X8z2yX4s" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
                      {/* Clearer YouTube icon: rounded rectangle with play triangle */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="5" width="20" height="14" rx="3" fill="currentColor" />
                        <path d="M10 9l5 3-5 3V9z" fill="#ffffff" />
                      </svg>
                    </a>
                  </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActionsCard}>
              <div className={styles.pixelPattern}>
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={styles.pixel}></div>
                ))}
              </div>
              <h2 className={styles.cardTitle}>Quick Actions</h2>
              <div className={styles.actionsList}>
                <a href="https://wa.me/94770303250" target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
                  <MessageCircle size={20} className={styles.icon} />
                  <span>WhatsApp</span>
                </a>
                <a href="mailto:rastermedia.lk@gmail.com" className={styles.actionLink}>
                  <Mail size={20} className={styles.icon} />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </motion.div>

          </div>

          {/* Right Column - Contact Form */}
          <motion.div className={styles.formCard} variants={staggerItemVariants}>
            <h2 className={styles.formTitle}>Send Us a Message</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullName" className={styles.formLabel}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={styles.formInput}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+94 77 000 0000"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.formLabel}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="projectType" className={styles.formLabel}>
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={styles.formSelect}
                  required
                >
                  <option value="">Select a project type</option>
                  <option value="branding">Branding</option>
                  <option value="web-development">Web Development</option>
                  <option value="photography">Photography</option>
                  <option value="video-production">Video Production</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tell us about your project..."
                  className={styles.formTextarea}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                <div className={styles.buttonShine}></div>
                <Send size={20} />
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>

              {/* Success/Error Message */}
              {message && (
                <div
                  style={{
                    padding: '16px',
                    marginTop: '16px',
                    borderRadius: '4px',
                    background: message.includes('success')
                      ? 'rgba(93, 205, 219, 0.1)'
                      : 'rgba(255, 0, 0, 0.1)',
                    border: `1px solid ${
                      message.includes('success') ? '#5DCDDB' : '#ff0000'
                    }`,
                    color: message.includes('success') ? '#5DCDDB' : '#ff6b6b',
                    fontFamily: "'Cousine', monospace",
                    fontSize: '14px',
                  }}
                >
                  {message}
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
        </section>

        {/* Visit Studio Section */}
        <section className={styles.studioSection} ref={studioRef}>
          <motion.div
            initial="hidden"
            animate={studioInView ? "visible" : "hidden"}
            variants={scrollAnimationVariants}
          >
            <div className={styles.studioMapWrapper} style={{ position: 'relative', overflow: 'hidden', minHeight: 280 }}>
              <iframe
                title="Raster Media Studio Map"
                src="https://www.google.com/maps?q=132%20A%20%2F2%2F1%2C%20Old%20Negombo%20Road%2C%20Wattala&z=17&output=embed"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                  opacity: 1
                }}
                loading="lazy"
              />

              {/* Invisible overlay link: captures clicks and opens Google Maps in a new tab */}
              <a
                href="https://maps.app.goo.gl/wmYxbsQkfGkFBZXT6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Raster Media Studio in Google Maps"
                style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'block' }}
              />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}