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
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-8">
          Career &amp; journey
        </h2>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-6" aria-hidden="true" />

          <div className="space-y-8">
            {events.map((event) => (
              <div key={event.id} className="relative flex gap-6 md:gap-8">
                <div className="hidden md:block w-12 text-right text-xs text-text-secondary pt-1">
                  {formatDate(event.date)}
                </div>

                <div className="relative mt-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" aria-hidden="true" />
                </div>

                <div className="flex-1 pb-8">
                  <div className="md:hidden text-xs text-text-secondary mb-1">
                    {formatDate(event.date)}
                  </div>
                  <h3 className="text-base font-semibold text-text">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}