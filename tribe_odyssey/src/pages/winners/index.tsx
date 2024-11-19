import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";

// Styled Components
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '64px 16px',
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #14121b 0%, #000000 100%)',
});

const ContentWrapper = styled(Box)({
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
});

const GradientTitle = styled(Typography)({
  background: "linear-gradient(180deg, rgb(235, 235, 235) 0%, rgba(235, 235, 235, 0) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textFillColor: "transparent",
  fontFamily: "'Montserrat', Helvetica",
  fontWeight: 500,
  fontSize: "80px",
  textAlign: "center",
  letterSpacing: "-2.4px",
  lineHeight: "80px",
  marginBottom: '40px',
  '@media (max-width: 600px)': {
    fontSize: '48px',
    lineHeight: '48px',
  }
});

interface WinnerCardProps {
  imageUrl: string;
  tokenId: string;
  daysAgo: number;
  title: string;
  entries: number;
}

const WinnerCard = ({ imageUrl, tokenId, daysAgo, title, entries }: WinnerCardProps) => (
  <Card
    sx={{
      backgroundColor: "#181818",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: 1,
      padding: 3,
      flex: 1,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }
    }}
  >
    <CardMedia
      component="div"
      sx={{
        height: 230,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 1,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          position: "absolute",
          bottom: 10,
          left: 10,
        }}
      >
        <Button
          sx={{
            backgroundColor: "#ebebeb",
            borderRadius: "60px",
            padding: "3px 12px",
            fontSize: 10,
            color: "#0b081c",
            fontFamily: "Inter, Helvetica",
            textTransform: 'none',
            '&:hover': {
              backgroundColor: "#ffffff",
            }
          }}
        >
          #{tokenId}
        </Button>
        <Button
          sx={{
            backgroundColor: "#ff0008",
            borderRadius: "60px",
            padding: "3px 12px",
            fontSize: 10,
            color: "white",
            fontFamily: "Inter, Helvetica",
            textTransform: 'none',
            '&:hover': {
              backgroundColor: "#cc0006",
            }
          }}
        >
          {daysAgo} Days Ago
        </Button>
      </Box>
    </CardMedia>
    <CardContent sx={{ padding: '16px 0 0' }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Montserrat, Helvetica",
          fontWeight: 600,
          color: "#ffffff",
          marginBottom: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: "Montserrat, Helvetica",
          color: "rgba(255, 255, 255, 0.6)",
          marginBottom: 2,
        }}
      >
        #{tokenId}
      </Typography>
      <Button
        fullWidth
        sx={{
          backgroundColor: "#ebebeb",
          borderRadius: "60px",
          padding: "12px 24px",
          fontFamily: "Inter, Helvetica",
          color: "#0b081c",
          textTransform: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: "#ffffff",
            transform: 'translateY(-2px)',
          }
        }}
      >
        View Winner
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Inter, Helvetica",
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          {entries.toLocaleString()} ENTRIES
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const WinnersPage = () => {
  useEffect(() => {
    document.title = "Winners";
  }, []);

  const winners = [
    {
      imageUrl: "/images/11362.png",
      tokenId: "1033627",
      daysAgo: 400,
      title: "Tribe Ordinals",
      entries: 1184
    },
    // Add more winners here...
  ];

  return (
    <StyledContainer maxWidth={false}>
      <ContentWrapper>
        <GradientTitle variant="h1">
          Winners
        </GradientTitle>
        
        <Grid container spacing={3}>
          {winners.map((winner, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <WinnerCard {...winner} />
            </Grid>
          ))}
        </Grid>
      </ContentWrapper>
    </StyledContainer>
  );
};

export default WinnersPage;
