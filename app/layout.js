import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { SkipLink } from '@/components/ui/skip-link'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/layout/footer'
import { site } from '@/lib/constants/site'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.author} - ${site.description}`,
    template: `%s - ${site.author}`,
  },
  description: site.description,
  keywords: ['software engineer', 'backend engineer', 'full-stack engineer', 'TypeScript', 'React', 'Next.js', 'Python', 'Django', 'PostgreSQL', 'Cameroon'],
  authors: [{ name: site.author }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    title: `${site.author} - ${site.description}`,
    description: site.description,
    siteName: site.author,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.author} - ${site.description}`,
    description: site.description,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipLink />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
