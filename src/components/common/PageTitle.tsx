import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <h1 
      className="text-[80px] font-medium text-center"
      style={{
        fontFamily: 'Montserrat, sans-serif',
        lineHeight: '100%',
        letterSpacing: '-3%',
        background: `linear-gradient(180deg, 
          var(--color-text-primary) 0%, 
          rgba(255, 255, 255, 0.6) 100%
        )`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
    >
      {children}
    </h1>
  );
};

export default PageTitle; 