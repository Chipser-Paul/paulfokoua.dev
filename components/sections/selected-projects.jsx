import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { loadFeaturedProjects } from '@/lib/loaders/projects'
import { ProjectCard } from '@/components/cards/project-card'

export function SelectedProjects() {
  const projects = loadFeaturedProjects(4)

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Selected case studies</span>
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">Projects recruiters can verify</h2>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="max-w-2xl text-sm leading-relaxed text-text-secondary md:text-right">
            Live projects with real interfaces, backend decisions, authentication, databases, tests, deployment work, and product constraints.
          </p>
          <Link
            href="/projects"
            className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover sm:inline-flex"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          View all projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
