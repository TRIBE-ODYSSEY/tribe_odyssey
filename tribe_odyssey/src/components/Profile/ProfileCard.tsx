import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';

interface ProfileCardProps {
  address: string;
  ensName?: string;
  avatar?: string;
  balance: number;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  address,
  ensName,
  avatar,
  balance
}) => {
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 2,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
        <Avatar 
          src={avatar}
          sx={{ 
            width: 64, 
            height: 64,
            background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)'
          }}
        />
        <Box ml={2}>
          <Typography variant="h6">
            {ensName || address.slice(0, 6) + '...' + address.slice(-4)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {balance.toFixed(4)} ETH
          </Typography>
        </Box>
      </Box>

      <Button 
        variant="contained"
        fullWidth
        className="btn"
      >
        Disconnect Wallet
      </Button>
    </Box>
  );
}; 