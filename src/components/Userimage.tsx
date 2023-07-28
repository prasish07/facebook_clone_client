import { Box } from "@mui/material";
import React from "react";

interface UserImageProps {
  image: string;
  size?: string;
}

const UserImage: React.FC<UserImageProps> = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={`${process.env.REACT_APP_BASE_URL}/assets/${image}`}
        alt="user"
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
      />
    </Box>
  );
};

export default UserImage;
