import { CheckCircle2 } from 'lucide-react'
import { loadProfile } from '@/lib/loaders/profile'

const principles = [
  'Build the backend and frontend around clear user workflows.',
  'Use validation, authentication, databases, and tests as product foundations.',
  'Ship projects that can be opened, reviewed, and improved after deployment.',
]

export function ProfessionalStory() {
  const profile = loadProfile()

  return (
    <section className="border-y border-border bg-surface/45">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Working style</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text md:text-3xl">
              Practical engineering, not portfolio theater.
            </h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <div className="space-y-4 text-base leading-relaxed text-text-secondary md:text-lg">
                <p>
                  I am a backend and full-stack software engineer focused on practical products: typed APIs, database-backed workflows, responsive interfaces, and deployment-ready systems.
                </p>
                <p>
                  My work spans a paid e-commerce client project, an AI recruitment platform with RAG and tested API behavior, a Cameroon-focused jobs platform, and a Python trading research system. Across these projects, I care about clear architecture, validation, testing, documentation, and shipping software that can be evaluated by real users.
                </p>
                {profile.mission && (
                  <p className="border-l border-primary pl-4 text-text">
                    {profile.mission}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {principles.map((item) => (
                <div key={item} className="rounded-lg border border-border bg-background p-4">
                  <CheckCircle2 className="mb-3 h-4 w-4 text-primary" />
                  <p className="text-sm leading-relaxed text-text-secondary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
