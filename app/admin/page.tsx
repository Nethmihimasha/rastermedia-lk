import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import dbConnect from '../../src/lib/mongodb';
import Project from '../../src/models/Project';
import Review from '../../src/models/Review';
import Inquiry from '../../src/models/Inquiry';
import CareerApplication from '../../src/models/CareerApplication';
import ModelApplication from '../../src/models/ModelApplication';

export default async function AdminDashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect('/admin/login');
  }

  await dbConnect();
  
  const [
    projectCount,
    pendingReviews,
    newInquiries,
    careerApps,
    modelApps
  ] = await Promise.all([
    Project.countDocuments(),
    Review.countDocuments({ verified: false }),
    Inquiry.countDocuments({ status: 'pending' }),
    CareerApplication.countDocuments({ status: 'pending' }),
    ModelApplication.countDocuments({ status: 'pending' })
  ]);

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1 style={styles.title}>Raster Media Admin</h1>
        <div style={styles.user}>
          <span>Welcome, {session.user?.name}</span>
          <Link href="/api/auth/signout" style={styles.logout}>Logout</Link>
        </div>
      </header>
      
      <main style={styles.grid}>
        <DashboardCard 
          title="Portfolio Manager" 
          description="Add, edit, or remove featured projects." 
          count={`${projectCount} Projects`}
          link="/admin/projects"
        />
        <DashboardCard 
          title="Review Moderator" 
          description="Verify pending customer reviews." 
          count={`${pendingReviews} Pending`}
          link="/admin/reviews"
        />
        <DashboardCard 
          title="Inquiry Inbox" 
          description="View bookings and contact messages." 
          count={`${newInquiries} New`}
          link="/admin/inquiries"
        />
        <DashboardCard 
          title="Career Center" 
          description="Manage job and model applications." 
          count={`${careerApps + modelApps} New`}
          link="/admin/careers"
        />
      </main>
    </div>
  );
}

function DashboardCard({ title, description, count, link }: { title: string; description: string; count: string; link: string }) {
  return (
    <Link href={link} style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <p style={styles.cardDesc}>{description}</p>
      <div style={styles.cardFooter}>
        <span style={styles.badge}>{count}</span>
        <span style={styles.arrow}>→</span>
      </div>
    </Link>
  );
}

const styles: Record<string, CSSProperties> = {
  dashboard: {
    minHeight: '100vh',
    backgroundColor: '#0A0A0A',
    color: '#FFF',
    padding: '40px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '60px',
    borderBottom: '1px solid rgba(93, 205, 219, 0.1)',
    paddingBottom: '20px',
  },
  title: {
    fontFamily: 'Erbaum, sans-serif',
    fontSize: '28px',
    color: '#5DCDDB',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    fontSize: '14px',
    color: '#A0A0A0',
  },
  logout: {
    color: '#ff4d4d',
    textDecoration: 'none',
    border: '1px solid #ff4d4d',
    padding: '6px 12px',
    borderRadius: '4px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(93, 205, 219, 0.1)',
    padding: '24px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: '20px',
    marginBottom: '12px',
    color: '#FFFFFF',
  },
  cardDesc: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(93, 205, 219, 0.1)',
    color: '#5DCDDB',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 600,
  },
  arrow: {
    fontSize: '20px',
    color: '#5DCDDB',
  },
};
