import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, Code2, Globe2, MapPin } from 'lucide-react'
import { loadProfile } from '@/lib/loaders/profile'
import { getPublishedProjects } from '@/lib/loaders/projects'

export function AboutHero() {
  const profile = loadProfile()
  const projects = getPublishedProjects()
  const liveProjects = projects.filter((project) => project.status === 'deployed' && project.liveDemo)

  const signals = [
    { icon: BriefcaseBusiness, label: 'Direction', value: profile.availability.preferredRoles.join(' / ') },
    { icon: Globe2, label: 'Shipped proof', value: `${liveProjects.length} live deployments` },
    { icon: Code2, label: 'Core stack', value: 'TypeScript, Python, PostgreSQL' },
    { icon: MapPin, label: 'Base', value: profile.location },
  ]

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">About</span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-text md:text-5xl md:leading-tight">
            I am Paul, a backend and full-stack engineer focused on shipped product work.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
            {profile.bio}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              View proof of work
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              Review resume
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {signals.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="rounded-lg border border-border bg-background p-5 shadow-sm">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{item.label}</p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-text">{item.value}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
