import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { contactSchema } from '@/lib/contactSchema'
import { addContactMessage } from '@/lib/contactFirestore'
import type { ContactFormValues } from '@/lib/contactSchema'

type ContactApiResponse =
  | { success: true; id: string }
  | { success: false; error: string; validationErrors?: Record<string, string[] | undefined> }

export async function POST(request: Request) {
  try {
    let body: unknown
    try {
      body = await request.json()
    } catch (parseError: unknown) {
      console.error('API /api/contact invalid JSON:', parseError)
      return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
    }

    let parsed: ContactFormValues
    try {
      parsed = contactSchema.parse(body)
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: 'Validation failed',
            validationErrors: error.flatten().fieldErrors,
          } satisfies ContactApiResponse,
          { status: 400 }
        )
      }

      throw error
    }

    const id = await addContactMessage(parsed)
    return NextResponse.json({ success: true, id } satisfies ContactApiResponse)
  } catch (error: unknown) {
    console.error('API /api/contact error:', error)
    return NextResponse.json({ success: false, error: 'Server error' } satisfies ContactApiResponse, { status: 500 })
  }
}
