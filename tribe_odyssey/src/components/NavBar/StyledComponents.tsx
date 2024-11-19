import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(180deg,rgba(255,255,255,0.3) 8.85%,rgb(255,255,255) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textFillColor: 'transparent',
  fontFamily: 'Inter, Helvetica',
  fontWeight: 'normal',
  textAlign: 'center',
})); 