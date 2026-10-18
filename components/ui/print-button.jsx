'use client'

import { Download } from 'lucide-react'

export function PrintButton() {
  return (
    <a
      href="/Fokoua_Paul_Emmanuel_CV.pdf"
      download="Fokoua_Paul_Emmanuel_CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2"
    >
      <Download className="h-4 w-4" />
      Download Resume PDF
    </a>
  )
}