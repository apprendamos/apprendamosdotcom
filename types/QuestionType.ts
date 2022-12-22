import { ProfileType } from "./ProfileType";

export interface QuestionType {
  id: string;
  body: string;
  publication_date?: string;
  like_count?: number;
  author?: ProfileType | null;
  tags?: string[];
}