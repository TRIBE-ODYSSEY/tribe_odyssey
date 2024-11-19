import { Box, CircularProgress } from '@mui/material';

export const LoadingSpinner = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #14121b 0%, #000000 100%)'
    }}
  >
    <CircularProgress sx={{ color: '#ebebeb' }} />
  </Box>
); 