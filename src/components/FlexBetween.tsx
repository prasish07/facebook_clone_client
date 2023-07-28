import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { SxProps } from "@mui/system";

type FlexBetweenProps = {
  backgroundColor?: string;
} & SxProps;

const FlexBetween = styled(Box)<FlexBetweenProps>({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
