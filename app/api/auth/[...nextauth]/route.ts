// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from '@/auth'
import { cookies } from "next/headers";
const handler = NextAuth(authOptions)



// App Router expects named exports for HTTP methods
export { handler as GET, handler as POST }
