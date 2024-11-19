import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function ClaimPage() {
  useEffect(() => {
    document.title = "Claim";
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Claim Page</Typography>
    </Box>
  );
}
