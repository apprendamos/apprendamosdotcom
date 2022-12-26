import { ProfileType } from "./ProfileType";

export interface ArticleType {
  id: string;
  body: string;
  publication_date?: string;
  like_count?: number;
  author?: ProfileType;
  tags?: string[];
}