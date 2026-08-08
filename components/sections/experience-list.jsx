import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { loadExperience } from '@/lib/loaders/experience'

export function ExperienceList() {
  const experiences = loadExperience()

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present'
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-2">
          Professional experience
        </h2>
        <p className="text-sm text-text-secondary mb-10 max-w-xl">
          A chronological overview of my roles, responsibilities, and technical work.
        </p>

        <div className="space-y-10">
          {experiences.map((exp) => (
            <article key={exp.id} className="relative">
              {exp.current && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary mb-3">
                  Current
                </span>
              )}
              <div className="flex flex-col gap-1 mb-2">
                <h3 className="text-lg font-semibold text-text">
                  {exp.position}
                </h3>
                <p className="text-sm text-primary">{exp.company}</p>
                <p className="text-xs text-text-secondary">
                  {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                  {exp.location && ` · ${exp.location}`}
                </p>
              </div>

              {exp.description && (
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {exp.description}
                </p>
              )}

              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1 mb-3">
                  {exp.responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
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
            </article>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            View my projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}