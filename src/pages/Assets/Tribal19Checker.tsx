import React, { useEffect, useState, useCallback } from 'react';
import { isAddress } from 'ethers';
import debounce from 'lodash/debounce';
import PageLayout from '@src/components/common/layout/PageLayout';
import PageTitle from '@src/components/common/PageTitle';
import CheckerPopup from '@src/components/common/CheckerPopup';


interface NFTTrait {
  trait_type: string;
  value: string;
}

interface NFTData {
  identifier: string;
  traits: NFTTrait[];
}

interface CheckerResult {
  isEligible: boolean;
  message: string;
  data: {
    assetsValue: string;
    favoriteSpecies: string;
    totalAssets: number;
    progress: number;
    missingSpecies?: string[];
    nanaPoints: number;
  };
}

const OPENSEA_API_KEY = '61d4651899ad47a5b1dab18c10ef07e1';
const TRIBE_SPECIES = [
  '24 Carat', 'Acid', 'Ash', 'Chameleon', 'Clay',
  'Dark Simianoid', 'Equinox', 'Frost', 'Helios', 'Oak',
  'Ochre', 'Onyx', 'Panthera', 'Poison', 'Sapphire',
  'Shaman', 'Simianoid', 'Undead', 'Wild Quartz'
];

const Tribal19CheckerPage: React.FC = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckerResult | null>(null);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    document.title = "Tribe 19 Checker | Assets";
  }, []);

  // Validate address using debounce
  const validateAddress = useCallback(
    debounce((value: string) => {
      if (!value) {
        setIsValidAddress(false);
        setError(null);
        return;
      }

      if (value.endsWith('.eth') || isAddress(value)) {
        setIsValidAddress(true);
        setError(null);
      } else {
        setIsValidAddress(false);
        setError('Please enter a valid ETH address or ENS name');
      }
    }, 500),
    []
  );

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setAddress(value);
    validateAddress(value);
    setResult(null);
  };

  const getTribeTraits = async (nft: { identifier: string }): Promise<NFTData> => {
    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/ethereum/contract/0x77f649385ca963859693c3d3299d36dfc7324eb9/nfts/${nft.identifier}`,
      {
        headers: {
          'x-api-key': OPENSEA_API_KEY,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch NFT traits');
    }
    
    const data = await response.json();
    return data.nft;
  };

  const getTribeStats = async () => {
    const response = await fetch(
      `https://api.opensea.io/api/v2/collections/tribe-odyssey/stats`,
      {
        headers: {
          'x-api-key': OPENSEA_API_KEY,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch collection stats');
    }
    
    return await response.json();
  };

  const checkEligibility = async (address: string): Promise<CheckerResult> => {
    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/ethereum/account/${address}/nfts?collection=tribe-odyssey&limit=200`,
      {
        headers: {
          'x-api-key': OPENSEA_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch NFTs');
    }

    const data = await response.json();
    const traitsToCheck = new Set(TRIBE_SPECIES);
    const speciesCount = new Map<string, number>();

    // Process first 120 NFTs
    await Promise.all(data.nfts.slice(0, 120).map(async (nft: any) => {
      const tribeTraits = await getTribeTraits(nft);
      const species = tribeTraits.traits
        .find(trait => trait.trait_type === 'Species')
        ?.value;

      if (species) {
        if (traitsToCheck.has(species)) {
          traitsToCheck.delete(species);
        }
        speciesCount.set(species, (speciesCount.get(species) || 0) + 1);
      }
    }));

    // Get collection stats
    const stats = await getTribeStats();
    const totalAssets = data.nfts.length;
    const assetsValue = (Number(stats.total.floor_price) * totalAssets).toFixed(4);
    
    // Find favorite species
    let favoriteSpecies = 'None';
    let maxCount = 0;
    
    speciesCount.forEach((count, species) => {
      if (count > maxCount) {
        maxCount = count;
        favoriteSpecies = species;
      }
    });

    const isEligible = traitsToCheck.size === 0;
    const progress = TRIBE_SPECIES.length - traitsToCheck.size;

    return {
      isEligible,
      message: isEligible
        ? "Congratulations! You are in the exclusive TRIBΞ19 club! 🎉"
        : `To enter the exclusive TRIBΞ19 club, collect the missing species below`,
      data: {
        assetsValue: `${assetsValue} ETH`,
        favoriteSpecies,
        totalAssets,
        progress,
        missingSpecies: Array.from(traitsToCheck),
        nanaPoints: totalAssets * 10
      }
    };
  };

  const handleAnalyse = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setResult(null);

      const result = await checkEligibility(address);
      setResult(result);
      setTimeout(() => setShowPopup(true), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while checking eligibility');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-[600px] mx-auto">
          <PageTitle>
            <span className="bg-gradient-to-b from-white/90 to-white/0 bg-clip-text text-transparent">
              Tribe 19 Checker
            </span>
          </PageTitle>

          <div className="space-y-8 mt-8">
            {/* Input Field */}
            <div className="relative">
              <input
                type="text"
                className={`w-full px-6 py-4 bg-black/20 border ${
                  error ? 'border-red-500' : 'border-white/15'
                } rounded-full text-white/60 placeholder-white/40 focus:outline-none focus:border-white/30
                transition-all duration-300`}
                placeholder="ETH ADDRESS/ENS"
                value={address}
                onChange={handleAddressChange}
                disabled={isLoading}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>

            {/* Analyse Button */}
            <button
              onClick={handleAnalyse}
              disabled={!isValidAddress || isLoading}
              className={`w-full py-4 px-6 rounded-full transition-all duration-300
                ${isValidAddress && !isLoading 
                  ? 'bg-red-600 hover:bg-red-700 transform hover:-translate-y-0.5' 
                  : 'bg-red-600/50 cursor-not-allowed'
                } text-white font-medium`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Analysing...
                </div>
              ) : (
                'Analyse'
              )}
            </button>

            {/* Results Section */}
            {result && (
              <div className={`transition-all duration-800 ease-in-out
                ${result.isEligible ? 'bg-green-500/5 border-green-500/50' : 'bg-blue-500/5 border-blue-500/50'}
                border rounded-lg p-4 text-white`}
              >
                {result.message}
              </div>
            )}
          </div>
        </div>
      </div>
      {result && (
        <CheckerPopup
          open={showPopup}
          onClose={() => setShowPopup(false)}
          data={{
            ...result.data,
            isEligible: result.isEligible,
            message: result.message
          }}
        />
      )}
    </PageLayout>
  );
};

export default Tribal19CheckerPage;