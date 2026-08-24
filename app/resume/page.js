import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, Code2, ExternalLink, FileText, GraduationCap, MapPin } from 'lucide-react'
import { loadResume } from '@/lib/loaders/resume'
import { site } from '@/lib/constants/site'
import { PrintButton } from '@/components/ui/print-button'

export const metadata = {
  title: 'Resume',
  description: 'Resume of FOKOUA PAUL EMMANUEL, Backend & Full-Stack Software Engineer specializing in TypeScript, React, Next.js, Python, Django, and PostgreSQL.',
}

function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary print:hidden">
        <Icon className="h-4 w-4" />
      </span>
      <h2 className="text-lg font-semibold text-text">{children}</h2>
    </div>
  )
}

export default function Resume() {
  const data = loadResume()
  const { profile, skills, experience, education, projects } = data

  const skillGroups = Object.entries(skills).filter(([key]) => !['schemaVersion', 'currentlyLearning'].includes(key))

  return (
    <main className="container mx-auto px-4 py-16 md:py-24 print:py-0">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 rounded-lg border border-border bg-background p-6 shadow-sm md:p-8 print:border-0 print:p-0 print:shadow-none">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary print:hidden">Resume</span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-text md:text-5xl print:mt-0 print:text-3xl">
                {profile.name}
              </h1>
              <p className="mt-2 text-base font-medium text-primary">{profile.title}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">{profile.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-text-secondary">
                <span className="inline-flex items-center gap-1 rounded-md bg-surface px-2.5 py-1.5 print:bg-transparent print:px-0">
                  <MapPin className="h-3.5 w-3.5 print:hidden" />
                  {profile.location}
                </span>
                <span className="rounded-md bg-surface px-2.5 py-1.5 print:bg-transparent print:px-0">{profile.email}</span>
                <span className="rounded-md bg-surface px-2.5 py-1.5 print:bg-transparent print:px-0">{profile.website}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 print:hidden">
              <PrintButton />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                Contact
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex gap-3 text-sm">
                <Link href={site.github} target="_blank" rel="noopener noreferrer" className="text-text-secondary transition-colors hover:text-text">GitHub</Link>
                <Link href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-secondary transition-colors hover:text-text">LinkedIn</Link>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px] print:block">
          <div className="space-y-8">
            <section className="rounded-lg border border-border bg-background p-6 shadow-sm print:border-0 print:p-0 print:shadow-none">
              <SectionTitle icon={BriefcaseBusiness}>Experience</SectionTitle>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <article key={exp.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0 print:break-inside-avoid">
                    <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-text">{exp.position}</h3>
                        <p className="text-sm font-medium text-primary">{exp.company}</p>
                      </div>
                      <p className="text-xs text-text-secondary md:text-right">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        {exp.location && ` - ${exp.location}`}
                      </p>
                    </div>
                    {exp.description && <p className="mt-3 text-sm leading-relaxed text-text-secondary">{exp.description}</p>}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                        {exp.responsibilities.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="leading-relaxed">- {item}</li>
                        ))}
                      </ul>
                    )}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <p className="mt-3 text-xs text-text-secondary">{exp.technologies.join(', ')}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-border bg-background p-6 shadow-sm print:border-0 print:p-0 print:shadow-none">
              <SectionTitle icon={Code2}>Selected Projects</SectionTitle>
              <div className="space-y-5">
                {projects.map((project) => (
                  <article key={project.id} className="print:break-inside-avoid">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="text-base font-semibold text-text">{project.title}</h3>
                      <div className="flex gap-3 text-xs print:hidden">
                        {project.liveDemo && (
                          <Link href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:text-primary-hover">
                            Live <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                        {project.github && (
                          <Link href={project.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover">GitHub</Link>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{project.shortDescription}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8 print:mt-8">
            <section className="rounded-lg border border-border bg-surface/50 p-6 print:border-0 print:bg-transparent print:p-0">
              <SectionTitle icon={FileText}>Technical Skills</SectionTitle>
              <div className="space-y-5">
                {skillGroups.map(([category, items]) => (
                  <div key={category}>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">{category}</h3>
                    <ul className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <li key={skill.name} className="rounded-md bg-background px-2 py-1 text-xs font-medium text-text-secondary print:px-0">
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-border bg-background p-6 shadow-sm print:border-0 print:p-0 print:shadow-none">
              <SectionTitle icon={GraduationCap}>Education</SectionTitle>
              <div className="space-y-5">
                {education.map((edu) => (
                  <article key={edu.id} className="print:break-inside-avoid">
                    <h3 className="text-sm font-semibold text-text">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">{edu.institution}</p>
                    <p className="mt-1 text-xs text-text-secondary">
                      {edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}{edu.status && ` - ${edu.status}`}
                    </p>
                    {edu.description && <p className="mt-2 text-sm leading-relaxed text-text-secondary">{edu.description}</p>}
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
