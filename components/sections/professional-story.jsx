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
            I am a backend and full-stack software engineer focused on practical products: typed APIs, database-backed workflows, responsive interfaces, and deployment-ready systems.
          </p>
          <p>
            My work spans a paid e-commerce client project, an AI recruitment platform with RAG and tested API behavior, a Cameroon-focused jobs platform, and a Python trading research system. Across these projects, I care about clear architecture, validation, testing, documentation, and shipping software that can be evaluated by real users.
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
