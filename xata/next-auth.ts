import type { Adapter } from "next-auth/adapters";
import { ApprendamosXataClient } from "xata/clients";

export function XataAdapter(): Adapter {
  return {
    async createUser(user): Promise<any> {
      console.log("createUser", user);
      const existing = await ApprendamosXataClient.db.User
        .filter("email", user.email)
        .select(["*"])
        .getAll();

      if (existing && existing[0]) return existing[0];

      const result = await ApprendamosXataClient.db.User.create({
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
      return await ApprendamosXataClient.db.User.read(id);
    },

    async getUserByEmail(email): Promise<any> {
      console.log("getUserByEmail", email);
      const users = await ApprendamosXataClient.db.User
        .filter("email", email)
        .select(["*"])
        .getAll();

      console.log("users", users);

      if (!users || !users[0]) return;

      return users[0];
    },

    async getUserByAccount({ providerAccountId, provider }): Promise<any> {
      console.log("getUserByAccount", providerAccountId, provider);
      const accounts = await ApprendamosXataClient.db.Account
        .filter("providerAccountId", providerAccountId)
        .filter("provider", provider)
        .select(["*", "user.*", "user.profile.*"])
        .getAll();

      if (!accounts || !accounts[0] || !accounts[0].user) return;

      return accounts[0].user;
    },

    async updateUser(updatedUser): Promise<any> {
      console.log("updateUser", updatedUser);
      return await ApprendamosXataClient.db.User.update(updatedUser.id as string, updatedUser);
    },

    async linkAccount(account): Promise<any> {
      console.log("linkAccount", account);
      return await ApprendamosXataClient.db.Account.create({
        ...account,
        user: account.userId,
      });
    },

    async createSession(session): Promise<any> {
      console.log("createSession", session);
      return await ApprendamosXataClient.db.Session.create({
        ...session,
        user: session.userId,
      });
    },

    async getSessionAndUser(sessionToken): Promise<any> {
      console.log("getSessionAndUser", sessionToken);
      const records = await ApprendamosXataClient.db.Session
        .filter("sessionToken", sessionToken)
        .select(["*", "user.*", "user.profile.*"])
        .getAll();

      if (!records || !records[0] || !records[0].user) return null;

      const session = records[0];

      const user = session.user;

      return {
        session,
        user: {
          id: user?.id,
          email: user?.email,
          profile: {
            id: user?.profile?.id,
            name: user?.profile?.name,
            image: user?.profile?.image,
            username: user?.profile?.username,
            bio: user?.profile?.bio,
          },
        },
      };
    },

    async updateSession(session): Promise<any> {
      console.log("updateSession", session);
      const records = await ApprendamosXataClient.db.Session
        .filter("sessionToken", session.sessionToken)
        .select(["*"])
        .getAll();

      if (!records || !records[0]) return null;

      const existing = records[0];

      return await ApprendamosXataClient.db.Session.update(existing.id as string, session);
    },

    async deleteSession(sessionToken): Promise<any> {
      console.log("deleteSession", sessionToken);
      const records = await ApprendamosXataClient.db.Session
        .filter("sessionToken", sessionToken)
        .select(["*"])
        .getAll();

      if (!records || !records[0]) return null;

      const existing = records[0];

      await ApprendamosXataClient.db.Session.delete(existing.id as string);
      return sessionToken;
    },
  };
}
