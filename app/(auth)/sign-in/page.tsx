import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CredentialSignInForm from './credentials-signin-form';
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Sign In'
}; 

 


const SignInPage = async ()=>{

 
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
                        Sign In

                    </CardTitle>

                    <CardDescription className='text-center'>
                        Sign In your Account
                    </CardDescription>
                </CardHeader>

                <CardContent className='space-y-4'>
                    {/* form */}
                   <CredentialSignInForm/>

                </CardContent>
            </Card>
        </div>
    )
}

export default SignInPage