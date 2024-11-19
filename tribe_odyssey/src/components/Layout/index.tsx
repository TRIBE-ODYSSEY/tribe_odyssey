import React from 'react';
import { Box, styled } from '@mui/material';
import { Header } from '../NavBar/Header';
import { Footer } from '../Footer';
import AppRoutes from '../../routes';

interface LayoutProps {
  children?: React.ReactNode;
}

const StyledLayout = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(180deg, #14121b 0%, #000000 100%)',
  color: '#ebebeb',
  overflow: 'hidden'
});

const Main = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  position: 'relative',
  zIndex: 1
});

const Layout: React.FC<LayoutProps> = () => {
  return (
    <StyledLayout>
      <Header />
      <Main>
        <AppRoutes />
      </Main>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
