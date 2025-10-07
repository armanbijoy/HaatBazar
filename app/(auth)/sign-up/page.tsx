import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import CredentialSignUpForm from './sign-up-form';

export const metadata: Metadata = {
    title: 'Sign Up'
}; 

 


const SignUpPage = async ()=>{

 
    const session = await getServerSession(authOptions)

  if (session) {
    return redirect('/') // redirect if already logged in
  } 


    return(
        <div className='w-full max-w-md mx-auto'>
            <Card>
                <CardHeader className='space-y-4'>
                    <Link href='./' className='flex-center'>

                        <Image src='/images/logo.svg' width={100} height={100} alt='HaatBazar' priority={true}/>

                    </Link>
                    <CardTitle className='text-center'>
                        Create Account

                    </CardTitle>

                    <CardDescription className='text-center'>
                        Enter your Information below to sign up
                    </CardDescription>
                </CardHeader>

                <CardContent className='space-y-4'>
                    {/* form */} 
                   {/* <CredentialSignInForm/> */}
                   <CredentialSignUpForm/>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUpPage