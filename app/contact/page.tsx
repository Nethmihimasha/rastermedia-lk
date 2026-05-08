'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { 
  useScrollAnimation, 
  scrollAnimationVariants, 
  staggerContainerVariants, 
  staggerItemVariants 
} from '../hooks/useScrollAnimation';

export default function ContactPage() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          whatsapp: formData.phone,
          message: `Company: ${formData.company}\nProject Type: ${formData.projectType}\nMessage: ${formData.message}`,
          type: 'contact'
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Message sent successfully! We'll get back to you soon.");
        setFormData({ fullName: '', email: '', phone: '', company: '', projectType: '', message: '' });
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
    <div style={styles.app} className="contact-page-wrapper">
      <div style={styles.contactPage} className="contact-container">
        {/* Hero Section */}
        <section style={styles.heroSection} className="contact-hero">
          <motion.div 
            style={styles.heroImageWrapper}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div style={styles.heroImageOverlay} />
          </motion.div>

          <div style={styles.heroContent} className="contact-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div style={styles.heading1}>
                <h1 style={styles.mainTitle} className="contact-main-title">
                  Let us Create Something
                </h1>
                <div style={styles.gradientText} className="contact-gradient-text">
                  <span>Extraordinary</span>
                </div>
              </div>
              <p style={styles.heroParagraph} className="contact-hero-p">
                Have a project in mind? We&apos;d love to hear from you
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section style={styles.mainSection} ref={contactRef} className="contact-main-section">
          <motion.div
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            style={{ display: 'contents' }}
          >
            <div style={styles.leftColumn} className="contact-left-col">
              {/* Contact Information */}
              <div style={styles.contactInfoCard}>
                <h2 style={styles.cardTitle} className="contact-card-title">Contact Information</h2>
                <div style={styles.contactList}>
                  <div style={styles.contactItem}>
                    <div style={styles.iconBox}><Mail size={20} style={styles.icon} /></div>
                    <div style={styles.contactDetails}>
                      <p style={styles.label}>Email</p>
                      <a href="mailto:rastermedia.lk@gmail.com" style={styles.link}>rastermedia.lk@gmail.com</a>
                    </div>
                  </div>

                  <div style={styles.contactItem}>
                    <div style={styles.iconBox}><Phone size={20} style={styles.icon} /></div>
                    <div style={styles.contactDetails}>
                      <p style={styles.label}>Phone</p>
                      <a href="https://wa.me/94770303250" target="_blank" rel="noopener noreferrer" style={styles.link}>+94 77 030 3250</a>
                    </div>
                  </div>

                  <div style={styles.contactItem}>
                    <div style={styles.iconBox}><MapPin size={20} style={styles.icon} /></div>
                    <div style={styles.contactDetails}>
                      <p style={styles.label}>Office</p>
                      <div style={styles.address}>
                        <p>132 A /2/1, Old Negombo Road</p>
                        <p>Wattala</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.socialSection}>
                  <h3 style={styles.socialTitle}>Follow Us</h3>
                  <div style={styles.socialLinks}>
                    <a href="https://www.instagram.com/raster_media_?igsh=bnExcThrZ2MyNHJi" target="_blank" rel="noopener noreferrer" className="social-link-effect" style={styles.socialLink} aria-label="Instagram">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="3"/><circle cx="18" cy="6" r="1" fill="currentColor"/></svg>
                    </a>
                    <a href="https://www.facebook.com/share/17Gn6EseZz/" target="_blank" rel="noopener noreferrer" className="social-link-effect" style={styles.socialLink} aria-label="Facebook">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                    </a>
                    <a href="https://youtube.com/@raster_media?si=mDS9jD73X8z2yX4s" target="_blank" rel="noopener noreferrer" className="social-link-effect" style={styles.socialLink} aria-label="YouTube">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="20" height="14" rx="3" fill="currentColor" /><path d="M10 9l5 3-5 3V9z" fill="#ffffff" /></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={styles.quickActionsCard} className="contact-quick-actions">
                <div style={styles.pixelPattern}>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} style={styles.pixel}></div>
                  ))}
                </div>
                <h2 style={styles.cardTitle} className="contact-card-title">Quick Actions</h2>
                <div style={styles.actionsList}>
                  <a href="https://wa.me/94770303250" target="_blank" rel="noopener noreferrer" className="action-link-effect" style={styles.actionLink}>
                    <MessageCircle size={20} style={styles.icon} />
                    <span>WhatsApp</span>
                  </a>
                  <a href="mailto:rastermedia.lk@gmail.com" className="action-link-effect" style={styles.actionLink}>
                    <Mail size={20} style={styles.icon} />
                    <span>Email Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <motion.div style={styles.formCard} variants={staggerItemVariants} className="contact-form-card">
              <h2 style={styles.formTitle} className="contact-form-title">Send Us a Message</h2>
              <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formRow} className="contact-form-row">
                  <div style={styles.formGroup}>
                    <label htmlFor="fullName" style={styles.formLabel}>Full Name<span className="required-star">*</span></label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" style={styles.formInput} required />
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.formLabel}>Email Address<span className="required-star">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" style={styles.formInput} required />
                  </div>
                </div>

                <div style={styles.formRow} className="contact-form-row">
                  <div style={styles.formGroup}>
                    <label htmlFor="phone" style={styles.formLabel}>Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+94 77 000 0000" style={styles.formInput} />
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="company" style={styles.formLabel}>Company</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your Company" style={styles.formInput} />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="projectType" style={styles.formLabel}>Project Type<span className="required-star">*</span></label>
                  <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} style={styles.formSelect} required>
                    <option value="">Select a project type</option>
                    <option value="branding">Branding</option>
                    <option value="web-development">Web Development</option>
                    <option value="photography">Photography</option>
                    <option value="video-production">Video Production</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="message" style={styles.formLabel}>Message<span className="required-star">*</span></label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} placeholder="Tell us about your project..." style={styles.formTextarea} required></textarea>
                </div>

                <button type="submit" style={styles.submitButton} disabled={loading} className="contact-submit-btn">
                  <div className="button-shine-effect"></div>
                  <Send size={20} />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>

                {message && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      padding: '24px', 
                      marginTop: '24px', 
                      borderRadius: '8px',
                      background: message.includes('success') ? 'rgba(93, 205, 219, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                      border: `1px solid ${message.includes('success') ? '#5DCDDB' : '#ff0000'}`,
                      textAlign: 'center'
                    }}
                  >
                    {message.includes('success') ? (
                      <div>
                        <div style={{ fontSize: '40px', marginBottom: '12px' }}>📨</div>
                        <h3 style={{ color: '#5DCDDB', fontSize: '20px', marginBottom: '8px', fontFamily: 'Erbaum, sans-serif' }}>Message Received!</h3>
                        <p style={{ color: '#A0A0A0', fontSize: '14px', margin: 0 }}>
                          Thanks for your message. Our team will review it and email you back after approval.
                        </p>
                      </div>
                    ) : (
                      <p style={{ color: '#ff6b6b', fontSize: '14px', margin: 0 }}>{message}</p>
                    )}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        </section>

        {/* Map Section */}
        <section style={styles.studioSection} ref={studioRef} className="contact-studio-section">
          <motion.div
            initial="hidden"
            animate={studioInView ? "visible" : "hidden"}
            variants={scrollAnimationVariants}
          >
            <div style={styles.studioMapWrapper}>
              <iframe
                title="Raster Media Studio Map"
                src="https://www.google.com/maps?q=132%20A%20%2F2%2F1%2C%20Old%20Negombo%20Road%2C%20Wattala&z=17&output=embed"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0, opacity: 1 }}
                loading="lazy"
              />
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

      <style>{`
        @keyframes shine {
          0%, 100% { left: -100%; }
          50% { left: 100%; }
        }

        .button-shine-effect {
          position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(0, 0, 0, 0) 100%);
          animation: shine 3s infinite;
        }

        .social-link-effect:hover {
          background: rgba(93, 205, 219, 0.2) !important;
          color: #5DCDDB !important;
        }

        .action-link-effect:hover {
          background: rgba(93, 205, 219, 0.1) !important;
        }

        .contact-submit-btn:hover { transform: translateY(-2px); opacity: 0.95; }

        @media (max-width: 1024px) {
          .contact-hero { height: auto !important; min-height: 400px !important; margin-bottom: 48px !important; }
          .contact-main-section { grid-template-columns: 1fr !important; gap: 32px !important; padding: 0 24px !important; }
          .contact-form-row { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          .contact-main-title { font-size: 32px !important; line-height: 40px !important; }
          .contact-gradient-text span { font-size: 32px !important; line-height: 40px !important; }
          .contact-container { padding: 0 !important; }
          .contact-main-section { padding: 0 16px !important; }
          .contact-form-card { padding: 32px 24px !important; }
        }

        @media (max-width: 480px) {
          .contact-main-title { font-size: 28px !important; line-height: 36px !important; }
          .contact-gradient-text span { font-size: 28px !important; line-height: 36px !important; }
          .contact-hero-p { font-size: 15px !important; }
          .contact-card-title, .contact-form-title { font-size: 28px !important; }
          .contact-submit-btn { width: 100% !important; height: 50px !important; }
          .contact-hero { min-height: 320px !important; }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  app: { display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh' },
  contactPage: { width: '100%', maxWidth: '1400px', margin: '0 auto', paddingTop: '140px' },
  heroSection: { position: 'relative', textAlign: 'center', width: '100vw', marginLeft: 'calc(50% - 50vw)', height: '70vh', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '80px', backgroundColor: '#0F0F0F' },
  heroImageWrapper: { position: 'absolute', inset: 0, zIndex: 0 },
  heroImageOverlay: { position: 'absolute', inset: 0, background: 'none' },
  heroContent: { position: 'relative', zIndex: 2, maxWidth: '900px', padding: '0 48px' },
  heading1: { marginBottom: '32px' },
  mainTitle: { fontFamily: 'Erbaum, Cousine, monospace', fontWeight: 700, fontSize: '51.808px', lineHeight: '60px', textAlign: 'center', letterSpacing: '-0.51808px', color: '#FFFFFF', margin: 0 },
  gradientText: { marginTop: '8px' },
  heroParagraph: { fontFamily: 'Cousine, monospace', fontWeight: 400, fontSize: '20px', lineHeight: '28px', textAlign: 'center', color: '#A0A0A0', margin: '32px 0 0' },
  mainSection: { display: 'grid', gridTemplateColumns: '541px 1fr', gap: '48px', width: '100%', maxWidth: '1400px', margin: '0 auto 64px', padding: '0 48px' },
  leftColumn: { display: 'flex', flexDirection: 'column', gap: '32px' },
  contactInfoCard: { background: 'rgba(37, 37, 37, 0.6)', border: '0.8px solid rgba(93, 205, 219, 0.1)', padding: '32.8px', display: 'flex', flexDirection: 'column', gap: '24px' },
  cardTitle: { fontFamily: 'Erbaum, Cousine, monospace', fontWeight: 600, fontSize: '36px', lineHeight: '43px', color: '#FFFFFF', margin: 0 },
  contactList: { display: 'flex', flexDirection: 'column', gap: '24px' },
  contactItem: { display: 'flex', alignItems: 'flex-start', gap: '16px' },
  iconBox: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '48px', height: '48px', background: 'linear-gradient(135deg, rgba(93, 205, 219, 0.2) 0%, rgba(125, 216, 229, 0.2) 100%)', flexShrink: 0 },
  icon: { color: '#5DCDDB' },
  contactDetails: { display: 'flex', flexDirection: 'column', gap: '4.8px' },
  label: { fontFamily: 'Cousine, monospace', fontSize: '14px', color: '#6B6B6B', margin: 0 },
  link: { fontFamily: 'Cousine, monospace', fontSize: '16px', color: '#FFFFFF', textDecoration: 'none', transition: 'color 0.3s' },
  address: { color: '#FFFFFF' },
  socialSection: { borderTop: '0.8px solid rgba(255, 255, 255, 0.1)', paddingTop: '32.8px', display: 'flex', flexDirection: 'column', gap: '16px' },
  socialTitle: { fontFamily: 'Erbaum, Cousine, monospace', fontWeight: 600, fontSize: '28px', color: '#FFFFFF', margin: 0 },
  socialLinks: { display: 'flex', gap: '16px' },
  socialLink: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', background: 'rgba(255, 255, 255, 0.05)', color: '#6B6B6B', transition: 'all 0.3s' },
  quickActionsCard: { background: 'rgba(37, 37, 37, 0.6)', border: '0.8px solid rgba(93, 205, 219, 0.1)', padding: '32.8px', position: 'relative' },
  pixelPattern: { position: 'absolute', top: '16.8px', right: '16.8px', display: 'grid', gridTemplateColumns: 'repeat(3, 8px)', gap: '3px', opacity: 0.3 },
  pixel: { width: '8px', height: '8px', background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)' },
  actionsList: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' },
  actionLink: { display: 'flex', alignItems: 'center', gap: '12px', padding: '0 16px', height: '48px', background: 'rgba(255, 255, 255, 0.05)', fontFamily: 'Cousine, monospace', fontSize: '16px', color: '#FFFFFF', textDecoration: 'none', transition: 'all 0.3s' },
  formCard: { background: 'rgba(37, 37, 37, 0.6)', border: '0.8px solid rgba(93, 205, 219, 0.1)', padding: '48.8px 48.8px 32px' },
  formTitle: { fontFamily: 'Erbaum, Cousine, monospace', fontWeight: 600, fontSize: '36px', color: '#FFFFFF', margin: '0 0 32px' },
  form: { display: 'flex', flexDirection: 'column', gap: '32px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  formLabel: { fontFamily: 'Cousine, monospace', fontSize: '14px', color: '#A0A0A0' },
  formInput: { padding: '12px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '0.8px solid rgba(255, 255, 255, 0.1)', color: '#FFFFFF', fontFamily: 'Cousine, monospace' },
  formSelect: { padding: '12px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '0.8px solid rgba(255, 255, 255, 0.1)', color: '#FFFFFF', fontFamily: 'Cousine, monospace', appearance: 'none' },
  formTextarea: { padding: '12px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '0.8px solid rgba(255, 255, 255, 0.1)', color: '#FFFFFF', fontFamily: 'Cousine, monospace', resize: 'vertical', minHeight: '140px' },
  submitButton: { position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '206.73px', height: '60px', background: 'linear-gradient(180deg, #5DCDDB 0%, #7DD8E5 100%)', border: 'none', fontFamily: 'Cousine, monospace', fontSize: '18px', color: '#FFFFFF', cursor: 'pointer', overflow: 'hidden', transition: 'transform 0.2s' },
  studioSection: { padding: 0, margin: '0 0 40px 0', background: 'transparent' },
  studioMapWrapper: { position: 'relative', width: '100%', minHeight: '280px', overflow: 'hidden' },
};
