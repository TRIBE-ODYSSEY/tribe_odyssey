import React from 'react';

const ChapterSection: React.FC = () => {
  return (
    <section className="relative h-screen bg-cover w-full bg-center bg-herobg bg-no-repeat flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative flex items-center justify-center h-full w-full flex-col">
        <h1 className="font-montserrat text-8xl">A New Chapter</h1>
        <h1 className="font-montserrat text-8xl">Begins</h1>
      </div>
    </section>
  );
};

export default ChapterSection;
