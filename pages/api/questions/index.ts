import type { NextApiRequest, NextApiResponse } from "next";
import { xata } from "xata/client";
import { getSession } from "next-auth/react";
import { AuthUserType } from "types";

type Data = {
  id?: string;
  error?: string;
};

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
    default:
      res.status(404).end();
  }
}
