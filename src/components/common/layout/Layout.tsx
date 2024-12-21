import React from 'react';
import Navbar from '../Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Główna zawartość */}
      <main className="container mx-auto content-items-center justify-center">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
