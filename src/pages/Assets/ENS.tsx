import React, { useState } from "react";
import PageTitle from '../../components/common/PageTitle';
import PageLayout from '../../components/common/layout/PageLayout';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '../../components/common/Button';
import { Popover } from '@headlessui/react';

// The HtmlTooltip component is used to show tooltips with information
// It's used with the InformationCircleIcon button below
export const HtmlTooltip: React.FC<{ content: React.ReactNode; children: React.ReactNode }> = ({ content, children }) => {
  return (
    <Popover className="relative">
      <Popover.Button>{children}</Popover.Button>
      <Popover.Panel className="absolute z-10">
        <div className="bg-gradient-to-b from-[#14121b] to-black border border-[rgba(128,131,154,0.5)] rounded-md p-3 max-w-[215px]">
          {content}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

const ENSPage: React.FC = () => {
  const [domainName, setDomainName] = useState('');

  const handleRegister = () => {
    console.log('Registering:', domainName);
  };

  const handleInfoClick = () => {
    console.log('Info clicked');
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-[960px] mx-auto flex flex-col items-center gap-10">
          {/* Title Section */}
          <div className="flex flex-col items-center gap-8 w-full">
            <PageTitle>
              <span className="bg-gradient-to-b from-white/90 to-white/0 bg-clip-text text-transparent">
                ENS
              </span>
            </PageTitle>

            <div className="max-w-[800px] text-center space-y-6">
              <p className="font-montserrat text-lg text-white/65 font-semibold">
                Tribe Odyssey has become part of the ENS takeover! Users who hold a Tribe Odyssey NFT, can now register a unique tribeodyssey.eth{' '}
                <span className="text-red-600 font-normal">(just pay gas!)</span>
              </p>

              <p className="font-montserrat text-lg text-white/65">
                We look forward to seeing our loyal community repping their new and unique Tribe Odyssey subdomains and embracing the ENS revolution!
              </p>

              <Button 
                onClick={handleInfoClick}
                className="flex items-center gap-2 mx-auto group"
              >
                <span>How it works?</span>
                <InformationCircleIcon 
                  className="h-6 w-6 text-red-600 hover:text-red-700 transform transition-all duration-300 ease-in-out group-hover:scale-110"
                />
              </Button>
            </div>
          </div>

          {/* Registration Form */}
          <div className="w-full max-w-[646px] bg-[#181818] border border-white/10 rounded-lg p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Your domain name"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  className="w-full px-6 py-4 bg-[#181818] border border-white/15 rounded-full 
                           text-white/50 placeholder-white/50 font-inter text-base
                           focus:outline-none focus:border-white/25 transition-colors"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50">
                  .tribeodyssey.eth
                </span>
              </div>
              <Button
                onClick={handleRegister}
                className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full 
                         font-inter text-base transition-colors whitespace-nowrap"
              >
                Register
              </Button>
            </div>
          </div>

          {/* Info Link */}
          <p className="font-montserrat text-lg text-center text-white/65">
            <span className="font-semibold">
              For more information about ENS subdomains click{' '}
            </span>
            <a 
              href="https://www.one37pm.com/nft/what-is-a-ens-subdomain/amp" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 underline hover:opacity-80 transition-opacity"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ENSPage;
