import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-24">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-6xl font-bold tracking-tight text-text mb-4">404</h1>
        <p className="text-lg text-text-secondary mb-8">
          This page doesn&apos;t exist. It may have moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
          >
            Back home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-text hover:bg-surface transition-colors"
          >
            View projects
          </Link>
        </div>
      </div>
    </main>
  )
}