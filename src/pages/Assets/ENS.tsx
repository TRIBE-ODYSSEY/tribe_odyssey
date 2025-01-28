import React, { useState } from "react";
import PageTitle from '@src/components/common/PageTitle';
import PageLayout from '@src/components/common/layout/PageLayout';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from '@src/components/common/Button';
import { Popover } from '@headlessui/react';
import { toast } from "react-toastify";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { getEnsRegistrarAddress, getTribeAddress } from "@src/utils/address";
import ensRegistrarABI from "@src/lib/config/abi/EthRegistrarSubdomainRegistrar.json";
import tribeABI from "@src/lib/config/abi/tribe.json";
import { keccak256, toBytes } from 'viem';

// The HtmlTooltip component is used to show tooltips with information
// It's used with the InformationCircleIcon button below
export const HtmlTooltip: React.FC<{ content: React.ReactNode; children: React.ReactNode }> = ({ content, children }) => {
  return (
    <Popover className="relative">
      <Popover.Button>{children}</Popover.Button>
      <Popover.Panel className="absolute z-10">
        <div className="bg-[var(--color-background)] border border-[var(--color-text-secondary)]/20 
                      rounded-md p-3 max-w-[215px] shadow-lg backdrop-blur-sm">
          {content}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

const ENSPage: React.FC = () => {
  const [domainName, setDomainName] = useState('');
  const { address } = useAccount();
  const { writeContract, data: hash } = useWriteContract();
  
  const ensConfig = getEnsRegistrarAddress();
  const tribeConfig = getTribeAddress();

  // Check NFT ownership
  const { data: nftBalance = 0n } = useReadContract({
    ...tribeConfig,
    abi: tribeABI,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: !!address
    }
  });

  // Check if domain exists and if user is allowed to register
  const { data: ensData } = useReadContract({
    ...ensConfig,
    abi: ensRegistrarABI,
    functionName: 'query',
    args: [keccak256(toBytes('tribeodyssey')), domainName],
    query: {
      enabled: !!address && !!domainName
    }
  });

  const { data: isAllowed } = useReadContract({
    ...ensConfig,
    abi: ensRegistrarABI,
    functionName: 'allowedToRegister',
    args: [address],
    query: {
      enabled: !!address
    }
  });

  const { isLoading: isRegistering } = useWaitForTransactionReceipt({
    hash,
  });

  const handleRegister = async () => {
    if (!address || !domainName) {
      toast.error('Please connect your wallet and enter a domain name');
      return;
    }

    if (Number(nftBalance) <= 0) {
      toast.error('You must own a Tribe Odyssey NFT to register an ENS domain');
      return;
    }

    if (!isAllowed) {
      toast.error('You can register 1 ENS per wallet address');
      return;
    }

    if (ensData !== 'tribeodyssey') {
      toast.error('This subdomain is already registered');
      return;
    }
    
    try {
      writeContract({
        ...ensConfig,
        abi: ensRegistrarABI,
        functionName: 'register',
        args: [
          keccak256(toBytes('tribeodyssey')),
          domainName,
          '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41' // ENS Resolver
        ]
      });
      
      setDomainName('');
    } catch (error) {
      console.error('ENS registration failed:', error);
      toast.error('Failed to register ENS domain');
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-[960px] mx-auto flex flex-col items-center gap-10">
          {/* Title Section */}
          <div className="flex flex-col items-center gap-8 w-full">
            <PageTitle>
              <span className="bg-gradient-to-b from-[var(--color-text-primary)] to-[var(--color-text-primary)]/0 
                             bg-clip-text text-transparent">
                ENS
              </span>
            </PageTitle>

            <div className="max-w-[800px] text-center space-y-6">
              <p className="font-montserrat text-lg text-[var(--color-text-secondary)] font-semibold">
                Tribe Odyssey has become part of the ENS takeover! Users who hold a Tribe Odyssey NFT, can now register a unique tribeodyssey.eth{' '}
                <span className="text-[var(--color-button-primary)] font-normal">(just pay gas!)</span>
              </p>

              <p className="font-montserrat text-lg text-[var(--color-text-secondary)]">
                We look forward to seeing our loyal community repping their new and unique Tribe Odyssey subdomains and embracing the ENS revolution!
              </p>

              <div className="flex justify-center">
                <HtmlTooltip
                  content={
                    <div className="ens-faq">
                      <h6 className="mb-1 text-[var(--color-text-primary)]">FAQ</h6>
                      <div className="space-y-1 text-[var(--color-text-secondary)]">
                        <p>1. Connect your wallet</p>
                        <p>2. Input your ENS name</p>
                        <p>3. Push register</p>
                        <p>4. You will be required to be pay gas fees</p>
                        <p>5. You may register 1 ENS per wallet address</p>
                      </div>
                    </div>
                  }
                >
                  <p className="flex items-center text-[var(--color-text-secondary)] 
                               hover:text-[var(--color-button-primary)] transition-colors duration-200">
                    How it works?
                    <InformationCircleIcon className="ml-2 h-6 w-6" />
                  </p>
                </HtmlTooltip>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="w-full max-w-[646px] bg-[var(--color-secondary)] border border-[var(--color-text-primary)]/10 
                         rounded-lg p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Your domain name"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  className="w-full px-6 py-4 bg-[var(--color-overlay-dark)] 
                           border border-[var(--color-text-primary)]/15 rounded-full 
                           text-[var(--color-text-on-dark)] placeholder-[var(--color-text-secondary)]/30 
                           font-inter text-base focus:outline-none focus:border-[var(--color-text-primary)]/25 
                           transition-colors"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[var(--color-text-on-secondary)]/70">
                  .tribeodyssey.eth
                </span>
              </div>
              <Button
                onClick={handleRegister}
                disabled={!address || !domainName || isRegistering || Number(nftBalance) <= 0}
                className="btn-primary whitespace-nowrap"
              >
                {isRegistering ? 'Registering...' : 'Register'}
              </Button>
            </div>
            {Number(nftBalance) <= 0 && address && (
              <p className="mt-2 text-red-500 text-sm">
                You must own a Tribe Odyssey NFT to register an ENS domain
              </p>
            )}
          </div>

          {/* Info Link */}
          <p className="font-montserrat text-lg text-center text-[var(--color-text-secondary)]">
            <span className="font-semibold">
              For more information about ENS subdomains click{' '}
            </span>
            <a 
              href="https://www.one37pm.com/nft/what-is-a-ens-subdomain/amp" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-button-primary)] underline 
                       hover:text-[var(--color-button-hover)] transition-colors"
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
