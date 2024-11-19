import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  styled,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { isAddress } from 'ethers';
import debounce from 'lodash/debounce';
import CheckerPopup from '../../components/CheckerPopup';

// Styled Components
const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '64px 16px',
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #14121b 0%, #000000 100%)',
});

const ContentWrapper = styled(Box)({
  maxWidth: '600px',
  width: '100%',
  margin: '0 auto',
  padding: '20px',
});

const GradientTitle = styled(Typography)({
  background: "linear-gradient(180deg, rgb(235, 235, 235) 0%, rgba(235, 235, 235, 0) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textFillColor: "transparent",
  fontFamily: "'Montserrat', Helvetica",
  fontWeight: 500,
  fontSize: "80px",
  textAlign: "center",
  letterSpacing: "-2.4px",
  lineHeight: "80px",
  marginBottom: '40px',
  '@media (max-width: 600px)': {
    fontSize: '48px',
    lineHeight: '48px',
  }
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: "#181818",
    borderRadius: "60px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    transition: 'all 0.3s ease',
    
    '&:hover': {
      border: "1px solid rgba(255, 255, 255, 0.25)",
    },
    
    '&.Mui-focused': {
      border: "1px solid rgba(255, 255, 255, 0.35)",
    },
    
    '& fieldset': {
      border: 'none',
    },
    
    '& input': {
      color: "rgba(255, 255, 255, 0.6)",
      fontFamily: "'Inter', Helvetica",
      fontSize: "16px",
      lineHeight: "24px",
      padding: "19px 8px",
    }
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ff0008",
  borderRadius: "60px",
  padding: "12px 24px",
  fontFamily: "'Inter', Helvetica",
  fontSize: "16px",
  lineHeight: "24px",
  color: "white",
  textTransform: 'none',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: "#cc0006",
    transform: 'translateY(-2px)',
  },
  
  '&.Mui-disabled': {
    backgroundColor: "rgba(255, 0, 8, 0.5)",
    color: "rgba(255, 255, 255, 0.5)",
  }
}));

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

const CheckerPage = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckerResult | null>(null);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    document.title = "Tribe 19 Checker";
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

  // Handle input change
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
    const favoriteSpecies = Array.from(speciesCount.entries())
      .reduce((a, b) => (a[1] > b[1] ? a : b))[0];

    const isEligible = traitsToCheck.size === 0;
    const progress = TRIBE_SPECIES.length - traitsToCheck.size;

    return {
      isEligible,
      message: isEligible
        ? "Congratulations! You are in the exclusive TRIBΞ19 club!"
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
    <StyledContainer maxWidth={false}>
      <ContentWrapper>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={8}
          position="relative"
        >
          <GradientTitle variant="h1">
            Tribe 19 Checker
          </GradientTitle>

          <StyledTextField
            fullWidth
            variant="outlined"
            placeholder="ETH ADDRESS/ENS"
            value={address}
            onChange={handleAddressChange}
            error={!!error}
            helperText={error}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIcon sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    opacity: isLoading ? 0.5 : 1
                  }} />
                </InputAdornment>
              ),
            }}
          />

          <StyledButton
            fullWidth
            variant="contained"
            onClick={handleAnalyse}
            disabled={!isValidAddress || isLoading}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={20} color="inherit" />
                Analysing...
              </Box>
            ) : (
              'Analyse'
            )}
          </StyledButton>

          {/* Results Section */}
          {result && (
            <>
              <Fade in={true} timeout={800}>
                <Alert 
                  severity={result.isEligible ? "success" : "info"}
                  sx={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    border: '1px solid',
                    borderColor: result.isEligible 
                      ? 'rgba(46, 125, 50, 0.5)'
                      : 'rgba(2, 136, 209, 0.5)',
                  }}
                >
                  {result.message}
                </Alert>
              </Fade>

              <CheckerPopup
                open={showPopup}
                onClose={() => setShowPopup(false)}
                data={{
                  ...result.data,
                  isEligible: result.isEligible,
                  message: result.message
                }}
              />
            </>
          )}
        </Box>
      </ContentWrapper>
    </StyledContainer>
  );
};

export default CheckerPage; 