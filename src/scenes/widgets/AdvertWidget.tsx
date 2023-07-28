import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import React from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auth"
        alt="advert"
        src={`${process.env.REACT_APP_BASE_URL}/assets/info4.jpeg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Power full cup</Typography>
        <Typography color={main}>givemepower.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Eat this and make your self handsome like flower. And work to preserve
        the earth.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
