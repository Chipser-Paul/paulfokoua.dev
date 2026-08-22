export const metadata = {
  title: 'About',
  description: 'About FOKOUA PAUL EMMANUEL, a Backend & Full-Stack Software Engineer based in Douala, Cameroon.',
}

import { AboutHero } from '@/components/sections/about-hero'
import { ProfessionalStory } from '@/components/sections/professional-story'
import { TechnicalStrengths } from '@/components/sections/technical-strengths'
import { Education } from '@/components/sections/education'
import { CareerTimeline } from '@/components/sections/career-timeline'
import { AboutCTA } from '@/components/sections/about-cta'

export default function About() {
  return (
    <main>
      <AboutHero />
      <ProfessionalStory />
      <TechnicalStrengths />
      <Education />
      <CareerTimeline />
      <AboutCTA />
    </main>
  )
}
