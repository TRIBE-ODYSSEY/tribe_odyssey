import { useEffect } from "react";
import { Box, Typography, Container, useTheme, useMediaQuery } from "@mui/material";
import StakingContent from "../../components/StakingContent";

export default function StakingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    document.title = "Staking";
  }, []);

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%)',
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box 
          sx={{ 
            width: { xs: '100%', md: 898 },
            height: { xs: 'auto', md: 613 },
            minHeight: { xs: 500, sm: 550, md: 613 },
            margin: '0 auto',
            mt: { xs: 2, sm: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"}
            sx={{ 
              color: 'white',
              mb: { xs: 2, sm: 3 },
              fontWeight: 600,
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              textAlign: { xs: 'center', md: 'left' },
              px: { xs: 2, sm: 0 },
            }}
          >
            Staking Page
          </Typography>
          
          <Box 
            sx={{ 
              flex: 1,
              background: 'linear-gradient(145.04deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              p: { xs: 2, sm: 3 },
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)',
              overflow: 'auto',
            }}
          >
            <StakingContent />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
