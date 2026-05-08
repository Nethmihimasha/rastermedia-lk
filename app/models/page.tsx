'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';
import Link from 'next/link';

type ModelApp = {
  _id: string;
  fullName: string;
  email: string;
  age?: number;
  height?: number;
  instagramHandle?: string;
  photos?: string[];
  categories?: string[];
  status?: string;
};

export default function ModelsAdminPage() {
  const { status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [modelApps, setModelApps] = useState<ModelApp[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }

    if (status === 'authenticated') {
      void fetchModelApps();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchModelApps = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/model');
      const data = await res.json();
      setModelApps(Array.isArray(data) ? data : []);
    } catch {
      setModelApps([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/model', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) return;
      setModelApps((prev) => prev.map((m) => (m._id === id ? { ...m, status: newStatus } : m)));
    } catch {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    try {
      const res = await fetch(`/api/model?id=${id}`, { method: 'DELETE' });
      if (!res.ok) return;
      setModelApps((prev) => prev.filter((m) => m._id !== id));
    } catch {
      alert('Failed to delete');
    }
  };

  if (status === 'loading' || loading) return <div style={styles.container}>Loading Models...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Link href="/admin" style={styles.backLink}>
            ← Dashboard
          </Link>
          <h1 style={styles.title}>Models</h1>
        </div>

        <div style={styles.actionsRight}>
          <Link href="/models/leave-a-review" style={styles.subLink}>
            Leave a review
          </Link>
        </div>
      </header>

      <div style={styles.grid}>
        {modelApps.length === 0 ? (
          <div style={{ color: '#A0A0A0' }}>No model registrations yet.</div>
        ) : (
          modelApps.map((model) => (
            <div key={model._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <div style={styles.name}>{model.fullName}</div>
                  <div style={styles.email}>{model.email}</div>
                </div>
                <span
                  style={{
                    ...styles.badge,
                    color:
                      model.status === 'accepted'
                        ? '#5DCDDB'
                        : model.status === 'rejected'
                          ? '#ff4d4d'
                          : '#ffcc00',
                  }}
                >
                  {model.status || 'pending'}
                </span>
              </div>

              <div style={styles.details}>
                {typeof model.age === 'number' && <span>Age: {model.age}</span>}
                {typeof model.height === 'number' && <span>Height: {model.height}</span>}
                {model.instagramHandle && (
                  <a
                    href={`https://instagram.com/${model.instagramHandle.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.link}
                  >
                    {model.instagramHandle}
                  </a>
                )}
              </div>

              <div style={styles.photoGrid}>
                {(model.photos || []).slice(0, 4).map((p, i) => (
                  <img key={i} src={p} style={styles.thumb} alt="Model photo" />
                ))}
              </div>

              <div style={styles.footer}>
                <div style={styles.actions}>
                  {model.status === 'pending' && (
                    <>
                      <button style={styles.btnAction} onClick={() => updateStatus(model._id, 'accepted')}>
                        Accept
                      </button>
                      <button style={styles.btnReject} onClick={() => updateStatus(model._id, 'rejected')}>
                        Reject
                      </button>
                    </>
                  )}
                </div>
                <button style={styles.btnDeleteSm} onClick={() => handleDelete(model._id)}>
                  Delete
                </button>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    gap: '20px',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '20px' },
  backLink: { color: '#5DCDDB', textDecoration: 'none', fontSize: '14px' },
  title: { fontSize: '24px', fontFamily: 'Erbaum, sans-serif' },
  actionsRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  subLink: { color: '#5DCDDB', textDecoration: 'none', fontSize: '14px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' },
  card: { background: '#1A1A1A', padding: '20px', borderRadius: '8px', border: '1px solid #333' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' },
  name: { fontSize: '16px', fontWeight: 700 },
  email: { fontSize: '12px', color: '#666' },
  badge: { fontSize: '10px', textTransform: 'uppercase', fontWeight: 700 },
  details: { display: 'flex', flexDirection: 'column', gap: '6px', color: '#A0A0A0', fontSize: '13px', marginTop: '10px' },
  link: { color: '#5DCDDB', textDecoration: 'none' },
  photoGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '14px' },
  thumb: { width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '4px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', gap: '12px' },
  actions: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  btnAction: {
    background: 'transparent',
    border: '1px solid #5DCDDB',
    color: '#5DCDDB',
    padding: '6px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: 600,
  },
  btnReject: {
    background: 'transparent',
    border: '1px solid #ff4d4d',
    color: '#ff4d4d',
    padding: '6px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: 600,
  },
  btnDeleteSm: { background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '6px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' },
};

