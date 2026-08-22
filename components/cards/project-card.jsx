import Link from 'next/link'
import { Code2, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { ProjectImage } from '@/components/ui/project-image'

export function ProjectCard({ project }) {
  const { title, shortDescription, techStack, status, slug, github, liveDemo, type, capstone, images = [] } = project
  const firstImage = images[0]
  const isDeployed = status === 'deployed'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:border-text-secondary/20 hover:shadow-md">
      {firstImage && (
        <Link
          href={`/projects/${slug}`}
          className="relative block aspect-video overflow-hidden border-b border-border bg-surface"
          aria-label={`View ${title} project details`}
        >
          <ProjectImage
            src={firstImage}
            alt={`${title} preview`}
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
        </Link>
      )}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text">
              <Link href={`/projects/${slug}`} className="hover:text-primary transition-colors">
                {title}
              </Link>
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {type && (
                <span className="rounded-md bg-surface px-2 py-1 text-xs font-medium text-text-secondary capitalize">
                  {type}
                </span>
              )}
              {status && (
                <span
                  className={cn(
                    'rounded-md px-2 py-1 text-xs font-medium uppercase tracking-wide',
                    isDeployed ? 'bg-success/10 text-success' : 'bg-surface text-text-secondary'
                  )}
                >
                  {status}
                </span>
              )}
              {capstone && (
                <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  Capstone
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">{shortDescription}</p>

        <div className="flex flex-wrap gap-2">
          {techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md bg-surface px-2 py-1 text-xs font-medium text-text-secondary"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 5 && (
            <span className="inline-flex items-center rounded-md bg-surface px-2 py-1 text-xs font-medium text-text-secondary">
              +{techStack.length - 5}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          {liveDemo && (
            <Link
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </Link>
          )}
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors"
            >
              <Code2 className="h-3.5 w-3.5" />
              GitHub
            </Link>
          )}
          <Link href={`/projects/${slug}`} className="text-sm text-primary hover:text-primary-hover transition-colors">
            Details
          </Link>
        </div>
      </div>
    </article>
  )
}

