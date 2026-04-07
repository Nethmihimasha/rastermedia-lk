'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { CSSProperties } from 'react';
import Link from 'next/link';

export default function InquiryView() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
    if (status === 'authenticated') {
      fetchInquiries();
    }
  }, [status, filter, router]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries' + (filter ? `?type=${filter}` : ''));
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(i => i._id === id ? { ...i, status: newStatus } : i));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(i => i._id !== id));
      }
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (status === 'loading' || loading) return <div style={styles.container}>Loading Inquiries...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Link href="/admin" style={styles.backLink}>← Dashboard</Link>
          <h1 style={styles.title}>
            {filter === 'booking' ? 'Studio Bookings' : filter === 'contact' ? 'Contact Messages' : 'Inquiry Inbox'}
          </h1>
        </div>
        <div style={styles.filterLinks}>
          <Link href="/admin/inquiries" style={{...styles.filterTab, ...( !filter ? styles.activeTab : {})}}>All</Link>
          <Link href="/admin/inquiries?filter=booking" style={{...styles.filterTab, ...(filter === 'booking' ? styles.activeTab : {})}}>Bookings</Link>
          <Link href="/admin/inquiries?filter=contact" style={{...styles.filterTab, ...(filter === 'contact' ? styles.activeTab : {})}}>Messages</Link>
        </div>
      </header>

      <div style={styles.list}>
        {inquiries.length === 0 ? (
          <p style={styles.empty}>No {filter || 'inquiries'} found.</p>
        ) : (
          inquiries.map((inquiry) => (
            <div key={inquiry._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <span style={{
                    ...styles.badge, 
                    backgroundColor: inquiry.type === 'booking' ? 'rgba(93, 205, 219, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: inquiry.type === 'booking' ? '#5DCDDB' : '#AAA'
                  }}>
                    {inquiry.type?.toUpperCase()}
                  </span>
                  <h3 style={styles.senderName}>{inquiry.name}</h3>
                  <span style={styles.email}>{inquiry.email} {inquiry.whatsapp && ` | WA: ${inquiry.whatsapp}`}</span>
                </div>
                <div style={styles.timestamp}>
                  {new Date(inquiry.createdAt).toLocaleString()}
                </div>
              </div>
              <p style={styles.messageText}>{inquiry.message}</p>
              {inquiry.time && <p style={styles.bookingTime}>🕒 Requested Time: {inquiry.time}</p>}
              <div style={styles.cardFooter}>
                <span style={inquiry.status === 'pending' ? styles.pending : styles.reviewed}>
                  {inquiry.status === 'pending' ? '● New' : '✓ Reviewed'}
                </span>
                <div style={styles.actions}>
                  {inquiry.status === 'pending' && (
                    <button style={styles.btnReview} onClick={() => handleStatusUpdate(inquiry._id, 'reviewed')}>
                      Mark as Reviewed
                    </button>
                  )}
                  <button style={styles.btnDelete} onClick={() => handleDelete(inquiry._id)}>Delete</button>
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
  list: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '8px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'flex-start' },
  badge: { backgroundColor: 'rgba(93, 205, 219, 0.2)', color: '#5DCDDB', fontSize: '10px', padding: '4px 8px', borderRadius: '4px', marginBottom: '8px', display: 'inline-block' },
  senderName: { fontSize: '18px', color: '#FFFFFF', margin: 0 },
  email: { fontSize: '12px', color: '#6B6B6B' },
  timestamp: { fontSize: '12px', color: '#6B6B6B' },
  messageText: { fontSize: '14px', lineHeight: '1.6', color: '#A0A0A0', marginBottom: '20px', whiteSpace: 'pre-wrap' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  reviewed: { color: '#5DCDDB', fontSize: '12px', fontWeight: 600 },
  pending: { color: '#ffcc00', fontSize: '12px', fontWeight: 600 },
  actions: { display: 'flex', gap: '12px' },
  btnReview: { background: '#5DCDDB', border: 'none', padding: '6px 12px', borderRadius: '4px', color: '#000', cursor: 'pointer', fontSize: '12px', fontWeight: 600 },
  btnDelete: { background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', padding: '6px 12px', borderRadius: '4px', color: '#ff4d4d', cursor: 'pointer', fontSize: '12px', fontWeight: 600 },
  filterLinks: { display: 'flex', gap: '10px', marginTop: '20px' },
  filterTab: { color: '#888', textDecoration: 'none', fontSize: '12px', padding: '6px 12px', borderRadius: '20px', border: '1px solid #333', transition: 'all 0.2s' },
  activeTab: { backgroundColor: '#5DCDDB', color: '#000', borderColor: '#5DCDDB' },
  empty: { textAlign: 'center', color: '#666', marginTop: '40px' },
  bookingTime: { fontSize: '13px', color: '#5DCDDB', backgroundColor: 'rgba(93, 205, 219, 0.05)', padding: '8px', borderRadius: '4px', marginBottom: '16px' },
};
