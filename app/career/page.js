  "use client";

  import { useState } from 'react';
  import { motion } from 'motion/react';
  import Image from 'next/image';
  import styles from './career.module.css';
  import ModelRegistrationPage from './ModelRegistration.client';


  export default function CareersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState('');
    const [isModelModalOpen, setIsModelModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [resumeName, setResumeName] = useState('');
    const [uploadInProgress, setUploadInProgress] = useState(false);

    function openModal(title) {
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

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    setIsSubmitting(true);
    setMessage('');

    try {
      // Step 1: Upload CV to Cloudinary first
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

        if (!uploadRes.ok) {
          throw new Error('Failed to upload CV');
        }

        const uploadData = await uploadRes.json();
        cvUrl = uploadData.url;
        setUploadInProgress(false);
      }

      // Step 2: Submit application with CV URL
      const payload = {
        fullName: form.name?.value || '',
        email: form.email?.value || '',
        phone: '',
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
      <div className={styles.app}>
        <div className={styles.careersPage}>
          {/* Hero Section with Image */}
          <section className={styles.heroSection}>
            <motion.div 
              className={styles.heroImageWrapper}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fHRlYW0lMjBjcmVhdGl2ZXxlbnwwfHx8fDE2Nzg5ODc3ODA&ixlib=rb-4.0.3&q=80&w=1920"
                alt="Join Our Team"
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
                  <span className={styles.joinOur}>Join Our</span>
                  <div className={styles.textWrapper}>
                    <span className={styles.creativeTeam}>Creative Team</span>
                  </div>
                </div>
                <p className={styles.heroParagraph}>
                Be part of a talented team creating exceptional work for world-class brands
                </p>
              </motion.div>
            </div>
          </section>

          {isModalOpen && (
            <div className={styles.modalOverlay} onClick={closeModal}>
              <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalInner}>
                  <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>{selectedJob || 'Studio Assistant'}</h3>
                    <button className={styles.modalClose} onClick={closeModal} aria-label="Close">×</button>
                  </div>

                  <div className={styles.modalBodyGrid}>
                    <div className={styles.modalDetails}>
                      <div className={styles.jobDetailsTop}>
                        <div className={styles.jobDetail}><span>New York, NY</span></div>
                        <div className={styles.jobDetail}><span>Full-time</span></div>
                        <div className={styles.jobDetail}><span>$35k - $45k</span></div>
                      </div>

                      <h4 className={styles.sectionHeading}>Responsibilities</h4>
                      <ul className={styles.modalList}>
                        <li>Assist studio sessions and prepare equipment</li>
                        <li>Support photographers and videographers on set</li>
                        <li>Manage gear inventory and studio upkeep</li>
                        <li>Help with client communication and logistics</li>
                      </ul>

                      <h4 className={styles.sectionHeading}>Requirements</h4>
                      <ul className={styles.modalList}>
                        <li>1+ years in a studio or production environment</li>
                        <li>Comfortable handling camera and lighting equipment</li>
                        <li>Strong communication and teamwork skills</li>
                        <li>Reliable, punctual, and detail oriented</li>
                      </ul>
                    </div>

                    <div className={styles.modalApply}> 
                      <p className={styles.modalSubtitle}>Apply for this Position</p>
                      <form className={styles.modalForm} onSubmit={handleSubmit}>
                        <div className={styles.modalRow}>
                          <input name="name" placeholder="Full Name" className={styles.modalInput} required />
                          <input name="email" type="email" placeholder="Email Address" className={styles.modalInput} required />
                        </div>
                          <div className={styles.modalRow}>
                            <input name="phone" placeholder="Phone Number *" className={styles.modalInput} required />
                          </div>
                        <label className={styles.uploadBox}>
                          <div className={styles.uploadIconPlaceholder}></div>
                          <div className={styles.uploadTextBlock}>
                              <span className={styles.uploadTitle}>Upload Resume & Portfolio *</span>
                            <span className={styles.uploadSubtitle}>PDF or DOCX (Max 10MB)</span>
                          </div>
                          <input
                            className={styles.hiddenFileInput}
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
                                  // sanitize filename: remove unusual separators and truncate
                                  const raw = f.name || '';
                                  // replace middle-dot and similar with a space
                                  const cleaned = raw.replace(/[·••·]/g, ' ').replace(/\s+/g, ' ').trim();
                                  const maxLen = 36;
                                  let display = cleaned;
                                  if (cleaned.length > maxLen) {
                                    const head = cleaned.slice(0, 20);
                                    const tail = cleaned.slice(-12);
                                    display = `${head}…${tail}`;
                                  }
                                  setResumeName(display);
                                }
                              } else {
                                setResumeName('');
                              }
                            }}
                          />
                          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                            <div className={styles.uploadFilename} aria-live="polite">
                              {resumeName ? resumeName : 'No file chosen'}
                            </div>
                            <div aria-live="polite" style={{fontSize: 13, color: uploadInProgress ? '#5DCDDB' : 'transparent'}}>
                              {uploadInProgress ? 'Uploading…' : ''}
                            </div>
                          </div>
                        </label>
                        <textarea name="cover" placeholder="Cover letter (optional)" className={styles.modalTextarea}></textarea>
                        <button type="submit" className={styles.modalSubmit} disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>

                        {message && (
                          <div
                            style={{
                              padding: '12px',
                              marginTop: '12px',
                              borderRadius: '6px',
                              background: message.toLowerCase().includes('success')
                                ? 'rgba(93, 205, 219, 0.08)'
                                : 'rgba(255, 0, 0, 0.06)',
                              border: `1px solid ${message.toLowerCase().includes('success') ? '#5DCDDB' : '#ff6b6b'}`,
                              color: message.toLowerCase().includes('success') ? '#5DCDDB' : '#ff6b6b',
                              fontFamily: "'Cousine', monospace",
                              fontSize: '14px',
                            }}
                          >
                            {message}
                          </div>
                        )}
                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {isModelModalOpen && (
            <div className={styles.modalOverlay} onClick={closeModelModal}>
              <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalInner}>
                  <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Model Registration</h3>
                    <button className={styles.modalClose} onClick={closeModelModal} aria-label="Close">×</button>
                  </div>
                  <div style={{ width: '100%' }}>
                    <ModelRegistrationPage embedded onSuccess={closeModelModal} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Open Positions Section */}
          <section className={styles.positionsSection}>
            <div className={styles.positionsHeader}>
              <h2 className={styles.heading2}>
                <span className={styles.openText}>Open </span>
                <span className={styles.positionsText}>Positions</span>
              </h2>
              <p className={styles.positionsSubtext}>
                Explore our current openings and find your perfect role
              </p>
            </div>

            <div className={styles.jobListings}>
              <div className={styles.jobCard}>
                <div className={styles.jobHeader}>
                  <div className={styles.jobInfo}>
                    <h3 className={styles.jobTitle}>Studio Assistant</h3>
                    <span className={styles.jobCategory}>Production</span>
                  </div>
                  <button
                    className={styles.applyButton}
                    onClick={() => openModal('Studio Assistant')}
                  >
                    <span>Apply Now</span>
                  </button>
                </div>
                <div className={styles.jobDetails}>
                  <div className={styles.jobDetail}>
                    <svg className={styles.icon} viewBox="0 0 16 16">
                      <path d="M8 2a3 3 0 100 6 3 3 0 000-6zM4 11a3 3 0 00-3 3v1h14v-1a3 3 0 00-3-3H4z" />
                    </svg>
                    <span>New York, NY</span>
                  </div>
                  <div className={styles.jobDetail}>
                    <svg className={styles.icon} viewBox="0 0 16 16">
                      <path d="M8 2a6 6 0 100 12A6 6 0 008 2z" />
                    </svg>
                    <span>Full-time</span>
                  </div>
                  <div className={styles.jobDetail}>
                    <svg className={styles.icon} viewBox="0 0 16 16">
                      <path d="M2 4h12v8H2z" />
                    </svg>
                    <span>$35k - $45k</span>
                  </div>
                </div>
                <p className={styles.jobExcerpt}>
                  Support studio operations and assist on shoots. This role helps keep productions running smoothly and provides hands-on experience with equipment and client services.
                </p>
              </div>
            </div>
          </section>

          {/* Model Registration Section */}
          <section className={styles.modelSection}>
            <div className={styles.modelContainer}>
              <div className={styles.modelContent}>
                <div className={styles.modelBadge}>Model Registration</div>
                <h2 className={styles.modelHeading}>
                  <span className={styles.joinOur}>Join Our</span>
                  <br />
                  <span className={styles.modelRaster}>Model Raster</span>
                </h2>
                <p className={styles.modelParagraph}>
                  Are you interested in modeling opportunities? Join our raster and work with premium brands
                </p>
                <ul className={styles.modelList}>
                  <li>Work with premium brands and top-tier clients</li>
                  <li>Professional development and mentorship</li>
                  <li>Competitive rates and flexible schedules</li>
                </ul>
                <button 
                  className={styles.modelButton}
                  onClick={openModelModal}
                >
                  Apply as a Model
                </button>
              </div>
              <div className={styles.modelImage}>
                {/* Image file (place in project): public/images/cover-photo-default.jpg */}
                <Image
                  src="/images/cover-photo-default.jpg"
                  alt="Model hero"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.modelImageActual}
                />
              </div>
            </div>
          </section>

          {/* "Don't See Your Role?" section removed per request */}
        </div>


      </div>
    );
  }