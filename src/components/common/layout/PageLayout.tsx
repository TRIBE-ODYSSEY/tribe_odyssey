import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-backgroundDark relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, #FF0009 0%, rgba(255, 0, 9, 0.05) 50%, transparent 100%)`,
          opacity: '0.05',
          mixBlendMode: 'screen',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;