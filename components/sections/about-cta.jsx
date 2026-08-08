import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function AboutCTA() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-text hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  )
}