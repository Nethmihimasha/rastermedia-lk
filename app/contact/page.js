'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import styles from './contact.module.css';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

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

  // Handle form submission
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
        setMessage('Message sent successfully! We\'ll get back to you soon.');
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
            <Image
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE3fHxjb250YWN0JTIwdXN8ZW58MHx8fHwxNjc4OTg3ODMx&ixlib=rb-4.0.3&q=80&w=1920"
              alt="Contact Us"
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
        <section className={styles.mainSection}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
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
                    <a href="mailto:hello@rastermedia.com" className={styles.link}>
                      hello@rastermedia.com
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
                    <a href="tel:+15551234567" className={styles.link}>
                      +1 (555) 123-4567
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
                      <p>123 Creative Street</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className={styles.socialSection}>
                <h3 className={styles.socialTitle}>Follow Us</h3>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialLink}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="18" cy="6" r="1" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </a>
                  <a href="#" className={styles.socialLink}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" stroke="currentColor" strokeWidth="2"/>
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
                <a href="#" className={styles.actionLink}>
                  <MessageCircle size={20} className={styles.icon} />
                  <span>WhatsApp</span>
                </a>
                <a href="mailto:hello@rastermedia.com" className={styles.actionLink}>
                  <Mail size={20} className={styles.icon} />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className={styles.formCard}>
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
                    placeholder="+1 (555) 000-0000"
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
          </div>
        </section>

        {/* Visit Studio Section */}
        <section className={styles.studioSection}>
          <div className={styles.studioContent}>
            <MapPin size={48} className={styles.studioIcon} />
            <h2 className={styles.studioTitle}>Visit Our Studio</h2>
            <p className={styles.studioAddress}>
              123 Creative Street, New York, NY 10001
            </p>
            <a href="#" className={styles.mapsLink}>
              Open in Google Maps →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}