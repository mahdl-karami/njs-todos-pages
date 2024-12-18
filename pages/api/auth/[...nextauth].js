import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email } = credentials;
        return { email };
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return "/";
    },
  },
};

export default NextAuth(authOptions);
