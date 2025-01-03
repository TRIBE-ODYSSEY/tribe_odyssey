import React, { useEffect } from 'react';
import PageLayout from '@src/components/common/layout/PageLayout';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import { FaTwitter } from 'react-icons/fa';

const beats = [
  { title: "Tribe Evolution", url: "#" },
  { title: "Tribal Warriors", url: "#" },
  { title: "Digital Odyssey", url: "#" },
];

const BeatCard: React.FC<{ title: string; url: string }> = ({ title, url }) => (
  <div className="group flex flex-col w-full md:w-[400px] gap-5 p-6 
                  bg-[#181818] rounded-lg border border-white/10 
                  transition-all duration-300 hover:-translate-y-0.5 
                  hover:border-white/20">
    <MusicalNoteIcon className="w-12 h-12 text-red-600" />
    <div className="flex justify-between items-center w-full">
      <span className="text-white">{title}</span>
      <a href={url} 
         className="text-red-600 hover:opacity-80 transition-opacity 
                    duration-300">
        Download
      </a>
    </div>
  </div>
);

const TribalBeatsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Tribal Beats";
  }, []);

  const handleTwitterClick = () => {
    window.open("https://twitter.com/leeroy", "_blank");
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center max-w-[960px] mx-auto gap-16">
          {/* Description Section */}
          <div className="flex flex-col items-center gap-8 w-full">
            <p className="text-white/80 text-lg text-center max-w-[800px] 
                         leading-relaxed font-medium">
              Thanks to Leeroy, reppin' Tribe just got even easier with the
              legendary musician and DJ (The Prodigy) creating some badass custom
              Tribal ringtones for our entire community to enjoy!
            </p>

            <div className="flex items-center gap-4">
              <span className="text-white/80">Follow Leeroy</span>
              <button
                onClick={handleTwitterClick}
                className="text-[#1DA1F2] p-2 rounded-full 
                         hover:scale-110 transition-transform duration-300"
              >
                <FaTwitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Beats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                         gap-4 w-full">
            {beats.map((beat, index) => (
              <BeatCard key={index} {...beat} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TribalBeatsPage;