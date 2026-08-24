import { GraduationCap } from 'lucide-react'
import { loadEducation } from '@/lib/loaders/education'

export function Education() {
  const education = loadEducation()

  if (education.length === 0) return null

  return (
    <section className="border-y border-border bg-surface/45">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Academic foundation</span>
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">Education</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
            Formal software engineering study supporting the practical backend, database, systems design, and web technology work shown across the portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {education.map((item) => (
            <article key={item.id} className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold text-text">
                  {item.degree}{item.field ? ` in ${item.field}` : ''}
                </h3>
                <p className="text-sm font-medium text-primary">{item.institution}</p>
                <p className="text-xs text-text-secondary">
                  {item.startYear}
                  {item.endYear ? ` - ${item.endYear}` : ''}
                  {item.status && ` - ${item.status}`}
                </p>
              </div>

              {item.description && (
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              )}

              {item.achievements && item.achievements.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx} className="rounded-md bg-surface px-3 py-2">{achievement}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
