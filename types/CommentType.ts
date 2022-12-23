import { ProfileType } from "./ProfileType";

export interface CommentType {
  id: string;
  body: string;
  creation_date?: string;
  like_count?: number;
  author?: ProfileType;
}