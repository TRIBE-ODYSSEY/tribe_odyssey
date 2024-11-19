import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function CouncilPage() {
  useEffect(() => {
    document.title = "Council";
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Council Page</Typography>
    </Box>
  );
}
