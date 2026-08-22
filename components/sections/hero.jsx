import Link from 'next/link'
import { ArrowRight, CheckCircle2, Code2, Rocket, ShieldCheck } from 'lucide-react'
import { site } from '@/lib/constants/site'
import { loadProfile } from '@/lib/loaders/profile'

const proofPoints = [
  { label: '3+ years', detail: 'hands-on development' },
  { label: 'Paid client work', detail: 'Candy Beauty e-commerce' },
  { label: '25 tests', detail: 'TalentOS API quality gates' },
  { label: '4 live projects', detail: 'deployed and documented' },
]

export function Hero() {
  const profile = loadProfile()

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {profile.title}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-[1.1]">
              I build shipped web products with backend depth.
            </h1>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl">
            TypeScript, React, Next.js, Python, Django, and PostgreSQL systems with practical product thinking, API discipline, tests, CI/CD, and deployment-ready documentation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              View shipped work
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-text hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              View resume
            </Link>
          </div>

          <dl className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {proofPoints.map((item) => (
              <div key={item.label} className="border-l border-border pl-3">
                <dt className="text-sm font-semibold text-text">{item.label}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-text-secondary">{item.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text transition-colors"
            >
              GitHub
            </Link>
            <Link
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-text transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="w-full max-w-md rounded-lg border border-border bg-surface/50 p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-text">
              <Code2 className="h-4 w-4 text-primary" />
              Current proof of work
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-text">Candy Beauty</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">Paid e-commerce delivery with auth, admin, Stripe test checkout, FCFA pricing, and production deployment.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-text">TalentOS</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">AI recruitment platform with typed APIs, RAG workflows, Docker, CI, and 25 passing tests.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-text">Cameroon Tech Jobs</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">Live Django job platform with role-based dashboards, applications, payments readiness, and admin controls.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
