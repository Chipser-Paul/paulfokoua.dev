import { loadEducation } from '@/lib/loaders/education'

export function Education() {
  const education = loadEducation()

  if (education.length === 0) return null

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-8">
          Education
        </h2>

        <div className="space-y-8">
          {education.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold text-text">
                  {item.degree}{item.field ? ` in ${item.field}` : ''}
                </h3>
                <p className="text-sm text-primary">{item.institution}</p>
                <p className="text-xs text-text-secondary">
                  {item.startYear}
                  {item.endYear ? ` — ${item.endYear}` : ''}
                  {item.status && ` · ${item.status}`}
                </p>
              </div>

              {item.description && (
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              )}

              {item.achievements && item.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                  {item.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}