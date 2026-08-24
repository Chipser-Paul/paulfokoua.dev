import { CalendarDays } from 'lucide-react'
import { loadTimeline } from '@/lib/loaders/timeline'

export function CareerTimeline() {
  const events = loadTimeline()

  if (events.length === 0) return null

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-10 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Progression</span>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text md:text-3xl">Career and project journey</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
          A quick timeline of the education, internship, independent engineering, and shipped project milestones behind the portfolio.
        </p>
      </div>

      <div className="relative max-w-4xl">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-6" aria-hidden="true" />

        <div className="space-y-5">
          {events.map((event) => (
            <article key={event.id} className="relative flex gap-5 md:gap-7">
              <div className="relative mt-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm md:h-12 md:w-12">
                  <CalendarDays className="h-4 w-4" />
                </div>
              </div>

              <div className="flex-1 rounded-lg border border-border bg-background p-5 shadow-sm transition-all hover:border-text-secondary/20 hover:shadow-md">
                <time className="text-xs font-semibold uppercase tracking-wider text-primary" dateTime={event.date}>
                  {formatDate(event.date)}
                </time>
                <h3 className="mt-2 text-base font-semibold text-text">{event.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
