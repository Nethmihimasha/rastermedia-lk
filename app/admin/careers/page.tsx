import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import type { CSSProperties } from 'react';
import dbConnect from '../../../src/lib/mongodb';
import CareerApplication from '../../../src/models/CareerApplication';
import ModelApplication from '../../../src/models/ModelApplication';
import Link from 'next/link';

export default async function CareerCenter() {
  const session = await getServerSession();

  if (!session) {
    redirect('/admin/login');
  }

  await dbConnect();
  const [jobApps, modelApps] = await Promise.all([
    CareerApplication.find({}).sort({ createdAt: -1 }),
    ModelApplication.find({}).sort({ createdAt: -1 })
  ]);

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
            <div key={model._id.toString()} style={styles.card}>
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
                <span style={styles.badge}>{model.status}</span>
                <button style={styles.btnView}>Full Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Job Applications ({jobApps.length})</h2>
        <div style={styles.list}>
          {jobApps.map((job) => (
            <div key={job._id.toString()} style={styles.jobRow}>
              <div>
                <h4 style={styles.jobName}>{job.fullName}</h4>
                <span style={styles.position}>{job.position}</span>
              </div>
              <div style={styles.jobActions}>
                <a href={job.cvUrl} target="_blank" style={styles.btnCV}>View CV</a>
                <span style={styles.badge}>{job.status}</span>
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
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  badge: { fontSize: '10px', color: '#ffcc00', textTransform: 'uppercase' },
  btnView: { background: 'transparent', border: '1px solid #5DCDDB', color: '#5DCDDB', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  jobRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1A1A1A', padding: '16px', borderRadius: '8px', border: '1px solid #333' },
  jobName: { fontSize: '16px', margin: 0 },
  position: { fontSize: '12px', color: '#5DCDDB' },
  jobActions: { display: 'flex', gap: '20px', alignItems: 'center' },
  btnCV: { color: '#5DCDDB', fontSize: '13px', textDecoration: 'none', fontWeight: 600 },
};
