/* eslint-disable import/no-extraneous-dependencies */

import { jwtDecode, JwtPayload } from 'jwt-decode'
import { NextAuthOptions, User, Account, Profile } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import { appoloClientServer } from '../appoloClient/AppoloClientServer'
import { cookies } from 'next/headers'
import { LOGIN_MUTATION } from '@/app/(authLayout)/mutations/auth.mutations'

// Extend the User type to include accessToken
declare module 'next-auth' {
  interface User {
    accessToken?: string
    id?: string
    role?: string
  }

  interface Session {
    user: {
      id: string
      email: string
      role: string
      accessToken: string
    }
  }

  // Extend the Profile interface to include the picture property
  interface Profile {
    picture?: string // Add the picture property
    image?: string // Include image for compatibility with some providers
  }
}

// Define an interface to represent your custom JWT payload
interface CustomJwtPayload extends JwtPayload {
  userId: string
  email: string
  role: string
  accessToken: string
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await appoloClientServer.mutate({
          mutation: LOGIN_MUTATION,
          variables: {
            email: credentials?.email,
            password: credentials?.password,
          },
        })

        const { data } = response
        const accessToken = data?.login?.accessToken

        if (accessToken) {
          const userDecode = jwtDecode(accessToken) as CustomJwtPayload
          const { userId, email, role } = userDecode

          // Set the accessToken as a cookie
          cookies().set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
            path: '/',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          })

          return { id: userId, email, role, accessToken }
        } else return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET as string,

  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User
      account: Account | null
      profile?: Profile
    }) {
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        const email = profile?.email
        const name = profile?.name
        const profilePhoto = profile?.picture || profile?.image

        const res = await fetch(`${process.env.Backend_API_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            name: name,
            provider: account.provider,
            profilePhoto: profilePhoto,
          }),
        })

        const result = await res.json()

        if (res.ok && result) {
          user.accessToken = result.accessToken

          // Decode userId, email, and role
          const userDecode = jwtDecode(result.accessToken) as CustomJwtPayload
          const { userId, email, role } = userDecode

          user.id = userId
          user.email = email
          user.role = role
          return true
        } else return false
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || '' // Default to an empty string if undefined
        token.accessToken = user.accessToken || '' // Default to an empty string if undefined
        token.email = user.email || '' // Default to an empty string if undefined
        token.role = user.role || '' // Default to an empty string if undefined
      }
      return token
    },

    async session({ session, token }) {
      if (!token.id || !token.email || !token.role || !token.accessToken)
        throw new Error('Missing required token fields')

      session.user = {
        id: token.id as string,
        email: token.email as string,
        role: token.role as string,
        accessToken: token.accessToken as string,
      }

      return session
    },
  },
}

export default authOptions
