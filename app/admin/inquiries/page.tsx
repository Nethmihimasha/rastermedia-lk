import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import type { CSSProperties } from 'react';
import dbConnect from '../../../src/lib/mongodb';
import Inquiry from '../../../src/models/Inquiry';
import Link from 'next/link';

export default async function InquiryInbox() {
  const session = await getServerSession();

  if (!session) {
    redirect('/admin/login');
  }

  await dbConnect();
  const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Link href="/admin" style={styles.backLink}>← Dashboard</Link>
          <h1 style={styles.title}>Inquiry Inbox</h1>
        </div>
      </header>

      <div style={styles.stats}>
        <div style={styles.statItem}>
          <span style={styles.statVal}>{inquiries.length}</span>
          <span style={styles.statLabel}>Total</span>
        </div>
        <div style={styles.statItem}>
          <span style={{...styles.statVal, color: '#ffcc00'}}>{inquiries.filter(i => i.status === 'pending').length}</span>
          <span style={styles.statLabel}>Pending</span>
        </div>
      </div>

      <div style={styles.list}>
        {inquiries.map((inquiry) => (
          <div key={inquiry._id.toString()} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <span style={styles.badge}>{inquiry.type.toUpperCase()}</span>
                <h3 style={styles.senderName}>{inquiry.name}</h3>
                <span style={styles.email}>{inquiry.email} {inquiry.whatsapp && ` | WA: ${inquiry.whatsapp}`}</span>
              </div>
              <div style={styles.timestamp}>
                {new Date(inquiry.createdAt).toLocaleString()}
              </div>
            </div>
            <p style={styles.messageText}>{inquiry.message}</p>
            <div style={styles.cardFooter}>
              <span style={inquiry.status === 'pending' ? styles.pending : styles.reviewed}>
                {inquiry.status === 'pending' ? '● New' : '✓ Reviewed'}
              </span>
              <div style={styles.actions}>
                <button style={styles.btnReview}>Mark as Reviewed</button>
                <button style={styles.btnDelete}>Delete</button>
              </div>
            </div>
          </div>
        ))}
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
};
