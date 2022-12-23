export const revalidate = 10;

import { exists } from "@xata.io/client";
import { xata } from "xata/client";
import { PaginationQuestions } from "app/components";

async function getQuestionsPage() {
  const page = await xata.db.questions
    .filter(exists("author"))
    .sort("publication_date", "desc")
    .select([
      "id",
      "body",
      "publication_date",
      "author.username",
      "author.name",
      "author.image",
    ])
    .getPaginated({
      pagination: {
        size: 5,
      },
    });

  return JSON.parse(JSON.stringify(page));
}

export default async function QuestionsPage() {
  const page = await getQuestionsPage();

  return <PaginationQuestions firstPage={page} />;
}
