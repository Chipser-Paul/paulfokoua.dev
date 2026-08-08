# Portfolio Finalization Notes

## Portfolio Status
Feature-complete and ready for deployment pending manual assets.

## Production Routes
- `/` — Homepage
- `/about` — About page
- `/projects` — Projects index
- `/projects/cameroon-tech-jobs` — Project case study
- `/projects/trading-bot` — Project case study (B.Tech Capstone)
- `/projects/hospital-management-system` — Project case study
- `/experience` — Experience page
- `/resume` — Resume (print-to-PDF ready)
- `/contact` — Contact form
- `/sitemap.xml` — SEO sitemap
- `/robots.txt` — Crawl rules

## Verified Content Sources
- `content/profile.json`
- `content/experience.json`
- `content/education.json`
- `content/skills.json`
- `content/timeline.json`
- `content/social.json`
- `content/projects/*.json`

## Manual Assets Still Required

### Project Screenshots
The following directories exist but contain no screenshots:

- `public/images/projects/cameroon-tech-jobs/`
- `public/images/projects/trading-bot/`
- `public/images/projects/hospital-management-system/`

**Action required:** Provide real screenshots for each project. Do not use stock images or AI-generated fake interfaces.

Suggested screenshots per project:

**CameroonTechJobs**
- Dashboard or main interface
- Job listing or search workflow
- Authentication or employer/candidate view

**Algorithmic Trading Bot**
- MT5 interface or analysis output
- Diagnostic/logging output
- Strategy configuration or backtest result (if visually meaningful)

**Hospital Management System**
- Login or dashboard
- Appointment or patient management view
- Pharmacy/billing interface

### Resume PDF
No static PDF is currently integrated. The resume page (`/resume`) supports browser print-to-PDF.

**Action required:** Provide a verified resume PDF named something like:
`FOKOUA-PAUL-EMMANUEL-Software-Engineer-Resume.pdf`

Once provided, it can be integrated into the resume page.

## External URLs Requiring Verification

| URL | Status | Notes |
|-----|--------|-------|
| `https://github.com/Chipser-Paul` | UNVERIFIED | User-confirmed, but not externally verified |
| `https://linkedin.com/in/paulfokoua` | UNVERIFIED | User-confirmed, but not externally verified |
| `https://paulfokoua.dev` | VERIFIED | Canonical domain |
| `https://github.com/paulfokoua/cameroon-tech-jobs` | UNVERIFIED | Repository URL |
| `https://github.com/paulfokoua/trading-bot` | UNVERIFIED | Repository URL |
| `https://github.com/paulfokoua/hospital-management-system` | UNVERIFIED | Repository URL |

## Deployment Checklist

- [ ] Provide project screenshots
- [ ] Provide verified resume PDF
- [ ] Configure EmailJS dashboard:
  - [ ] Set service ID
  - [ ] Set template ID
  - [ ] Set public key
  - [ ] Enable domain restriction for `paulfokoua.dev`
- [ ] Set production environment variables in hosting platform
- [ ] Deploy to Vercel (or chosen platform)
- [ ] Test all routes in production
- [ ] Test contact form in production
- [ ] Verify sitemap and robots in production
- [ ] Verify canonical URLs in production

## EmailJS Dashboard Checklist
- Service ID: `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- Template ID: `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- Public Key: `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- Domain restriction: Enable for `paulfokoua.dev`

## Screenshot Checklist
- [ ] `public/images/projects/cameroon-tech-jobs/` — screenshots added
- [ ] `public/images/projects/trading-bot/` — screenshots added
- [ ] `public/images/projects/hospital-management-system/` — screenshots added

## Post-Deployment Testing Checklist
- [ ] All pages load without errors
- [ ] Navigation works on desktop and mobile
- [ ] Theme toggle works
- [ ] Contact form submits successfully
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] Robots is accessible at `/robots.txt`
- [ ] 404 page works for invalid project slugs
- [ ] Resume print layout is clean
- [ ] All external links open correctly
- [ ] OpenGraph metadata is present
