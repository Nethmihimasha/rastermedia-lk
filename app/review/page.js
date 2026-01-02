'use client';

import { useState } from 'react';
import styles from './review.module.css';
import { reviews } from '../../src/data/reviews';

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: ''
  });
  
  const handleSubmit = (e) => {
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

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            SHARE YOUR
            <br />
            <span className={styles.gradientText}>EXPERIENCE.</span>
          </h1>
          
          <p className={styles.heroSubtitle}>
            Join 500+ happy clients who&apos;ve shared their success stories. Your feedback shapes our future.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.contentGrid}>
            
            {/* Left Column - Review Form */}
            <div className={styles.formColumn}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Leave Your Review</h2>
                  <p className={styles.formSubtitle}>Share your experience with us</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>How was your experience?</label>
                    <div className={styles.starRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`${styles.star} ${
                            star <= (hoveredRating || rating) ? styles.starActive : ''
                          }`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <div className={styles.ratingText}>
                        {rating === 5 && "Excellent!"}
                        {rating === 4 && "Great!"}
                        {rating === 3 && "Good"}
                        {rating === 2 && "Fair"}
                        {rating === 1 && "Poor"}
                      </div>
                    )}
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Your Name *</label>
                      <input
                        type="text"
                        className={styles.input}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Email Address *</label>
                      <input
                        type="email"
                        className={styles.input}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Your Review *</label>
                    <textarea
                      className={styles.textarea}
                      placeholder="Tell us about your experience working with us..."
                      rows="5"
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                      required
                    ></textarea>
                    <div className={styles.charCount}>
                      {formData.review.length} characters {formData.review.length >= 50 && "✓"}
                    </div>
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    <span>Submit Review</span>
                    <span className={styles.buttonIcon}>→</span>
                  </button>

                  <p className={styles.formNote}>
                    Your review will be visible on our website after approval
                  </p>
                </form>
              </div>
            </div>

            {/* Right Column - Stats & Info */}
            <div className={styles.infoColumn}>
              
              {/* Rating Distribution */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>
                  Rating Distribution
                </h3>
                <div className={styles.distributionList}>
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className={styles.distributionItem}>
                      <span className={styles.distributionStars}>{item.stars} ★</span>
                      <div className={styles.distributionBar}>
                        <div 
                          className={styles.distributionFill}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className={styles.distributionCount}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Your Review Matters */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>
                  Why Your Review Matters
                </h3>
                <div className={styles.benefitsList}>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitContent}>
                      <h4 className={styles.benefitTitle}>Help Others Decide</h4>
                      <p className={styles.benefitText}>Your honest feedback helps future clients make informed decisions</p>
                    </div>
                  </div>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitContent}>
                      <h4 className={styles.benefitTitle}>Get Featured</h4>
                      <p className={styles.benefitText}>Outstanding reviews get featured on our homepage and social media</p>
                    </div>
                  </div>
                  <div className={styles.benefitItem}>
                    <div className={styles.benefitContent}>
                      <h4 className={styles.benefitTitle}>Shape Our Future</h4>
                      <p className={styles.benefitText}>Your insights help us improve and deliver even better results</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className={styles.recentSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Recent <span className={styles.gradientText}>Reviews</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              See what our amazing clients are saying about their experience
            </p>
          </div>
          <div className={styles.reviewsGrid}>
            {recentReviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewAvatar}>{(review.author || '').split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                  <div className={styles.reviewInfo}>
                    <div className={styles.reviewAuthor}>{review.author}</div>
                    <div className={styles.reviewTime}>{review.time}</div>
                  </div>
                </div>
                <div className={styles.reviewStars}>
                  {'★'.repeat(review.rating)}
                </div>
                <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}