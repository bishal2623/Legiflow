"use client"
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'
import { contactSchema, ContactFormValues } from '@/lib/contactSchema'
import { useToast } from '@/hooks/use-toast'

type ContactSubmissionResult =
  | { success: true }
  | { success: false; error: string }

export default function useContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
    mode: 'onTouched',
  })

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true)
    setSuccess(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = (await res.json()) as { success?: boolean; error?: string }
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed')
      }
      form.reset()
      setSuccess(true)
      toast({ title: 'Message sent', description: 'Thanks — we will respond shortly.' })
      return { success: true }
    } catch (err) {
      console.error('Contact form submission failed:', err)
      toast({ title: 'Error', description: 'Unable to send message. Please try again later.' })
      return { success: false, error: err instanceof Error ? err.message : 'Submission failed' }
    } finally {
      setIsSubmitting(false)
    }
  }

  return { form, onSubmit, isSubmitting, success } as {
    form: UseFormReturn<ContactFormValues>
    onSubmit: (values: ContactFormValues) => Promise<ContactSubmissionResult>
    isSubmitting: boolean
    success: boolean
  }
}
