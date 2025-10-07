'use client'

import { useActionState, useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { signUpDefaultValues } from '@/lib/constants'
import { signUpUser } from '@/lib/actions/user.actions'



const CredentialSignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const[data,action] = useActionState(signUpUser,{
    success:false,
    message:''
  })
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          defaultValue={signUpDefaultValues.name}
        />
      </div>
 
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={signUpDefaultValues.email}
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
          defaultValue={signUpDefaultValues.password}
        />
      </div>

         <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          autoComplete="confirmPassword"
          defaultValue={signUpDefaultValues.confirmPassword}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Submitting...' : 'Sign Up'}
      </Button>

      {errorMessage && (
        <div className="text-center text-destructive">{errorMessage}</div>
      )}

      <div className="text-sm text-center text-muted-foreground">
        All Ready have an account?{' '}
        <Link href="/sign-in" className="link">
          Sign Up
        </Link>
      </div>
    </form>
  )
}

export default CredentialSignUpForm
