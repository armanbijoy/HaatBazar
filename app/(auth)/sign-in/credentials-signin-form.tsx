'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { signInDefaultValues } from '@/lib/constants'



const CredentialSignInForm = () => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (res?.error) {
      setErrorMessage(res.error)
    } else {
      // Optional: redirect manually
      window.location.href = '/'
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
 
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={signInDefaultValues.email}
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          defaultValue={signInDefaultValues.password}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>

      {errorMessage && (
        <div className="text-center text-destructive">{errorMessage}</div>
      )}

      <div className="text-sm text-center text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="link">
          Sign Up
        </Link>
      </div>
    </form>
  )
}

export default CredentialSignInForm
