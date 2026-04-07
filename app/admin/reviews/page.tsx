'use client';

import dynamic from 'next/dynamic';

const ReviewView = dynamic(() => import('../../components/admin/ReviewView'), { ssr: false });

export default function ReviewModeratorPage() {
  return <ReviewView />;
}
