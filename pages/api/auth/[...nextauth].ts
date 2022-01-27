import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "username-password",
      id: "username-password",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const username = credentials?.username;
        const password = credentials?.password;
        const user = { id: 1, name: "admin", email: "jsmith@example.com" };
        if (username == "admin" && password == "admin") {
          // Any object returned will be saved in `user` property of the JWT

          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error("error message") // Redirect to error page
          // throw "/path/to/redirect"        // Redirect to a URL
        }
      },
    }),
  ],
  secret: process.env.SECRET,

  pages: {
    signIn: "/accounts",
  },
});
