import useLazyLoading from '@src/lib/hooks/useLazyLoading';
import React, { useEffect, useState } from 'react';
import { FaBars, FaInstagram, FaTelegram, FaTimes, FaTwitter } from 'react-icons/fa';
import { ConnectKitButton } from 'connectkit';
import Menu from './menu';

interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavigationItem {
  label: string;
  items: MenuItem[];
}

const navigationData = {
  menus: [
    { label: 'Element', items: [{ label: 'Drops', href: '/element19/drops' }, { label: 'Collection', href: '/element19/collection' }] },
    { label: 'Assets', items: [{ label: '4kTribe ', href: '/assets/4kTribe' }, { label: 'Molten', href: '/assets/molten' }, { label: 'Wallpapers', href: '/assets/wallpapers' }, { label: 'ENS', href: '/assets/ens' }] },
    { label: 'Marketplace', items: [{ label: 'Marketplace 1', href: '#' }] },
    { label: 'Staking', items: [{ label: 'Raffles', href: '/staking/raffles' }, { label: 'Stake Apes', href: '/staking/stake-apes' }, { label: 'Winners', href: '/staking/winners' }] },
    { label: 'The Council', items: [{ label: 'Council', href: '/council' }] },
  ] as NavigationItem[],
  profile: {
    label: 'Profile',
    items: [
      { label: 'My NFTs', href: '/my-nfts' },
      { label: 'Settings', href: '/settings' },
      { label: 'Disconnect', href: '#', onClick: () => {
        window.dispatchEvent(new Event('wallet-disconnect'));
        return true;
      }}
    ] as MenuItem[]
  },
  socials: [
    { icon: <FaTwitter />, href: 'https://twitter.com/tribeodyssey' },
    { icon: <FaTelegram />, href: '#' },
    { icon: <FaInstagram />, href: 'https://www.instagram.com/tribe.odyssey/' },
  ]
};

const SocialIcons: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    {navigationData.socials.map((social, idx) => (
      <a
        key={idx}
        href={social.href}
        className="text-white/70 hover:text-white transition-colors text-lg sm:text-xl"
        target="_blank"
        rel="noopener noreferrer"
      >
        {social.icon}
      </a>
    ))}
  </div>
);

const NavMenu: React.FC<{ isMobile?: boolean; onClose?: () => void }> = ({ isMobile, onClose }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenu(activeMenu === menuLabel ? null : menuLabel);
  };

  const commonButtonClasses = `
    text-white/80 hover:text-white transition-colors whitespace-nowrap w-full
    ${isMobile ? 'text-lg py-3' : 'text-sm px-3 py-2'}
  `;

  return (
    <ul className={`flex ${isMobile ? 'flex-col w-full gap-4' : 'items-center gap-2'}`}>
      {navigationData.menus.map((menu) => (
        <li key={menu.label} className={`relative group ${isMobile ? 'w-full' : ''}`}>
          <button 
            className={`${commonButtonClasses} ${activeMenu === menu.label ? 'text-white' : ''}`}
            onClick={() => handleMenuClick(menu.label)}
            aria-expanded={activeMenu === menu.label}
          >
            {menu.label}
          </button>
          <Menu 
            items={menu.items} 
            isMobile={isMobile}
            isOpen={activeMenu === menu.label}
            onClose={() => {
              setActiveMenu(null);
              onClose?.();
            }}
            className={isMobile ? 'w-full' : ''}
          />
        </li>
      ))}
    </ul>
  );
};

const MobileNav: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  useLazyLoading();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 md:hidden">
      <div className="h-full flex flex-col pt-16 pb-8 px-4 overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white/80 hover:text-white"
          aria-label="Close menu"
        >
          <FaTimes size={24} />
        </button>

        <div className="flex-1 flex flex-col items-center gap-6 max-w-sm mx-auto w-full">
          <NavMenu isMobile onClose={onClose} />
          <ConnectKitButton />
          <SocialIcons className="flex gap-6" />
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setIsMenuOpen(false);
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <nav className="sticky top-0 w-full bg-backgroundDark/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between md:justify-center gap-4">
          <img
            data-src="images/logo.png"
            alt="Logo"
            loading="lazy"
            className="w-20 sm:w-24 h-8 sm:h-10"
          />

          <div className="hidden md:flex items-center gap-4 sm:gap-6">
            <NavMenu />
            <SocialIcons className="flex gap-3 sm:gap-4" />
            <ConnectKitButton />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            <FaBars size={22} />
          </button>
        </div>
      </div>

      <MobileNav 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;