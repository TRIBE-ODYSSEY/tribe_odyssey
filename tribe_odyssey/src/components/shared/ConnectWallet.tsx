import React from 'react';
import { Button, Typography } from '@mui/material';

interface ConnectWalletProps {
  onConnect: () => void;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
  return (
    <Button
      variant="contained"
      onClick={onConnect}
      className="btn"
      sx={{ px: 4, py: 1.5 }}
    >
      <Typography variant="body2">
        Connect Wallet
      </Typography>
    </Button>
  );
}; 