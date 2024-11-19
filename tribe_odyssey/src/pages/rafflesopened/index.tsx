import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function RaffleOpenPage(): JSX.Element {
  useEffect(() => {
    document.title = "Raffles Opened";
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Raffle Details</Typography>
    </Box>
  );
}
