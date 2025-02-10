// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., "Sign in with...")
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Here you would look up the user in your database
        const user = { id: 1, name: "User ", email: "user@example.com" };

        if (
          credentials.username === "user" &&
          credentials.password === "password"
        ) {
          //   console.log("Authenticated user:", user);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true, // Use JSON Web Tokens for session
    maxAge: 30 * 24 * 60 * 60,
    // maxAge: 10,
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      //   console.log("Token", token);
      //   console.log("Session:", session);
      if (token) {
        session.user = { id: token.id, name: token.name, email: token.email };
      }
      return session;
    },
  },
});
