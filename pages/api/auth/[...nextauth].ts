import NextAuth, { Session } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";

import { XataAdapter } from "xata/next-auth";
import { AuthUserType } from "types";

import { AppXataClient } from "xata/clients";

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
        signIn: "/signin",
        newUser: "/welcome",
        error: "/error",
    },
    callbacks: {
        async session({
            session,
            user,
        }: {
            session: Session;
            user: AuthUserType;
        }) {
            if (!user.profile) {
                return { ...session, user };
            }

            const profile = await AppXataClient.db.Profile.read(user.profile);

            return {
                ...session,
                user: {
                    ...user,
                    profile,
                },
            };
        },
        async signIn({ user, account, profile, email, credentials }: any) {
            if (user.blocked_status) {
                return "/blocked";
            }
            return true;
        },
    },
};

export default NextAuth(authOptions);
