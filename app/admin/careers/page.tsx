'use client';

import dynamic from 'next/dynamic';

const CareerView = dynamic(() => import('../../components/admin/CareerView'), { ssr: false });

export default function CareerCenterPage() {
  return <CareerView />;
}
