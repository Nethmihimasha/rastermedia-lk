'use client';

import dynamic from 'next/dynamic';

const AdminDashboardView = dynamic(() => import('../components/admin/AdminDashboardView'), { ssr: false });

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}
