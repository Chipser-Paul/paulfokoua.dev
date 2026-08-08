import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPublishedProjects } from '@/lib/loaders/projects'
import { ProjectCard } from '@/components/cards/project-card'

export function ProjectsList() {
  const projects = getPublishedProjects()

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col gap-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text">
          Selected Projects
        </h1>
        <p className="text-sm text-text-secondary max-w-xl">
          A selection of projects demonstrating backend systems, developer tools, and full-stack applications.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-text-secondary">No published projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-border">
        <p className="text-sm text-text-secondary">
          Want to see more?{' '}
          <Link href="/resume" className="text-primary hover:text-primary-hover transition-colors">
            View my resume
          </Link>
          {' '}or{' '}
          <Link href="/contact" className="text-primary hover:text-primary-hover transition-colors">
            get in touch
          </Link>
          .
        </p>
      </div>
    </section>
  )
}