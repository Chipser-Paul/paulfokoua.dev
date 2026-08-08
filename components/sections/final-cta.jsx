import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { site } from '@/lib/constants/site'
import { loadProfile } from '@/lib/loaders/profile'

export function FinalCTA() {
  const profile = loadProfile()

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
          Let&apos;s build something useful.
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          I&apos;m open to software engineering opportunities, internships, collaborations, and conversations about building useful technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
          >
            Get in touch
          </Link>
          <Link
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-text hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
          >
            GitHub
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}