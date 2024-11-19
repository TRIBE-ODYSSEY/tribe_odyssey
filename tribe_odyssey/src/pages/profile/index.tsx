import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function ProfilePage() {
  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Profile Page</Typography>
    </Box>
  );
}
