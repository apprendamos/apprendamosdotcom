export const revalidate = 10;

import { notFound } from "next/navigation";
import { ProfileType } from "types";
import { xata } from "xata/client";
import { Article, Profile } from "app/(components)";
import QuestionNavbar from "./QuestionNavbar";

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
  children,
}: {
  params: { questionId: string };
  children: React.ReactNode;
}) {
  const question = await getQuestion(params.questionId);

  if (!question) {
    return notFound();
  }

  const author = await getProfile(question.author?.id as string);

  const profile = (author || {
    name: "Unknown",
    username: "not_found",
  }) as ProfileType;

  return (
    <>
      <Profile {...profile} />
      <Article>{question?.body as string}</Article>
      <QuestionNavbar questionId={params.questionId} />
      {children}
    </>
  );
}
