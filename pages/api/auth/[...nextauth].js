import TodoUser from "@/models/userModel";
import ConnectToDB from "@/utils/ConnectToDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email } = credentials;
        return { email };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user: { email }, account: { provider } }) {
      if (provider == "github") {
        if (!email) return "/signup";
        //! Database connection
        try {
          await ConnectToDB();
        } catch (error) {
          console.log("Can't Connect to database! error : %s", error);
          return "/signup?error=database";
        }
        //! Check user exist
        const user = await TodoUser.findOne({ email });
        if (user) return true;
        //! Create User
        try {
          await TodoUser.create({ email, password: "" });
          return true;
        } catch (error) {
          console.log("can't create user! error : %s", error);
          return "/signup?error=cantCreateUser";
        }
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
