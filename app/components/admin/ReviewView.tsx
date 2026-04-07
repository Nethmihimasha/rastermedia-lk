'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';
import Link from 'next/link';

export default function ReviewView() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
    if (status === 'authenticated') {
      fetchReviews();
    }
  }, [status, router]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reviews?all=true');
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleVerify = async (id: string, currentVerified: boolean) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, verified: !currentVerified })
      });
      if (res.ok) {
        setReviews(prev => prev.map(r => r._id === id ? { ...r, verified: !currentVerified } : r));
      }
    } catch (err) {
      alert('Failed to update review status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReviews(prev => prev.filter(r => r._id !== id));
      }
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (status === 'loading' || loading) return <div style={styles.container}>Loading Review Moderator...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Link href="/admin" style={styles.backLink}>← Dashboard</Link>
          <h1 style={styles.title}>Review Moderator</h1>
        </div>
      </header>

      <div style={styles.stats}>
        <div style={styles.statItem}>
          <span style={styles.statVal}>{reviews.length}</span>
          <span style={styles.statLabel}>Total Reviews</span>
        </div>
        <div style={styles.statItem}>
          <span style={{...styles.statVal, color: '#ffcc00'}}>{reviews.filter(r => !r.verified).length}</span>
          <span style={styles.statLabel}>Pending Approval</span>
        </div>
      </div>

      <div style={styles.list}>
        {reviews.length === 0 ? (
          <p style={styles.empty}>No reviews found.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.reviewerName}>{review.name}</h3>
                  <span style={styles.email}>{review.email}</span>
                </div>
                <div style={styles.stars}>
                  {'★'.repeat(review.rating || 5)}
                </div>
              </div>
              <p style={styles.reviewText}>{review.text}</p>
              <div style={styles.cardFooter}>
                <span style={review.verified ? styles.verified : styles.pending}>
                  {review.verified ? '✓ Verified' : '● Pending Approval'}
                </span>
                <div style={styles.actions}>
                  <button 
                    style={review.verified ? styles.btnRevoke : styles.btnApprove} 
                    onClick={() => toggleVerify(review._id, !!review.verified)}
                  >
                    {review.verified ? 'Revoke' : 'Approve'}
                  </button>
                  <button style={styles.btnDelete} onClick={() => handleDelete(review._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: { minHeight: '100vh', backgroundColor: '#0A0A0A', color: '#FFF', padding: '40px' },
  header: { marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '20px' },
  backLink: { color: '#5DCDDB', textDecoration: 'none', fontSize: '14px' },
  title: { fontSize: '24px', fontFamily: 'Erbaum, sans-serif' },
  stats: { display: 'flex', gap: '40px', marginBottom: '40px' },
  statItem: { display: 'flex', flexDirection: 'column' },
  statVal: { fontSize: '32px', fontWeight: 700, color: '#5DCDDB' },
  statLabel: { fontSize: '12px', color: '#888', textTransform: 'uppercase' },
  list: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '8px' },
  reviewerName: { fontSize: '18px', color: '#FFFFFF', margin: 0 },
  email: { fontSize: '12px', color: '#6B6B6B' },
  stars: { color: '#ffcc00' },
  reviewText: { fontSize: '14px', lineHeight: '1.6', color: '#A0A0A0', marginBottom: '20px' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  verified: { color: '#5DCDDB', fontSize: '12px', fontWeight: 600 },
  pending: { color: '#ffcc00', fontSize: '12px', fontWeight: 600 },
  actions: { display: 'flex', gap: '12px' },
  btnApprove: { background: '#5DCDDB', border: 'none', padding: '6px 12px', borderRadius: '4px', color: '#000', cursor: 'pointer', fontSize: '12px', fontWeight: 600 },
  btnRevoke: { background: 'transparent', border: '1px solid #ff4d4d', padding: '6px 12px', borderRadius: '4px', color: '#ff4d4d', cursor: 'pointer', fontSize: '12px', fontWeight: 600 },
  btnDelete: { background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', padding: '6px 12px', borderRadius: '4px', color: '#ff4d4d', cursor: 'pointer', fontSize: '12px', fontWeight: 600 },
  empty: { textAlign: 'center', color: '#666', marginTop: '40px' },
};
