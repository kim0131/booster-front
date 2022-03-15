import useGetUser from "@core/hook/use-user";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import image from "next/image";
import useSWR from "swr";

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
        mb_id: { label: "mb_id", type: "text", placeholder: "jsmith" },
        mb_pw: { label: "mb_pw", type: "password" },
        mb_nick: { label: "mb_nick", type: "text" },
        mb_idx: { label: "mb_idx", type: "text" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const mb_id = credentials?.mb_id;
        const mb_nick = credentials?.mb_nick;
        const mb_idx = credentials?.mb_idx;

        //이유를 모르겠으나... 아이디는 email, 닉네임은 name에 할당
        const user = { email: mb_id, name: mb_nick, image: mb_idx };
        if (user) {
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
  callbacks: {
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.

      session.accessToken = token.accessToken;
      session.user.idx = parseInt(session.user.image);
      session.user.id = session.user.email;

      return session;
    },
  },
});
