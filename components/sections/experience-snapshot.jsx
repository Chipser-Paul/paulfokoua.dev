import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { loadCurrentExperience } from '@/lib/loaders/experience'
import { ExperienceCard } from '@/components/cards/experience-card'

export function ExperienceSnapshot() {
  const experience = loadCurrentExperience()

  if (!experience) return null

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">Experience</h2>
          <p className="text-sm text-text-secondary max-w-lg">
            A brief look at my recent professional work.
          </p>
        </div>
        <Link
          href="/experience"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          View full experience
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="max-w-2xl">
        <ExperienceCard experience={experience} />
      </div>

      <div className="mt-8 sm:hidden">
        <Link
          href="/experience"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          View full experience
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}