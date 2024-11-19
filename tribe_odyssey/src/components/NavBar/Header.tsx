import { Box, Stack, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Twitter, Telegram, Instagram, Wallet } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { GradientText } from "./StyledComponents";
import { Discord } from "../icons/Discord";
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Types
interface NavLink {
  name: string;
  path: string;
  external?: boolean;
}

interface NavItem {
  text: string;
  links: NavLink[];
}

export const NAV_ITEMS: NavItem[] = [
  { 
    text: "Assets", 
    links: [
      { name: '4K Tribe', path: '/4ktribe' },
      { name: 'Wallpapers', path: '/wallpaper' },
      { name: 'ENS', path: '/ens' },
      { name: 'Tribal Beats', path: '/beats' },
      { name: 'Tribe 19 Checker', path: '/checker' }
    ]
  },
  { 
    text: "Marketplace", 
    links: [
      { name: 'Marketplace', path: '/marketplace' },
      { name: 'Opensea', path: 'https://opensea.io/tribe', external: true },
      { name: 'Looksrare', path: 'https://looksrare.org/tribe', external: true },
      { name: 'X2Y2', path: 'https://x2y2.io/tribe', external: true }
    ]
  },
  { 
    text: "Staking", 
    links: [
      { name: 'Stake Apes', path: '/staking' },
      { name: 'Raffles', path: '/raffles' },
      { name: 'Winners', path: '/winners' }
    ]
  },
  { 
    text: "The Council", 
    links: [
      { name: 'Council', path: '/council' }
    ]
  }
];

// Add type safety for social links
interface SocialLink {
  url: string;
  icon: React.ComponentType;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { url: 'https://twitter.com/tribeodyssey', icon: Twitter, label: 'Twitter' },
  { url: 'https://t.me/tribeodyssey', icon: Telegram, label: 'Telegram' },
  { url: 'https://instagram.com/tribeodyssey', icon: Instagram, label: 'Instagram' },
  // ... other social links
];

// Styled components
const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 4),
  height: 80,
  position: 'relative',
  zIndex: 1100,
  maxWidth: '1440px',
  margin: '0 auto',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 2),
  },
}));

const LogoImage = styled('img')(({ theme }) => ({
  height: 32,
  width: 'auto',
  cursor: 'pointer',
  marginRight: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    height: 24,
    marginRight: theme.spacing(2),
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  padding: 8,
  color: 'rgba(255, 255, 255, 0.7)',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: 'white',
    transform: 'translateY(-2px)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
}));

const SocialStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginLeft: 'auto',
  marginRight: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const DiscordButton = styled(Box)(({ theme }) => ({
  padding: '10px 24px',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },

  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    
    '&::before': {
      opacity: 1,
    },
  },
}));

const ConnectWalletButton = styled(Box)(({ theme }) => ({
  padding: '10px 24px',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

export const Header = (): JSX.Element => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [navMenuAnchors, setNavMenuAnchors] = useState<(HTMLElement | null)[]>(
    new Array(NAV_ITEMS.length).fill(null)
  );
  const location = useLocation();

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleNavMenuOpen = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const newAnchors = [...navMenuAnchors];
    newAnchors[index] = event.currentTarget;
    setNavMenuAnchors(newAnchors);
  };

  const handleNavMenuClose = (index: number) => {
    const newAnchors = [...navMenuAnchors];
    newAnchors[index] = null;
    setNavMenuAnchors(newAnchors);
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleConnectWallet = () => {
    console.log('Connecting wallet...');
  };

  return (
    <HeaderWrapper>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LogoImage
          src={logo}
          alt="TRIBE Logo"
          onClick={() => navigate('/')}
        />

        {!isMobile && (
          <DesktopMenu
            navMenuAnchors={navMenuAnchors}
            onNavMenuOpen={handleNavMenuOpen}
            onNavMenuClose={handleNavMenuClose}
          />
        )}
      </Box>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 2,
        ml: 'auto'
      }}>
        <SocialStack direction="row">
          {SOCIAL_LINKS.map((social) => (
            <SocialIconButton
              key={social.label}
              onClick={() => handleSocialClick(social.url)}
              aria-label={social.label}
            >
              <social.icon />
            </SocialIconButton>
          ))}
        </SocialStack>

        {location.pathname === '/ens' ? (
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <Box
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <ConnectWalletButton onClick={openConnectModal}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Wallet sx={{ fontSize: 20 }} />
                            <GradientText>Connect Wallet</GradientText>
                          </Box>
                        </ConnectWalletButton>
                      );
                    }

                    return (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <ConnectWalletButton onClick={openChainModal}>
                          <GradientText>
                            {chain.hasIcon && (
                              <Box
                                component="img"
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                sx={{ width: 20, height: 20, mr: 1 }}
                              />
                            )}
                            {chain.name}
                          </GradientText>
                        </ConnectWalletButton>
                        <ConnectWalletButton onClick={openAccountModal}>
                          <GradientText>
                            {account.displayName}
                            {account.displayBalance ? ` (${account.displayBalance})` : ''}
                          </GradientText>
                        </ConnectWalletButton>
                      </Box>
                    );
                  })()}
                </Box>
              );
            }}
          </ConnectButton.Custom>
        ) : (
          <DiscordButton onClick={() => handleSocialClick('https://discord.gg/tribeodyssey')}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Discord sx={{ fontSize: 20 }} />
              <GradientText>Join Discord</GradientText>
            </Box>
          </DiscordButton>
        )}

        {isMobile && (
          <IconButton
            onClick={handleMobileMenuOpen}
            sx={{
              color: 'white',
              ml: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {isMobile && (
        <MobileMenu
          mobileMenuAnchor={mobileMenuAnchor}
          navMenuAnchors={navMenuAnchors}
          onMobileMenuClose={handleMobileMenuClose}
          onNavMenuOpen={handleNavMenuOpen}
          onNavMenuClose={handleNavMenuClose}
        />
      )}
    </HeaderWrapper>
  );
};
