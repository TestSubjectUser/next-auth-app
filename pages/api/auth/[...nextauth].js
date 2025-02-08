import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDatabase from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  // object which tells how that session/user is managed
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      // name: "Credentials",
      // if we don't have signin page we provide in this.
      // credentials: {},
      // when incoming log-in req. comes
      async authorize(credentials) {
        const client = await connectDatabase();
        const db = client.db();
        const existingUser = await db.collection("users").findOne({
          email: credentials.email,
        });
        if (!existingUser) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          existingUser.password
        );
        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!, WRONG PASSWORD");
        }
        client.close();
        return { email: existingUser.email };
      },
    }),
  ],
});
