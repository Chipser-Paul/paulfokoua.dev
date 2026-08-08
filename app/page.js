import { Hero } from '@/components/sections/hero'
import { SelectedProjects } from '@/components/sections/selected-projects'
import { TechnicalFocus } from '@/components/sections/technical-focus'
import { ExperienceSnapshot } from '@/components/sections/experience-snapshot'
import { FinalCTA } from '@/components/sections/final-cta'

export default function Home() {
  return (
    <main>
      <Hero />
      <SelectedProjects />
      <TechnicalFocus />
      <ExperienceSnapshot />
      <FinalCTA />
    </main>
  )
}