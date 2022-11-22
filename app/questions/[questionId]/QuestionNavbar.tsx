import QuestionNavLink from "./QuestionNavLink";


export default function QuestionNavbar({ questionId }: { questionId: string }) {
  return (
    <div className="flex space-x-4">
      <QuestionNavLink href={`/questions/${questionId}/comments`}>
        Comments
      </QuestionNavLink>
      <QuestionNavLink href={`/questions/${questionId}/likers`}>
        Likers
      </QuestionNavLink>
      <QuestionNavLink href={`/questions/${questionId}/cheers`}>
        Cheers
      </QuestionNavLink>
    </div>
  );
}
