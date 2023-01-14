import type { Adapter } from "next-auth/adapters";
import { AuthenticationXataClient } from "xata/clients";

export function XataAdapter(): Adapter {
    return {
        async createUser(user): Promise<any> {
            const existing = await AuthenticationXataClient.db.User.filter(
                "email",
                user.email
            )
                .select(["*"])
                .getFirst();

            if (existing) return existing;

            const result = await AuthenticationXataClient.db.User.create({
                email: user.email,
                emailVerified: new Date(),
            });

            if (!result) {
                throw new Error("Failed to create User");
            }

            return result;
        },

        async getUser(id): Promise<any> {
            return await AuthenticationXataClient.db.User.read(id);
        },

        async getUserByEmail(email): Promise<any> {
            const user = await AuthenticationXataClient.db.User.filter(
                "email",
                email
            )
                .select(["*"])
                .getFirst();

            if (!user) return;

            return user;
        },

        async getUserByAccount({ providerAccountId, provider }): Promise<any> {
            console.log("getUserByAccount", providerAccountId, provider);
            const account = await AuthenticationXataClient.db.Account.filter(
                "providerAccountId",
                providerAccountId
            )
                .filter("provider", provider)
                .select(["*", "user.*"])
                .getFirst();

            if (!account || !account.user) return;

            return account.user;
        },

        async updateUser(updatedUser): Promise<any> {
            console.log("updateUser", updatedUser);
            return await AuthenticationXataClient.db.User.update(
                updatedUser.id as string,
                updatedUser
            );
        },

        async linkAccount(account): Promise<any> {
            console.log("linkAccount", account);
            return await AuthenticationXataClient.db.Account.create({
                ...account,
                user: account.userId,
            });
        },

        async createSession(session): Promise<any> {
            console.log("createSession", session);
            return await AuthenticationXataClient.db.Session.create({
                ...session,
                user: session.userId,
            });
        },

        async getSessionAndUser(sessionToken): Promise<any> {
            const session = await AuthenticationXataClient.db.Session.filter(
                "sessionToken",
                sessionToken
            )
                .select(["*", "user.*"])
                .getFirst();

            if (!session) return null;

            const user = session.user;

            return {
                session,
                user,
            };
        },

        async updateSession(session): Promise<any> {
            console.log("updateSession", session);
            const existingSession =
                await AuthenticationXataClient.db.Session.filter(
                    "sessionToken",
                    session.sessionToken
                )
                    .select(["*"])
                    .getFirst();

            if (!existingSession) return null;

            return await AuthenticationXataClient.db.Session.update(
                existingSession.id,
                session
            );
        },

        async deleteSession(sessionToken): Promise<any> {
            console.log("deleteSession", sessionToken);
            const existingSession =
                await AuthenticationXataClient.db.Session.filter(
                    "sessionToken",
                    sessionToken
                )
                    .getFirst();

            if (!existingSession) return null;

            await AuthenticationXataClient.db.Session.delete(
                existingSession.id
            );
            return sessionToken;
        },
    };
}
