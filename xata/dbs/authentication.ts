// Generated by Xata Codegen 0.21.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "User",
    columns: [
      { name: "email", type: "email", unique: true },
      { name: "profile", type: "string", unique: true },
      { name: "emailVerified", type: "datetime" },
      { name: "blocked_status", type: "bool" },
    ],
  },
  {
    name: "Account",
    columns: [
      { name: "type", type: "string" },
      { name: "provider", type: "string" },
      { name: "access_token", type: "string" },
      { name: "token_type", type: "string" },
      { name: "scope", type: "string" },
      { name: "id_token", type: "string" },
      { name: "session_state", type: "string" },
      { name: "oauth_token_secret", type: "string" },
      { name: "oauth_token", type: "string" },
      { name: "providerAccountId", type: "string", unique: true },
      { name: "refresh_token", type: "string" },
      { name: "expires_at", type: "int" },
      { name: "user", type: "link", link: { table: "User" } },
    ],
  },
  {
    name: "Session",
    columns: [
      { name: "expires", type: "datetime" },
      { name: "sessionToken", type: "string" },
      { name: "user", type: "link", link: { table: "User" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type User = InferredTypes["User"];
export type UserRecord = User & XataRecord;

export type Account = InferredTypes["Account"];
export type AccountRecord = Account & XataRecord;

export type Session = InferredTypes["Session"];
export type SessionRecord = Session & XataRecord;

export type DatabaseSchema = {
  User: UserRecord;
  Account: AccountRecord;
  Session: SessionRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Apprendamos-Workspace-iae285.us-east-1.xata.sh/db/apprendamos-authentication",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
