'use client';

import { useState, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  useScrollAnimation, 
  scrollAnimationVariants, 
  staggerContainerVariants, 
  staggerItemVariants 
} from '../hooks/useScrollAnimation';

// --- Sub-component: ModelRegistrationPage ---
interface ModelRegistrationProps {
  onSuccess?: () => void;
  compact?: boolean;
  embedded?: boolean;
}

function ModelRegistrationPage({ onSuccess, compact = false, embedded = false }: ModelRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    height: '',
    country: '',
    gender: '',
    portfolioLink: '',
    instagram: '',
    linkedin: '',
    twitter: '',
    tiktok: '',
    otherLinks: '',
    experience: '',
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = ['Fashion', 'Commercial', 'Editorial', 'Fitness', 'Runway', 'Print'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Mandarin', 'Japanese', 'Korean', 'Arabic'];

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function toggleCategory(category: string) {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }

  function toggleLanguage(language: string) {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files].slice(0, 10));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload: any = {
        fullName: formData.fullName,
        age: Number(formData.age),
        email: formData.email,
        phone: formData.phone,
        height: formData.height,
        country: formData.country,
        gender: formData.gender,
        portfolioLink: formData.portfolioLink,
        instagramHandle: formData.instagram,
        linkedinProfile: formData.linkedin,
        twitterHandle: formData.twitter,
        tiktokHandle: formData.tiktok,
        otherLinks: formData.otherLinks,
        categories: selectedCategories.map(c => c.toLowerCase()),
        languages: selectedLanguages,
      };

      if (!payload.fullName || !payload.email || !payload.instagramHandle || selectedCategories.length === 0 || selectedLanguages.length === 0) {
        setMessage('Please fill in all required fields');
        setLoading(false);
        return;
      }

      let photoUrls = [];
      if (uploadedFiles && uploadedFiles.length > 0) {
        const uploads = [];
        for (const file of uploadedFiles) {
          const fd = new FormData();
          fd.append('file', file);
          fd.append('folder', 'raster-media/models');
          uploads.push(
            fetch('/api/upload', { method: 'POST', body: fd }).then(r => r.json())
          );
        }
        const results = await Promise.all(uploads);
        photoUrls = results.filter(r => r && r.url).map(r => r.url);
      }

      if (photoUrls.length > 0) payload.photos = photoUrls;

      const res = await fetch('/api/model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage('Model registration submitted successfully!');
        setFormData({
          fullName: '', age: '', email: '', phone: '', height: '',
          country: '', gender: '', portfolioLink: '', instagram: '',
          linkedin: '', twitter: '', tiktok: '', otherLinks: '', experience: '',
        });
        setSelectedCategories([]);
        setSelectedLanguages([]);
        setUploadedFiles([]);
        if (onSuccess) setTimeout(onSuccess, 1200);
      } else {
        setMessage(data.error || 'Submission failed. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMessage('An error occurred. Please try again later.');
    }
  }

  return (
    <div style={modelStyles.app}>
      <div style={modelStyles.modelApplicationPage}>
        {compact ? (
          <form style={modelStyles.compactForm} onSubmit={handleSubmit}>
            <div style={modelStyles.compactContainer}>
              <label style={modelStyles.label}>Instagram Handle *</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="@yourusername"
                style={modelStyles.compactInput}
                required
              />
              <label style={modelStyles.label}>Other Links (Optional)</label>
              <input
                type="url"
                name="otherLinks"
                value={formData.otherLinks}
                onChange={handleInputChange}
                placeholder="https://yourportfolio.com"
                style={modelStyles.compactInput}
              />
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <button type="submit" style={modelStyles.compactSubmitButton} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
              {message && <div style={messageStyle(message)}>{message}</div>}
            </div>
          </form>
        ) : (
          <form style={modelStyles.form} onSubmit={handleSubmit}>
            <div style={{ ...modelStyles.formContainer, ...(embedded ? modelStyles.formContainerEmbedded : {}) }}>
              <div style={modelStyles.sectionHeader}>
                <svg style={modelStyles.icon} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#5DCDDB" strokeWidth="2"/>
                  <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="#5DCDDB" strokeWidth="2"/>
                </svg>
                <h3 style={modelStyles.heading3}>Personal Information</h3>
              </div>
              <div style={modelStyles.formGrid}>
                <div style={modelStyles.formRow}>
                  <div style={modelStyles.inputGroup}>
                    <label style={modelStyles.label}>Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" style={modelStyles.textInput} required />
                  </div>
                  <div style={modelStyles.inputGroup}>
                    <label style={modelStyles.label}>Age *</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Your age" style={modelStyles.textInput} required />
                  </div>
                </div>
                <div style={modelStyles.formRow}>
                  <div style={modelStyles.inputGroup}>
                    <label style={modelStyles.label}>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" style={modelStyles.textInput} required />
                  </div>
                  <div style={modelStyles.inputGroup}>
                    <label style={modelStyles.label}>Phone *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+94 77 000 0000" style={modelStyles.textInput} required />
                  </div>
                </div>
                <div style={modelStyles.inputGroup}>
                  <label style={modelStyles.label}>Height *</label>
                  <input type="text" name="height" value={formData.height} onChange={handleInputChange} placeholder={`e.g., 5'9" or 175cm`} style={modelStyles.textInput} required />
                </div>
                <div style={modelStyles.inputGroup}>
                  <label style={modelStyles.label}>Country *</label>
                  <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Your country" style={modelStyles.textInput} required />
                </div>
                <div style={modelStyles.inputGroup}>
                  <label style={modelStyles.label}>Gender *</label>
                  <select name="gender" value={formData.gender} onChange={handleInputChange} style={modelStyles.selectInput} required>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div style={modelStyles.inputGroup}>
                  <label style={modelStyles.label}>Portfolio Link (Optional)</label>
                  <input type="url" name="portfolioLink" value={formData.portfolioLink} onChange={handleInputChange} placeholder="https://yourportfolio.com" style={modelStyles.textInput} />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div style={{ ...modelStyles.formContainer, ...(embedded ? modelStyles.formContainerEmbedded : {}) }}>
              <div style={modelStyles.sectionHeader}>
                <svg style={modelStyles.icon} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#5DCDDB" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" fill="#5DCDDB"/>
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#5DCDDB" strokeWidth="2"/>
                </svg>
                <h3 style={modelStyles.heading3}>Social Media</h3>
              </div>
              <div style={modelStyles.formGrid}>
                <div style={modelStyles.inputGroup}>
                  <label style={modelStyles.label}>Instagram Handle *</label>
                  <input type="text" name="instagram" value={formData.instagram} onChange={handleInputChange} placeholder="@yourusername" style={modelStyles.textInput} required />
                </div>
                <div style={modelStyles.inputGroup}>
                  <label style={modelStyles.label}>Other Links (Optional)</label>
                  <input type="url" name="otherLinks" value={formData.otherLinks} onChange={handleInputChange} placeholder="https://yourwebsite.com" style={modelStyles.textInput} />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div style={{ ...modelStyles.formContainer, ...(embedded ? modelStyles.formContainerEmbedded : {}) }}>
              <h3 style={modelStyles.heading3}>Modeling Categories *</h3>
              <div style={modelStyles.buttonGrid}>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={selectedCategories.includes(category) ? 'active' : ''}
                    style={{
                      ...modelStyles.categoryButton,
                      ...(selectedCategories.includes(category) ? modelStyles.categoryButtonActive : {})
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div style={{ ...modelStyles.formContainer, ...(embedded ? modelStyles.formContainerEmbedded : {}) }}>
              <h3 style={modelStyles.heading3}>Experience & Background</h3>
              <textarea name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Tell us about your modeling experience..." style={modelStyles.textArea} rows={6} />
            </div>

            {/* Photos */}
            <div style={modelStyles.formContainer}>
              <h3 style={modelStyles.heading3}>Portfolio Photos *</h3>
              <label style={modelStyles.uploadBox}>
                <input type="file" multiple accept="image/*" onChange={handleFileUpload} style={modelStyles.hiddenFileInput} required />
                <svg style={modelStyles.uploadIcon} viewBox="0 0 48 48" fill="none">
                  <path d="M24 8v24M24 8l-8 8M24 8l8 8M8 32v8h32v-8" stroke="#5DCDDB" strokeWidth="4"/>
                </svg>
                <p style={modelStyles.uploadTitle}>Upload Your Portfolio</p>
                <p style={modelStyles.uploadSubtext}>Drag and drop or click to upload (Max 10 images, 5MB each)</p>
                {uploadedFiles.length > 0 && <p style={modelStyles.uploadedCount}>{uploadedFiles.length} file(s) selected</p>}
              </label>
            </div>

            {/* Languages */}
            <div style={modelStyles.formContainer}>
              <h3 style={modelStyles.heading3}>Languages Spoken *</h3>
              <div style={modelStyles.buttonGrid}>
                {languages.map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => toggleLanguage(language)}
                    style={{
                      ...modelStyles.categoryButton,
                      ...(selectedLanguages.includes(language) ? modelStyles.categoryButtonActive : {})
                    }}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            {message && <div style={messageStyle(message)}>{message}</div>}

            <div style={modelStyles.submitContainer}>
              <button type="submit" style={modelStyles.submitButton} disabled={loading}>{loading ? 'Submitting...' : 'Submit Application'}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// --- Main component: CareersPage ---
export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [uploadInProgress, setUploadInProgress] = useState(false);

  function openModal(title: string) {
    setSelectedJob(title);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedJob('');
  }

  function openModelModal() {
    setIsModelModalOpen(true);
  }

  function closeModelModal() {
    setIsModelModalOpen(false);
  }

  const { ref: positionsRef, isInView: positionsInView } = useScrollAnimation();
  const { ref: modelRef, isInView: modelInView } = useScrollAnimation();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const form = e.target;
    setIsSubmitting(true);
    setMessage('');

    try {
      let cvUrl = '';
      const resumeFile = form.resume?.files[0];
      
      if (resumeFile) {
        setUploadInProgress(true);
        const fileFormData = new FormData();
        fileFormData.append('file', resumeFile);
        fileFormData.append('folder', 'raster-media/careers');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: fileFormData,
        });

        if (!uploadRes.ok) throw new Error('Failed to upload CV');

        const uploadData = await uploadRes.json();
        cvUrl = uploadData.url;
        setUploadInProgress(false);
      }

      const payload = {
        fullName: form.name?.value || '',
        email: form.email?.value || '',
        phone: form.phone?.value || '',
        position: selectedJob || 'Studio Assistant',
        experience: 'Applied via career portal',
        coverLetter: form.cover?.value || '',
        cvUrl: cvUrl,
      };

      const res = await fetch('/api/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setIsSubmitting(false);
      setUploadInProgress(false);

      if (res.ok) {
        setMessage("Application submitted successfully! We'll contact you soon.");
        form.reset();
        setResumeName('');
        setTimeout(() => {
          closeModal();
          setMessage('');
        }, 1800);
      } else {
        setMessage(data.error || 'Submission failed. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setMessage('An error occurred. Please try again later.');
      setUploadInProgress(false);
    }
  }

  return (
    <div style={careerStyles.app}>
      <div style={careerStyles.careersPage}>
        {/* Hero Section */}
        <section style={careerStyles.heroSection} className="career-hero">
          <motion.div 
            style={careerStyles.heroImageWrapper}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fHRlYW0lMjBjcmVhdGl2ZXxlbnwwfHx8fDE2Nzg5ODc3ODA&ixlib=rb-4.0.3&q=80&w=1920"
              alt="Join Our Team"
              style={careerStyles.heroImage}
              fill
              sizes="100vw"
              priority
            />
            <div style={careerStyles.heroImageOverlay} />
          </motion.div>

          <div style={careerStyles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div style={careerStyles.heading1} className="career-h1">
                <span style={careerStyles.joinOur}>Join Our</span>
                <div style={careerStyles.textWrapper}>
                  <span style={careerStyles.creativeTeam}>Creative Team</span>
                </div>
              </div>
              <p style={careerStyles.heroParagraph}>
                Be part of a talented team creating exceptional work for world-class brands
              </p>
            </motion.div>
          </div>
        </section>

        {isModalOpen && (
          <div style={careerStyles.modalOverlay} onClick={closeModal} className="career-modal-overlay">
            <div style={careerStyles.modalContainer} onClick={(e) => e.stopPropagation()} className="career-modal-container">
              <div style={careerStyles.modalInner}>
                <div style={careerStyles.modalHeader}>
                  <h3 style={careerStyles.modalTitle}>{selectedJob || 'Studio Assistant'}</h3>
                  <button style={careerStyles.modalClose} onClick={closeModal} aria-label="Close">×</button>
                </div>

                <div style={careerStyles.modalBodyGrid} className="career-modal-grid">
                  <div style={careerStyles.modalDetails}>
                    <div style={careerStyles.jobDetailsTop}>
                      <div style={careerStyles.jobDetail}><span>Wattala, Sri Lanka</span></div>
                      <div style={careerStyles.jobDetail}><span>Full-time</span></div>
                      <div style={careerStyles.jobDetail}><span>LKR35k - LKR45k</span></div>
                    </div>
                    <h4 style={careerStyles.sectionHeading}>Responsibilities</h4>
                    <ul style={careerStyles.modalList}>
                      <li>Assist studio sessions and prepare equipment</li>
                      <li>Support photographers and videographers on set</li>
                      <li>Manage gear inventory and studio upkeep</li>
                      <li>Help with client communication and logistics</li>
                    </ul>
                    <h4 style={careerStyles.sectionHeading}>Requirements</h4>
                    <ul style={careerStyles.modalList}>
                      <li>1+ years in a studio or production environment</li>
                      <li>Comfortable handling camera and lighting equipment</li>
                      <li>Strong communication and teamwork skills</li>
                      <li>Reliable, punctual, and detail oriented</li>
                    </ul>
                  </div>

                  <div style={careerStyles.modalApply}> 
                    <p style={careerStyles.modalSubtitle}>Apply for this Position</p>
                    <form style={careerStyles.modalForm} onSubmit={handleSubmit}>
                      <div style={careerStyles.modalRow}>
                        <input name="name" placeholder="Full Name" style={careerStyles.modalInput} required />
                        <input name="email" type="email" placeholder="Email Address" style={careerStyles.modalInput} required />
                      </div>
                      <div style={careerStyles.modalRow}>
                        <input name="phone" placeholder="Phone Number *" style={careerStyles.modalInput} required />
                      </div>
                      <label style={careerStyles.uploadBox}>
                        <div style={careerStyles.uploadIconPlaceholder}></div>
                        <div style={careerStyles.uploadTextBlock}>
                          <span style={careerStyles.uploadTitle}>Upload Resume & Portfolio *</span>
                          <span style={careerStyles.uploadSubtitle}>PDF or DOCX (Max 10MB)</span>
                        </div>
                        <input
                          style={careerStyles.hiddenFileInput}
                          type="file"
                          name="resume"
                          accept=".pdf,.doc,.docx"
                          required
                          onChange={(ev) => {
                            const f = ev.target.files?.[0];
                            if (f) {
                              if (f.size > 10 * 1024 * 1024) {
                                setMessage('File too large (max 10MB)');
                                ev.target.value = '';
                                setResumeName('');
                              } else {
                                setMessage('');
                                const raw = f.name || '';
                                const cleaned = raw.replace(/[·••·]/g, ' ').replace(/\s+/g, ' ').trim();
                                const maxLen = 30;
                                let display = cleaned;
                                if (cleaned.length > maxLen) {
                                  display = cleaned.slice(0, 18) + '…' + cleaned.slice(-10);
                                }
                                setResumeName(display);
                              }
                            } else {
                              setResumeName('');
                            }
                          }}
                        />
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                          <div style={careerStyles.uploadFilename}>{resumeName || 'No file chosen'}</div>
                          {uploadInProgress && <div style={{fontSize: '12px', color: '#5DCDDB'}}>Uploading…</div>}
                        </div>
                      </label>
                      <textarea name="cover" placeholder="Cover letter (optional)" style={careerStyles.modalTextarea}></textarea>
                      <button type="submit" style={careerStyles.modalSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </button>
                      {message && <div style={messageStyle(message)}>{message}</div>}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isModelModalOpen && (
          <div style={careerStyles.modalOverlay} onClick={closeModelModal} className="career-modal-overlay">
            <div style={{ ...careerStyles.modalContainer, width: '900px' }} onClick={(e) => e.stopPropagation()} className="career-modal-container">
              <div style={careerStyles.modalInner}>
                <div style={careerStyles.modalHeader}>
                  <h3 style={careerStyles.modalTitle}>Model Registration</h3>
                  <button style={careerStyles.modalClose} onClick={closeModelModal} aria-label="Close">×</button>
                </div>
                <div style={{ width: '100%', marginTop: '24px' }}>
                  <ModelRegistrationPage embedded onSuccess={closeModelModal} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Positions Section */}
        <section style={careerStyles.positionsSection} ref={positionsRef} className="career-section">
          <motion.div
            initial="hidden"
            animate={positionsInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            style={{ display: 'contents' }}
          >
            <div style={careerStyles.positionsHeader}>
              <motion.h2 style={careerStyles.heading2} variants={staggerItemVariants}>
                <span style={careerStyles.openText}>Open </span>
                <span style={careerStyles.positionsText}>Positions</span>
              </motion.h2>
              <motion.p style={careerStyles.positionsSubtext} variants={staggerItemVariants}>
                Explore our current openings and find your perfect role
              </motion.p>
            </div>

            <motion.div style={careerStyles.jobListings} variants={staggerItemVariants}>
              <div style={careerStyles.jobCard} className="career-job-card">
                <div style={careerStyles.jobHeader}>
                  <div style={careerStyles.jobInfo}>
                    <h3 style={careerStyles.jobTitle}>Studio Assistant</h3>
                    <span style={careerStyles.jobCategory}>Production</span>
                  </div>
                  <button style={careerStyles.applyButton} onClick={() => openModal('Studio Assistant')}>
                    <span>Apply Now</span>
                  </button>
                </div>
                <div style={careerStyles.jobDetails}>
                  <div style={careerStyles.jobDetail}>
                    <svg style={careerStyles.icon} viewBox="0 0 16 16"><path d="M8 2a3 3 0 100 6 3 3 0 000-6zM4 11a3 3 0 00-3 3v1h14v-1a3 3 0 00-3-3H4z" /></svg>
                    <span>Wattala, Sri Lanka</span>
                  </div>
                  <div style={careerStyles.jobDetail}>
                    <svg style={careerStyles.icon} viewBox="0 0 16 16"><path d="M8 2a6 6 0 100 12A6 6 0 008 2z" /></svg>
                    <span>Full-time</span>
                  </div>
                  <div style={careerStyles.jobDetail}>
                    <svg style={careerStyles.icon} viewBox="0 0 16 16"><path d="M2 4h12v8H2z" /></svg>
                    <span>LKR35k - LKR45k</span>
                  </div>
                </div>
                <p style={careerStyles.jobExcerpt}>
                  Support studio operations and assist on shoots. This role helps keep productions running smoothly and provides hands-on experience with equipment.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Model Registration Promo Section */}
        <section style={careerStyles.modelSection} ref={modelRef} className="career-section">
          <motion.div
            style={careerStyles.modelContainerPromo}
            initial="hidden"
            animate={modelInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="career-model-promo"
          >
            <div style={careerStyles.modelContent}>
              <div style={careerStyles.modelBadge}>Model Registration</div>
              <h2 style={careerStyles.modelHeading}>
                <span style={careerStyles.joinOur}>Join Our</span>
                <br />
                <span style={careerStyles.modelRaster}>Model Raster</span>
              </h2>
              <p style={careerStyles.modelParagraph}>
                Are you interested in modeling opportunities? Join our raster and work with premium brands
              </p>
              <ul style={careerStyles.modelList}>
                <li>Work with premium brands and top-tier clients</li>
                <li>Professional development and mentorship</li>
                <li>Competitive rates and flexible schedules</li>
              </ul>
              <button style={careerStyles.modelButton} onClick={openModelModal}>
                Apply as a Model
              </button>
            </div>
            <div style={careerStyles.modelImage}>
              <Image
                src="/images/cover-photo-default.jpg"
                alt="Model hero"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </section>
      </div>

      <style>{`
        .career-job-card { transition: all 0.3s ease; }
        .career-job-card:hover { transform: translateY(-4px); border-color: rgba(93, 205, 219, 0.3) !important; }
        
        .career-modal-container { background: rgba(15, 15, 16, 0.95) !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; box-shadow: 0 20px 50px rgba(0,0,0,0.8) !important; }
        
        @media (max-width: 1024px) {
          .career-hero { height: auto !important; min-height: 420px !important; margin-bottom: 48px !important; }
          .career-section { padding: 52px 32px !important; }
          .career-model-promo { flex-direction: column !important; padding: 32px !important; }
          .career-modal-grid { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 768px) {
          .career-h1 span { font-size: 40px !important; line-height: 50px !important; }
          .career-section { padding: 40px 20px !important; }
          .career-modal-container { padding: 24px !important; width: 95% !important; margin: 0 auto; }
        }
      `}</style>
    </div>
  );
}

// --- Helper: Message style ---
const messageStyle = (msg: string): CSSProperties => ({
  padding: '12px',
  marginTop: '12px',
  borderRadius: '6px',
  background: msg.toLowerCase().includes('success') ? 'rgba(93, 205, 219, 0.08)' : 'rgba(255, 0, 0, 0.06)',
  border: `1px solid ${msg.toLowerCase().includes('success') ? '#5DCDDB' : '#ff6b6b'}`,
  color: msg.toLowerCase().includes('success') ? '#5DCDDB' : '#ff6b6b',
  fontFamily: "'Cousine', monospace",
  fontSize: '14px',
});

// --- Styles: Career Page ---
const careerStyles: Record<string, CSSProperties> = {
  app: { display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', color: '#FFFFFF', fontFamily: "'Cousine', monospace" },
  careersPage: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '140px' },
  heroSection: { position: 'relative', width: '100%', height: '620px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '56px' },
  heroImageWrapper: { position: 'absolute', inset: 0, zIndex: 0 },
  heroImage: { width: '100%', height: '100%', objectFit: 'cover' },
  heroImageOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%)' },
  heroContent: { position: 'relative', zIndex: 2, maxWidth: '1400px', padding: '0 48px', textAlign: 'center' },
  heading1: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' },
  joinOur: { fontFamily: 'Erbaum, Cousine, monospace', fontWeight: 700, fontSize: '50px', lineHeight: '60px', color: '#FFFFFF' },
  textWrapper: { display: 'inline-block' },
  creativeTeam: { fontFamily: 'Erbaum, Cousine, monospace', fontWeight: 700, fontSize: '50px', lineHeight: '60px', background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  heroParagraph: { fontWeight: 400, fontSize: '15px', lineHeight: '20px', color: '#A0A0A0', maxWidth: '1400px', margin: '0 auto' },
  positionsSection: { width: '100%', maxWidth: '1400px', padding: '64px 48px', margin: '0 auto 48px' },
  positionsHeader: { textAlign: 'center', marginBottom: '64px' },
  heading2: { fontFamily: 'Erbaum, Cousine, monospace', fontWeight: 700, fontSize: '40px', lineHeight: '60px', color: '#FFFFFF', margin: 0 },
  openText: { color: '#FFFFFF' },
  positionsText: { background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  positionsSubtext: { fontWeight: 400, fontSize: '15px', lineHeight: '31px', color: '#A0A0A0', marginTop: '16px' },
  jobListings: { maxWidth: '1400px', margin: '32px auto 0', display: 'flex', flexDirection: 'column', gap: '24px' },
  jobCard: { background: 'rgba(37, 37, 37, 0.6)', border: '0.8px solid rgba(93, 205, 219, 0.1)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' },
  jobHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  jobInfo: { display: 'flex', flexDirection: 'column', gap: '8px' },
  jobTitle: { fontWeight: 600, fontSize: '30px', lineHeight: '43px', color: '#FFFFFF', margin: 0 },
  jobCategory: { fontWeight: 400, fontSize: '15px', lineHeight: '20px', color: '#5DCDDB' },
  applyButton: { background: 'linear-gradient(180deg, #5DCDDB 0%, #7DD8E5 100%)', border: 'none', padding: '9px 16px', fontSize: '14px', color: '#FFFFFF', cursor: 'pointer' },
  jobDetails: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  jobDetail: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6B6B6B' },
  icon: { width: '16px', height: '16px', fill: '#6B6B6B' },
  jobExcerpt: { fontSize: '15px', lineHeight: '24px', color: '#A0A0A0', margin: 0 },
  modelSection: { width: '100%', maxWidth: '1400px', padding: '56px 48px', margin: '0 auto' },
  modelContainerPromo: { background: 'rgba(37, 37, 37, 0.6)', border: '1.6px solid rgba(93, 205, 219, 0.3)', padding: '50px', display: 'flex', gap: '32px' },
  modelContent: { flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' },
  modelBadge: { background: 'rgba(93, 205, 219, 0.2)', padding: '8px 16px', fontSize: '14px', color: '#5DCDDB', width: 'fit-content' },
  modelHeading: { fontWeight: 700, fontSize: '40px', lineHeight: '60px', margin: 0 },
  modelRaster: { background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  modelParagraph: { fontSize: '15px', lineHeight: '31px', color: '#A0A0A0', margin: 0 },
  modelList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' },
  modelButton: { background: 'linear-gradient(180deg, #5DCDDB 0%, #7DD8E5 100%)', border: 'none', padding: '10px 20px', fontSize: '15px', color: '#FFFFFF', cursor: 'pointer', width: 'fit-content' },
  modelImage: { width: '320px', height: '420px', position: 'relative', overflow: 'hidden' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px', backdropFilter: 'blur(10px)' },
  modalContainer: { position: 'relative', width: '768px', maxWidth: '100%', background: '#111', borderRadius: '14px', padding: '36px', maxHeight: '90vh', overflowY: 'auto' },
  modalInner: { width: '100%' },
  modalHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' },
  modalTitle: { fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '28px', color: '#FFFFFF' },
  modalClose: { background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' },
  modalBodyGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' },
  modalDetails: { display: 'flex', flexDirection: 'column', gap: '24px' },
  jobDetailsTop: { display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  sectionHeading: { fontSize: '18px', fontWeight: 600, color: '#FFFFFF' },
  modalList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' },
  modalApply: { display: 'flex', flexDirection: 'column', gap: '16px' },
  modalSubtitle: { color: '#A0A0A0', fontSize: '14px' },
  modalForm: { display: 'flex', flexDirection: 'column', gap: '16px' },
  modalRow: { display: 'grid', gap: '16px' },
  modalInput: { background: '#222', border: '1px solid #333', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '14px' },
  uploadBox: { border: '2px dashed #444', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' },
  hiddenFileInput: { display: 'none' },
  uploadIconPlaceholder: { width: '32px', height: '32px', background: '#5DCDDB', borderRadius: '4px' },
  uploadTextBlock: { textAlign: 'center' },
  uploadTitle: { fontSize: '14px', color: '#fff' },
  uploadSubtitle: { fontSize: '12px', color: '#666' },
  uploadFilename: { fontSize: '12px', color: '#aaa', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' },
  modalTextarea: { background: '#222', border: '1px solid #333', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '14px', minHeight: '100px' },
  modalSubmit: { background: '#5DCDDB', border: 'none', padding: '12px', borderRadius: '8px', color: '#000', fontWeight: 600, cursor: 'pointer' },
};

// --- Styles: Model Registration ---
const modelStyles: Record<string, CSSProperties> = {
  app: { width: '100%', color: '#FFFFFF' },
  modelApplicationPage: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  form: { width: '100%', display: 'flex', flexDirection: 'column', gap: '32px' },
  formContainer: { background: 'rgba(37, 37, 37, 0.6)', border: '0.8px solid rgba(93, 205, 219, 0.1)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' },
  formContainerEmbedded: { background: 'transparent', border: 'none', padding: '16px 0' },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: '12px' },
  icon: { width: '24px', height: '24px' },
  heading3: { fontFamily: 'Erbaum, Cousine, monospace', fontSize: '18px', color: '#FFFFFF' },
  formGrid: { display: 'flex', flexDirection: 'column', gap: '24px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', color: '#A0A0A0' },
  textInput: { background: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff' },
  selectInput: { background: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff' },
  textArea: { background: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff', resize: 'vertical' },
  buttonGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  categoryButton: { background: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: '10px', padding: '12px', color: '#A0A0A0', cursor: 'pointer' },
  categoryButtonActive: { background: 'rgba(93,205,219,0.2)', borderColor: '#5DCDDB', color: '#fff' },
  uploadBox: { border: '2px dashed #444', borderRadius: '10px', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' },
  uploadIcon: { width: '48px', height: '48px' },
  uploadTitle: { fontSize: '14px', color: '#fff', marginTop: '10px' },
  uploadSubtext: { fontSize: '12px', color: '#666' },
  uploadedCount: { fontSize: '14px', color: '#5DCDDB' },
  submitContainer: { display: 'flex', justifyContent: 'center', padding: '32px 0' },
  submitButton: { background: 'linear-gradient(180deg, #5DCDDB 0%, #7DD8E5 100%)', border: 'none', borderRadius: '8px', padding: '12px 32px', color: '#FFFFFF', fontWeight: 600, cursor: 'pointer' },
  compactForm: { width: '100%', maxWidth: '520px' },
  compactContainer: { display: 'flex', flexDirection: 'column', gap: '12px' },
  compactInput: { background: '#222', border: '1px solid #333', padding: '12px', borderRadius: '8px', color: '#fff' },
  compactSubmitButton: { background: '#5DCDDB', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' },
  hiddenFileInput: { display: 'none' },
};
