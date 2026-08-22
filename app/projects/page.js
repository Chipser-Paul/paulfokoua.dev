import { ProjectsList } from '@/components/sections/projects-list'

export const metadata = {
  title: 'Projects',
  description: 'Selected backend, full-stack, AI, e-commerce, and platform engineering projects by FOKOUA PAUL EMMANUEL.',
}

export default function Projects() {
  return (
    <main>
      <ProjectsList />
    </main>
  )
}
