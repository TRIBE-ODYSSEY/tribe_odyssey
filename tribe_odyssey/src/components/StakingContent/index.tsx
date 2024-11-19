import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

const StakingContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={{ xs: 3, sm: 4, md: 5 }}
      position="relative"
      sx={{ 
        height: '100%', 
        justifyContent: 'center',
        py: { xs: 2, sm: 3 },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        width={{ xs: '100%', sm: '90%', md: 640 }}
        height={{ xs: 'auto', md: 200 }}
        minHeight={{ xs: 180, md: 200 }}
        alignItems="center"
        justifyContent="center"
        gap={{ xs: 2, sm: 2.5 }}
        padding={{ xs: 2, sm: 3 }}
        sx={{
          bgcolor: "#181818",
          borderRadius: 1,
          border: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          gap={{ xs: 2, sm: 2.5 }}
          width="100%"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={{ xs: 1, sm: 1.5 }}
            width="100%"
          >
            <Typography
              variant="body1"
              sx={{
                color: "rgba(246, 246, 247, 1)",
                textAlign: "center",
                fontFamily: "Montserrat, Helvetica",
                fontWeight: 400,
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: { xs: '1.5rem', sm: '2rem' },
                letterSpacing: "-0.54px",
                px: { xs: 1, sm: 2 },
              }}
            >
              To stake you need to connect your wallet.
            </Typography>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#ff0008",
                borderRadius: "60px",
                px: { xs: 4, sm: 6 },
                py: { xs: 1, sm: 1.5 },
                textTransform: "none",
                fontFamily: "Inter, Helvetica",
                fontWeight: 400,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                lineHeight: { xs: '1.25rem', sm: '1.5rem' },
                color: "white",
                width: { xs: '100%', sm: 'auto' },
                "&:hover": {
                  bgcolor: "#dd0007",
                },
                whiteSpace: 'nowrap',
              }}
            >
              Connect Wallet
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StakingContent; 