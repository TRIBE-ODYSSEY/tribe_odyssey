import { Card, CardMedia, styled } from "@mui/material";
import React from "react";

interface CardBidMainProps {
  image: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  padding: 16,
  position: "relative",
  backgroundColor: 'transparent',
  borderRadius: 16,
  border: '2px solid transparent',
  background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 100%)',
  transition: 'transform 0.3s ease',
  boxShadow: 'none',
  '&:hover': {
    transform: 'translateY(-5px)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.2) 100%)',
  }
});

export const CardBidMain: React.FC<CardBidMainProps> = ({ 
  image, 
  alt = "Tribe NFT",
  width = "100%",
  height = "100%"
}) => {
  return (
    <StyledCard>
      <CardMedia
        component="img"
        image={image}
        alt={alt}
        sx={{ 
          flex: 1,
          width: width,
          height: height,
          objectFit: "cover",
          borderRadius: '12px',
        }}
      />
    </StyledCard>
  );
};

export default CardBidMain; 