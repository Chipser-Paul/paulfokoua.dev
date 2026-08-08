import { loadProfile } from '@/lib/loaders/profile'
import { loadSkills } from '@/lib/loaders/skills'
import { loadExperience } from '@/lib/loaders/experience'
import { loadEducation } from '@/lib/loaders/education'
import { loadFeaturedProjects } from '@/lib/loaders/projects'

export function loadResume() {
  const profile = loadProfile()
  const skills = loadSkills()
  const experience = loadExperience()
  const education = loadEducation()
  const projects = loadFeaturedProjects(3)

  return {
    profile,
    skills,
    experience,
    education,
    projects,
  }
}