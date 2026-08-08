# Project Atlas — Design System Specification (DSS)

**Version:** 1.0.0  
**Status:** Draft  
**Audience:** Design, Engineering, Content  
**Scope:** Visual language, component inventory, interaction patterns, accessibility standards  

---

## 1. Design Principles

Every design decision traces back to one of these principles.

### 1.1 Clarity

Information is presented without ambiguity. Typography, spacing, and color guide the eye to what matters. No decoration without purpose. The user should never ask "what is this?" or "what should I do next?"

**Rationale:** Recruiters and hiring managers scan quickly. Clarity reduces cognitive load and increases conversion to meaningful actions (reading a project, contacting Paul).

### 1.2 Consistency

Patterns repeat predictably across the site. A button looks and behaves the same everywhere. A card follows the same elevation and padding rules. Consistency builds trust and reduces engineering cost.

**Rationale:** Consistency signals craft. Inconsistency signals neglect. For an engineering portfolio, craft is the product.

### 1.3 Hierarchy

Visual weight communicates importance. Headings are larger and bolder than body text. Featured projects have more prominence than archived ones. Hierarchy guides scanning and establishes narrative flow.

**Rationale:** Users do not read linearly. They scan. Hierarchy ensures the right information is seen first.

### 1.4 Minimalism

Every element must justify its existence. If removing it does not reduce clarity, it goes. Whitespace is not empty space; it is active breathing room that improves comprehension.

**Rationale:** Minimalism is engineering elegance made visible. It signals confidence and respect for the user's attention.

### 1.5 Purposeful Motion

Animation communicates state changes, spatial relationships, and feedback. Motion is never decorative. It is functional.

**Rationale:** Motion without purpose is distraction. Purposeful motion reduces perceived latency, confirms actions, and guides attention.

### 1.6 Content First

Content is the interface. Design serves content, not the other way around. Layouts adapt to content length. Typography is sized for readability, not decoration.

**Rationale:** This is a content-driven platform. The domain model is the source of truth. Design is the delivery mechanism.

### 1.7 Accessibility

Accessibility is not a feature. It is a requirement. Every component must be usable by keyboard, screen reader, and switch device. Accessibility constraints drive better design for everyone.

**Rationale:** Excluding users is unethical. It also signals poor engineering. Accessibility is non-negotiable.

---

## 2. Brand Personality

Atlas is a person. If the site were a person, it would be:

### 2.1 Tone

- **Professional:** Polished, reliable, competent. Writes clean code and presents it cleanly.
- **Friendly:** Approachable, not cold. Uses plain language. Avoids jargon unless the audience is technical.
- **Curious:** Shows active learning, exploration, and growth. The "currently learning" section is prominent.
- **Calm:** No urgency, no hype, no anxiety. The site feels settled and trustworthy.
- **Confident:** Shows work without boasting. Let the projects and writing speak.

### 2.2 Never Arrogant

No "rockstar" or "ninja" language. No exaggerated claims. No stock photos of people pointing at screens. The design is confident enough to let the work stand on its own.

---

## 3. Emotional Goals

When a user visits Atlas, they should feel:

### 3.1 Trust

The site is well-built, maintained, and honest. Broken links or inconsistent styling erode trust immediately. A polished, error-free experience signals reliability.

**Design driver:** Consistent spacing, correct typography, no broken images, working links.

### 3.2 Curiosity

The user wants to read more, explore projects, and learn how things were built. The design invites exploration without forcing it.

**Design driver:** Clear hierarchy, whitespace, project cards that reward hover/click, compelling short descriptions.

### 3.3 Professionalism

The user recognizes that this is the work of a serious engineer. Attention to detail in typography, spacing, and motion signals care.

**Design driver:** Refined color choices, deliberate motion timing, attention to edge cases (404s, empty states).

### 3.4 Engineering Excellence

The site itself is a portfolio piece. Its construction demonstrates the same standards applied to Paul's engineering work.

**Design driver:** Clean component architecture, performant rendering, accessible markup, semantic HTML.

### 3.5 Calm

The site does not demand attention. It respects the user's focus. Colors are not jarring. Animations are subtle. The experience feels stable.

**Design driver:** Muted accent colors, minimal motion, generous whitespace, no auto-playing media.

### 3.6 Momentum

The user senses growth and forward motion. Timeline entries progress forward. Current learning is visible. Projects show iteration and improvement.

**Design driver:** Chronological ordering, "currently" labels, future improvements sections.

---

## 4. Color System

All colors serve a functional purpose. No decoration. Every color meets WCAG 2.1 AA contrast requirements.

### 4.1 Design Tokens

Colors are defined as design tokens with semantic names. Values are derived from a single source of truth.

### 4.2 Light Mode Palette

| Token | Purpose | Hex | Contrast (on white) |
|-------|---------|-----|---------------------|
| `color-primary` | Brand identity, links, active states | `#0969DA` | 4.6:1 |
| `color-primary-hover` | Interactive hover on primary | `#0550AE` | 5.2:1 |
| `color-secondary` | Secondary actions, subtle accents | `#57606A` | 4.5:1 |
| `color-accent` | Highlight, focus, call-to-action emphasis | `#1A7F37` | 4.6:1 |
| `color-success` | Positive feedback, availability | `#1A7F37` | 4.6:1 |
| `color-warning` | Caution, beta labels | `#9A6700` | 4.6:1 |
| `color-danger` | Errors, destructive actions | `#CF222E` | 5.2:1 |
| `color-info` | Informational messages | `#0969DA` | 4.6:1 |
| `color-bg` | Page background | `#FFFFFF` | — |
| `color-surface` | Cards, modals, elevated areas | `#F6F8FA` | — |
| `color-border` | Dividers, input borders | `#D0D7DE` | — |
| `color-text` | Primary body text | `#1F2328` | 13.5:1 |
| `color-text-secondary` | Secondary text, captions | `#656D76` | 4.6:1 |
| `color-muted` | Placeholder text, disabled states | `#8C959F` | 3.0:1 |
| `color-code-bg` | Inline and block code | `#F6F8FA` | — |
| `color-selection` | Text selection highlight | `#0969DA33` | — |
| `color-focus-ring` | Keyboard focus indicator | `#0969DA` | 3:1 on white |

### 4.3 Dark Mode Palette

Dark mode is a first-class experience, not an afterthought. Colors are not simply inverted. They are tuned for low-light readability.

| Token | Purpose | Hex | Contrast (on dark bg) |
|-------|---------|-----|----------------------|
| `color-bg` | Page background | `#0D1117` | — |
| `color-surface` | Cards, modals | `#161B22` | — |
| `color-border` | Dividers, input borders | `#30363D` | — |
| `color-text` | Primary body text | `#E6EDF3` | 12.6:1 |
| `color-text-secondary` | Secondary text | `#8B949E` | 4.6:1 |
| `color-muted` | Placeholder text | `#6E7681` | 3.0:1 |
| `color-primary` | Brand, links, active | `#58A6FF` | 4.6:1 |
| `color-primary-hover` | Interactive hover | `#79B8FF` | 5.5:1 |
| `color-accent` | Highlight, focus | `#3FB950` | 4.6:1 |
| `color-success` | Positive feedback | `#3FB950` | 4.6:1 |
| `color-warning` | Caution | `#D29922` | 4.6:1 |
| `color-danger` | Errors | `#F85149` | 5.2:1 |
| `color-info` | Informational | `#58A6FF` | 4.6:1 |
| `color-code-bg` | Code blocks | `#161B22` | — |
| `color-selection` | Text selection | `#58A6FF33` | — |
| `color-focus-ring` | Keyboard focus | `#58A6FF` | 3:1 on dark bg |

### 4.4 Color Usage Rules

- **Primary** is used for: links, active navigation, primary buttons, focus rings.
- **Secondary** is used for: secondary buttons, less important metadata, borders.
- **Accent** is used for: success states, availability badges, featured indicators.
- **Danger** is used for: error messages, destructive actions.
- **Warning** is used for: beta features, deprecated content warnings.
- **Info** is used for: informational banners, help text.
- **Surface** is used for: cards, modals, dropdown menus.
- **Text** hierarchy uses three levels: primary, secondary, muted. Never more.
- **Code blocks** use a distinct background that is clearly different from body text but not harsh.

### 4.5 Color Contrast Enforcement

- All text meets 4.5:1 minimum (3:1 for large text).
- Focus rings meet 3:1 against adjacent background.
- Contrast is checked in both light and dark modes.
- Automated checks run in CI (future).

---

## 5. Typography System

Typography is the primary carrier of hierarchy and personality. It must be highly readable and timeless.

### 5.1 Font Stack

| Role | Font | Weights | Fallback |
|------|------|---------|----------|
| Display / Headings | **Geist** (Vercel) | 400, 500, 600, 700 | `system-ui, -apple-system, sans-serif` |
| Body | **Geist** | 400, 500 | `system-ui, -apple-system, sans-serif` |
| Code | **Geist Mono** | 400, 500 | `ui-monospace, SFMono-Regular, monospace` |

**Why Geist:** Designed for UI. Clean, highly legible at small sizes, excellent hinting. It signals modern engineering without being trendy. It will age well. Alternative: Inter. Geist is preferred for its slightly more engineered feel.

### 5.2 Type Scale

| Token | Size | Line Height | Letter Spacing | Weight | Usage |
|-------|------|-------------|----------------|--------|-------|
| `text-display` | 48px / 3rem | 1.1 | -0.02em | 700 | Hero headings, page titles (desktop only) |
| `text-h1` | 36px / 2.25rem | 1.2 | -0.01em | 700 | Page headings |
| `text-h2` | 28px / 1.75rem | 1.3 | 0 | 600 | Section headings |
| `text-h3` | 22px / 1.375rem | 1.4 | 0 | 600 | Subsection headings |
| `text-h4` | 18px / 1.125rem | 1.5 | 0 | 600 | Card titles, component headings |
| `text-body-large` | 18px / 1.125rem | 1.6 | 0 | 400 | Lead paragraphs, introduction text |
| `text-body` | 16px / 1rem | 1.6 | 0 | 400 | Default body text |
| `text-small` | 14px / 0.875rem | 1.5 | 0 | 400 | Captions, metadata, helper text |
| `text-caption` | 12px / 0.75rem | 1.4 | 0.01em | 400 | Timestamps, labels |
| `text-code` | 14px / 0.875rem | 1.5 | 0 | 400 | Inline code |
| `text-button` | 14px / 0.875rem | 1.4 | 0 | 500 | Button labels |
| `text-nav` | 14px / 0.875rem | 1.4 | 0 | 500 | Navigation links |

### 5.3 Reading Width

- **Maximum measure:** 65ch (characters) for body text.
- **Optimal measure:** 55ch.
- **Why:** Lines longer than 75ch cause fatigue. Shorter than 45ch break rhythm. 65ch is the engineering standard.

### 5.4 Font Loading Strategy

- **Method:** `next/font` with `self-hosted: true`.
- **Subset:** Latin only.
- **Preload:** Display and H1 weights.
- **Swap:** All other weights use `font-display: swap`.
- **Fallback:** System fonts render first. Custom font swaps in without layout shift.

---

## 6. Spacing System

An 8-point grid. All spacing values are multiples of 4px, aligned to an 8px base for visual harmony.

### 6.1 Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Icon-to-text gaps, inline element spacing |
| `space-2` | 8px | Tight spacing, component padding (mobile) |
| `space-3` | 12px | Compact vertical rhythm |
| `space-4` | 16px | Default component padding, mobile section gaps |
| `space-5` | 24px | Card internal spacing, tablet gaps |
| `space-6` | 32px | Section vertical spacing (mobile) |
| `space-7` | 40px | Medium section spacing, tablet |
| `space-8` | 48px | Section vertical spacing (desktop) |
| `space-9` | 64px | Large section breaks, hero bottom spacing |
| `space-10` | 80px | Page-level vertical rhythm |
| `space-12` | 96px | Major section dividers |
| `space-16` | 128px | Hero section bottom, page bottom |

### 6.2 Usage Rules

- **Horizontal padding:** `space-4` (16px) on mobile, `space-6` (32px) on desktop.
- **Vertical section spacing:** `space-8` (48px) on mobile, `space-10` (80px) on desktop.
- **Component internal padding:** `space-5` (24px) for cards, `space-4` (16px) for compact elements.
- **Grid gaps:** `space-6` (32px) between columns.
- **Inline spacing:** `space-2` (8px) between icon and text, `space-3` (12px) between stacked inline elements.

### 6.3 Rationale

An 8-point grid creates visual harmony because 8 divides evenly into common screen widths (360, 768, 1024, 1280, 1536). It also aligns with Tailwind's default spacing scale, reducing custom configuration.

---

## 7. Layout System

### 7.1 Container Widths

| Breakpoint | Container Max Width | Gutters |
|------------|---------------------|---------|
| Mobile (< 640px) | 100% | `space-4` (16px) |
| Tablet (640px - 1024px) | 768px | `space-6` (32px) |
| Desktop (> 1024px) | 1024px | `space-6` (32px) |
| Ultra-wide (> 1536px) | 1280px | `space-8` (48px) |

**Why 1024px:** Wide enough for two-column layouts (text + sidebar), narrow enough to maintain readable line lengths. 1280px on ultra-wide prevents lines from stretching too far.

### 7.2 Grid System

- **Columns:** 12-column grid.
- **Gaps:** `space-6` (32px).
- **Responsive:** Single column on mobile, 2 columns on tablet, 3 columns on desktop for project grids.
- **Nesting:** Allowed. Nested grids inherit the same gap.

### 7.3 Responsive Breakpoints

| Name | Min Width | Max Width | Target |
|------|-----------|-----------|--------|
| `sm` | 640px | — | Large phones, small tablets |
| `md` | 768px | 1023px | Tablets |
| `lg` | 1024px | 1279px | Laptops, small desktops |
| `xl` | 1280px | 1535px | Desktops |
| `2xl` | 1536px | — | Ultra-wide |

**Mobile-first:** All base styles are mobile. Media queries add complexity upward.

### 7.4 Whitespace Philosophy

Whitespace is active. It separates content into scannable chunks. Sections have generous vertical spacing. Cards have internal padding. The user's eye is never overwhelmed.

**Rule:** If two elements feel cramped, add space. If a section feels empty, reduce space or add content. Never add decoration to fill space.

### 7.5 Reading Width

- Body text never exceeds 65ch.
- Narrower content (captions, metadata) can be narrower.
- Wider content (code blocks) can exceed 65ch with horizontal scroll.

---

## 8. Border Radius

Few values. Consistent usage.

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Small elements: tags, badges, inline buttons |
| `radius-md` | 8px | Cards, inputs, modals, code blocks |
| `radius-lg` | 12px | Hero sections, large cards, image containers |
| `radius-full` | 9999px | Pills, avatars, circular buttons |

### 8.1 Usage Rules

- **Cards:** `radius-md` (8px).
- **Buttons:** `radius-sm` (4px) for compact, `radius-md` (8px) for large.
- **Images:** `radius-lg` (12px) for project thumbnails, `radius-md` (8px) for avatars.
- **Code blocks:** `radius-md` (8px).
- **Pills (tags, status):** `radius-full`.

### 8.2 Rationale

Small radii feel engineered and precise. Large radii feel soft and friendly. A limited palette prevents inconsistency.

---

## 9. Shadow System

Shadows are subtle. They communicate elevation, not decoration.

### 9.1 Elevation Levels

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` | Flat cards, inputs |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.06)` | Hovered cards, dropdowns |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.08)` | Modals, floating elements |
| `shadow-focus` | `0 0 0 3px var(--color-focus-ring)` | Focus indicator |

### 9.2 Dark Mode Shadows

Shadows are reduced or removed in dark mode. On dark surfaces, elevation is communicated by border color (`color-border`) rather than shadow.

**Rationale:** Shadows on dark backgrounds look muddy. Borders are cleaner and more performant.

### 9.3 Usage Rules

- **Default cards:** `shadow-sm`.
- **Hover state:** `shadow-md`.
- **Modals:** `shadow-lg`.
- **No shadow on:** Code blocks, images, primary buttons.

---

## 10. Iconography

**Library:** Lucide React. Consistent stroke width. Clean, minimal, engineered aesthetic.

### 10.1 Sizes

| Token | Size | Usage |
|-------|------|-------|
| `icon-xs` | 12px | Inline with small text, badges |
| `icon-sm` | 16px | Buttons, inputs, inline links |
| `icon-md` | 20px | Navigation, card actions |
| `icon-lg` | 24px | Feature icons, empty states |
| `icon-xl` | 32px | Hero illustrations, large CTAs |

### 10.2 Stroke

- **Default:** `stroke-width: 2` (Lucide default).
- **Thin contexts:** `stroke-width: 1.5` for very small icons (`icon-xs`).
- **Never:** `stroke-width: 3` or higher. Lucide icons are designed for 2px.

### 10.3 Consistency Rules

- **One icon per concept:** Use the same Lucide icon for the same meaning everywhere (e.g., `Github` for GitHub links, `Linkedin` for LinkedIn).
- **No custom icons:** Unless absolutely necessary, do not create custom SVG icons. Lucide covers 90% of use cases.
- **Alignment:** Icons are centered with text using flexbox alignment, not manual margins.
- **Color:** Icons inherit `currentColor` unless they have semantic meaning (e.g., success icon uses `color-success`).

---

## 11. Component Inventory

Every UI component in Atlas, documented by purpose, variants, states, and accessibility.

### 11.1 Navigation

**Purpose:** Primary site navigation.  
**Variants:** Desktop (horizontal links), Mobile (hamburger + slide-out).  
**States:** Default, Active (current page), Hover, Focus.  
**Accessibility:** `<nav>` landmark, `aria-label="Main navigation"`, mobile menu toggles use `aria-expanded`, focus trapped in mobile menu when open.

### 11.2 Button

**Purpose:** Trigger actions, navigate, submit forms.  
**Variants:** Primary, Secondary, Ghost, Link.  
**States:** Default, Hover, Focus, Active (pressed), Disabled, Loading.  
**Accessibility:** `<button>` element for actions, `<a>` for navigation. Loading state uses `aria-busy="true"`. Disabled state uses `aria-disabled="true"`.

### 11.3 Card

**Purpose:** Group related content into a scannable unit.  
**Variants:** Project, Experience, Education, Article, Feature.  
**States:** Default, Hover (elevation increase, subtle scale), Focus (for keyboard users).  
**Accessibility:** Semantic container (`<article>` for independent content, `<div>` with `role="group"` for related items). Keyboard accessible when interactive.

### 11.4 Project Card

**Purpose:** Display a project summary on the projects page and homepage.  
**Variants:** Featured (larger, image prominent), Standard (compact, list view).  
**States:** Default, Hover (image zoom, shadow increase).  
**Accessibility:** Image has descriptive `alt`. Link wraps entire card or has clear "View project" CTA.

### 11.5 Timeline

**Purpose:** Display chronological events.  
**Variants:** Vertical (default), Compact (mobile).  
**States:** Default.  
**Accessibility:** `<ul>` with `<li>`. Dates are `<time>` elements with `datetime` attribute. No interactive timeline items in V1.

### 11.6 Skill Badge

**Purpose:** Display a skill with optional level indicator.  
**Variants:** Default (name only), With Level (name + level text), With Years (name + years).  
**States:** Default.  
**Accessibility:** Decorative badges use `aria-hidden`. Informational badges use `aria-label` if level is not visible.

### 11.7 Hero

**Purpose:** Page introduction. Used on homepage and section headers.  
**Variants:** Full (name, title, tagline, CTA), Compact (title only).  
**States:** Default.  
**Accessibility:** `<h1>` for page title. CTA is a button or link.

### 11.8 Footer

**Purpose:** Site-wide footer with social links and copyright.  
**Variants:** Default.  
**States:** Hover (link color change).  
**Accessibility:** `<footer>` landmark. Social links have `aria-label` describing destination.

### 11.9 Form (Contact)

**Purpose:** Collect user messages via EmailJS.  
**Variants:** Default.  
**States:** Default, Focus, Error, Success, Disabled (when `openToWork` is false).  
**Accessibility:** Every input has `<label>`. Errors use `aria-describedby` linked to error message. Success message uses `aria-live="polite"`.

### 11.10 Input

**Purpose:** Text input for contact form.  
**Variants:** Text, Email, Textarea.  
**States:** Default, Focus, Error, Disabled.  
**Accessibility:** `<label>` associated via `id`/`htmlFor`. Error state uses `aria-invalid="true"` and `aria-describedby`.

### 11.11 Toast

**Purpose:** Display transient feedback messages.  
**Variants:** Success, Error, Info.  
**States:** Enter, Visible, Exit.  
**Accessibility:** `role="status"`, `aria-live="polite"`. Auto-dismiss after 5 seconds. Dismissible via button.

### 11.12 Modal

**Purpose:** Display focused content or forms requiring user attention.  
**Variants:** Default.  
**States:** Open, Closed, Focus trap active.  
**Accessibility:** `role="dialog"`, `aria-modal="true"`, focus trapped, Escape key closes, initial focus set to first interactive element.

### 11.13 Accordion

**Purpose:** Expandable content sections.  
**Variants:** Single (one open at a time), Multiple (independent).  
**States:** Collapsed, Expanded, Disabled.  
**Accessibility:** `aria-expanded`, `aria-controls`, header is a `<button>`.

### 11.14 Tabs

**Purpose:** Switch between content panels.  
**Variants:** Default.  
**States:** Default, Active, Disabled.  
**Accessibility:** `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, arrow key navigation.

### 11.15 Code Block

**Purpose:** Display code snippets.  
**Variants:** Inline, Block (with copy button).  
**States:** Default, Copied (button text change).  
**Accessibility:** `<code>` for inline, `<pre>` for block. Copy button has `aria-label="Copy code"`. Copied state announces via `aria-live`.

### 11.16 Theme Switch

**Purpose:** Toggle between light and dark mode.  
**Variants:** Icon-only button.  
**States:** Light selected, Dark selected, System (default).  
**Accessibility:** `aria-label="Toggle theme"`, `aria-pressed` reflects current selection.

### 11.17 Empty State

**Purpose:** Communicate absence of content.  
**Variants:** No projects, No experience, No search results.  
**States:** Default.  
**Accessibility:** Heading explains the state. Optional action (e.g., "View all projects") is a link or button.

### 11.18 Loading State

**Purpose:** Indicate content is loading.  
**Variants:** Skeleton (shape mimics content), Spinner (indeterminate).  
**States:** Animating.  
**Accessibility:** `aria-busy="true"` on container. Skeleton uses `role="status"` with `aria-label="Loading"`.

### 11.19 Error State

**Purpose:** Communicate failures.  
**Variants:** Inline (form error), Page (404, 500).  
**States:** Default.  
**Accessibility:** `role="alert"` for inline errors. 404 page has heading and link to home.

---

## 12. Button System

Buttons are the primary interaction primitive.

### 12.1 Variants

| Variant | Background | Text Color | Border | Usage |
|---------|-----------|------------|--------|-------|
| Primary | `color-primary` | White | None | Main CTAs: "Contact me", "View project", "Download resume" |
| Secondary | Transparent | `color-primary` | 1px solid `color-primary` | Secondary actions: "View all projects", "Learn more" |
| Ghost | Transparent | `color-text-secondary` | None | Tertiary actions, icon buttons |
| Link | None | `color-primary` | None (underline on hover) | Inline actions, navigation within text |

### 12.2 Sizes

| Size | Height | Padding Horizontal | Font Size |
|------|--------|-------------------|-----------|
| Small | 32px | `space-3` (12px) | 14px |
| Medium | 40px | `space-4` (16px) | 14px |
| Large | 48px | `space-5` (24px) | 16px |

### 12.3 States

| State | Primary | Secondary | Ghost | Link |
|-------|---------|-----------|-------|------|
| Default | Solid `color-primary` | Transparent + border | Transparent | Underline on hover |
| Hover | `color-primary-hover` | Background `color-primary` (5% opacity) | Background `color-surface` | Underline, color `color-primary-hover` |
| Focus | `shadow-focus` ring | `shadow-focus` ring | `shadow-focus` ring | `shadow-focus` ring |
| Active | Slightly darker bg | Slightly darker bg | Slightly darker bg | No underline |
| Disabled | `color-muted` bg, `color-muted` text | `color-muted` text, `color-muted` border | `color-muted` text | `color-muted` text, no underline |
| Loading | Spinner replaces text, disabled | Spinner replaces text, disabled | Spinner replaces text, disabled | Text changes to "Loading..." |

### 12.4 Behavior

- **Full width on mobile:** Buttons span container width on screens < 640px.
- **Icon support:** Buttons can have leading or trailing icons. Icon-only buttons use `icon-md` (20px).
- **Loading:** Button is disabled during async action. Spinner is centered. Text remains visible for context.

---

## 13. Card System

Cards group related content into visual containers.

### 13.1 Project Card

**Purpose:** Display project summary.  
**Padding:** `space-5` (24px).  
**Elevation:** `shadow-sm` default, `shadow-md` hover.  
**Hover:** Image scales 1.02x (overflow hidden on container). Shadow increases. No color shift.  
**Responsive:** On mobile, cards stack full width. On desktop, 2-column or 3-column grid.  
**Structure:** Image top, content below. Image aspect ratio 16:9. Title, short description, tech stack badges, links.

### 13.2 Experience Card

**Purpose:** Display a single job entry.  
**Padding:** `space-5` (24px).  
**Elevation:** None (flat). Border only (`color-border`).  
**Hover:** Border color darkens to `color-text-secondary`.  
**Responsive:** On mobile, card stacks vertically with timeline connector on left. On desktop, timeline is a vertical line with cards alternating or inline.  
**Structure:** Company name, position, date range, location, description, tech stack.

### 13.3 Education Card

**Purpose:** Display education entry.  
**Padding:** `space-5` (24px).  
**Elevation:** None (flat). Border only.  
**Hover:** Border color darkens.  
**Responsive:** Similar to experience card.  
**Structure:** Institution, degree, field, date range, description, achievements.

### 13.4 Article Card

**Purpose:** Display blog post or writing summary (V2).  
**Padding:** `space-5` (24px).  
**Elevation:** `shadow-sm` default, `shadow-md` hover.  
**Hover:** Title color changes to `color-primary`.  
**Responsive:** Stack on mobile, 2-column on desktop.  
**Structure:** Title, excerpt, date, read time, tags.

### 13.5 Feature Card

**Purpose:** Highlight a key capability or service (V2).  
**Padding:** `space-6` (32px).  
**Elevation:** None. Centered text.  
**Hover:** Icon scales 1.1x.  
**Responsive:** 1 column mobile, 3 columns desktop.  
**Structure:** Icon, title, description.

### 13.6 Shared Card Rules

- **Border radius:** `radius-md` (8px).
- **Border:** 1px solid `color-border` for flat cards. No border for elevated cards (shadow defines edge).
- **Minimum height:** Cards in a grid align to the tallest card in the row.
- **Focus:** When card is interactive (link), focus ring wraps the entire card.

---

## 14. Motion Language

Motion is functional. It communicates state, spatial relationships, and feedback.

### 14.1 Duration Scale

| Token | Duration | Usage |
|-------|----------|-------|
| `duration-fast` | 150ms | Button press, checkbox toggle, micro-interactions |
| `duration-normal` | 250ms | Hover transitions, simple fades |
| `duration-slow` | 400ms | Page transitions, large element entrances |
| `duration-slower` | 600ms | Hero animations, staggered list entrances |

### 14.2 Easing

| Token | Value | Usage |
|-------|-------|-------|
| `ease-out` | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Enter animations, hover expansions |
| `ease-in` | `cubic-bezier(0.4, 0.0, 1, 1)` | Exit animations, collapsing |
| `ease-in-out` | `cubic-bezier(0.4, 0.0, 0.2, 1)` | State changes, toggles |
| `spring` | Framer Motion spring config | Modals, drawers, draggable elements |

**Rationale:** `ease-out` feels natural for elements appearing. `ease-in` feels natural for elements disappearing. Material Design curves are well-tested and predictable.

### 14.3 Entrance Animations

- **Page transition:** Fade in (`opacity: 0 → 1`, `duration-slow`) + slight upward slide (`y: 12px → 0`, `duration-slow`).
- **Section entrance:** Fade in + slide up (`y: 16px → 0`, `duration-normal`) triggered by Intersection Observer.
- **Stagger:** List items delay 50ms each (`duration-normal`, staggered).

### 14.4 Exit Animations

- **Page exit:** Fade out only (`opacity: 1 → 0`, `duration-fast`). No slide to avoid layout shift.
- **Element exit:** Fade out + slight shrink (`scale: 1 → 0.98`, `duration-fast`).

### 14.5 Hover Animations

- **Cards:** Shadow transition (`shadow-sm` → `shadow-md`, `duration-normal`). Image scale 1.02x (`duration-normal`).
- **Buttons:** Background color transition (`duration-fast`).
- **Links:** Underline slide from left (`duration-fast`).

### 14.6 Loading Animations

- **Skeleton:** Pulse opacity (`0.4 → 1`, `duration-normal`, infinite loop). No transform.
- **Spinner:** Rotate 360deg (`duration-slower`, linear, infinite).

### 14.7 Scroll Animations

- **Trigger:** Intersection Observer with 100px root margin.
- **Animation:** Fade in + slide up (`y: 16px → 0`, `duration-normal`).
- **One-shot:** Elements animate only on first entry. Re-entering viewport does not re-trigger.

### 14.8 Reduced Motion

- **Global flag:** `prefers-reduced-motion: reduce`.
- **Behavior:** All durations become 0ms. Transforms are disabled. Only opacity changes remain (if essential).
- **Implementation:** `useReducedMotion` hook wraps all motion components.

### 14.9 Micro Interactions

- **Button press:** Scale 0.98 (`duration-fast`).
- **Input focus:** Border color transition + subtle ring expansion (`duration-fast`).
- **Success checkmark:** Draw SVG path (`duration-normal`).
- **Copy to clipboard:** Button text changes to "Copied!" for 2 seconds (`duration-normal`).

---

## 15. Responsive Philosophy

**Mobile-first.** Base styles are for the smallest screen. Complexity increases with breakpoints.

### 15.1 Mobile (< 640px)

- **Layout:** Single column. Full-width cards.
- **Typography:** `text-h1` 28px, `text-h2` 22px. Slightly smaller to preserve vertical space.
- **Navigation:** Hamburger menu. Slide-out from right.
- **Cards:** Stacked vertically. No side-by-side.
- **Spacing:** Reduced vertical spacing (`space-6` instead of `space-8`).
- **Touch targets:** Minimum 44px height (Apple HIG recommendation).

### 15.2 Tablet (640px - 1024px)

- **Layout:** 2-column grid where appropriate. Side-by-side cards.
- **Typography:** Standard scale restored.
- **Navigation:** Horizontal links visible. Hamburger hidden.
- **Spacing:** Standard spacing restored.

### 15.3 Desktop (> 1024px)

- **Layout:** Max-width container 1024px. 2 or 3-column grids.
- **Typography:** Full scale. `text-display` enabled for hero.
- **Navigation:** Horizontal with hover underline.
- **Hover effects:** Full fidelity. Shadow transitions, image zooms.

### 15.4 Ultra-wide (> 1536px)

- **Container:** 1280px max-width. Prevents lines from stretching too far.
- **Grid:** 3 columns for projects. 2 columns for experience.
- **Whitespace:** Increased section spacing (`space-12`).

### 15.5 Adaptations

- **No horizontal scroll:** Content never overflows horizontally.
- **Images:** Responsive `sizes` attribute prevents over-downloading.
- **Typography:** Fluid typography between breakpoints using `clamp()`.

---

## 16. Accessibility Standards

**Target:** WCAG 2.1 Level AA.

### 16.1 Focus Indicators

- **Rule:** Every interactive element has a visible focus indicator.
- **Style:** 2px solid `color-focus-ring` offset by 2px (`shadow-focus`). 3:1 contrast against background.
- **Why:** Keyboard users need to know focus position. Default browser outlines are often insufficient and inconsistent.

### 16.2 Contrast

- **Rule:** Text meets 4.5:1 (normal) or 3:1 (large text) against background.
- **Enforcement:** Manual checking during design review. Automated via tooling in CI (future).
- **Why:** Low contrast excludes users with visual impairments.

### 16.3 Keyboard Navigation

- **Rule:** All interactive elements are focusable via `Tab`. Focus order matches visual order.
- **Skip links:** "Skip to content" link appears on focus.
- **Custom components:** Tabs, accordions, modals implement roving tabindex or arrow key navigation per WAI-ARIA Authoring Practices.

### 16.4 Screen Readers

- **Images:** Descriptive `alt` text. Decorative images have `alt=""`.
- **Forms:** Every input has a `<label>`. Errors use `aria-describedby`.
- **Landmarks:** `<header>`, `<nav>`, `<main>`, `<footer>` used correctly.
- **Headings:** Hierarchical (`<h1>` → `<h2>` → `<h3>`), no skipping levels.

### 16.5 Reduced Motion

- **Rule:** `prefers-reduced-motion: reduce` disables all animations.
- **Implementation:** `useReducedMotion` hook. Animations collapse to opacity changes or are removed.
- **Why:** Vestibular disorders make motion a barrier.

### 16.6 Touch Targets

- **Rule:** Minimum 44x44px for all interactive elements on touch devices.
- **Why:** Apple HIG and Material Design guidelines. Prevents missed taps.

### 16.7 Semantic HTML

- **Rule:** Use native HTML elements: `<button>`, `<a>`, `<nav>`, `<main>`, `<article>`, `<section>`.
- **Why:** Screen readers understand native semantics. `<div>` soup is inaccessible.

### 16.8 ARIA

- **Rule:** ARIA is used only when semantic HTML is insufficient.
- **Examples:** `aria-expanded` on toggles, `aria-label` on icon-only buttons, `aria-live` for dynamic updates.
- **Why:** Over-ARIA breaks screen reader expectations.

---

## 17. Illustration Style

Atlas uses photography and code, not illustrations.

### 17.1 Photography

- **Usage:** Profile photo only.
- **Style:** Clean, professional headshot. Neutral background. Good lighting.
- **Why:** Personal connection. Recruiters want to see the person.

### 17.2 Code Snippets

- **Usage:** Inline code and code blocks in project descriptions.
- **Style:** Monospace font, syntax highlighting (minimal: keywords, strings, comments).
- **Why:** Demonstrates engineering skill. Code is native to the audience.

### 17.3 Diagrams

- **Usage:** Architecture diagrams in project descriptions (V2).
- **Style:** Minimal line art. No color beyond grayscale and primary accent.
- **Why:** Communicates technical decisions without decoration.

### 17.4 No Illustrations

- **Decision:** Custom illustrations, avatars, and decorative art are excluded.
- **Why:** Illustrations age poorly, require ongoing maintenance, and add bundle weight. Photography and code are timeless and relevant.

---

## 18. Image Guidelines

### 18.1 Aspect Ratios

| Context | Ratio | Dimensions (px) |
|---------|-------|-----------------|
| Profile photo | 1:1 | 400x400 |
| Project hero | 16:9 | 1280x720 |
| Project card | 16:9 | 640x360 |
| Project gallery | 16:9 | 1280x720 |
| Open Graph | 1.91:1 | 1200x630 |

### 18.2 Optimization

- **Format:** Next.js `next/image` serves AVIF/WebP automatically.
- **Quality:** 80% for photos, 90% for screenshots.
- **Size:** Responsive `sizes` attribute prevents over-downloading.
- **Lazy loading:** Below-fold images use native lazy loading. Hero images use `priority`.

### 18.3 Cropping

- **Rule:** Important content must be within the "safe zone" (center 80% of frame).
- **Why:** Responsive cropping may crop edges.

### 18.4 Fallback Behavior

- **Missing image:** `onError` handler replaces with `/images/placeholder.png`.
- **Placeholder:** Neutral gray background with subtle icon or text.

---

## 19. Empty States

Empty states are honest. They do not shame the user.

### 19.1 No Projects

**Behavior:** Projects section is not rendered.  
**Rationale:** A "No projects yet" message implies incompleteness. If there are no projects, the section should not exist.

### 19.2 No Experience

**Behavior:** Experience section is not rendered.  
**Rationale:** Same as above.

### 19.3 No Articles

**Behavior:** Blog section is not rendered (V2).  
**Rationale:** Same as above.

### 19.4 No Timeline

**Behavior:** Timeline section is not rendered.  
**Rationale:** If there are no events, the section adds no value.

### 19.5 No Search Results

**Behavior:** Search results area shows "No results found for [query]" with a link to clear search.  
**Rationale:** Search is a user-initiated action. Silence is confusing. A clear message with recovery action is required.

### 19.6 General Rule

If a section would be empty, remove the entire section from the render tree. Do not render placeholders, "coming soon" messages, or apologetic text. The absence of content is not an error state.

---

## 20. Loading States

Loading states maintain layout stability and reduce perceived latency.

### 20.1 Skeleton Screens

- **Usage:** Project cards, experience entries, timeline items.
- **Shape:** Skeleton mimics the shape and size of the final content.
- **Animation:** Pulse opacity (`0.4 → 1`, `duration-normal`, infinite).
- **Rationale:** Skeleton screens preserve layout and reduce cumulative layout shift (CLS).

### 20.2 Spinners

- **Usage:** Form submission, button loading states.
- **Animation:** Rotate 360deg (`duration-slower`, linear, infinite).
- **Rationale:** Spinners indicate indeterminate wait time. Skeletons indicate content loading.

### 20.3 Lazy Loading

- **Images:** Below-fold images use `next/image` lazy loading.
- **Components:** Non-critical sections use `next/dynamic` with skeleton placeholder (V2).
- **Rationale:** Reduces initial bundle and improves LCP.

### 20.4 Perceived Performance

- **Streaming:** Server Components stream HTML. Critical content appears first.
- **Skeleton preview:** Show skeleton immediately while content loads.
- **Optimistic UI:** Form submissions show success state before EmailJS confirms (revert on error).

---

## 21. Error States

Errors are communicated clearly. The user always knows what happened and what to do next.

### 21.1 404 Not Found

**Behavior:** 
- Custom `not-found.js` renders a styled page.
- Heading: "Page not found".
- Body: "The page you are looking for does not exist or has been moved."
- Action: "Return home" link.
- No redirect loop.

### 21.2 500 Server Error

**Behavior:**
- Custom `error.js` renders a styled page.
- Heading: "Something went wrong".
- Body: "We are experiencing technical difficulties. Please try again later."
- Action: "Return home" link, "Retry" button.
- Error is logged with context.

### 21.3 Missing Content

**Behavior:**
- Section is not rendered (see Empty States).
- Build fails if required JSON is missing.
- Console warning if optional JSON is missing.

### 21.4 Broken Images

**Behavior:**
- `next/image` `onError` handler replaces with `/images/placeholder.png`.
- Placeholder has neutral gray background and subtle icon.
- No broken image icon visible.

### 21.5 Network Errors

**Behavior:**
- Contact form: "Message could not be sent. Please try again or email directly at [email]."
- Email address is a `mailto:` link.
- Form state preserved.
- Error logged to console.

### 21.6 Form Validation Errors

**Behavior:**
- Inline error message below the field.
- Field border changes to `color-danger`.
- `aria-invalid="true"` set on input.
- Error message linked via `aria-describedby`.
- Focus moves to first error field on submit.

---

## 22. Future Evolution

This design system must evolve over 10+ years without becoming inconsistent.

### 22.1 Versioning

- **Design tokens** are versioned in a single file (e.g., `tokens.json`).
- **Component changes** are tracked in the component inventory.
- **Breaking changes** require a major version bump and migration guide.

### 22.2 Governance

- **Single source of truth:** Design tokens live in one place. No hardcoded values in components.
- **Change process:** Any token or component change requires design review and engineering sign-off.
- **Documentation:** Every change is documented in the DSS and ADRs.

### 22.3 Deprecation

- **Old tokens:** Deprecated tokens remain functional for one major version. Then removed.
- **Old components:** Deprecated components are archived, not deleted, for reference.

### 22.4 Expansion Path

- **New components:** Follow the component inventory template. Document purpose, variants, states, accessibility before implementation.
- **New tokens:** Add to the appropriate scale (color, spacing, typography, motion). Do not create one-off values.
- **New patterns:** Document in the DSS before implementing. Patterns must align with existing principles.

### 22.5 Anti-Patterns

- **No hardcoded values:** Never use `#FFFFFF` or `16px` directly. Use tokens.
- **No one-off components:** If a component is needed only once, it is still added to the inventory and documented.
- **No breaking changes without migration:** Changing a token value is fine. Removing a token or changing its type is a breaking change requiring a migration path.

---

## Appendix A: Design Token Map

A mapping of semantic tokens to Tailwind configuration.

| Token | Tailwind Config Path |
|-------|---------------------|
| `color-primary` | `colors.primary` |
| `color-primary-hover` | `colors.primary.hover` |
| `color-secondary` | `colors.secondary` |
| `color-accent` | `colors.accent` |
| `color-success` | `colors.success` |
| `color-warning` | `colors.warning` |
| `color-danger` | `colors.danger` |
| `color-info` | `colors.info` |
| `color-bg` | `colors.background` |
| `color-surface` | `colors.surface` |
| `color-border` | `colors.border` |
| `color-text` | `colors.text.primary` |
| `color-text-secondary` | `colors.text.secondary` |
| `color-muted` | `colors.text.muted` |
| `color-code-bg` | `colors.code.background` |
| `color-focus-ring` | `colors.focus` |

## Appendix B: Component State Matrix

| Component | Default | Hover | Focus | Active | Disabled | Loading | Error | Success |
|-----------|---------|-------|-------|--------|----------|---------|-------|---------|
| Button | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| Input | ✅ | — | ✅ | — | ✅ | — | ✅ | — |
| Card | ✅ | ✅ | ✅ | — | — | — | — | — |
| Link | ✅ | ✅ | ✅ | — | — | — | — | — |
| Toggle | ✅ | — | ✅ | ✅ | ✅ | — | — | ✅ |
| Modal | — | — | ✅ | — | — | — | — | — |

---

## Conclusion

This Design System Specification defines the visual language of Project Atlas. It is engineered for simplicity, consistency, and long-term evolution. Every token, component, and pattern serves a purpose. The system is designed to age well, scale gracefully, and remain accessible to all users.

**Design elegance is not about adding more. It is about removing everything that does not serve the user.**