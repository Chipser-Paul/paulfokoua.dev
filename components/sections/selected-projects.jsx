import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { loadFeaturedProjects } from '@/lib/loaders/projects'
import { ProjectCard } from '@/components/cards/project-card'

export function SelectedProjects() {
  const projects = loadFeaturedProjects(4)

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">Selected work</h2>
          <p className="text-sm text-text-secondary max-w-lg">
            Backend, full-stack, AI, e-commerce, and platform projects built with practical engineering discipline.
          </p>
        </div>
        <Link
          href="/projects"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          View all projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          View all projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
