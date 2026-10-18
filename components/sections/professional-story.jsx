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
                  I am a backend and full-stack software engineer based in Douala, Cameroon, focused on building reliable, test-backed web products and distributed services. My background spans freelance production backend engineering at GlitGo (developing Node.js/Express APIs, MongoDB/Firebase data models, and Next.js admin tools for an on-demand vehicle platform in the US and France), paid commercial delivery at Candy Beauty (shipping an end-to-end e-commerce store with Stripe and Next.js 14), and web development at VIM Solutions.
                </p>
                <p>
                  I specialize in bridging scalable backend systems (FastAPI, Express, Django, PostgreSQL, Docker) with modern, accessible frontend interfaces (React 19, Next.js, Tailwind CSS) and grounded AI capabilities (RAG, structured outputs, agent loops). I value clear API boundaries, automated test coverage, and deployable documentation over hype.
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
