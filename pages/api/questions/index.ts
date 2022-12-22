import type { NextApiRequest, NextApiResponse } from "next";

import { xata } from "xata/client";
import { QuestionsRecord } from "xata";
import { exists, Page, SelectedPick } from "@xata.io/client";

import { getSession } from "next-auth/react";
import { AuthUserType } from "types";

type Data =
  | {
      id?: string;
      error?: string;
    }
  | Page<
      QuestionsRecord,
      SelectedPick<
        QuestionsRecord,
        (
          | "body"
          | "publication_date"
          | "id"
          | "author.username"
          | "author.name"
        )[]
      >
    >;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      const session = await getSession({ req });
      if (!session || !session.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const profile = (session.user as AuthUserType).profile;

      const created = await xata.db.questions.create({
        body: req.body.body,
        author: profile?.id,
        publication_date: new Date(),
      });
      res.status(200).json({ id: created.id });

      break;
    case "GET":
      const { after } = req.query;

      if (!after) {
        res.status(400).json({ error: "Missing after query parameter" });
        return;
      }

      const page = await xata.db.questions
        .filter(exists("author"))
        .sort("publication_date", "desc")
        .select([
          "id",
          "body",
          "publication_date",
          "author.username",
          "author.name",
        ])
        .getPaginated({
          pagination: {
            size: 5,
            after: after ? after.toString() : undefined,
          },
        });

      if (!page) {
        res.status(404).json({ error: "Page not found" });
        return;
      }

      res.status(200).json(page);
    default:
      res.status(404).end();
  }
}
