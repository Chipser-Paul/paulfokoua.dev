import { getPublishedProjects } from '@/lib/loaders/projects'
import { site } from '@/lib/constants/site'

export default function sitemap() {
  const projects = getPublishedProjects()

  const projectUrls = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: project.lastUpdated ? new Date(project.lastUpdated).toISOString() : undefined,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: site.url,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${site.url}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${site.url}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${site.url}/experience`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${site.url}/resume`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${site.url}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    ...projectUrls,
  ]
}