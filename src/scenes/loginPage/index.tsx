import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("min-width:1000px");
  const alt = theme.palette.background.alt;
  return (
    <Box>
      <Box
        width="100%"
        sx={{ backgroundColor: alt }}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Facebook clone
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        sx={{ backgroundColor: alt }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Facebook, were you can chat with your friends and posts.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
