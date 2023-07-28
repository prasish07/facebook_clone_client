export interface User {
  _id: string;
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
  mode: "light" | "dark";
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

export interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: File;
  [key: string]: string | File;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface UserWidgetProps {
  userId: string;
  picturePath: string;
}

export interface MyPostWidgetProps {
  picturePath: string;
}

export interface PostsWidgetProps {
  userId: string;
  isProfile: boolean;
}

export interface FriendsProps {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
}

export interface userIdProps {
  userId: string;
}

export interface friendProps {
  _id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  picturePath: string;
}
