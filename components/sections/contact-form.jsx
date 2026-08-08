'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { init, send } from '@emailjs/browser'
import { site } from '@/lib/constants/site'
import { loadProfile } from '@/lib/loaders/profile'
import { Mail } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const HONEYPOT_NAME = 'website'

function ContactHero() {
  const profile = loadProfile()
  return (
    <div className="mb-10">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">Contact</span>
      <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-text">
        Let&apos;s build something useful.
      </h1>
      <p className="mt-3 text-sm md:text-base text-text-secondary max-w-xl">
        I&apos;m open to software engineering opportunities, backend and full-stack development roles, internships, and professional collaboration.
        If you&apos;re working on something meaningful, I&apos;d like to hear about it.
      </p>
    </div>
  )
}

function ContactOptions() {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <a
        href={`mailto:${site.email}`}
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text transition-colors"
      >
        <Mail className="h-4 w-4" />
        {site.email}
      </a>
      <a
        href={site.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-text-secondary hover:text-text transition-colors"
      >
        LinkedIn
      </a>
      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-text-secondary hover:text-text transition-colors"
      >
        GitHub
      </a>
    </div>
  )
}

export function ContactForm() {
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
      <div className="max-w-2xl">
        <ContactHero />
        <ContactOptions />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6" noValidate>
          <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register(HONEYPOT_NAME)} />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
              Name <span className="text-danger">*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register('name', {
                required: 'Please enter your name.',
                minLength: { value: 2, message: 'Please enter your name.' },
              })}
              className={cn(
                'w-full rounded-md border px-3 py-2 text-sm bg-background text-text focus:outline-none focus:ring-2 focus:ring-focus-ring',
                errors.name ? 'border-danger' : 'border-border'
              )}
            />
            {errors.name && <p id="name-error" className="mt-1 text-xs text-danger">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
              Email <span className="text-danger">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email', {
                required: 'Please enter a valid email address.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address.',
                },
              })}
              className={cn(
                'w-full rounded-md border px-3 py-2 text-sm bg-background text-text focus:outline-none focus:ring-2 focus:ring-focus-ring',
                errors.email ? 'border-danger' : 'border-border'
              )}
            />
            {errors.email && <p id="email-error" className="mt-1 text-xs text-danger">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-text mb-1">
              Subject <span className="text-danger">*</span>
            </label>
            <input
              id="subject"
              type="text"
              {...register('subject', {
                required: 'Please enter a subject.',
                minLength: { value: 3, message: 'Please enter a subject.' },
              })}
              className={cn(
                'w-full rounded-md border px-3 py-2 text-sm bg-background text-text focus:outline-none focus:ring-2 focus:ring-focus-ring',
                errors.subject ? 'border-danger' : 'border-border'
              )}
            />
            {errors.subject && <p id="subject-error" className="mt-1 text-xs text-danger">{errors.subject.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              {...register('message', {
                required: 'Please enter a message.',
                minLength: { value: 20, message: 'Please enter at least 20 characters.' },
                maxLength: { value: 2000, message: 'Message must be under 2000 characters.' },
              })}
              className={cn(
                'w-full rounded-md border px-3 py-2 text-sm bg-background text-text focus:outline-none focus:ring-2 focus:ring-focus-ring resize-y',
                errors.message ? 'border-danger' : 'border-border'
              )}
            />
            {errors.message && <p id="message-error" className="mt-1 text-xs text-danger">{errors.message.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || status === 'sending' ? 'Sending...' : 'Send message'}
            </button>
          </div>

          {status === 'success' && (
            <p className="text-sm text-success" role="status">
              Thanks — your message has been sent. I&apos;ll get back to you as soon as I can.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-danger" role="alert">
              Something went wrong while sending your message. Please try again or contact me directly at{' '}
              <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}