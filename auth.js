
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user }) {
      session.user = user
      console.log(session, "session")
      console.log(token, "token")
      console.log(user, "user")
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})