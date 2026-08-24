import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function AboutCTA() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="rounded-lg border border-border bg-background p-6 shadow-sm md:p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Next step</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text md:text-3xl">
              See the work behind the story.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
              The clearest picture of my engineering style is in the project case studies: what was built, how it was structured, and what the deployment proves.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              View projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              Contact me
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
