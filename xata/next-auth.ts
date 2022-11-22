import type { Adapter } from "next-auth/adapters";
import { xata } from "xata/client";

export function XataAdapter(): Adapter {
  return {
    async createUser(user): Promise<any> {
      console.log("createUser", user);
      const existing = await xata.db.users
        .filter("email", user.email)
        .select(["*"])
        .getAll();

      if (existing && existing[0]) return existing[0];

      const result = await xata.db.users.create({
        email: user.email,
        emailVerified: new Date(),
      });

      if (!result) {
        throw new Error("Failed to create User");
      }

      return result;
    },

    async getUser(id): Promise<any> {
      console.log("getUser", id);
      return await xata.db.users.read(id);
    },

    async getUserByEmail(email): Promise<any> {
      console.log("getUserByEmail", email);
      const users = await xata.db.users
        .filter("email", email)
        .select(["*"])
        .getAll();

      console.log("users", users);

      if (!users || !users[0]) return;

      return users[0];
    },

    async getUserByAccount({ providerAccountId, provider }): Promise<any> {
      console.log("getUserByAccount", providerAccountId, provider);
      const accounts = await xata.db.accounts
        .filter("providerAccountId", providerAccountId)
        .filter("provider", provider)
        .select(["*", "user.*"])
        .getAll();

      if (!accounts || !accounts[0] || !accounts[0].user) return;

      return accounts[0].user;
    },

    async updateUser(updatedUser): Promise<any> {
      console.log("updateUser", updatedUser);
      return await xata.db.users.update(updatedUser.id as string, updatedUser);
    },

    async linkAccount(account): Promise<any> {
      console.log("linkAccount", account);
      return await xata.db.accounts.create({
        ...account,
        user: account.userId,
      });
    },

    async createSession(session): Promise<any> {
      console.log("createSession", session);
      return await xata.db.sessions.create({
        ...session,
        user: session.userId,
      });
    },

    async getSessionAndUser(sessionToken): Promise<any> {
      console.log("getSessionAndUser", sessionToken);
      const records = await xata.db.sessions
        .filter("sessionToken", sessionToken)
        .select(["*", "user.*", "user.profile.*"])
        .getAll();

      if (!records || !records[0] || !records[0].user) return null;

      const session = records[0];

      const user = session.user;

      return {
        session,
        user: {
          ...user,
          name: user?.profile?.name,
        },
      };
    },

    async updateSession(session): Promise<any> {
      console.log("updateSession", session);
      const records = await xata.db.sessions
        .filter("sessionToken", session.sessionToken)
        .select(["*"])
        .getAll();

      if (!records || !records[0]) return null;

      const existing = records[0];

      return await xata.db.sessions.update(existing.id as string, session);
    },

    async deleteSession(sessionToken): Promise<any> {
      console.log("deleteSession", sessionToken);
      const records = await xata.db.sessions
        .filter("sessionToken", sessionToken)
        .select(["*"])
        .getAll();

      if (!records || !records[0]) return null;

      const existing = records[0];

      await xata.db.sessions.delete(existing.id as string);
      return sessionToken;
    },
  };
}
