'use client';

import dynamic from 'next/dynamic';

const ProjectView = dynamic(() => import('../../components/admin/ProjectView'), { ssr: false });

export default function ProjectManagerPage() {
  return <ProjectView />;
}
