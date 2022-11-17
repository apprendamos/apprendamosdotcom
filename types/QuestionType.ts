import { ProfileType } from "./ProfileType";

export interface QuestionType {
  id: string;
  body: string;
  creation_date?: string;
  author: ProfileType | null;
}