import { Bot, Braces, Database, Layers3, Server, ShieldCheck } from 'lucide-react'
import { getSkillCategories } from '@/lib/loaders/skills'

const categoryMeta = {
  languages: { title: 'Languages', icon: Braces },
  frontend: { title: 'Frontend', icon: Layers3 },
  backend: { title: 'Backend', icon: Server },
  data: { title: 'Data', icon: Database },
  quality: { title: 'Quality and delivery', icon: ShieldCheck },
  ai: { title: 'AI products', icon: Bot },
}

function label(category) {
  return categoryMeta[category]?.title || category.replace(/-/g, ' ')
}

export function TechnicalStrengths() {
  const categories = getSkillCategories()

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-[0.75fr_1.25fr] md:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Capabilities</span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-text md:text-3xl">Technical strengths</h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-text-secondary md:justify-self-end md:text-right">
          The strongest areas behind my current work: APIs, databases, full-stack product flows, deployment, testing, and AI-assisted features with clear boundaries.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map(({ category, items }) => {
          const Icon = categoryMeta[category]?.icon || Braces
          return (
            <article key={category} className="rounded-lg border border-border bg-background p-6 transition-all hover:border-text-secondary/20 hover:shadow-md">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold capitalize text-text">{label(category)}</h3>
              </div>
              <ul className="space-y-2">
                {items.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-text">{skill.name}</span>
                    {skill.level && <span className="text-xs text-text-secondary">{skill.level}</span>}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}
