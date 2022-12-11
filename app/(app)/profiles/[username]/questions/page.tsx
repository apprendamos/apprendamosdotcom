export const revalidate = 10;

import { xata } from "xata/client";

import { ProfileType, QuestionType } from "types";
import { Question } from "app/components";

async function getProfile(username: string) {
  const records = await xata.db.profiles.filter("username", username).getAll();
  return records[0];
}

async function getQuestions(username: string) {
  const page = await xata.db.questions
    .filter("author.username", username)
    .sort("publication_date", "desc")
    .select(["*"])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  return page.records as QuestionType[];
}

export default async function ProfileQuestionsPage({
  params,
}: {
  params: { username: string };
}) {
  const profile = await getProfile(params.username);
  const questions = await getQuestions(params.username as string);

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Question
          key={question.id}
          {...question}
          author={profile as ProfileType}
        />
      ))}
    </div>
  );
}
