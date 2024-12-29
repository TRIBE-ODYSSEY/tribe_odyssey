import useLazyLoading from '@src/lib/hooks/useLazyLoading';
import React, { useEffect, useState } from 'react';
import { FaBars, FaInstagram, FaTelegram, FaTimes, FaTwitter } from 'react-icons/fa';
import Menu from './menu';
import Button from './button';

const navigationData = {
  menus: [
    { label: 'Element', items: [{ label: 'Drops', href: '#' }, { label: 'Option 2', href: '#' }] },
    { label: 'Assets', items: [{ label: 'Asset 1', href: '#' }, { label: 'Asset 2', href: '#' }] },
    { label: 'Marketplace', items: [{ label: 'Marketplace 1', href: '#' }] },
    { label: 'Staking', items: [{ label: 'Staking 1', href: '#' }] },
    { label: 'The Council', items: [{ label: 'Council 1', href: '#' }] },
  ],
  profile: {
    label: 'Profile',
    items: [
      { label: 'My NFTs', href: '/my-nfts' },
      { label: 'Settings', href: '/settings' },
      { label: 'Disconnect', href: '#', onClick: () => window.dispatchEvent(new Event('wallet-disconnect')) }
    ],
  },
  socials: [
    { icon: <FaTwitter />, href: '#' },
    { icon: <FaTelegram />, href: '#' },
    { icon: <FaInstagram />, href: '#' },
  ],
} as const;

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

  return (
    <ul className={`flex ${isMobile ? 'flex-col w-full gap-4' : 'items-center gap-1 sm:gap-2'}`}>
      {navigationData.menus.map((menu) => (
        <li key={menu.label} className={`relative group ${isMobile ? 'w-full' : ''}`}>
          <button 
            className={`
              text-white/80 hover:text-white transition-colors whitespace-nowrap w-full
              ${isMobile ? 'text-lg sm:text-xl py-3' : 'text-sm sm:text-base px-2 sm:px-3 py-2'}
              ${activeMenu === menu.label ? 'text-white' : ''}
            `}
            onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
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
            className={isMobile ? 'w-full' : 'min-w-[180px] sm:min-w-[200px]'}
          />
        </li>
      ))}
    </ul>
  );
};

const ProfileButton: React.FC<{ isWalletConnected?: boolean; isMobile?: boolean }> = ({ 
  isWalletConnected = false,
  isMobile = false 
}) => {
  if (!isWalletConnected) return null;
  
  return (
    <div className={`relative group ${isMobile ? 'w-full' : ''}`}>
      <Button isWalletConnected className={isMobile ? 'w-full justify-center' : ''} />
      <Menu 
        items={navigationData.profile.items} 
        className={`${isMobile ? 'w-full' : 'right-0'} mt-2`} 
        isMobile={isMobile} 
      />
    </div>
  );
};

const MobileNav: React.FC<{ isOpen: boolean; onClose: () => void; isWalletConnected: boolean }> = ({ 
  isOpen, 
  onClose,
  isWalletConnected 
}) => {
  useLazyLoading();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 md:hidden">
      <div className="h-full flex flex-col pt-16 pb-8 px-4 sm:px-6 overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white/80 hover:text-white"
          aria-label="Close menu"
        >
          <FaTimes size={24} />
        </button>

        <div className="flex-1 flex flex-col items-center gap-6 sm:gap-8 max-w-sm mx-auto w-full">
          <NavMenu isMobile onClose={onClose} />
          {!isWalletConnected && (
            <Button onClick={onClose} className="w-full justify-center text-lg" />
          )}
          <ProfileButton isWalletConnected={isWalletConnected} isMobile />
          <SocialIcons className="flex gap-6" />
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => setIsWalletConnected(true);
    const handleDisconnect = () => setIsWalletConnected(false);
    const handleResize = () => window.innerWidth >= 768 && setIsMenuOpen(false);
    
    window.addEventListener('wallet-connect', handleConnect);
    window.addEventListener('wallet-disconnect', handleDisconnect);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('wallet-connect', handleConnect);
      window.removeEventListener('wallet-disconnect', handleDisconnect);
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
            <div className="flex items-center gap-2 sm:gap-3">
              {!isWalletConnected && <Button />}
              <ProfileButton isWalletConnected={isWalletConnected} />
            </div>
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
        isWalletConnected={isWalletConnected} 
      />
    </nav>
  );
};

export default Navbar;
