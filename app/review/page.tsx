'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { reviews } from '../../src/data/reviews';
import { 
  useScrollAnimation, 
  scrollAnimationVariants, 
  staggerContainerVariants, 
  staggerItemVariants 
} from '../hooks/useScrollAnimation';

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, rating });
    alert('Thank you for your review! We appreciate your feedback.');
  };

  const recentReviews = reviews;

  const ratingDistribution = [
    { stars: 5, count: 435, percentage: 87 },
    { stars: 4, count: 50, percentage: 10 },
    { stars: 3, count: 10, percentage: 2 },
    { stars: 2, count: 5, percentage: 1 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  const { ref: mainRef, isInView: mainInView } = useScrollAnimation();
  const { ref: recentRef, isInView: recentInView } = useScrollAnimation();

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            SHARE YOUR
            <br />
            <span style={styles.gradientText}>EXPERIENCE.</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Join 500+ happy clients who&apos;ve shared their success stories. Your feedback shapes our future.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={styles.mainSection} ref={mainRef}>
        <motion.div
          style={styles.container}
          initial="hidden"
          animate={mainInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.div style={styles.contentGrid} variants={staggerItemVariants}>
            {/* Left Column - Review Form */}
            <motion.div style={styles.formColumn} variants={staggerItemVariants} className="review-form-col">
              <div style={styles.formCard}>
                <div style={styles.formHeader}>
                  <h2 style={styles.formTitle}>Leave Your Review</h2>
                  <p style={styles.formSubtitle}>Share your experience with us</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>How was your experience?</label>
                    <div style={styles.starRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-button ${(star <= (hoveredRating || rating)) ? 'active' : ''}`}
                          style={{
                            ...styles.star,
                            ...(star <= (hoveredRating || rating) ? styles.starActive : {})
                          }}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <div style={styles.ratingText}>
                        {rating === 5 && "Excellent!"}
                        {rating === 4 && "Great!"}
                        {rating === 3 && "Good"}
                        {rating === 2 && "Fair"}
                        {rating === 1 && "Poor"}
                      </div>
                    )}
                  </div>

                  <div style={styles.formRow} className="review-form-row">
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Your Name *</label>
                      <input
                        type="text"
                        style={styles.input}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="review-input"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Email Address *</label>
                      <input
                        type="email"
                        style={styles.input}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="review-input"
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Your Review *</label>
                    <textarea
                      style={styles.textarea}
                      placeholder="Tell us about your experience working with us..."
                      rows={5}
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      required
                      className="review-input"
                    ></textarea>
                    <div style={styles.charCount}>
                      {formData.review.length} characters {formData.review.length >= 50 && "✓"}
                    </div>
                  </div>

                  <button type="submit" style={styles.submitButton} className="review-submit-btn">
                    <span>Submit Review</span>
                    <span style={styles.buttonIcon} className="btn-icon">→</span>
                  </button>

                  <p style={styles.formNote}>
                    Your review will be visible on our website after approval
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Right Column - Stats & Info */}
            <motion.div style={styles.infoColumn} variants={staggerItemVariants}>
              <div style={styles.infoCard}>
                <h3 style={styles.infoCardTitle}>Rating Distribution</h3>
                <div style={styles.distributionList}>
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} style={styles.distributionItem}>
                      <span style={styles.distributionStars}>{item.stars} ★</span>
                      <div style={styles.distributionBar}>
                        <div 
                          style={{ ...styles.distributionFill, width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span style={styles.distributionCount}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.infoCard}>
                <h3 style={styles.infoCardTitle}>Why Your Review Matters</h3>
                <div style={styles.benefitsList}>
                  <div style={styles.benefitItem}>
                    <div style={styles.benefitContent}>
                      <h4 style={styles.benefitTitle}>Help Others Decide</h4>
                      <p style={styles.benefitText}>Your honest feedback helps future clients make informed decisions</p>
                    </div>
                  </div>
                  <div style={styles.benefitItem}>
                    <div style={styles.benefitContent}>
                      <h4 style={styles.benefitTitle}>Get Featured</h4>
                      <p style={styles.benefitText}>Outstanding reviews get featured on our homepage and social media</p>
                    </div>
                  </div>
                  <div style={styles.benefitItem}>
                    <div style={styles.benefitContent}>
                      <h4 style={styles.benefitTitle}>Shape Our Future</h4>
                      <p style={styles.benefitText}>Your insights help us improve and deliver even better results</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Recent Reviews */}
      <section style={styles.recentSection} ref={recentRef}>
        <motion.div
          style={styles.container}
          initial="hidden"
          animate={recentInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Recent <span style={styles.gradientText}>Reviews</span>
            </h2>
            <p style={styles.sectionSubtitle}>
              See what our amazing clients are saying about their experience
            </p>
          </div>
          <motion.div style={styles.reviewsGrid} variants={staggerContainerVariants} className="reviews-grid">
            {recentReviews.map((review, index) => (
              <motion.div key={index} style={styles.reviewCard} variants={staggerItemVariants} className="review-card-hover">
                <div style={styles.reviewHeader}>
                  <div style={styles.reviewAvatar}>{(review.author || '').split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                  <div style={styles.reviewInfo}>
                    <div style={styles.reviewAuthor}>{review.author}</div>
                    <div style={styles.reviewTime}>{review.time}</div>
                  </div>
                </div>
                <div style={styles.reviewStars}>
                  {'★'.repeat(review.rating)}
                </div>
                <p style={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <style>{`
        .star-button { transition: all 0.2s ease; line-height: 1; }
        .star-button:hover, .star-button.active { color: #5DCDDB !important; transform: scale(1.2) rotate(10deg); filter: drop-shadow(0 0 12px rgba(93, 205, 219, 0.8)); }
        
        .review-input:focus { border-color: #5DCDDB !important; box-shadow: 0 0 0 4px rgba(93, 205, 219, 0.15); transform: translateY(-2px); }
        
        .review-submit-btn { position: relative; overflow: hidden; }
        .review-submit-btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); transition: left 0.6s ease; }
        .review-submit-btn:hover::before { left: 100%; }
        .review-submit-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 16px 40px rgba(93, 205, 219, 0.4); }
        .review-submit-btn:hover .btn-icon { transform: translateX(6px); }

        .review-card-hover { transition: all 0.3s ease; }
        .review-card-hover:hover { transform: translateY(-5px); border-color: rgba(93, 205, 219, 0.4) !important; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }

        @media (max-width: 1200px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .review-form-row { grid-template-columns: 1fr !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .review-form-col { margin-bottom: 24px; }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: { padding: '140px 0 0', minHeight: '100vh', backgroundColor: '#0F0F0F', position: 'relative' },
  hero: { position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 48px' },
  heroContent: { position: 'relative', zIndex: 3, maxWidth: '900px', textAlign: 'center' },
  heroTitle: { fontFamily: 'Erbaum, Cousine, monospace', fontSize: '51.808px', fontWeight: 700, lineHeight: '60px', letterSpacing: '-0.51808px', marginBottom: '24px', color: '#FFFFFF' },
  gradientText: { background: 'linear-gradient(135deg, #5DCDDB 0%, #7DD8E5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  heroSubtitle: { fontSize: '18px', lineHeight: '28px', color: '#A0A0A0', maxWidth: '600px', margin: '0 auto' },
  mainSection: { padding: '80px 0', position: 'relative', zIndex: 2 },
  container: { maxWidth: '1400px', margin: '0 auto', padding: '0 48px' },
  contentGrid: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'stretch' },
  formColumn: { display: 'flex', flexDirection: 'column' },
  formCard: { padding: '48px', background: 'rgba(20, 20, 20, 0.9)', border: '1px solid rgba(93, 205, 219, 0.15)', flex: '1 1 auto' },
  formHeader: { textAlign: 'center', marginBottom: '40px' },
  formTitle: { fontFamily: 'Erbaum, Cousine, monospace', fontSize: '32px', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' },
  formSubtitle: { fontSize: '14px', color: '#A0A0A0' },
  form: { display: 'flex', flexDirection: 'column', gap: '24px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  label: { fontSize: '14px', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.3px' },
  starRating: { display: 'flex', gap: '12px', justifyContent: 'center', padding: '20px 0' },
  star: { background: 'none', border: 'none', fontSize: '48px', color: '#2A2A2A', cursor: 'pointer', padding: 0 },
  starActive: { color: '#5DCDDB' },
  ratingText: { textAlign: 'center', fontSize: '16px', fontWeight: 600, color: '#5DCDDB', marginTop: '10px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  input: { padding: '14px 16px', background: 'rgba(20, 20, 20, 0.8)', border: '1px solid rgba(93, 205, 219, 0.2)', color: '#FFFFFF', fontSize: '14px', fontFamily: 'Cousine, monospace', transition: 'all 0.3s ease', outline: 'none' },
  textarea: { padding: '14px 16px', background: 'rgba(20, 20, 20, 0.8)', border: '1px solid rgba(93, 205, 219, 0.2)', color: '#FFFFFF', fontSize: '14px', fontFamily: 'Cousine, monospace', resize: 'vertical', minHeight: '120px', transition: 'all 0.3s ease', outline: 'none' },
  charCount: { fontSize: '12px', color: '#6B6B6B', textAlign: 'right', marginTop: '-8px' },
  submitButton: { padding: '18px 36px', background: 'linear-gradient(180deg, #5DCDDB 0%, #7DD8E5 100%)', border: 'none', color: '#FFFFFF', fontSize: '16px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '8px' },
  buttonIcon: { fontSize: '20px', transition: 'transform 0.3s ease' },
  formNote: { fontSize: '12px', color: '#6B6B6B', textAlign: 'center', marginTop: '-8px' },
  infoColumn: { display: 'flex', flexDirection: 'column', gap: '24px' },
  infoCard: { padding: '32px', background: 'rgba(20, 20, 20, 0.9)', border: '1px solid rgba(93, 205, 219, 0.15)' },
  infoCardTitle: { fontFamily: 'Erbaum, Cousine, monospace', fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(93, 205, 219, 0.1)' },
  distributionList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  distributionItem: { display: 'grid', gridTemplateColumns: '50px 1fr 50px', gap: '12px', alignItems: 'center', padding: '8px 0' },
  distributionStars: { fontSize: '14px', color: '#FFFFFF', fontWeight: 600 },
  distributionBar: { height: '10px', background: 'rgba(93, 205, 219, 0.1)', borderRadius: '5px', overflow: 'hidden' },
  distributionFill: { height: '100%', background: 'linear-gradient(90deg, #5DCDDB 0%, #7DD8E5 100%)' },
  distributionCount: { fontSize: '14px', color: '#A0A0A0', textAlign: 'right', fontWeight: 600 },
  benefitsList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  benefitItem: { padding: '16px', background: 'rgba(20, 20, 20, 0.4)', border: '1px solid rgba(93, 205, 219, 0.1)' },
  benefitTitle: { fontSize: '16px', fontWeight: 600, color: '#FFFFFF', marginBottom: '6px' },
  benefitText: { fontSize: '13px', lineHeight: '19px', color: '#A0A0A0' },
  recentSection: { padding: '80px 0 120px', background: '#0F0F0F', position: 'relative', zIndex: 2 },
  sectionHeader: { textAlign: 'center', marginBottom: '64px' },
  sectionTitle: { fontFamily: 'Erbaum, Cousine, monospace', fontSize: '48px', fontWeight: 700, marginBottom: '16px', color: '#FFFFFF' },
  sectionSubtitle: { fontSize: '18px', color: '#A0A0A0', maxWidth: '600px', margin: '0 auto' },
  reviewsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' },
  reviewCard: { padding: '28px', background: 'rgba(37, 37, 37, 0.8)', border: '0.8px solid rgba(93, 205, 219, 0.15)', display: 'flex', flexDirection: 'column', gap: '16px' },
  reviewHeader: { display: 'flex', alignItems: 'center', gap: '12px' },
  reviewAvatar: { width: '48px', height: '48px', background: 'linear-gradient(135deg, rgba(93, 205, 219, 0.3) 0%, rgba(125, 216, 229, 0.3) 100%)', border: '2px solid rgba(93, 205, 219, 0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 600, color: '#FFFFFF', flexShrink: 0 },
  reviewAuthor: { fontSize: '16px', fontWeight: 600, color: '#FFFFFF', marginBottom: '2px' },
  reviewTime: { fontSize: '12px', color: '#6B6B6B' },
  reviewStars: { color: '#5DCDDB', fontSize: '18px', letterSpacing: '2px' },
  reviewText: { fontSize: '14px', lineHeight: '22px', color: '#A0A0A0', flex: 1 },
};
