'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

export function ProjectImage({ src, alt, className = '', priority = false }) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-surface text-text-secondary">
        <div className="flex flex-col items-center gap-1.5 p-4 text-center">
          <ImageIcon className="h-6 w-6 opacity-40" />
          <span className="text-xs font-medium opacity-60">Preview unavailable</span>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${className}`}
      onError={() => setHasError(true)}
    />
  )
}
