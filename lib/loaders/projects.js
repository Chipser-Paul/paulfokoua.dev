import projectsData from '@/content/projects/cameroon-tech-jobs.json'
import tradingBotData from '@/content/projects/trading-bot.json'
import hospitalData from '@/content/projects/hospital-management-system.json'

const allProjects = [
  projectsData,
  tradingBotData,
  hospitalData,
]

export function getAllProjects() {
  return [...allProjects].sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0))
}

export function getPublishedProjects() {
  return getAllProjects().filter((p) => p.published !== false)
}

export function getFeaturedProjects(limit) {
  const projects = getPublishedProjects().filter((p) => p.featured === true)
  return limit ? projects.slice(0, limit) : projects
}

export function loadFeaturedProjects(limit = 3) {
  return getFeaturedProjects(limit)
}

export function getProjectBySlug(slug) {
  return getAllProjects().find((p) => p.slug === slug) || null
}

export function getProjectById(id) {
  return getAllProjects().find((p) => p.id === id) || null
}

export function getProjectNavigation(slug) {
  const projects = getPublishedProjects()
  const currentIndex = projects.findIndex((p) => p.slug === slug)

  return {
    previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  }
}