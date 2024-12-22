import React from 'react';

const ChapterSection: React.FC = () => {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('images/hero-bg.webp')" }}
    >
      <div className="flex items-center justify-center h-full w-full flex-col">
        <h1
          className="text-8xl text-center
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
    </div>
  );
};

export default ChapterSection;
