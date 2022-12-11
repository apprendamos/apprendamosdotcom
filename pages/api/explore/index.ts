import type { NextApiRequest, NextApiResponse } from "next";
import { xata } from "xata/client";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const queryString = req.query.q as string;

      const records = await xata.search.byTable(queryString, {
        tables: [
          {
            table: "questions",
            target: [{ column: "hashtags" }, { column: "body" }],
            boosters: [
              {
                dateBooster: {
                  column: "publication_date",
                  decay: 0.5,
                  scale: "30d",
                },
              },
              { numericBooster: { column: "like_count", factor: 0.1 } },
            ],
          },
          {
            table: "profiles",
            target: [
              { column: "username" },
              { column: "name" },
              { column: "bio" },
            ],
            boosters: [
              { numericBooster: { column: "follower_count", factor: 0.1 } },
            ],
          },
        ],
        fuzziness: 0,
        prefix: "phrase",
      });

      res.status(200).json(records);

      break;
    default:
      res.status(404).end();
  }
}
