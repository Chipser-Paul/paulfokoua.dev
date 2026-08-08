import { ProjectsList } from '@/components/sections/projects-list'

export const metadata = {
  title: 'Projects — FOKOUA PAUL EMMANUEL',
  description: 'Selected software engineering projects by FOKOUA PAUL EMMANUEL, including backend systems, developer tools, and full-stack applications.',
}

export default function Projects() {
  return (
    <main>
      <ProjectsList />
    </main>
  )
}