import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  IconButton, 
  Container,
  TextField,
  InputAdornment,
  Button,
  styled,
  Link
} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Styled Components
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '64px 16px',
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #14121b 0%, #000000 100%)',
});

const GradientTitle = styled(Typography)({
  background: 'linear-gradient(180deg, rgb(235, 235, 235) 0%, rgba(235, 235, 235, 0) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  fontFamily: 'Montserrat, Helvetica',
  fontWeight: 500,
  fontSize: '80px',
  textAlign: 'center',
  letterSpacing: '-2.4px',
  lineHeight: '80px',
  marginBottom: '32px',
  '@media (max-width: 600px)': {
    fontSize: '48px',
    lineHeight: '48px',
  }
});

const StyledInfoIcon = styled(InfoOutlinedIcon)({
  color: '#ff0008',
  fontSize: '24px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  }
});

const EnsPage = () => {
  const [domainName, setDomainName] = useState('');

  const handleRegister = () => {
    // Add registration logic here
    console.log('Registering:', domainName);
  };

  const handleInfoClick = () => {
    // Add info modal logic here
    console.log('Info clicked');
  };

  return (
    <StyledContainer maxWidth={false}>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 6, md: 10 },
          width: '100%',
          maxWidth: '960px',
          margin: '0 auto'
        }}
      >
        {/* Title Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 4, md: 8 }
          }}
        >
          <GradientTitle variant="h1">
            ENS
          </GradientTitle>

          <Box sx={{ maxWidth: '800px' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Montserrat, Helvetica',
                fontWeight: 600,
                fontSize: '1.125rem',
                textAlign: 'center',
                color: 'rgba(235, 235, 235, 0.65)',
                mb: 4
              }}
            >
              Tribe Odyssey has become part of the ENS takeover! Users who hold a Tribe Odyssey NFT, can now register a unique tribeodyssey.eth{" "}
              <Box component="span" sx={{ color: '#ff0008', fontWeight: 400 }}>
                (just pay gas!)
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Montserrat, Helvetica',
                fontWeight: 400,
                fontSize: '1.125rem',
                textAlign: 'center',
                color: 'rgba(235, 235, 235, 0.65)',
                mb: 4
              }}
            >
              We look forward to seeing our loyal community repping their new and unique Tribe Odyssey subdomains and embracing the ENS revolution!
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer'
              }}
              onClick={handleInfoClick}
            >
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Montserrat, Helvetica',
                  color: '#ff0008',
                  fontSize: '1.125rem'
                }}
              >
                How it works?
              </Typography>
              <IconButton size="small">
                <StyledInfoIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Registration Form */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: 2.5,
            p: 3,
            bgcolor: '#181818',
            borderRadius: 1,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            width: '100%',
            maxWidth: '646px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              gap: 2.5
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your domain name"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    .tribeodyssey.eth
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: '#181818',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '60px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'Inter, Helvetica',
                  fontSize: '16px',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                  },
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleRegister}
              sx={{
                bgcolor: '#ff0008',
                borderRadius: '60px',
                px: 3,
                py: 1,
                textTransform: 'none',
                fontFamily: 'Inter, Helvetica',
                fontSize: '16px',
                '&:hover': {
                  bgcolor: '#cc0006'
                }
              }}
            >
              Register
            </Button>
          </Box>
        </Box>

        {/* Info Link */}
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Montserrat, Helvetica',
            fontSize: '1.125rem',
            textAlign: 'center',
            color: 'rgba(235, 235, 235, 0.65)',
          }}
        >
          <Box component="span" sx={{ fontWeight: 600 }}>
            For more information about ENS subdomains click{' '}
          </Box>
          <Link
            href="#"
            sx={{
              color: '#ff0008',
              textDecoration: 'underline',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
          >
            here
          </Link>
          .
        </Typography>
      </Box>
    </StyledContainer>
  );
};

export default EnsPage;
