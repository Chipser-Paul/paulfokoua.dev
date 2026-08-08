# Project Atlas — System Architecture Specification (ASAS)

**Version:** 1.0.0  
**Status:** Draft  
**Audience:** Engineering Team  
**Scope:** Architecture only — no UI, no pages, no styling  

---

## 1. Overall System Architecture

Atlas is a **static-first, content-driven web application**. All dynamic behavior is additive on top of a deterministic content foundation. The architecture is organized into six logical layers, each with a single responsibility.

```
┌─────────────────────────────────────────────┐
│          Presentation Layer                 │
│  (Next.js pages, components, Tailwind)      │
├─────────────────────────────────────────────┤
│          Business Logic Layer               │
│  (Content loaders, validators, formatters)  │
├─────────────────────────────────────────────┤
│          Content Layer                      │
│  (JSON domain model, schema-validated)      │
├─────────────────────────────────────────────┤
│          Rendering Layer                    │
│  (Static generation, hydration boundaries)  │
├─────────────────────────────────────────────┤
│          Assets Layer                       │
│  (Images, fonts, static files)              │
├─────────────────────────────────────────────┤
│          Deployment Layer                   │
│  (Vercel, CI/CD, edge distribution)        │
└─────────────────────────────────────────────┘
```

### 1.1 Presentation Layer

**Responsibility:** Transforms content into navigable, interactive experiences.  
**Ownership:** `app/`, `components/`, `styles/`  
**Constraints:** Must not contain business logic or data access. Components are either Server Components (data-fetching, markup) or Client Components (interactivity, forms, animations).  
**Rule:** A component should not import JSON directly. It receives processed data via props.

### 1.2 Content Layer

**Responsibility:** Single source of truth for all domain data.  
**Ownership:** `content/`  
**Constraints:** JSON files only. No markup, no logic, no references to rendering concerns. Files are read-only at runtime in V1.  
**Rule:** Every domain entity has one canonical file. Cross-references use `id` and `sourceType` fields, not duplication.

### 1.3 Business Logic Layer

**Responsibility:** Transforms raw JSON into renderable models.  
**Ownership:** `lib/`  
**Constraints:** Contains loaders, transformers, sorters, and validators. No React imports. Pure JavaScript functions.  
**Rule:** All content mutations (sorting, filtering, deriving timeline events) happen here, never in components.

### 1.4 Rendering Layer

**Responsibility:** Determines how and when content becomes HTML.  
**Ownership:** `app/` (route segments), Next.js runtime  
**Constraints:** Leverages Next.js App Router primitives: `generateStaticParams`, `generateMetadata`, server vs. client component boundaries.  
**Rule:** Default to static rendering. Use client components only for interactivity.

### 1.5 Assets Layer

**Responsibility:** Stores and serves binary assets.  
**Ownership:** `public/`  
**Constraints:** Images, fonts, robots.txt, favicon. No application logic. Paths are referenced from JSON content files.  
**Rule:** All image paths in JSON must be relative to `/` and resolve to `public/`.

### 1.6 Deployment Layer

**Responsibility:** Build, deploy, and distribute the application.  
**Ownership:** Vercel platform, `vercel.json` (if needed)  
**Constraints:** Zero-config preferred. Deployment is triggered by Git push.  
**Rule:** No runtime server configuration in V1. All environment variables are injected at build/deploy time.

---

## 2. Application Flow

The application lifecycle is a deterministic request → render → hydrate → interact → navigate cycle.

```
User Request
     │
     ▼
┌─────────────────┐
│  Vercel Edge    │
│  (CDN / Cache)  │
└────────┬────────┘
         │ cache miss
         ▼
┌─────────────────┐
│  Next.js Server │
│  (Node.js / Edge)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Route Matching │◄── app/[slug]/page.js
│  (App Router)   │    app/projects/[id]/page.js
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Layout Render  │◄── Server Component
│  (Root Layout)  │    Loads header, footer, nav
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Data Loading   │◄── Server Component
│  (JSON import)  │    Reads content/*.json
│                 │    Passes through lib/
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Component Tree │◄── Server Components render
│  Render         │    HTML streamed to client
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Hydration      │◄── Client Components hydrate
│  (Selective)    │    at specified boundaries
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Interaction    │◄── Framer Motion, forms,
│  (Client-side)  │    navigation activate
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Navigation     │◄── Next.js Link (prefetch)
│  (SPA feel)     │    or full page load
└─────────────────┘
```

### 2.1 Request Phase

1. Browser requests a URL.
2. Vercel Edge Network checks cache.
3. On cache miss, request reaches Next.js server runtime.
4. App Router matches the URL to a route segment.

### 2.2 Routing Phase

- **Static routes** (`/`, `/about`, `/projects`) are matched directly.
- **Dynamic routes** (`/projects/[id]`) are matched via `generateStaticParams` at build time. Unknown slugs return 404.
- Route segments are composed: `layout.js` → `page.js` → nested `layout.js`.

### 2.3 Layout Rendering Phase

- Root layout is a **Server Component**.
- It imports global data (profile, navigation config) once.
- It renders the persistent shell: `<header>`, `<main>`, `<footer>`.
- The `<main>` slot is filled by the matched page component.

### 2.4 Data Loading Phase

- Page components import JSON files directly (Node.js `fs` is available at build time).
- Raw JSON is passed through `lib/loaders.js` functions.
- Loaders apply business rules: filter `published: false`, sort by `featuredOrder`, derive timeline.
- No API routes are used in V1. Data is embedded in the static build.

### 2.5 Component Rendering Phase

- Server Components render the full HTML tree for the page.
- Output is streamed. Critical content appears first.
- Server Components can import other Server Components, but not Client Components.

### 2.6 Hydration Phase

- Client Components are marked with `"use client"` at the file top.
- They hydrate at the boundary where interactivity is needed: forms, animations, theme toggles.
- The rest of the page remains static HTML.

### 2.7 Interaction Phase

- Framer Motion handles animations inside Client Components.
- React Hook Form manages form state and validation.
- Theme switching uses `next-themes` (or equivalent) with system preference detection.

### 2.8 Navigation Phase

- Next.js `<Link>` components enable SPA-like navigation.
- Prefetching occurs on hover for visible links.
- Non-link navigation falls back to full page loads.

---

## 3. Folder Responsibilities

### 3.1 `app/`

**Ownership:** Routing, layouts, pages, route-specific metadata.  
**Responsibility:** Defines the URL structure and page composition. Contains only Server Components by default, with `"use client"` islands for interactivity.  
**Rules:**
- No business logic. Data comes from `lib/` loaders.
- No direct JSON imports. Use `lib/` abstractions.
- Each route segment is responsible for its own `generateMetadata`.

### 3.2 `components/`

**Ownership:** Reusable UI primitives and composite components.  
**Responsibility:** Pure rendering units.  
**Rules:**
- Components are either Server or Client. Name does not imply boundary; the `"use client"` directive does.
- Server Components cannot import Client Components (reverse is allowed).
- No data fetching. Components receive data via props.

### 3.3 `content/`

**Ownership:** Content author (Paul). Engineering reads only.  
**Responsibility:** Domain model in JSON.  
**Rules:**
- JSON must be valid and schema-compliant.
- No git merges without schema validation.
- No content logic here.

### 3.4 `docs/`

**Ownership:** Engineering and product.  
**Responsibility:** Architecture decisions, product requirements, roadmap, meeting notes.  
**Rules:**
- Markdown only.
- ADRs are append-only.

### 3.5 `lib/`

**Ownership:** Engineering.  
**Responsibility:** Pure JavaScript utilities: content loaders, transformers, sorters, validators, date formatters, URL builders.  
**Rules:**
- No React imports.
- No side effects at import time.
- Functions are synchronous in V1 (content is small).

### 3.6 `hooks/`

**Ownership:** Engineering.  
**Responsibility:** Shared client-side state and effects: theme, scroll position, animation triggers, form state.  
**Rules:**
- Every file uses `"use client"`.
- Hooks are generic; no content-specific logic.

### 3.7 `styles/`

**Ownership:** Design and engineering.  
**Responsibility:** Tailwind configuration, custom CSS (if any), design tokens.  
**Rules:**
- Tailwind utility classes are preferred.
- Custom CSS is reserved for things Tailwind cannot do (animations, complex selectors).

### 3.8 `public/`

**Ownership:** Engineering and content author.  
**Responsibility:** Static assets served as-is.  
**Rules:**
- Images are organized by domain: `/images/profile.jpg`, `/images/projects/[slug]/hero.png`.
- No build processing. Next.js `next/image` handles optimization from here.

---

## 4. Rendering Strategy

### 4.1 Static Rendering (Default)

Every page is statically generated at build time unless it requires client-side interactivity that cannot be deferred.

**Why:** Content is static JSON. There is no need for SSR or SSR caching complexity. Static generation produces:
- Fastest TTFB
- CDN-friendly HTML
- Predictable build output
- Zero server runtime cost

**Tradeoff:** Content updates require a new deployment. For a personal portfolio updated a few times per month, this is acceptable.

### 4.2 Server Components (Default for Pages)

All page components are Server Components by default.

**Why:**
- Direct JSON import without fetch overhead.
- Zero JavaScript shipped to client for content rendering.
- Streaming enables progressive rendering.
- Simplest mental model: component = function that returns HTML.

### 4.3 Client Components (Islands of Interactivity)

Client Components are introduced only where needed:

| Feature | Component Type | Reason |
|---------|---------------|--------|
| Project cards with hover effects | Client | Framer Motion requires client |
| Contact form | Client | React Hook Form, input state |
| Theme toggle | Client | `useState`, `useEffect` for system preference |
| Mobile navigation | Client | Toggle state, animation |
| Scroll-triggered animations | Client | Intersection Observer |
| Filter/search (future) | Client | Input state, URL sync |

**Hydration boundaries** are minimized. Each Client Component is a leaf node where possible. Avoid "client wrappers" around large Server Component subtrees.

### 4.4 Future Optimization Opportunities

- **Partial Prerendering (PPR):** When Next.js stabilizes PPR, static shells can wrap interactive islands without full static generation tradeoffs.
- **On-demand Revalidation:** If a headless CMS is introduced, ISR with webhooks replaces full rebuilds.
- **Edge Runtime:** Profile and project pages can move to Edge Runtime for lower latency, provided `lib/` functions remain runtime-agnostic.

---

## 5. Business Rules

All rules are deterministic and codified in `lib/`. No component should contain conditional business logic.

### 5.1 Featured Projects

- **Rule:** Display projects where `published === true` and `featured === true`, sorted ascending by `featuredOrder`.
- **Fallback:** If no featured projects exist, display the 3 most recent `published` projects sorted by `lastUpdated`.
- **Maximum:** Homepage shows exactly 4 featured projects.

### 5.2 Draft Projects

- **Rule:** Projects with `published === false` are excluded from all public listings.
- **Visibility:** Draft projects are only visible if `process.env.VERCEL_ENV === 'preview'` or `development`. This enables preview deployments for content review.

### 5.3 Project Sorting

- **Featured section:** `featuredOrder` ascending.
- **Projects page:** `lastUpdated` descending (most recently updated first).
- **Project detail:** Not sorted; single item by `id` or `slug`.

### 5.4 Experience Sorting

- **Rule:** Sorted by `order` ascending. If `order` is missing, sort by `startDate` descending.
- **Current experience:** The item with `current: true` appears first, regardless of `order`.

### 5.5 Timeline Ordering

- **Rule:** Sorted by `date` descending (most recent first).
- **Derivation:** Timeline events are derived from `experience`, `education`, and `projects` via `sourceType`/`sourceId`. If `timeline.json` exists, it is the source of truth. If missing, timeline is generated at build time from source files.

### 5.6 Now Page

- **Rule:** The `/now` page renders the `currentFocus` array from `profile.json`, plus `availability` status.
- **Content:** If `availability.openToWork` is `true`, show "Open to opportunities" with `availableFrom` date. If `false`, show "Currently focused on [currentFocus items]".

### 5.7 Current Experience

- **Rule:** The experience entry with `current: true` is displayed on the Now page and highlighted in the Experience section.
- **Fallback:** If no entry has `current: true`, the most recent entry by `endDate` or `startDate` is used.

### 5.8 Current Learning

- **Rule:** Display all skills from `skills.currentlyLearning`, sorted by `years` descending (most experienced first).
- **Cap:** Maximum 6 items displayed.

### 5.9 Contact Availability

- **Rule:** Contact form visibility is controlled by `profile.availability.openToWork`.
- **Behavior:** If `openToWork` is `false`, the contact form is replaced with a "Not accepting inquiries" message.
- **Form fields:** Name, email, message. All required. Email format validated client-side and server-side (EmailJS).

### 5.10 Theme Switching

- **Rule:** Theme preference is stored in `localStorage`. System preference is detected via `prefers-color-scheme`.
- **Default:** System preference. If system preference is unavailable, default to light.
- **Persistence:** `localStorage` key `atlas-theme` with values `"light"` or `"dark"`.

### 5.11 Navigation

- **Rule:** Navigation links are derived from the App Router file structure. In V1, navigation is hardcoded in the root layout: Home, About, Projects, Experience, Now, Contact.
- **Active state:** Determined by current pathname. Exact match for `/`, prefix match for others.
- **Mobile:** Hamburger menu with same links, animated open/close.

---

## 6. Data Flow

```
content/*.json
     │
     ▼
lib/loaders.js
     │
     ├── readFile()           // Reads JSON from filesystem
     ├── parse()              // JSON.parse with error catching
     ├── validate()           // Schema validation (required fields)
     ├── transform()          // Sort, filter, derive timeline
     └── normalize()          // Consistent casing, null handling
     │
     ▼
app/[route]/page.js
     │
     ├── import { loadProfile } from '@/lib/loaders'
     ├── const profile = loadProfile()
     ├── Pass profile as prop to Server Component
     │
     ▼
components/ProfileHero.jsx (Server Component)
     │
     ├── Receives profile as prop
     ├── Renders HTML
     ├── No side effects
     │
     ▼
Browser receives HTML
     │
     ▼
Client Component hydration (if any)
     │
     ▼
User interaction
```

### 6.1 Detailed Steps

1. **Read:** `lib/loaders.js` reads JSON files using `fs.readFileSync` at build time. In development, files are read on every request.
2. **Parse:** JSON is parsed. If parsing fails, a hard error is thrown during build (dev) or a graceful fallback is rendered (prod).
3. **Validate:** Required fields are checked. Missing required fields throw build errors. Optional fields are defaulted to `null` or `[]`.
4. **Transform:** Business rules are applied: filter unpublished projects, sort experiences, derive timeline events.
5. **Normalize:** Enums are lowercased, dates are formatted, nulls are consistent.
6. **Pass:** The transformed data is passed as props to Server Components.
7. **Render:** Server Components render HTML. No client JavaScript is involved.
8. **Hydrate:** Client Components hydrate at specified boundaries.
9. **Interact:** User interactions trigger Client Component state updates.

---

## 7. Validation Strategy

### 7.1 Schema Validation

- **Tool:** JSON Schema (Draft 7) defined in `docs/`.
- **When:** Build time (Vercel build) and development (on file save via watcher).
- **Scope:** All `content/*.json` and `content/projects/*.json`.
- **Failure mode:** Build fails with descriptive error message listing the file, path, and expected type.

### 7.2 Required Fields

Every JSON file has a `schemaVersion` and `id` (where applicable). Required fields are defined in the schema:

| File | Required Fields |
|------|----------------|
| `profile.json` | `name`, `title`, `email`, `bio` |
| `skills.json` | `backend` (array), categories present |
| `experience.json` | `experiences` array, each with `company`, `position`, `startDate` |
| `education.json` | `education` array, each with `institution`, `degree`, `startYear` |
| `timeline.json` | `events` array, each with `date`, `title`, `category` |
| `social.json` | `github` (at least one handle) |
| `projects/*.json` | `id`, `title`, `shortDescription`, `techStack` |

### 7.3 Optional Fields

Optional fields are explicitly nullable: `endDate`, `gpa`, `liveDemo`, `client`, `teamSize`, `twitter`. Missing optional fields default to `null` or `[]` during normalization.

### 7.4 Missing Content Behavior

| Scenario | Behavior |
|----------|----------|
| `profile.json` missing | Build fails. Site cannot render without identity. |
| `skills.json` missing | Build fails. Skills section is required. |
| `experience.json` missing | Build fails. Experience section is required. |
| `education.json` missing | **Graceful:** Education section hidden. "No formal education entries" not shown (section absent). |
| `timeline.json` missing | **Graceful:** Timeline derived from experience, education, and projects. If no sources exist, timeline section hidden. |
| `social.json` missing | **Graceful:** Social links omitted. Contact form still available. |
| Project JSON missing | Project card links to 404 page. |

### 7.5 Broken Image Behavior

- **Rule:** All image paths in JSON are validated at build time.
- **Missing image:** `next/image` `onError` handler replaces with a placeholder SVG or hides the image container.
- **Fallback:** A global `/images/placeholder.png` is used as the ultimate fallback.

### 7.6 Invalid URLs

- **Rule:** `github`, `liveDemo`, and social URLs are validated with a regex at build time.
- **Invalid URL:** Logged as warning. Link rendered as plain text (not clickable) or omitted.

### 7.7 Graceful Degradation

Every section has a "hide if empty" rule. The page never shows "No content available" messages. Empty sections are simply not rendered.

---

## 8. Error Handling Philosophy

The user experience must never expose internal errors. All failures are either silent (content hidden) or communicated through intentional UI states.

### 8.1 JSON Missing

**Build-time:** Vercel build fails. Paul receives a deployment failure notification with the specific file and validation error. The site does not deploy.

**Runtime (should not occur):** If a JSON file is missing at runtime due to misconfiguration, the page renders the root layout with an empty `<main>` and a console error. No user-visible error message.

### 8.2 Project Missing

**Scenario:** User navigates to `/projects/nonexistent-slug`.

**Behavior:**
1. App Router returns 404.
2. Custom `not-found.js` renders a styled 404 page.
3. 404 page includes a link to `/projects`.
4. No redirect loop.

### 8.3 Image Missing

**Scenario:** `/images/projects/x/hero.png` does not exist.

**Behavior:**
1. `next/image` triggers `onError`.
2. Component replaces `src` with `/images/placeholder.png`.
3. Placeholder is styled with a subtle background color.
4. No broken image icon.

### 8.4 Invalid Slug

**Scenario:** `/projects/invalid-slug` where no project matches.

**Behavior:** Same as Project Missing → 404.

### 8.5 Empty Timeline

**Scenario:** No experience, education, or projects exist.

**Behavior:** Timeline section is not rendered. The About or homepage does not reference the timeline. No "Timeline coming soon" message.

### 8.6 No Featured Projects

**Scenario:** All projects have `published: false` or `featured: false`.

**Behavior:** Homepage projects section displays the 3 most recently updated published projects instead. If no published projects exist, the section is hidden.

### 8.7 Contact Form Fails

**Scenario:** EmailJS fails to send (network error, quota exceeded, invalid config).

**Behavior:**
1. Client component catches the error.
2. Form displays: "Message could not be sent. Please try again or email directly at [email]."
3. The email address is rendered as a `mailto:` link.
4. Form state is preserved so the user does not retype.
5. Error is logged to console for debugging.

---

## 9. Performance Strategy

Performance is optimized at every layer, with tradeoffs documented.

### 9.1 Image Optimization

- **Strategy:** All images use `next/image` with `width`, `height`, and `priority` props.
- **Hero images:** `priority={true}` to avoid LCP penalty.
- **Below-fold images:** Lazy-loaded by default.
- **Formats:** Next.js serves AVIF/WebP automatically when supported.
- **Sizes:** Responsive `sizes` attribute prevents over-downloading on mobile.
- **Tradeoff:** `next/image` adds a small runtime overhead. Acceptable for a portfolio with <50 images.

### 9.2 Lazy Loading

- **Images:** Native lazy loading via `next/image`.
- **Components:** Below-fold sections use `next/dynamic` with `loading` skeleton in V2. In V1, all content is in the initial HTML.
- **Fonts:** `font-display: swap` to avoid FOIT.

### 9.3 Caching

- **Static assets:** Vercel Edge Cache with `Cache-Control: public, max-age=31536000, immutable` for hashed assets.
- **HTML:** `Cache-Control: public, max-age=0, must-revalidate` with ETag.
- **API routes:** Not applicable in V1. Future email proxy would cache nothing.

### 9.4 Bundle Splitting

- **Default:** Next.js code splitting by route.
- **Manual splitting:** Framer Motion and React Hook Form are loaded only on pages that need them.
- **Tree shaking:** ES modules ensure unused exports are eliminated.
- **Tradeoff:** Excessive dynamic imports hurt SSR. Use sparingly.

### 9.5 Font Loading

- **Strategy:** `next/font` with `self-hosted: true`.
- **Fonts:** One display font (headings), one body font.
- **Preload:** Critical font subsets preloaded. Full font loaded with `swap`.
- **Tradeoff:** More font files = more requests. Limited to 2 fonts to minimize.

### 9.6 Animation Optimization

- **Rule:** Animations use `transform` and `opacity` only. These properties are composited and do not trigger layout/paint.
- **Duration:** Most animations < 300ms. Scroll-triggered animations < 500ms.
- **Will-change:** Applied sparingly and removed after animation.
- **Tradeoff:** Complex 3D transforms are excluded. Portfolio does not need them.

### 9.7 JSON Loading

- **Strategy:** JSON is bundled at build time. No runtime fetch.
- **Size:** Total JSON payload is <50KB. Negligible impact on bundle size.
- **Future:** If content grows beyond 500KB, consider lazy-loading non-critical JSON (e.g., full project list on homepage).

### 9.8 SEO

- **Strategy:** Static generation with pre-rendered HTML and metadata.
- **Tradeoff:** Dynamic per-request SEO is not available. Acceptable because content is static and known at build time.

---

## 10. Accessibility Strategy

Target: **WCAG 2.1 Level AA**

### 10.1 Semantic HTML

- **Rule:** Components use native HTML elements: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`.
- **Why:** Screen readers navigate by semantic landmarks. `<div>` soup is inaccessible.

### 10.2 Keyboard Navigation

- **Rule:** All interactive elements are focusable via `Tab`. Focus order follows visual order.
- **Components:** Buttons, links, form inputs, custom toggles.
- **Skip links:** "Skip to content" link appears on focus for keyboard users.

### 10.3 Reduced Motion

- **Rule:** `prefers-reduced-motion: reduce` disables all Framer Motion animations.
- **Implementation:** `useReducedMotion` hook wraps `motion` components. Falls back to instant state changes.
- **Why:** Vestibular disorders make motion a barrier, not an enhancement.

### 10.4 Focus States

- **Rule:** Every interactive element has a visible focus indicator.
- **Style:** Custom focus ring (Tailwind `focus:ring`) that meets 3:1 contrast against background.
- **Why:** Keyboard users need to know where they are. Default browser outlines are often insufficient.

### 10.5 ARIA

- **Rule:** ARIA is used only when semantic HTML is insufficient.
- **Examples:** `aria-label` on icon-only buttons, `aria-expanded` on mobile menu, `aria-live` for form status messages.
- **Why:** Over-ARIA breaks screen reader expectations.

### 10.6 Screen Readers

- **Rule:** Images have descriptive `alt` text. Decorative images have `alt=""`.
- **Form labels:** Every input has a `<label>` or `aria-label`.
- **Heading hierarchy:** `<h1>` → `<h2>` → `<h3>` without skipping levels.

### 10.7 Color Contrast

- **Rule:** Text meets 4.5:1 contrast ratio (3:1 for large text) against its background in both light and dark themes.
- **Enforcement:** Manual contrast checking during design review. Automated checking via browser dev tools.
- **Why:** Low contrast excludes users with visual impairments.

---

## 11. Animation Philosophy

Animations are **functional, not decorative**. They communicate state changes, guide attention, and confirm actions.

### 11.1 Page Transitions

- **Strategy:** Fade + slight upward slide on route change.
- **Duration:** 300ms ease-out.
- **Purpose:** Signals content change without disorienting the user.
- **Reduced motion:** Instant opacity change.

### 11.2 Hover Effects

- **Strategy:** Scale (1.02) + shadow elevation on cards. Underline slide on links.
- **Duration:** 200ms ease-out.
- **Purpose:** Confirms interactivity. Communicates "this is clickable."
- **Reduced motion:** No transform. Color change only.

### 11.3 Loading Animations

- **Strategy:** Skeleton screens for content loading. Spinner only for form submission.
- **Duration:** Indefinite until content resolves.
- **Purpose:** Reduces perceived wait time. Skeleton maintains layout stability.
- **Reduced motion:** Skeleton pulses with opacity, not transform.

### 11.4 Scroll Animations

- **Strategy:** Elements fade in and slide up as they enter the viewport.
- **Trigger:** Intersection Observer with 100px root margin.
- **Duration:** 500ms ease-out with stagger for lists.
- **Purpose:** Guides reading flow. Prevents overwhelming the user.
- **Reduced motion:** Elements are visible immediately on scroll.

### 11.5 Micro Interactions

- **Strategy:** Button press scale (0.98), input focus ring expansion, success checkmark animation.
- **Duration:** 150ms.
- **Purpose:** Confirms user action. Provides tactile feedback.
- **Reduced motion:** Instant state changes.

### 11.6 Motion Timing

- **Standard:** `ease-out` for enter animations, `ease-in` for exit animations.
- **Stagger:** 50ms delay between list items.
- **Purpose:** Natural motion follows physics: fast start, slow end.

### 11.7 Reduced Motion Support

- **Global:** `useReducedMotion` hook wraps all Framer Motion components.
- **Fallback:** Animations collapse to opacity changes or are removed entirely.
- **Why:** Motion is a preference, not a requirement. Accessibility is non-negotiable.

---

## 12. SEO Strategy

Atlas is a personal brand. SEO is critical for discoverability by recruiters, collaborators, and readers.

### 12.1 Metadata

- **Implementation:** `generateMetadata` in each page's Server Component.
- **Fields:** `title`, `description`, `keywords` (minimal, deprecated by Google but harmless).
- **Title template:** "Page Title — Paul Fokoua Emmanuel"
- **Why:** Server-generated metadata is indexable without client-side JavaScript.

### 12.2 Open Graph

- **Fields:** `og:title`, `og:description`, `og:image`, `og:url`, `og:type`.
- **Image:** Generic OG image for homepage. Project-specific OG images for project pages (in V2).
- **Why:** Social media link previews drive traffic.

### 12.3 Twitter Cards

- **Card type:** `summary_large_image`.
- **Fields:** `twitter:title`, `twitter:description`, `twitter:image`.
- **Why:** Twitter/X previews use Twitter Cards specifically.

### 12.4 Canonical URLs

- **Rule:** Every page has `<link rel="canonical" href="https://paulfokoua.dev[pathname]" />`.
- **Why:** Prevents duplicate content issues if the site is accessible via multiple domains.

### 12.5 Structured Data

- **Schema.org:** `Person` for homepage, `Project` for project pages.
- **Implementation:** Inline JSON-LD in Server Component.
- **Fields:** `name`, `jobTitle`, `url`, `sameAs` (social links). Projects: `name`, `description`, `url`, `codeRepository`.
- **Why:** Rich snippets in Google search results.

### 12.6 Sitemap

- **Implementation:** `app/sitemap.js` (Next.js static sitemap generation).
- **Frequency:** `generateSitemap` reads all published projects and static routes.
- **Why:** Search engines discover all pages efficiently.

### 12.7 Robots

- **File:** `public/robots.txt`.
- **Rules:** Allow all. Disallow `/api/` (future-proofing). Sitemap reference.

### 12.8 Project Pages

- **URL:** `/projects/[slug]`
- **Metadata:** Derived from project JSON: title, description, OG image.
- **Structured data:** `SoftwareSourceCode` or `CreativeWork` schema.
- **Why:** Individual project pages rank for project-specific searches.

---

## 13. Security Considerations

Atlas is a static site with one client-side dependency: EmailJS for the contact form.

### 13.1 EmailJS

- **Configuration:** Public key, service ID, template ID are client-side environment variables.
- **Exposure:** These are inherently public. EmailJS is designed for client-side use.
- **Protection:** Template ID maps to a specific email template. Do not expose template IDs for unused templates.
- **Spam protection:** See 13.2.

### 13.2 Spam Protection

- **Client-side:** React Hook Form validation (required fields, email format).
- **Server-side (EmailJS):** EmailJS provides basic spam filtering. Template content is sanitized.
- **Honeypot:** Add a hidden `website` field. If filled, silently discard submission.
- **Rate limiting:** Not applicable client-side-only. If a serverless proxy is added later, implement rate limiting there.

### 13.3 Environment Variables

- **Public vars:** `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`.
- **Private vars:** None in V1. Future CMS API keys would be server-only.
- **Rule:** `NEXT_PUBLIC_` prefix is required for client-side access. Never expose private keys.

### 13.4 Rate Limiting

- **V1:** Not applicable. EmailJS handles rate limiting on their side.
- **Future:** If a serverless API route proxies email, implement Vercel Edge Middleware rate limiting by IP.

### 13.5 Input Validation

- **Client:** React Hook Form with Zod or manual validation.
- **Server:** EmailJS template rendering escapes HTML. No raw HTML in email body.
- **XSS:** React escapes all JSX by default. No `dangerouslySetInnerHTML` in V1.

### 13.6 External Links

- **Rule:** Links to external domains (`github.com`, `linkedin.com`) have `rel="noopener noreferrer"`.
- **Why:** Prevents tabnabbing and referrer leakage.

---

## 14. Scalability Plan

Atlas must evolve without architectural rewrites. Each version adds capability, not complexity.

### 14.1 Version 1 (Current)

- **Scope:** Static JSON content, 4 project pages, contact form via EmailJS, dark/light theme.
- **Architecture:** Static generation, Server Components, no backend.
- **Content updates:** Git commit + Vercel deploy.
- **Limitations:** No search, no CMS, no blog.

### 14.2 Version 2

- **Scope:** Blog with MDX, search, analytics, OG images per project.
- **Changes:**
  - Introduce `content/blog/` with MDX files.
  - Add `lib/search.js` for client-side full-text search (flexsearch or fuse.js).
  - Add OG image generation via `@vercel/og`.
  - Add Vercel Analytics.
- **Compatibility:** Domain model unchanged. New content types added alongside existing JSON.

### 14.3 Version 3

- **Scope:** CMS integration, dynamic content, ISR.
- **Changes:**
  - Migrate JSON to Contentlayer or headless CMS (Sanity, Contentful).
  - Add ISR with on-demand revalidation via webhook.
  - Add admin preview mode with draft/unpublished content.
  - Add newsletter signup (ConvertKit, Beehiiv).
- **Compatibility:** Content layer changes. Presentation and business logic layers adapt via new loaders. Components unchanged.

### 14.4 Version 4

- **Scope:** Multi-region, personalization, advanced interactions.
- **Changes:**
  - Edge runtime for all pages.
  - Personalization based on visitor type (recruiter, engineer, client).
  - Advanced filtering and project comparison.
  - Multi-language support (i18n).
- **Compatibility:** Requires restructuring content layer for i18n. Major version bump justified.

---

## 15. Architecture Decision Recommendations

These ADRs should exist in `docs/adr/`:

| ADR | Title | Rationale |
|-----|-------|-----------|
| ADR-001 | Why Next.js App Router | Server Components, static generation, file-system routing, future-proof. |
| ADR-002 | Why JavaScript over TypeScript (V1) | Faster iteration, lower barrier for content updates, TypeScript migration path clear. |
| ADR-003 | Why JSON over MDX for V1 | Deterministic schema, no parsing overhead, CMS-ready, simpler validation. |
| ADR-004 | Why Static Generation | Content is static. No SSR/ISR complexity needed. Lowest cost, highest performance. |
| ADR-005 | Why Server Components by Default | Zero client JS for content, streaming, simplest data flow. |
| ADR-006 | Why Client Components are opt-in | Explicit interactivity boundaries, smaller bundles, clearer mental model. |
| ADR-007 | Why Vercel | Zero-config deployment, Edge Network, Next.js first-class integration. |
| ADR-008 | Why Tailwind CSS | Utility-first, consistent design tokens, no runtime CSS-in-JS, small production bundle. |
| ADR-009 | Why Framer Motion | Declarative API, reduced-motion support, gesture recognition, Spring physics. |
| ADR-010 | Why EmailJS | No backend required, serverless, simple API, sufficient for contact form volume. |
| ADR-011 | Why React Hook Form | Minimal re-renders, small bundle, schema validation integration, accessible by default. |
| ADR-012 | Why JSON Schema Validation | Single source of truth for contracts, build-time enforcement, CMS migration path. |
| ADR-013 | Why no database in V1 | Unnecessary complexity. JSON is sufficient. Database adds operational overhead. |
| ADR-014 | Why no authentication in V1 | Personal portfolio with no user-generated content. Auth is premature. |

---

## 16. Future CMS Migration

Atlas is designed so that the Content Layer can be replaced without rewriting the Presentation Layer.

### 16.1 Contentlayer

- **Migration:** Replace `lib/loaders.js` with Contentlayer source files.
- **Impact:** Content moves from `content/*.json` to `content/**/*.md` or `.json`. Contentlayer generates type-safe data at build time.
- **Compatibility:** Component props remain identical. Only the loader implementation changes.

### 16.2 MDX

- **Migration:** Projects and blog posts become `.mdx` files with frontmatter.
- **Impact:** Enables rich content (code blocks, embedded components) inside descriptions.
- **Compatibility:** Frontmatter maps to existing JSON schema. Body content becomes `longDescription` or a new `content` field.

### 16.3 Headless CMS (Sanity, Contentful)

- **Migration:** JSON files are replaced by CMS API calls.
- **Impact:** `lib/loaders.js` becomes async. Server Components fetch from CMS instead of reading files.
- **Compatibility:** Schema is ported to CMS content types. Component props remain identical.
- **Enhancement:** Preview mode, webhooks for revalidation, image CDN.

### 16.4 Supabase

- **Migration:** JSON files move to Supabase tables.
- **Impact:** `lib/loaders.js` queries Supabase via `createClient` (server-side only).
- **Compatibility:** Tables mirror JSON schema. Component props unchanged.
- **Enhancement:** Admin panel for content editing, auth for preview, real-time collaboration.

### 16.5 Migration Principles

1. **Content Layer is the only changing layer.** Business logic, components, and routes remain stable.
2. **Schema is the contract.** Any new content source must produce data matching the existing schema.
3. **Loaders are the adapter.** All data access goes through `lib/loaders.js`. Replace the implementation, not the interface.
4. **Components are agnostic.** They do not know whether data came from JSON, MDX, or a CMS.

---

## Assumptions

1. Content updates are infrequent (monthly or less).
2. Total content size remains under 500KB.
3. Paul is the sole content author.
4. No user-generated content in V1.
5. EmailJS quota is sufficient for portfolio traffic.
6. Vercel free/ hobby tier is sufficient for V1.

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Content grows beyond static generation comfort | Medium | Medium | ISR in V2. Contentlayer in V2. |
| EmailJS spam/abuse | Medium | High | Honeypot, rate limiting awareness, future server proxy. |
| Vercel dependency | Low | Medium | Architecture is portable to Netlify or self-hosted with minor config changes. |
| JSON maintenance burden | Medium | Low | Validation, tooling, CMS migration in V2. |
| Accessibility regressions | Medium | Medium | Automated a11y checks in CI (future), manual review. |

---

## Conclusion

Project Atlas is architected as a **static, content-first, server-rendered application** with clearly separated concerns. Every layer has a single responsibility. The domain model is stable and schema-validated. The rendering strategy maximizes performance while minimizing client-side complexity. The architecture is designed to evolve through additive versions without breaking existing foundations.

**Engineering elegance is not about using the most advanced tools. It is about using the simplest tools that solve the problem completely.**
