export const revalidate = 10;

import { exists } from "@xata.io/client";
import { xata } from "xata/client";
import { PaginationQuestions } from "app/components";

async function getQuestionsPage() {
  const data = await xata.db.questions
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
      },
    });

  const page = await JSON.parse(JSON.stringify(data));

  return page;
}

export default async function QuestionsPage() {
  const page = await getQuestionsPage();

  return <PaginationQuestions firstPage={page} />;
}
