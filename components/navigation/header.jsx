'use client'

import Link from 'next/link'
import { navigation } from '@/lib/constants/navigation'
import { usePathname } from 'next/navigation'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils/cn'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight hover:text-primary transition-colors">
          FOKOUA PAUL
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Primary navigation">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'transition-colors',
                  isActive ? 'text-primary font-medium' : 'text-text-secondary hover:text-text'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </Link>
            )
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}