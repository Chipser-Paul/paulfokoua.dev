'use client'

import Image from 'next/image'
import { useState } from 'react'

export function ProjectImage({ src, alt }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) return null

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"
      onError={() => setHasError(true)}
    />
  )
}
