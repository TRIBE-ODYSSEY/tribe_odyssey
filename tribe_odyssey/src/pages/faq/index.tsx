import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function FAQPage() {
  useEffect(() => {
    document.title = "FAQ";
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">FAQ Page</Typography>
    </Box>
  );
}
