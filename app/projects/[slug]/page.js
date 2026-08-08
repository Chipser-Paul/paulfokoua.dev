import { notFound } from 'next/navigation'
import { getProjectBySlug, getPublishedProjects } from '@/lib/loaders/projects'
import { ProjectDetail } from '@/components/sections/project-detail'

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: 'Project not found — FOKOUA PAUL EMMANUEL',
    }
  }

  return {
    title: `${project.title} — FOKOUA PAUL EMMANUEL`,
    description: project.shortDescription,
  }
}

export default function ProjectPage({ params }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}