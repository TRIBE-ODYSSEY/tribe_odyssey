import React from 'react';

const ChapterSection: React.FC = () => {
  return (
    <section className="relative w-screen   h-screen bg-cover  bg-center bg-herobg bg-no-repeat flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative flex items-center justify-center h-full w-full flex-col">
        <h1
          className="  text-8xl text-center
  bg-gradient-to-tr from-transparent to-white
  bg-clip-text
  text-transparent
  inline-block
  leading-tight"
        >
          A New Chapter
          <br />
          Begins
        </h1>
      </div>
    </section>
  );
};

export default ChapterSection;
