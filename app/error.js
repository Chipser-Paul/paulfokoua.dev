'use client'

export default function Error({ error, reset }) {
  return (
    <main className="container mx-auto px-4 py-24">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight text-text mb-4">Something went wrong</h1>
        <p className="text-base text-text-secondary mb-8">
          We experienced an unexpected error. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </main>
  )
}