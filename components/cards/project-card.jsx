import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

export function ProjectCard({ project }) {
  const { title, shortDescription, techStack, status, slug, github, liveDemo, type, capstone } = project

  return (
    <article className="flex flex-col gap-4 rounded-lg border border-border bg-background p-6 transition-all hover:shadow-md hover:border-text-secondary/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text">
            <Link href={`/projects/${slug}`} className="hover:text-primary transition-colors">
              {title}
            </Link>
          </h3>
          <div className="mt-1 flex items-center gap-2">
            {type && (
              <span className="text-xs font-medium text-text-secondary capitalize">
                {type}
              </span>
            )}
            {status && (
              <>
                <span className="text-xs text-text-secondary">·</span>
                <span className="text-xs font-medium uppercase tracking-wide text-text-secondary capitalize">
                  {status}
                </span>
              </>
            )}
            {capstone && (
              <>
                <span className="text-xs text-text-secondary">·</span>
                <span className="text-xs font-medium text-primary">
                  Capstone
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed">{shortDescription}</p>

      <div className="flex flex-wrap gap-2">
        {techStack.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-md bg-surface px-2 py-1 text-xs font-medium text-text-secondary"
          >
            {tech}
          </span>
        ))}
        {techStack.length > 6 && (
          <span className="inline-flex items-center rounded-md bg-surface px-2 py-1 text-xs font-medium text-text-secondary">
            +{techStack.length - 6}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 pt-2">
        {github && (
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-primary transition-colors"
          >
            GitHub
          </Link>
        )}
        {liveDemo && (
          <Link
            href={liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-primary transition-colors"
          >
            Live demo
          </Link>
        )}
        <Link href={`/projects/${slug}`} className="text-sm text-primary hover:text-primary-hover transition-colors">
          Details
        </Link>
      </div>
    </article>
  )
}