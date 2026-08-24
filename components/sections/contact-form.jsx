'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { init, send } from '@emailjs/browser'
import { AlertCircle, ArrowRight, BriefcaseBusiness, CheckCircle2, Clock3, Code2, ExternalLink, Mail, MapPin, Phone, Send as SendIcon } from 'lucide-react'
import { site } from '@/lib/constants/site'
import { loadProfile } from '@/lib/loaders/profile'
import { cn } from '@/lib/utils/cn'

const HONEYPOT_NAME = 'website'

function formatAvailability(dateStr) {
  if (!dateStr) return 'Open to opportunities'
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return 'Open to opportunities'
  return `Available from ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
}

function FieldError({ id, message }) {
  if (!message) return null
  return <p id={id} className="mt-1 text-xs text-danger">{message}</p>
}

function ContactCard({ href, icon: Icon, label, value, external = false }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-start gap-3 rounded-lg border border-border bg-background p-4 transition-all hover:border-text-secondary/20 hover:bg-surface/60 hover:shadow-sm"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">{label}</span>
        <span className="mt-1 block break-words text-sm font-medium text-text group-hover:text-primary">{value}</span>
      </span>
      {external && <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-text-secondary" />}
    </a>
  )
}

function ContactHero({ profile }) {
  return (
    <div className="max-w-3xl">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Contact</span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-text md:text-5xl md:leading-tight">
        Let&apos;s talk about the product, the stack, and where I can help.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
        I am open to backend, full-stack, and software engineering opportunities, internships, collaborations, and practical product work where reliability and shipped execution matter.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {profile.availability.preferredRoles.map((role) => (
          <span key={role} className="rounded-md bg-surface px-2.5 py-1.5 text-xs font-medium text-text-secondary">
            {role}
          </span>
        ))}
      </div>
    </div>
  )
}

function ContactSidebar({ profile }) {
  const details = [
    {
      icon: BriefcaseBusiness,
      label: 'Availability',
      value: formatAvailability(profile.availability.availableFrom),
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
    },
    {
      icon: Clock3,
      label: 'Best fit',
      value: 'Backend APIs, full-stack products, AI-assisted workflows, testing, and deployment.',
    },
  ]

  return (
    <aside className="space-y-6">
      <div className="rounded-lg border border-border bg-surface/50 p-6">
        <h2 className="text-lg font-semibold text-text">Direct channels</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Prefer email for role discussions or project details. LinkedIn is good for quick professional introductions.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3">
          <ContactCard href={`mailto:${site.email}`} icon={Mail} label="Email" value={site.email} />
          <ContactCard href={`tel:${site.phone.replace(/\s/g, '')}`} icon={Phone} label="Phone" value={site.phone} />
          <ContactCard href={site.linkedin} icon={BriefcaseBusiness} label="LinkedIn" value="FOKOUA PAUL EMMANUEL" external />
          <ContactCard href={site.github} icon={Code2} label="GitHub" value="Chipser-Paul" external />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-text">Before you write</h2>
        <dl className="mt-5 space-y-5">
          {details.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{item.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-text">{item.value}</dd>
                </div>
              </div>
            )
          })}
        </dl>
      </div>
    </aside>
  )
}

export function ContactForm() {
  const profile = loadProfile()
  const [status, setStatus] = useState('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', email: '', subject: '', message: '', [HONEYPOT_NAME]: '' },
  })

  const onSubmit = async (values) => {
    if (values[HONEYPOT_NAME]) return
    setStatus('sending')

    try {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

      if (!publicKey || !serviceId || !templateId) {
        throw new Error('EmailJS is not configured')
      }

      init(publicKey)
      await send(serviceId, templateId, {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      }, publicKey)

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <ContactHero profile={profile} />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <ContactSidebar profile={profile} />

        <div className="rounded-lg border border-border bg-background p-6 shadow-sm md:p-8">
          <div className="mb-8 flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Send a message</span>
            <h2 className="text-2xl font-semibold tracking-tight text-text">Tell me what you are building or hiring for.</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
              Share the role, project context, timeline, stack, or the problem you want solved. I will reply with the next useful step.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register(HONEYPOT_NAME)} />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-text">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  {...register('name', {
                    required: 'Please enter your name.',
                    minLength: { value: 2, message: 'Please enter your name.' },
                  })}
                  className={cn(
                    'w-full rounded-md border bg-background px-3 py-2.5 text-sm text-text transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring',
                    errors.name ? 'border-danger' : 'border-border'
                  )}
                />
                <FieldError id="name-error" message={errors.name?.message} />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-text">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email', {
                    required: 'Please enter a valid email address.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address.',
                    },
                  })}
                  className={cn(
                    'w-full rounded-md border bg-background px-3 py-2.5 text-sm text-text transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring',
                    errors.email ? 'border-danger' : 'border-border'
                  )}
                />
                <FieldError id="email-error" message={errors.email?.message} />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-text">
                Subject <span className="text-danger">*</span>
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Backend Engineer role, collaboration request, or project idea"
                aria-invalid={errors.subject ? 'true' : 'false'}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                {...register('subject', {
                  required: 'Please enter a subject.',
                  minLength: { value: 3, message: 'Please enter a subject.' },
                })}
                className={cn(
                  'w-full rounded-md border bg-background px-3 py-2.5 text-sm text-text transition-colors placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-focus-ring',
                  errors.subject ? 'border-danger' : 'border-border'
                )}
              />
              <FieldError id="subject-error" message={errors.subject?.message} />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-text">
                Message <span className="text-danger">*</span>
              </label>
              <textarea
                id="message"
                rows={7}
                placeholder="A few details about the role, project, timeline, stack, or what you would like me to help with."
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error message-help' : 'message-help'}
                {...register('message', {
                  required: 'Please enter a message.',
                  minLength: { value: 20, message: 'Please enter at least 20 characters.' },
                  maxLength: { value: 2000, message: 'Message must be under 2000 characters.' },
                })}
                className={cn(
                  'w-full resize-y rounded-md border bg-background px-3 py-2.5 text-sm text-text transition-colors placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-focus-ring',
                  errors.message ? 'border-danger' : 'border-border'
                )}
              />
              <p id="message-help" className="mt-1 text-xs text-text-secondary">
                Minimum 20 characters. Keep sensitive company details out of the first message if needed.
              </p>
              <FieldError id="message-error" message={errors.message?.message} />
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting || status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting || status === 'sending' ? 'Sending...' : 'Send message'}
                <SendIcon className="h-4 w-4" />
              </button>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
              >
                Email directly
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {status === 'success' && (
              <div className="flex gap-3 rounded-lg border border-success/20 bg-success/10 p-4 text-sm text-success" role="status">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <p>Thanks - your message has been sent. I will get back to you as soon as I can.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="flex gap-3 rounded-lg border border-danger/20 bg-danger/10 p-4 text-sm text-danger" role="alert">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  Something went wrong while sending your message. Please try again or contact me directly at{' '}
                  <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
