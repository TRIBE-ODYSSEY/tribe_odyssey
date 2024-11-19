import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton, Typography, Modal, Fade, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ImageIcon from "@mui/icons-material/Image";
import Confetti from 'react-confetti';

interface CheckerPopupProps {
  open: boolean;
  onClose: () => void;
  data: {
    assetsValue: string;
    favoriteSpecies: string;
    totalAssets: number;
    progress: number;
    missingSpecies?: string[];
    nanaPoints: number;
  } & {
    isEligible: boolean;
    message: string;
  };
}

export const CheckerPopup: React.FC<CheckerPopupProps> = ({ open, onClose, data }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    assetsValue,
    favoriteSpecies,
    totalAssets,
    progress,
    missingSpecies,
    isEligible,
    message,
    nanaPoints
  } = data;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "relative",
            width: { xs: '95%', sm: '80%', md: 600 },
            maxWidth: 600,
            backgroundColor: "#181818",
            outline: 'none',
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
          }}
        >
          {isEligible && open && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={200}
              recycle={false}
              colors={['#FF0008', '#EBEBEB', '#FFD700', '#FF69B4']}
            />
          )}

          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 32,
              height: 32,
              borderRadius: "16px",
              border: "1px solid #ff0008",
              '&:hover': {
                backgroundColor: 'rgba(255, 0, 8, 0.1)',
              }
            }}
          >
            <CloseIcon sx={{ color: "#ff0008", fontSize: 20 }} />
          </IconButton>

          <Box sx={{ pt: 2, pb: 3 }}>
            {/* Status Alert */}
            <Alert 
              severity={isEligible ? "success" : "info"}
              sx={{
                mb: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                border: '1px solid',
                borderColor: isEligible 
                  ? 'rgba(46, 125, 50, 0.5)'
                  : 'rgba(2, 136, 209, 0.5)',
              }}
            >
              {message}
            </Alert>

            {/* Title Section */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 32, sm: 48 },
                textAlign: "center",
                background: isEligible 
                  ? "linear-gradient(180deg, #FFD700 0%, #FFA500 100%)"
                  : "linear-gradient(180deg, #EBEBEB 0%, rgba(235, 235, 235, 0) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "Montserrat, Helvetica",
                fontWeight: 500,
                mb: 2,
              }}
            >
              {isEligible ? "Congratulations!" : "Road to T19"}
            </Typography>

            {/* Progress Section */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography
                sx={{
                  fontFamily: "Montserrat, Helvetica",
                  fontWeight: 600,
                  color: "#ebebeb",
                  fontSize: 18,
                }}
              >
                {progress}/19
              </Typography>

              {/* Progress Bar */}
              <Box sx={{ position: 'relative', height: 40, my: 2 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: 2,
                    top: '50%',
                    backgroundColor: '#363636',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    width: `${(progress / 19) * 100}%`,
                    height: 2,
                    top: '50%',
                    background: isEligible
                      ? 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)'
                      : 'linear-gradient(90deg, #FF0008 0%, #FF0008 100%)',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      right: 0,
                      top: -4,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: isEligible ? '#FFD700' : '#FF0008',
                    }
                  }}
                />
              </Box>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ color: "#ebebeb99", fontSize: 12, mb: 0.5 }}>
                    Assets value
                  </Typography>
                  <Typography sx={{ color: "#ebebeb", fontSize: 16, fontWeight: 600 }}>
                    {assetsValue}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ color: "#ebebeb99", fontSize: 12, mb: 0.5 }}>
                    Favourite species
                  </Typography>
                  <Typography sx={{ color: "#ebebeb", fontSize: 16, fontWeight: 600 }}>
                    {favoriteSpecies}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ color: "#ebebeb99", fontSize: 12, mb: 0.5 }}>
                    Total assets
                  </Typography>
                  <Typography sx={{ color: "#ebebeb", fontSize: 16, fontWeight: 600 }}>
                    {totalAssets}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ color: "#ebebeb99", fontSize: 12, mb: 0.5 }}>
                    NANA points/day
                  </Typography>
                  <Typography sx={{ color: "#ebebeb", fontSize: 16, fontWeight: 600 }}>
                    {nanaPoints || totalAssets * 10}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Next Species Section */}
            {!isEligible && missingSpecies && missingSpecies.length > 0 && (
              <>
                <Typography
                  sx={{
                    color: "#ebebeb",
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: 'center',
                    mb: 2,
                  }}
                >
                  COLLECT THESE SPECIES
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 3
                  }}
                >
                  {missingSpecies.slice(0, 2).map((species, index) => (
                    <Box 
                      key={species}
                      sx={{ 
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: '8px 16px',
                        borderRadius: '20px'
                      }}
                    >
                      {index === 0 ? (
                        <ArrowDownwardIcon sx={{ color: "#ebebeb", fontSize: 24 }} />
                      ) : (
                        <ImageIcon sx={{ color: "#ebebeb", fontSize: 24 }} />
                      )}
                      <Typography sx={{ color: "#ebebeb", fontSize: 14 }}>
                        {species}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </>
            )}

            {/* All Missing Species */}
            {!isEligible && missingSpecies && missingSpecies.length > 2 && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography sx={{ color: "#ebebeb99", fontSize: 12, mb: 1 }}>
                  Other Missing Species
                </Typography>
                <Typography sx={{ color: "#ebebeb", fontSize: 14 }}>
                  {missingSpecies.slice(2).join(', ')}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CheckerPopup; 