import { User } from "next-auth";

export type AuthUserType = User & {
  id?: string;
  profile?: { id?: string; name?: string; image?: string; username?: string };
};
