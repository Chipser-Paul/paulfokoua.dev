import skillsData from '@/content/skills.json'

export function loadSkills() {
  return skillsData
}

export function getSkillCategories() {
  const skills = loadSkills()
  const excludedKeys = ['schemaVersion', 'currentlyLearning']
  return Object.entries(skills)
    .filter(([key]) => !excludedKeys.includes(key))
    .map(([category, items]) => ({
      category,
      items: items || [],
    }))
}