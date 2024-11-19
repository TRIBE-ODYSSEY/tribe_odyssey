import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';

interface RaffleCardProps {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  ticketPrice: number;
  totalTickets: number;
  soldTickets: number;
}

export const RaffleCard: React.FC<RaffleCardProps> = ({
  title,
  description,
  endDate,
  ticketPrice,
  totalTickets,
  soldTickets
}) => {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          background: 'rgba(255,255,255,0.08)'
        }
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Chip 
          label={`${soldTickets}/${totalTickets} tickets`}
          sx={{ 
            background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)',
            color: 'white'
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {`Ends: ${endDate.toLocaleDateString()}`}
        </Typography>
      </Box>

      <Button 
        variant="contained" 
        fullWidth
        className="btn"
      >
        Buy Ticket ({ticketPrice} ETH)
      </Button>
    </Box>
  );
}; 