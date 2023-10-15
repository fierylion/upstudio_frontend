import { SessionUser } from '@/lib/types'
import { NextAuthOptions, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { base } from '@/lib/apis'
import toast from 'react-hot-toast'
// async function registerUser(data: LoginFieldTypes) {
//   try {
//     const response = await base.post('auth/login', data)
//     return response.data
//   } catch (error) {
//     throw error
//   }
// }

function getGoogleCredentials(){
  if(process.env.GOOGLE_ID && process.env.GOOGLE_SECRET){
    return {
      clientId:process.env.GOOGLE_ID,
      clientSecret:process.env.GOOGLE_SECRET
    }
  }
  throw new Error('Google credentials not found')
}


async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(process.env.BACKEND_URL+ '/auth/refresh', {
    method: 'GET',
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  })
  console.log('refreshed')

  const response = await res.json()

  return {
    ...token,
    backendTokens: response,
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: getGoogleCredentials().clientId,
    //   clientSecret: getGoogleCredentials().clientSecret,
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password)
          return null
        const data = {
          email: credentials.email,
          password: credentials.password,
        }
        try {
          const response = await base.post('auth/login', data)
          if (response.status === 200) {
            const user = response.data
            // login success
            const responseUser: SessionUser = user

            return user
          }
        } catch (error: any) {
        throw new Error(error?.response?.data?.error)
        }

        throw new Error('Login failed')
      },
    }),
  ],

  callbacks: {
   
    async jwt({ token, user }) {
      if (user) return { ...token, ...user }

      if (
        new Date().getTime() <
        new Date(Date.parse(token.backendTokens.accessExpiresIn)).getTime()
      )
    
        return token
      

      return await refreshToken(token)
    },

    async session({ token, session }) {
      session.user = token.user
      session.backendTokens = token.backendTokens

      return session
    },
  },
  pages: {
    signIn: '/',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
