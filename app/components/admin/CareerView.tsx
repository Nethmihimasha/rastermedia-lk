'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';
import Link from 'next/link';

export default function CareerView() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobApps, setJobApps] = useState<any[]>([]);
  const [modelApps, setModelApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jRes, mRes] = await Promise.all([
        fetch('/api/career'),
        fetch('/api/model')
      ]);
      const [jData, mData] = await Promise.all([jRes.json(), mRes.json()]);
      setJobApps(Array.isArray(jData) ? jData : []);
      setModelApps(Array.isArray(mData) ? mData : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (type: 'job' | 'model', id: string, newStatus: string) => {
    const url = type === 'job' ? '/api/career' : '/api/model';
    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        if (type === 'job') {
          setJobApps(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
        } else {
          setModelApps(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
        }
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (type: 'job' | 'model', id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    const url = type === 'job' ? `/api/career?id=${id}` : `/api/model?id=${id}`;
    try {
      const res = await fetch(url, { method: 'DELETE' });
      if (res.ok) {
        if (type === 'job') {
          setJobApps(prev => prev.filter(a => a._id !== id));
        } else {
          setModelApps(prev => prev.filter(a => a._id !== id));
        }
      }
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (status === 'loading' || loading) return <div style={styles.container}>Loading Career Center...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Link href="/admin" style={styles.backLink}>← Dashboard</Link>
          <h1 style={styles.title}>Career Center</h1>
        </div>
      </header>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Model Registrations ({modelApps.length})</h2>
        <div style={styles.grid}>
          {modelApps.map((model) => (
            <div key={model._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.name}>{model.fullName}</h3>
                <span style={styles.email}>{model.email}</span>
              </div>
              <div style={styles.details}>
                <span>Age: {model.age}</span> | <span>Height: {model.height}</span>
                <br />
                <a href={`https://instagram.com/${model.instagramHandle?.replace('@', '')}`} target="_blank" style={styles.link}>
                  {model.instagramHandle}
                </a>
              </div>
              <div style={styles.photoGrid}>
                {model.photos?.slice(0, 4).map((p: string, i: number) => (
                  <img key={i} src={p} style={styles.thumb} alt="Model photo" />
                ))}
              </div>
              <div style={styles.cardFooter}>
                <span style={{...styles.badge, color: model.status === 'contacted' ? '#5DCDDB' : '#ffcc00'}}>
                  {model.status || 'pending'}
                </span>
                <div style={styles.actions}>
                  <button style={styles.btnAction} onClick={() => updateStatus('model', model._id, 'contacted')}>Contacted</button>
                  <button style={styles.btnDeleteSm} onClick={() => handleDelete('model', model._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Job Applications ({jobApps.length})</h2>
        <div style={styles.list}>
          {jobApps.map((job) => (
            <div key={job._id} style={styles.jobRow}>
              <div>
                <h4 style={styles.jobName}>{job.fullName}</h4>
                <span style={styles.position}>{job.position}</span>
              </div>
              <div style={styles.jobActions}>
                <a href={job.cvUrl} target="_blank" style={styles.btnCV}>View CV</a>
                <span style={{...styles.badge, marginRight: '20px', color: job.status === 'contacted' ? '#5DCDDB' : '#ffcc00'}}>
                   {job.status || 'pending'}
                </span>
                <button style={{...styles.btnAction, marginRight: '10px'}} onClick={() => updateStatus('job', job._id, 'contacted')}>Mark Contacted</button>
                <button style={styles.btnDeleteSm} onClick={() => handleDelete('job', job._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
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
  section: { marginBottom: '60px' },
  sectionTitle: { fontSize: '20px', color: '#5DCDDB', marginBottom: '24px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  card: { background: '#1A1A1A', padding: '20px', borderRadius: '8px', border: '1px solid #333' },
  cardHeader: { marginBottom: '12px' },
  name: { fontSize: '18px', margin: 0 },
  email: { fontSize: '12px', color: '#666' },
  details: { fontSize: '13px', color: '#A0A0A0', marginBottom: '12px' },
  link: { color: '#5DCDDB', textDecoration: 'none' },
  photoGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' },
  thumb: { width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '4px' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
  badge: { fontSize: '10px', textTransform: 'uppercase', fontWeight: 700 },
  actions: { display: 'flex', gap: '8px' },
  btnAction: { background: 'transparent', border: '1px solid #5DCDDB', color: '#5DCDDB', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' },
  btnDeleteSm: { background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  jobRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1A1A1A', padding: '16px', borderRadius: '8px', border: '1px solid #333' },
  jobName: { fontSize: '16px', margin: 0 },
  position: { fontSize: '12px', color: '#5DCDDB' },
  jobActions: { display: 'flex', gap: '12px', alignItems: 'center' },
  btnCV: { color: '#5DCDDB', fontSize: '13px', textDecoration: 'none', fontWeight: 600, marginRight: '10px' },
};
