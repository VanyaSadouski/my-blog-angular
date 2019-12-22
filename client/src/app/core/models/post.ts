export interface IPost {
  category: string;
  id: string;
  postTitle: string;
  postDesc: string;
  postContent: string;
  postImgUrl: string;
  created: Date;
  updated: Date;
  likes: number;
}
