import educationData from '@/content/education.json'

export function loadEducation() {
  return educationData.education || []
}