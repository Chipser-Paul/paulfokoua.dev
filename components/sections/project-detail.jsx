import Link from 'next/link'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { getProjectNavigation } from '@/lib/loaders/projects'
import { site } from '@/lib/constants/site'
import { ProjectImage } from '@/components/ui/project-image'

function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export function ProjectDetail({ project }) {
  const { previous, next } = getProjectNavigation(project.slug)

  return (
    <main className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>

        <header className="flex flex-col gap-4 mb-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
              {project.type && (
                <span className="capitalize">{project.type}</span>
              )}
              {project.status && (
                <>
                  <span>·</span>
                  <span className="capitalize">{project.status}</span>
                </>
              )}
              {project.capstone && (
                <>
                  <span>·</span>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    B.Tech Capstone Project
                  </span>
                </>
              )}
              {project.startDate && (
                <>
                  <span>·</span>
                  <span>
                    {formatDate(project.startDate)}
                    {project.endDate ? ` — ${formatDate(project.endDate)}` : ' — Present'}
                  </span>
                </>
              )}
            </div>
          </div>

          {project.client && (
            <p className="text-sm text-text-secondary">
              {project.team ? 'Client' : 'Personal'} project
              {project.teamSize ? ` · ${project.teamSize} people` : ''}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-text hover:bg-surface transition-colors"
              >
                GitHub
              </Link>
            )}
            {project.liveDemo && (
              <Link
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-text hover:bg-surface transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Live demo
              </Link>
            )}
          </div>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-text mb-3">Overview</h2>
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {project.longDescription || project.shortDescription}
            </p>
          </section>

          {project.problem && project.solution && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border border-border bg-background p-6">
                <h3 className="text-sm font-semibold text-text mb-2">Problem</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{project.problem}</p>
              </div>
              <div className="rounded-lg border border-border bg-background p-6">
                <h3 className="text-sm font-semibold text-text mb-2">Solution</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{project.solution}</p>
              </div>
            </section>
          )}

          {project.architecture && (
            <section>
              <h2 className="text-lg font-semibold text-text mb-3">Architecture</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{project.architecture}</p>
            </section>
          )}

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">Technology stack</h2>
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

          {project.images && project.images.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text mb-3">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, idx) => {
                  const filename = image.split('/').pop().replace('.png', '').replace(/-/g, ' ')
                  return (
                    <div
                      key={idx}
                      className="relative aspect-video rounded-lg border border-border overflow-hidden bg-surface"
                    >
                      <ProjectImage
                        src={image}
                        alt={`${project.title} - ${filename}`}
                      />
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text mb-3">Key features</h2>
              <ul className="list-disc list-inside text-sm text-text-secondary space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {project.challenges && project.challenges.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text mb-3">Challenges</h2>
              <ul className="list-disc list-inside text-sm text-text-secondary space-y-2">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx}>{challenge}</li>
                ))}
              </ul>
            </section>
          )}

          {project.lessonsLearned && project.lessonsLearned.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text mb-3">Lessons learned</h2>
              <ul className="list-disc list-inside text-sm text-text-secondary space-y-2">
                {project.lessonsLearned.map((lesson, idx) => (
                  <li key={idx}>{lesson}</li>
                ))}
              </ul>
            </section>
          )}

          {project.futureImprovements && project.futureImprovements.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-text mb-3">Future improvements</h2>
              <ul className="list-disc list-inside text-sm text-text-secondary space-y-2">
                {project.futureImprovements.map((improvement, idx) => (
                  <li key={idx}>{improvement}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <nav className="mt-16 pt-8 border-t border-border" aria-label="Project navigation">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              {previous ? (
                <Link
                  href={`/projects/${previous.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {previous.title}
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
            </div>
            <div className="flex-1 text-right">
              {next ? (
                <Link
                  href={`/projects/${next.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  {next.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
                >
                  All projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </main>
  )
}