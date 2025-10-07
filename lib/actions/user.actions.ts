'use server'

import { signIn, signOut } from 'next-auth/react'
import { signInFormSchema, signUpFormSchema } from '../validators'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { hashSync } from 'bcrypt-ts-edge'
import { PrismaClient } from '@prisma/client'
import { success } from 'zod'

// Sign in with credentials
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const result = await signIn('credentials', {
      redirect: false, // Handle manually
      email: user.email,
      password: user.password,
    });

    if (result?.error) {
      return { success: false, message: result.error };
    }

    return { success: true, message: 'Sign In Successfully' };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    return { success: false, message: 'Invalid email or password' };
  }
}

// Sign up user
export async function signUpUser(prevState:unknown, formData:FormData){
  const prisma = new  PrismaClient()
  try{
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword:formData.get('confirmPassword')
    });

    const plainPassword = user.password

    user.password = hashSync(user.password, 10)
    await prisma.user.create({
      data:{
        name:user.name,
        email:user.email,
        password:user.password,
        createdAt: new Date(), 
      }
    });


    await signIn('credentials',{
      name:user.name,
      email:user.email,
      password:plainPassword
    })

    return {success:true, message: 'User Regestered Successfullys'}
  }catch(error){

    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: 'User Was not Registered' };

  }
  
}


// Sign user out
export async function signOutUser() {
  await signOut();
}
