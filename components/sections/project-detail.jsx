import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { getProjectNavigation } from '@/lib/loaders/projects'
import { ProjectImage } from '@/components/ui/project-image'

function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

function formatRange(startDate, endDate) {
  if (!startDate && !endDate) return null
  return `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : 'Present'}`
}

function getImageLabel(image) {
  return image
    .split('/')
    .pop()
    .replace('.png', '')
    .replace(/-/g, ' ')
}

function DetailList({ title, items }) {
  if (!items || items.length === 0) return null

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-text">{title}</h2>
      <ul className="grid grid-cols-1 gap-3">
        {items.map((item, idx) => (
          <li key={idx} className="rounded-lg border border-border bg-background p-4 text-sm leading-relaxed text-text-secondary">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ProjectDetail({ project }) {
  const { previous, next } = getProjectNavigation(project.slug)
  const heroImage = project.images?.[0]
  const timeline = formatRange(project.startDate, project.endDate)
  const proofPoints = project.features?.slice(0, 4) || []

  const glanceItems = [
    project.status && { label: 'Status', value: project.status },
    project.type && { label: 'Project type', value: project.type },
    timeline && { label: 'Timeline', value: timeline },
    project.client && { label: 'Client', value: project.client },
    project.teamSize && { label: 'Team size', value: `${project.teamSize} people` },
  ].filter(Boolean)

  return (
    <article className="container mx-auto px-4 py-16 md:py-24">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      <header className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Project case study</span>
            <h1 className="text-3xl font-bold tracking-tight text-text md:text-5xl md:leading-tight">
              {project.title}
            </h1>
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              {project.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {project.type && (
              <span className="rounded-md bg-surface px-2.5 py-1.5 text-xs font-medium capitalize text-text-secondary">
                {project.type}
              </span>
            )}
            {project.status && (
              <span className="rounded-md bg-success/10 px-2.5 py-1.5 text-xs font-medium uppercase tracking-wide text-success">
                {project.status}
              </span>
            )}
            {project.capstone && (
              <span className="rounded-md bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary">
                B.Tech Capstone
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {project.liveDemo && (
              <Link
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
              >
                View live project
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
              >
                View source
              </Link>
            )}
          </div>
        </div>

        {heroImage && (
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
            <ProjectImage src={heroImage} alt={`${project.title} main interface preview`} />
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-12">
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.problem && (
              <div className="rounded-lg border border-border bg-background p-6">
                <h2 className="mb-3 text-lg font-semibold text-text">Problem</h2>
                <p className="text-sm leading-relaxed text-text-secondary">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="rounded-lg border border-border bg-background p-6">
                <h2 className="mb-3 text-lg font-semibold text-text">Solution</h2>
                <p className="text-sm leading-relaxed text-text-secondary">{project.solution}</p>
              </div>
            )}
          </section>

          {proofPoints.length > 0 && (
            <section>
              <div className="mb-4 flex flex-col gap-2">
                <h2 className="text-xl font-semibold tracking-tight text-text">What this proves</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
                  The most recruiter-relevant signals from this build, pulled from the project feature set.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {proofPoints.map((feature, idx) => (
                  <div key={feature} className="rounded-lg border border-border bg-surface/55 p-5">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
                      {idx + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary">{feature}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.longDescription && (
            <section>
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-text">Overview</h2>
              <p className="max-w-3xl text-sm leading-relaxed text-text-secondary whitespace-pre-line">
                {project.longDescription}
              </p>
            </section>
          )}

          {project.architecture && (
            <section className="rounded-lg border border-border bg-background p-6">
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-text">Architecture</h2>
              <p className="text-sm leading-relaxed text-text-secondary">{project.architecture}</p>
            </section>
          )}

          {project.images && project.images.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-text">Screenshots</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {project.images.map((image, idx) => (
                  <figure key={image} className="overflow-hidden rounded-lg border border-border bg-surface">
                    <div className="relative aspect-video">
                      <ProjectImage src={image} alt={`${project.title} - ${getImageLabel(image)}`} />
                    </div>
                    <figcaption className="border-t border-border px-4 py-3 text-xs font-medium capitalize text-text-secondary">
                      {getImageLabel(image)}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <DetailList title="Key features" items={project.features} />
          <DetailList title="Challenges" items={project.challenges} />
          <DetailList title="Lessons learned" items={project.lessonsLearned} />
          <DetailList title="Future improvements" items={project.futureImprovements} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24">
          {glanceItems.length > 0 && (
            <section className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">At a glance</h2>
              <dl className="space-y-4">
                {glanceItems.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-medium uppercase tracking-wider text-text-secondary">{item.label}</dt>
                    <dd className="mt-1 text-sm font-semibold capitalize text-text">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="rounded-lg border border-border bg-background p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">Technology stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md bg-surface px-2.5 py-1.5 text-xs font-medium text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <nav className="mt-16 border-t border-border pt-8" aria-label="Project navigation">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            {previous ? (
              <Link
                href={`/projects/${previous.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
              >
                <ArrowLeft className="h-4 w-4" />
                {previous.title}
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
          </div>
          <div className="flex-1 sm:text-right">
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
              >
                {next.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
              >
                All projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </article>
  )
}
