'use client';

import dynamic from 'next/dynamic';

const InquiryView = dynamic(() => import('../../components/admin/InquiryView'), { ssr: false });

export default function InquiryInboxPage() {
  return <InquiryView />;
}
