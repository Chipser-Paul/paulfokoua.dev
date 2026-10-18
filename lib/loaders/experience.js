import experienceData from '@/content/experience.json'

export function loadExperience() {
  return experienceData.experiences || []
}

export function loadCurrentExperience() {
  const experiences = loadExperience()
  return experiences[0] || null
}