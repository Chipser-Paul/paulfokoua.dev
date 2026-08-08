import Link from 'next/link'

export function ExperienceCard({ experience }) {
  const { company, position, startDate, endDate, description, technologies } = experience

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present'
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  const dateRange = `${formatDate(startDate)} — ${formatDate(endDate)}`

  return (
    <article className="flex flex-col gap-2 rounded-lg border border-border bg-background p-6 transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-text">{company}</h3>
        <p className="text-sm text-primary">{position}</p>
        <p className="text-xs text-text-secondary">{dateRange}</p>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {technologies.slice(0, 6).map((tech) => (
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
  )
}