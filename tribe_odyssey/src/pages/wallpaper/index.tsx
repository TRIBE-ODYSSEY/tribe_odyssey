import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Container,
  styled 
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

// Styled Components
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '64px 16px',
  gap: '40px',
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #14121b 0%, #000000 100%)',
});

const GradientTitle = styled(Typography)({
  background: 'linear-gradient(180deg, rgb(235, 235, 235) 0%, rgba(235, 235, 235, 0) 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textFillColor: 'transparent',
  fontFamily: 'Montserrat, Helvetica',
  fontWeight: 500,
  fontSize: '80px',
  textAlign: 'center',
  letterSpacing: '-2.4px',
  lineHeight: '80px',
  marginBottom: '40px',
  '@media (max-width: 600px)': {
    fontSize: '48px',
    lineHeight: '48px',
  }
});

const PreviewCard = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  padding: '24px',
  backgroundColor: '#181818',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '@media (max-width: 600px)': {
    width: '100%',
    maxWidth: '400px',
  }
});

const WallpaperPage = () => {
  const [apeId, setApeId] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Tribe NFT Wallpapers";
  }, []);

  const handlePreview = () => {
    if (!apeId.trim()) {
      setError('Please enter a valid Ape ID');
      return;
    }
    
    setPreviewUrl(`https://cdn.0xworld.io/tribe-images/${apeId}.png`);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setApeId(value);
    if (error) setError('');
  };

  return (
    <StyledContainer maxWidth={false}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={5}
        position="relative"
        width="100%"
        maxWidth="1200px"
        margin="0 auto"
      >
        <GradientTitle variant="h1">
          Tribe NFT Wallpapers
        </GradientTitle>

        <PreviewCard>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Montserrat, Helvetica',
              fontWeight: 400,
              color: 'rgba(246, 246, 247, 1)',
              fontSize: '1.125rem',
              letterSpacing: '-0.54px',
              lineHeight: '2rem',
            }}
          >
            Please enter your Tribe Ape ID
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tribe Ape Id"
            value={apeId}
            onChange={handleInputChange}
            error={!!error}
            helperText={error}
            sx={{
              mt: 2,
              bgcolor: '#181818',
              borderRadius: '60px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '60px',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                },
              },
              '& .MuiInputBase-input': {
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: 'Inter, Helvetica',
                fontWeight: 400,
                fontSize: '16px',
                letterSpacing: '-0.0016px',
                lineHeight: '26px',
                padding: '12px 20px',
              },
              '& .MuiFormHelperText-root': {
                color: '#ff0008',
                marginLeft: '16px',
              }
            }}
          />

          <Button
            fullWidth
            variant="contained"
            startIcon={<VisibilityIcon />}
            onClick={handlePreview}
            sx={{
              mt: 2,
              borderRadius: '60px',
              textTransform: 'none',
              fontFamily: 'Inter, Helvetica',
              fontWeight: 400,
              fontSize: '1rem',
              lineHeight: '1.5rem',
              padding: '12px 24px',
              background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)',
                opacity: 0.9,
              },
            }}
          >
            Preview
          </Button>
        </PreviewCard>

        {previewUrl && (
          <Box
            component="img"
            src={previewUrl}
            alt="Wallpaper Preview"
            sx={{
              width: '328px',
              height: '669.04px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.25)',
            }}
          />
        )}
      </Box>
    </StyledContainer>
  );
};

export default WallpaperPage;
