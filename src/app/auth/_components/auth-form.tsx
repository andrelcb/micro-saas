'use client'

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

export function AuthForm() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn('nodemailer', { email: data.email, redirect: false })
      toast({
        title: 'Magic link sent',
        description: 'Check your email for the magic link',
      })
    } catch (error) {
      toast({
        title: 'Magic link sent',
        description:
          'An Error occurred sending the magic link. Please try again.',
      })
    }
  })

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          Sign in with Magic Link
        </CardTitle>
        <CardDescription>
          Enter your email below and well send you a magic link to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...form.register('email')}
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <Button className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'sending...' : 'Send magic link'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <Link className="underline" href="#">
            Enter password instead
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
