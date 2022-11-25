import NextAuth, { Session } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";

import { XataAdapter } from "xata/next-auth";
import { AuthUserType } from "types";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  adapter: XataAdapter(),
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/welcome",
    error: "/auth/error",
  },
  callbacks: {
    async session({
      session,
      user,
    }: {
      session: Session;
      user: AuthUserType;
    }) {
      (session.user as AuthUserType) = { ...user };
      return session;
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log("user", user);
      if (user.blocked_status) {
        return "/auth/blocked";
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
