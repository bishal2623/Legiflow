"use client"
import React from 'react'
import useContactForm from '@/hooks/useContactForm'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function ContactForm(): JSX.Element {
  const { form, onSubmit, isSubmitting, success } = useContactForm()
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto mt-6 space-y-4"
      noValidate
    >
      <div>
        <label className="block text-sm font-medium text-muted-foreground">Name</label>
        <Input
          {...register('name')}
          placeholder="Your full name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground">Email</label>
        <Input
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground">Message</label>
        <Textarea
          {...register('message')}
          placeholder="How can we help? Provide as much detail as you can."
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive mt-1">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
        {success && <p className="text-sm text-green-600">Message sent — thank you!</p>}
      </div>
    </form>
  )
}
