import Link from 'next/link'
import { Mail } from 'lucide-react'
import { site } from '@/lib/constants/site'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="font-semibold text-lg">FOKOUA PAUL</p>
            <p className="mt-1 text-sm text-text-secondary max-w-md">
              Software Engineer building backend systems, web applications, and developer tools.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text transition-colors"
            >
              GitHub
            </Link>
            <Link
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href={`mailto:${site.email}`}
              className="text-text-secondary hover:text-text transition-colors"
            >
              {site.email}
            </Link>
          </div>

          <p className="text-sm text-text-secondary">
             © {currentYear} FOKOUA PAUL EMMANUEL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}