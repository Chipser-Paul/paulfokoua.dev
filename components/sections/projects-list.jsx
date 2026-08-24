import Link from 'next/link'
import { ArrowRight, ExternalLink, FolderKanban, Rocket } from 'lucide-react'
import { getPublishedProjects } from '@/lib/loaders/projects'
import { ProjectCard } from '@/components/cards/project-card'

export function ProjectsList() {
  const projects = getPublishedProjects()
  const liveProjects = projects.filter((project) => project.status === 'deployed' && project.liveDemo)
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Project library</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-text md:text-5xl md:leading-tight">
            Shipped work, case studies, and engineering proof.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            A selection of backend, full-stack, AI, e-commerce, platform, and systems projects with live demos, source code, screenshots, architecture notes, and implementation trade-offs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-lg border border-border bg-background p-5 shadow-sm">
            <Rocket className="mb-4 h-5 w-5 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Live deployments</p>
            <p className="mt-2 text-2xl font-semibold text-text">{liveProjects.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-5 shadow-sm">
            <FolderKanban className="mb-4 h-5 w-5 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Featured case studies</p>
            <p className="mt-2 text-2xl font-semibold text-text">{featuredProjects.length}</p>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-text-secondary">No published projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <div className="mt-12 rounded-lg border border-border bg-surface/50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text">Want the short version?</h2>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">
              The resume gives the same evidence in a compact recruiter-readable format.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/resume"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              View resume
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-surface"
            >
              Contact
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
