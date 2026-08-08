import { loadProfile } from '@/lib/loaders/profile'

export function ProfessionalStory() {
  const profile = loadProfile()

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-6">
          Professional story
        </h2>
        <div className="space-y-4 text-base md:text-lg text-text-secondary leading-relaxed">
          <p>
            I&apos;m a software engineer focused on building backend systems, full-stack web applications, and developer tools.
            My work centers on clean architecture, performance, and delivering real-world solutions that are practical and maintainable.
          </p>
          <p>
            I&apos;m especially interested in backend engineering, APIs, and scalable systems.
            I enjoy turning complex requirements into straightforward, well-structured software.
          </p>
          {profile.mission && (
            <p className="italic text-text-secondary">
              {profile.mission}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}