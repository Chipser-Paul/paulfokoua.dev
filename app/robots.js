import { site } from '@/lib/constants/site'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${site.url}/sitemap.xml`,
  }
}