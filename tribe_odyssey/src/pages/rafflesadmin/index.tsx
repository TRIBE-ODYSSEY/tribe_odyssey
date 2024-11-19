import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function RafflesAdminPage() {
  useEffect(() => {
    document.title = "Raffles Admin";
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Raffles Admin Page</Typography>
    </Box>
  );
}
