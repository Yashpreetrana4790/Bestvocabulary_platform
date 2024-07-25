
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, "user")
      console.log(account, "account")
      console.log(profile, "profile")
      console.log(email, "email")
      console.log(credentials, "credentials")
      return true
    },
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      session.user = user
  
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})