import React, { useEffect } from "react";
import { 
  Box, 
  Typography, 
  IconButton, 
  Link,
  Container,
  styled
} from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

// Styled Components
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '64px 16px',
  gap: '80px',
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #14121b 0%, #000000 100%)',
});

const ContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '64px',
  maxWidth: '960px',
  width: '100%',
});

const BeatCard = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
  alignItems: 'flex-start',
  gap: '20px',
  padding: '24px',
  backgroundColor: '#181818',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
  }
});

const StyledMusicIcon = styled(MusicNoteIcon)({
  color: '#ff0008',
  fontSize: '48px',
});

const BeatsPage = () => {
  useEffect(() => {
    document.title = "Tribal Beats";
  }, []);

  const handleTwitterClick = () => {
    window.open('https://twitter.com/leeroy', '_blank');
  };

  const beats = [
    { title: 'Tribe Evolution', url: '#' },
    { title: 'Tribal Warriors', url: '#' },
    { title: 'Digital Odyssey', url: '#' },
  ];

  return (
    <StyledContainer maxWidth={false}>
      <ContentBox>
        {/* Description Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            width: '100%',
          }}
        >
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: 'rgba(235, 235, 235, 0.8)',
              fontWeight: 'bold',
              maxWidth: '800px',
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Thanks to Leeroy, reppin' Tribe just got even easier with the
            legendary musician and DJ (The Prodigy) creating some badass
            custom Tribal ringtones for our entire community to enjoy!
          </Typography>

          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ color: 'rgba(235, 235, 235, 0.8)' }}
            >
              Follow Leeroy
            </Typography>
            <IconButton 
              onClick={handleTwitterClick}
              sx={{ 
                color: '#1DA1F2',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Beats Cards */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
            width: '100%',
          }}
        >
          {beats.map((beat, index) => (
            <BeatCard key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: 2.5,
                }}
              >
                <StyledMusicIcon />
                <Box 
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ color: '#ffffff' }}
                  >
                    {beat.title}
                  </Typography>
                  <Link 
                    href={beat.url} 
                    underline="hover"
                    sx={{ 
                      color: '#ff0008',
                      transition: 'opacity 0.3s ease',
                      '&:hover': {
                        opacity: 0.8,
                      }
                    }}
                  >
                    Download
                  </Link>
                </Box>
              </Box>
            </BeatCard>
          ))}
        </Box>
      </ContentBox>
    </StyledContainer>
  );
};

export default BeatsPage;
