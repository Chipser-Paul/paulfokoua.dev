import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, Code2, Globe2, MapPin } from 'lucide-react'
import { site } from '@/lib/constants/site'
import { loadProfile } from '@/lib/loaders/profile'
import { getPublishedProjects } from '@/lib/loaders/projects'

function formatAvailability(dateStr) {
  if (!dateStr) return 'Open to opportunities'
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return 'Open to opportunities'
  return `Available from ${date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
}

export function RecruiterSnapshot() {
  const profile = loadProfile()
  const projects = getPublishedProjects()
  const liveProjects = projects.filter((project) => project.status === 'deployed' && project.liveDemo)

  const snapshot = [
    {
      icon: BriefcaseBusiness,
      label: 'Target roles',
      value: profile.availability.preferredRoles.join(' / '),
      detail: formatAvailability(profile.availability.availableFrom),
    },
    {
      icon: Globe2,
      label: 'Shipped proof',
      value: `${liveProjects.length} live projects`,
      detail: 'Client work, AI platform, job board, and full-stack apps',
    },
    {
      icon: Code2,
      label: 'Core stack',
      value: 'TypeScript, Python, PostgreSQL',
      detail: 'React, Next.js, Django, Express, Prisma, Drizzle, Docker',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
      detail: 'Professional English and French',
    },
  ]

  return (
    <section className="border-y border-border bg-surface/45">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Recruiter quick scan</span>
            <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">
              Backend depth, full-stack delivery, and real deployed work.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
              A compact view of the signals recruiters usually need first: role direction, shipped projects, production tooling, language fit, and contact paths.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/resume"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
              >
                Review resume
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
              >
                Contact Paul
              </Link>
              <Link
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
              >
                GitHub
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {snapshot.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="rounded-lg border border-border bg-background p-5 shadow-sm">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{item.label}</dt>
                  <dd className="mt-2 text-base font-semibold text-text">{item.value}</dd>
                  <dd className="mt-1 text-sm leading-relaxed text-text-secondary">{item.detail}</dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </section>
  )
}
