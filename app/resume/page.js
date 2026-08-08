import Link from 'next/link'
import { loadResume } from '@/lib/loaders/resume'
import { site } from '@/lib/constants/site'
import { PrintButton } from '@/components/ui/print-button'

export const metadata = {
  title: 'Resume — FOKOUA PAUL EMMANUEL',
  description: 'Professional resume of FOKOUA PAUL EMMANUEL, Software Engineer specializing in backend systems and full-stack development.',
}

export default function Resume() {
  const data = loadResume()
  const { profile, skills, experience, education, projects } = data

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present'
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <main className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text">
              {profile.name}
            </h1>
            <p className="mt-1 text-base text-text-secondary">
              {profile.title}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {profile.location}
              {profile.email && ` · ${profile.email}`}
              {profile.website && ` · ${profile.website}`}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Link
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text transition-colors"
            >
              GitHub
            </Link>
            <Link
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-text mb-3">Professional Summary</h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {profile.bio}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-text mb-3">Technical Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(skills)
              .filter(([key]) => !['schemaVersion', 'currentlyLearning'].includes(key))
              .map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                    {category}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <li
                        key={skill.name}
                        className="text-xs text-text bg-surface px-2 py-1 rounded"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-text mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="flex flex-col gap-1">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-sm font-semibold text-text">
                    {exp.position}
                  </h3>
                  <p className="text-sm text-primary">{exp.company}</p>
                  <p className="text-xs text-text-secondary">
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                    {exp.location && ` · ${exp.location}`}
                  </p>
                </div>
                {exp.description && (
                  <p className="text-sm text-text-secondary leading-relaxed mt-1">
                    {exp.description}
                  </p>
                )}
                {exp.technologies && exp.technologies.length > 0 && (
                  <p className="text-xs text-text-secondary mt-1">
                    {exp.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-text mb-4">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold text-text">
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </h3>
                <p className="text-sm text-primary">{edu.institution}</p>
                <p className="text-xs text-text-secondary">
                  {edu.startYear}
                  {edu.endYear ? ` — ${edu.endYear}` : ''}
                  {edu.status && ` · ${edu.status}`}
                </p>
                {edu.description && (
                  <p className="text-sm text-text-secondary leading-relaxed mt-1">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-text mb-4">Selected Projects</h2>
          <ul className="space-y-3">
            {projects.map((project) => (
              <li key={project.id}>
                <p className="text-sm font-medium text-text">
                  {project.title}
                  {project.liveDemo && (
                    <Link
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover ml-2"
                    >
                      [Live]
                    </Link>
                  )}
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover ml-2"
                    >
                      [GitHub]
                    </Link>
                  )}
                </p>
                <p className="text-xs text-text-secondary">{project.shortDescription}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="pt-8 border-t border-border print:hidden">
          <PrintButton />
          <p className="text-xs text-text-secondary mt-3">
            Use your browser&apos;s print dialog to save as PDF. The layout is optimized for A4/Letter paper.
          </p>
        </div>
      </div>
    </main>
  )
}