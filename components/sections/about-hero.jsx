import { loadProfile } from '@/lib/loaders/profile'

export function AboutHero() {
  const profile = loadProfile()

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          About
        </span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-text">
          {profile.name}
        </h1>
        <p className="mt-2 text-lg text-text-secondary">
          {profile.title} — {profile.location}
        </p>
        <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
          {profile.bio}
        </p>
      </div>
    </section>
  )
}