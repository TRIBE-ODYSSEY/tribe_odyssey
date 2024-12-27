import React from 'react';
import Navbar from '../Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      {/* Navbar */}
      <Navbar />

      {/* Główna zawartość */}
      <main className="w-full">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
