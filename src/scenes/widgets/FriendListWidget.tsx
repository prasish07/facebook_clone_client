import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import {
  FriendsProps,
  State,
  User,
  friendProps,
  userIdProps,
} from "../../interface";
import axios from "axios";
import React from "react";

const FriendListWidget: React.FC<userIdProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state: State) => state.token);
  const user = useSelector((state: State) => state.user);
  const friends: friendProps[] = user?.friends ?? [];

  const getFriends = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/${userId}/friends`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    dispatch(setFriends({ friends: data }));
  };
  useEffect(() => {
    getFriends();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friends List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.map((friend) => {
          return (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={friend.firstName + " " + friend.lastName}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
