import { Bot, Braces, Database, Layers3, Server, ShieldCheck } from 'lucide-react'
import { getSkillCategories } from '@/lib/loaders/skills'

const categoryMeta = {
  languages: {
    title: 'Languages',
    description: 'Programming foundations for frontend, backend, scripting, and database work.',
    icon: Braces,
  },
  frontend: {
    title: 'Frontend',
    description: 'Responsive product interfaces with React, Next.js, and utility-first styling.',
    icon: Layers3,
  },
  backend: {
    title: 'Backend',
    description: 'APIs, server-side flows, service boundaries, and role-aware application logic.',
    icon: Server,
  },
  data: {
    title: 'Data',
    description: 'Relational modeling, ORM workflows, migrations, and production database setup.',
    icon: Database,
  },
  quality: {
    title: 'Quality and delivery',
    description: 'Testing, Docker, CI/CD, deployment, and release-ready documentation.',
    icon: ShieldCheck,
  },
  ai: {
    title: 'AI products',
    description: 'Grounded AI features, RAG workflows, structured outputs, and OpenAI integrations.',
    icon: Bot,
  },
}

function readableCategory(category) {
  return categoryMeta[category]?.title || category.replace(/-/g, ' ')
}

export function TechnicalFocus() {
  const categories = getSkillCategories()

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Engineering toolkit</span>
          <h2 className="text-2xl font-semibold tracking-tight text-text md:text-3xl">Technical focus</h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-text-secondary md:justify-self-end">
          Tools are grouped by how they help me ship: UI, APIs, data, quality, deployment, and AI workflows. The strongest signal is not the list itself, but the deployed products built with it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map(({ category, items }) => {
          const meta = categoryMeta[category] || {}
          const Icon = meta.icon || Braces
          return (
            <article key={category} className="rounded-lg border border-border bg-background p-6 transition-all hover:border-text-secondary/20 hover:shadow-md">
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text">{readableCategory(category)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">{meta.description}</p>
                </div>
              </div>

              <ul className="flex flex-wrap gap-2">
                {items.slice(0, 6).map((skill) => (
                  <li
                    key={skill.name}
                    className="inline-flex items-center rounded-md bg-surface px-2.5 py-1.5 text-xs font-medium text-text-secondary"
                    title={`${skill.level} - ${skill.years} year${skill.years === 1 ? '' : 's'}`}
                  >
                    {skill.name}
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
