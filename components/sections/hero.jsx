import Link from 'next/link'
import { site } from '@/lib/constants/site'
import { loadProfile } from '@/lib/loaders/profile'

export function Hero() {
  const profile = loadProfile()

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {profile.title}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-[1.1]">
              Building practical software systems that solve real problems.
            </h1>
          </div>

          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl">
            I build practical web applications, APIs, and developer tools using Python and JavaScript.
            Focused on clean architecture, performance, and delivering real-world solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              View my work
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-text hover:bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
            >
              View experience
            </Link>
          </div>

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
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-lg border border-border bg-surface/50 p-6 font-mono text-sm text-text-secondary shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-danger/20" />
                  <div className="h-3 w-3 rounded-full bg-warning/20" />
                  <div className="h-3 w-3 rounded-full bg-success/20" />
                </div>
                <div className="space-y-2">
                  <p><span className="text-primary">const</span> engineer = {'{'}</p>
                   <p className="pl-4">name: <span className="text-success">&quot;FOKOUA PAUL&quot;</span>,</p>
                  <p className="pl-4">focus: <span className="text-success">&quot;backend&quot;</span>,</p>
                   <p className="pl-4">stack: [<span className="text-success">&quot;Python&quot;</span>, <span className="text-success">&quot;JavaScript&quot;</span>],</p>
                  <p className="pl-4">status: <span className="text-success">&quot;building&quot;</span></p>
                  <p>{'}'};</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}