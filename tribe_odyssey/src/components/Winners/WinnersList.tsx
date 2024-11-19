import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

interface Winner {
  address: string;
  ensName?: string;
  raffleTitle: string;
  date: Date;
  prize: string;
}

interface WinnersListProps {
  winners: Winner[];
}

export const WinnersList: React.FC<WinnersListProps> = ({ winners }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Recent Winners</Typography>
      <List>
        {winners.map((winner, index) => (
          <ListItem
            key={index}
            sx={{
              mb: 2,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ 
                background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)'
              }}>
                {winner.ensName?.[0] || winner.address[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={winner.ensName || `${winner.address.slice(0, 6)}...${winner.address.slice(-4)}`}
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="text.secondary">
                    Won {winner.prize} from {winner.raffleTitle}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.secondary">
                    {winner.date.toLocaleDateString()}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}; 