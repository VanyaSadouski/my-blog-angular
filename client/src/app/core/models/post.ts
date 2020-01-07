import { IComment } from "./comment";

export interface IPost {
  category: string;
  _id: string;
  postTitle: string;
  postDesc: string;
  postContent: string;
  postImgUrl: string;
  created: Date;
  updated: Date;
  likes: number;
  likedByUsers: string[];
  comments: IComment[];
}
