import { getSkillCategories } from '@/lib/loaders/skills'

export function TechnicalStrengths() {
  const categories = getSkillCategories()

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text mb-6">
          Technical strengths
        </h2>
        <p className="text-sm text-text-secondary mb-8 max-w-xl">
          Technologies and tools I use to design, build, and ship software.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map(({ category, items }) => (
            <div key={category} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {category}
              </h3>
              <ul className="flex flex-col gap-2">
                {items.map((skill) => (
                  <li key={skill.name} className="text-sm text-text">
                    {skill.name}
                    {skill.level && (
                      <span className="ml-2 text-text-secondary">
                        — {skill.level}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}