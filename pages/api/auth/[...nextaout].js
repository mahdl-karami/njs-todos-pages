import TodoUser from "@/models/userModel";
import ConnectToDB from "@/utils/ConnectToDB";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      //! Credentials provider
      async authorize(credentials, req) {
        // if (req.method !== "POST") return;

        //! Database connection
        try {
          await ConnectToDB();
        } catch (error) {
          console.log("Can't Connect to database! error : %s", error);
          throw new Error({ error: "database", message: "can't connect to database!" });
        }

        //! Data validation
        const { email, password } = credentials;
        if (!email || !password) throw new Error({ error: !email && !password ? "invalidData" : !email ? "invalidEmail" : "invalidPassword", message: "please enter valid data!" });

        //! Check user exist
        const user = TodoUser.findOne({ email });
        if (!user) throw new Error({ error: "userNotExist", message: "user dosen't exist, please signup!" });

        //! Check password
        const isValid = user.password == password;
        if (!isValid) throw new Error({ error: "passwordIncorrect", message: "email or password is incorrect!" });

        //! Login
        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
