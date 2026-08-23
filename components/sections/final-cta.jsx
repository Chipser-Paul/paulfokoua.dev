import Link from 'next/link'
import { ArrowRight, Code2, Mail } from 'lucide-react'
import { site } from '@/lib/constants/site'
import { loadProfile } from '@/lib/loaders/profile'

export function FinalCTA() {
  const profile = loadProfile()

  return (
    <section className="border-t border-border bg-surface/45">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-10 rounded-lg border border-border bg-background p-6 shadow-sm md:p-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Ready for the next conversation</span>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-text md:text-3xl">
              Looking for a backend or full-stack engineer who can ship and explain the system clearly?
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
              I am open to software engineering opportunities, internships, collaborations, and practical product work where reliability, clean APIs, databases, and user-facing delivery matter.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.availability.preferredRoles.map((role) => (
                <span key={role} className="rounded-md bg-surface px-2.5 py-1.5 text-xs font-medium text-text-secondary">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface/55 p-5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              Review resume
            </Link>
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
              >
                <Mail className="h-4 w-4 text-primary" />
                {site.email}
              </a>
              <Link
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
              >
                <Code2 className="h-4 w-4 text-primary" />
                GitHub profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
