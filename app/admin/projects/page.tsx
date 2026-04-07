'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { CSSProperties } from 'react';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'Commercial',
    image: '',
    albumSlug: '',
    featured: true
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', 'raster-media/portfolio');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd
      });
      const data = await res.json();
      setFormData({ ...formData, image: data.url });
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsAdding(false);
        setFormData({ title: '', client: '', category: 'Commercial', image: '', albumSlug: '', featured: true });
        fetchProjects();
      }
    } catch (err) {
      alert('Failed to add project');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <Link href="/admin" style={styles.backLink}>← Dashboard</Link>
          <h1 style={styles.title}>Portfolio Manager</h1>
        </div>
        <button style={styles.btnAdd} onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : '+ Add Project'}
        </button>
      </header>

      {isAdding && (
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={styles.formTitle}>New Project</h2>
          <div style={styles.grid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Project Title</label>
              <input type="text" style={styles.input} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Client Name</label>
              <input type="text" style={styles.input} value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Category</label>
              <select style={styles.select} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="Commercial">Commercial</option>
                <option value="Editorial">Editorial</option>
                <option value="Fashion">Fashion</option>
                <option value="Branding">Branding</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Project Image</label>
              <input type="file" onChange={handleFileUpload} disabled={uploading} />
              {formData.image && <p style={styles.uploadSuccess}>✓ Image uploaded</p>}
              {uploading && <p style={styles.uploading}>Uploading...</p>}
            </div>
          </div>
          <button type="submit" style={styles.btnSubmit} disabled={uploading}>Save Project</button>
        </form>
      )}

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Client</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Featured</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p: any) => (
                <tr key={p._id} style={styles.tr}>
                  <td style={styles.td}><img src={p.image} style={styles.thumb} alt="" /></td>
                  <td style={styles.td}>{p.title}</td>
                  <td style={styles.td}>{p.client}</td>
                  <td style={styles.td}>{p.category}</td>
                  <td style={styles.td}>{p.featured ? 'Yes' : 'No'}</td>
                  <td style={styles.td}>
                    <button style={styles.btnDelete}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: { minHeight: '100vh', backgroundColor: '#0A0A0A', color: '#FFF', padding: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '20px' },
  backLink: { color: '#5DCDDB', textDecoration: 'none', fontSize: '14px' },
  title: { fontSize: '24px', fontFamily: 'Erbaum, sans-serif' },
  btnAdd: { background: '#5DCDDB', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 },
  form: { background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '8px', marginBottom: '40px', border: '1px solid rgba(93, 205, 219, 0.2)' },
  formTitle: { fontSize: '18px', marginBottom: '24px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '12px', color: '#888' },
  input: { background: '#222', border: '1px solid #333', padding: '10px', borderRadius: '4px', color: '#fff' },
  select: { background: '#222', border: '1px solid #333', padding: '10px', borderRadius: '4px', color: '#fff' },
  btnSubmit: { background: '#5DCDDB', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, marginTop: '24px' },
  uploadSuccess: { fontSize: '12px', color: '#5DCDDB' },
  uploading: { fontSize: '12px', color: '#ffcc00' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px', borderBottom: '1px solid #333', color: '#888', textTransform: 'uppercase', fontSize: '12px' },
  tr: { borderBottom: '1px solid #222' },
  td: { padding: '12px', fontSize: '14px' },
  thumb: { width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px' },
  btnDelete: { background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }
};
