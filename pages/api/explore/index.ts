import type { NextApiRequest, NextApiResponse } from "next";
import { AppXataClient } from "xata/clients";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      const queryString = req.query.q as string;

      let records = await AppXataClient.search.byTable(queryString, {
        tables: [
          {
            table: "Article",
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
            table: "Profile",
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

      records = {
        ...records,
        Article: records.Article?.map((record) => {
          return {
            ...record,
            body: record.body.slice(0, 280),
          };
        })
      }

      res.status(200).json(records);

      break;
    default:
      res.status(404).end();
  }
}
