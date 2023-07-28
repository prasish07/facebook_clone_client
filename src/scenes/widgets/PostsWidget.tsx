import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import React from "react";
import { PostsWidgetProps, State } from "../../interface";
import axios from "axios";

const PostsWidget: React.FC<PostsWidgetProps> = ({
  userId,
  isProfile = false,
}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: State) => state.posts);
  const token = useSelector((state: State) => state.token);

  const getPosts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/posts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const posts = response.data;

    dispatch(setPosts({ posts }));
  };
  const getUserPosts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/posts/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const posts = response.data;
    console.log("data", posts);

    dispatch(setPosts({ posts }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (!posts) {
    return <div>Loading</div>;
  }

  return (
    <>
      {posts?.map((item) => (
        <>
          <PostWidget {...item} />
        </>
      ))}
    </>
  );
};

export default PostsWidget;
