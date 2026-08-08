import { getSkillCategories } from '@/lib/loaders/skills'

export function TechnicalFocus() {
  const categories = getSkillCategories()

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col gap-2 mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">Technical focus</h2>
        <p className="text-sm text-text-secondary max-w-lg">
          Technologies and tools I use to design, build, and ship software.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map(({ category, items }) => (
          <div key={category} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              {category}
            </h3>
            <ul className="flex flex-col gap-2">
              {items.map((skill) => (
                <li key={skill.name} className="text-sm text-text">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}