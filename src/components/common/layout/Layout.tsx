import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setDiscordButton={() => {}} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;