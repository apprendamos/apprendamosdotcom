import "server-only";
import Profile from "./Profile";
export const revalidate = 3;

import { notFound } from "next/navigation";
import {ProfileType} from "types";
import { xata } from "xata/client";
import { Article } from "app/(components)";

async function getQuestion(id: string) {
  const record = await xata.db.questions.read(id);
  return record;
}

async function getProfile(id: string) {
  const record = await xata.db.profiles.read(id);
  return record;
}

export default async function SingleQuestionPage({
  params,
}: {
  params: { questionId: string };
}) {
  const question = await getQuestion(params.questionId);

  if (!question) {
    return notFound();
  }

  const author = await getProfile(question.author?.id as string);

  const profile = author || {
    name: "Unknown",
    username: "not_found",
    follower_count: 0,
  };

  return (
    <div>
      <Profile {...profile as ProfileType} />
      <Article>{question.body}</Article>
    </div>
  );
}

export async function generateStaticParams() {
  const questions = await xata.db.questions.select(["id"]).getAll();

  return questions.map((question) => ({
    questionId: question.id,
  }));
}
