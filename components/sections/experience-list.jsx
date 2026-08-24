import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, CalendarDays, MapPin } from 'lucide-react'
import { loadExperience } from '@/lib/loaders/experience'

export function ExperienceList() {
  const experiences = loadExperience()
  const current = experiences.find((exp) => exp.current)

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present'
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Experience</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-text md:text-5xl md:leading-tight">
            Practical engineering experience across client work, product builds, and internship delivery.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            A chronological view of the roles and work that support the portfolio: backend APIs, full-stack products, AI-assisted workflows, databases, tests, deployment, and client-facing delivery.
          </p>
        </div>

        {current && (
          <div className="rounded-lg border border-border bg-surface/50 p-6 shadow-sm">
            <BriefcaseBusiness className="mb-4 h-5 w-5 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Current focus</p>
            <h2 className="mt-2 text-lg font-semibold text-text">{current.position}</h2>
            <p className="mt-1 text-sm text-primary">{current.company}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{current.description}</p>
          </div>
        )}
      </div>

      <div className="relative max-w-4xl">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-6" aria-hidden="true" />

        <div className="space-y-6">
          {experiences.map((exp) => (
            <article key={exp.id} className="relative flex gap-5 md:gap-7">
              <div className="relative mt-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm md:h-12 md:w-12">
                  <BriefcaseBusiness className="h-4 w-4" />
                </div>
              </div>

              <div className="flex-1 rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:border-text-secondary/20 hover:shadow-md">
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    {exp.current && (
                      <span className="mb-3 inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        Current
                      </span>
                    )}
                    <h2 className="text-lg font-semibold text-text">{exp.position}</h2>
                    <p className="mt-1 text-sm font-medium text-primary">{exp.company}</p>
                  </div>
                  <div className="space-y-1 text-sm text-text-secondary md:text-right">
                    <p className="inline-flex items-center gap-1 md:justify-end">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </p>
                    {exp.location && (
                      <p className="inline-flex items-center gap-1 md:justify-end">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </p>
                    )}
                  </div>
                </div>

                {exp.description && (
                  <p className="mb-4 text-sm leading-relaxed text-text-secondary">{exp.description}</p>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="mb-4 grid grid-cols-1 gap-2 text-sm text-text-secondary">
                    {exp.responsibilities.map((item, idx) => (
                      <li key={idx} className="rounded-md bg-surface px-3 py-2 leading-relaxed">{item}</li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-surface px-2 py-1 text-xs font-medium text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-border bg-surface/50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text">Want to see the implementation evidence?</h2>
            <p className="mt-1 text-sm text-text-secondary">The project case studies show the interfaces, architecture, stack, and deployment proof behind this experience.</p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            View projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
