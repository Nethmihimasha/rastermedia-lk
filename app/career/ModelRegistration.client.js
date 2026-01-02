"use client";

import { useState } from 'react';
import styles from './modelregistry.module.css';

export default function ModelRegistrationPage({ onSuccess, compact = false, embedded = false }) {
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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = ['Fashion', 'Commercial', 'Editorial', 'Fitness', 'Runway', 'Print'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Mandarin', 'Japanese', 'Korean', 'Arabic'];

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function toggleCategory(category) {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  }

  function toggleLanguage(language) {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  }

  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files].slice(0, 10));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    setLoading(true);
    setMessage('');

    try {
      const payload = {
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
        setSelectedCategories([]);
        setSelectedLanguages([]);
        setUploadedFiles([]);
        
        if (typeof onSuccess === 'function') {
          setTimeout(onSuccess, 1200);
        }
      } else {
        setMessage(data.error || 'Submission failed. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setMessage('An error occurred. Please try again later.');
    }
  }

  function handleCompactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const payload = {
      fullName: formData.fullName || '',
      email: formData.email || '',
      instagram: form.instagram?.value || formData.instagram,
      otherLinks: form.otherLinks?.value || formData.otherLinks,
    };

    setLoading(true);
    setMessage('');
    fetch('/api/model/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const data = await res.json().catch(() => ({}));
      setLoading(false);
      if (res.ok || data?.ok) {
        setMessage('Model registration submitted successfully!');
        if (typeof onSuccess === 'function') setTimeout(onSuccess, 1200);
      } else {
        setMessage(data?.error || 'Submission failed. Please try again later.');
      }
    }).catch(err => {
      console.error(err);
      setLoading(false);
      setMessage('An error occurred. Please try again later.');
    });
  }

  return (
    <div className={styles.app}>
      <div className={styles.modelApplicationPage}>
        {compact ? (
          <form className={styles.compactForm} onSubmit={handleCompactSubmit}>
            <div className={styles.compactContainer}>
              <label className={styles.label}>Instagram Handle *</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="@yourusername"
                className={styles.compactInput}
                required
              />

              <label className={styles.label}>Other Links (Optional)</label>
              <input
                type="url"
                name="otherLinks"
                value={formData.otherLinks}
                onChange={handleInputChange}
                placeholder="https://yourportfolio.com"
                className={styles.compactInput}
              />

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                <button type="submit" className={styles.compactSubmitButton} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
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
            </div>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className={`${styles.formContainer} ${embedded ? styles.formContainerEmbedded : ''}`}>
            <div className={styles.sectionHeader}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#5DCDDB" strokeWidth="2"/>
                <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="#5DCDDB" strokeWidth="2"/>
              </svg>
              <h3 className={styles.heading3}>Personal Information</h3>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Your age"
                    className={styles.textInput}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={styles.textInput}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className={styles.textInput}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Height *</label>
                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder={`e.g., 5'9" or 175cm`}
                  className={styles.textInput}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Country *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Your country"
                  className={styles.textInput}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={styles.selectInput}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Portfolio Link (Optional)</label>
                <input
                  type="url"
                  name="portfolioLink"
                  value={formData.portfolioLink}
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.com"
                  className={styles.textInput}
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className={`${styles.formContainer} ${embedded ? styles.formContainerEmbedded : ''}`}>
            <div className={styles.sectionHeader}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#5DCDDB" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" fill="#5DCDDB"/>
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#5DCDDB" strokeWidth="2"/>
              </svg>
              <h3 className={styles.heading3}>Social Media</h3>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Instagram Handle *</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="@yourusername"
                  className={styles.textInput}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Other Links (Optional)</label>
                <input
                  type="url"
                  name="otherLinks"
                  value={formData.otherLinks}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                  className={styles.textInput}
                />
              </div>
            </div>
          </div>

          {/* Modeling Categories */}
          <div className={`${styles.formContainer} ${embedded ? styles.formContainerEmbedded : ''}`}>
            <h3 className={styles.heading3}>Modeling Categories *</h3>
            <div className={styles.buttonGrid}>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`${styles.categoryButton} ${
                    selectedCategories.includes(category) ? styles.active : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Experience & Background */}
          <div className={`${styles.formContainer} ${embedded ? styles.formContainerEmbedded : ''}`}>
            <h3 className={styles.heading3}>Experience & Background</h3>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Tell us about your modeling experience, training, and any notable work..."
              className={styles.textArea}
              rows="6"
            />
          </div>

          {/* Portfolio Photos */}
          <div className={styles.formContainer}>
            <h3 className={styles.heading3}>Portfolio Photos *</h3>
            <label className={styles.uploadBox}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className={styles.hiddenFileInput}
                required
              />
              <svg className={styles.uploadIcon} viewBox="0 0 48 48" fill="none">
                <path d="M24 8v24M24 8l-8 8M24 8l8 8M8 32v8h32v-8" stroke="#5DCDDB" strokeWidth="4"/>
              </svg>
              <p className={styles.uploadTitle}>Upload Your Portfolio</p>
              <p className={styles.uploadSubtext}>
                Drag and drop or click to upload (Max 10 images, 5MB each)
              </p>
              {uploadedFiles.length > 0 && (
                <p className={styles.uploadedCount}>
                  {uploadedFiles.length} file(s) selected
                </p>
              )}
            </label>
          </div>

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

          {/* Languages Spoken */}
          <div className={styles.formContainer}>
            <h3 className={styles.heading3}>Languages Spoken *</h3>
            <div className={styles.buttonGrid}>
              {languages.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => toggleLanguage(language)}
                  className={`${styles.categoryButton} ${
                    selectedLanguages.includes(language) ? styles.active : ''
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles.submitContainer}>
            <button type="submit" className={styles.submitButton} disabled={loading} aria-busy={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
