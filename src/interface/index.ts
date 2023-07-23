export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  picturePath: string;
  friends: Array<string>;
  location?: string;
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
}

export interface State {
  user: User | null;
  mode: string;
  token: string | null;
  posts: Array<Post>;
}

export interface Post {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location?: string; // The question mark makes it optional
  description?: string; // The question mark makes it optional
  picturePath?: string; // The question mark makes it optional
  userPicturePath?: string; // The question mark makes it optional
  likes: Map<string, boolean>; // Assuming likes is a Map with string keys and boolean values
  comments: string[]; // Assuming comments is an array of strings
  createdAt: Date; // Automatically added by MongoDB timestamps
  updatedAt: Date; // Automatically added by MongoDB timestamps
}
