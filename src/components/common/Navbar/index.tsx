import useLazyLoading from '@src/lib/hooks/useLazyLoading';
import React, { useEffect, useState } from 'react';
import { FaBars, FaInstagram, FaDiscord, FaXTwitter } from 'react-icons/fa6';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { menuConfig } from '@src/lib/config/menuConfig';
import { Menu } from '@headlessui/react';
import { Link, useLocation } from 'react-router-dom';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import CustomButton from './button';
import { IoClose } from 'react-icons/io5';

const MenuDropdown: React.FC<{ title: string; items: Array<{ name: string; path: string }> }> = ({ 
  title, 
  items 
}) => {
  const handleClick = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button className="flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-3 py-2 transition-colors">
            {title}
            {open ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
          </Menu.Button>
          <Menu.Items className="absolute left-0 mt-2 w-48 rounded-md bg-[var(--color-secondary)] border border-[#2A2A2A] shadow-lg backdrop-blur-sm">
            <div className="py-1">
              {items.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    item.path.startsWith('http') ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${
                          active ? 'bg-[#2A2A2A] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                        } block px-4 py-2 text-sm transition-colors`}
                        onClick={handleClick}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        className={`${
                          active ? 'bg-[#2A2A2A] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                        } block px-4 py-2 text-sm transition-colors`}
                        onClick={handleClick}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};

const SocialIcons: React.FC<{ className?: string }> = ({ className }) => {
  const socials = [
    { icon: <FaXTwitter />, href: 'https://twitter.com/tribeodyssey' },
    //{ icon: <FaTelegram />, href: '#' },
    { icon: <FaInstagram />, href: 'https://www.instagram.com/tribe.odyssey/' },
  ];

  return (
    <div className={className}>
      {socials.map((social, idx) => (
        <a
          key={idx}
          href={social.href}
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-lg sm:text-xl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

const NavMenu: React.FC<{ isMobile?: boolean; onClose?: () => void }> = ({ isMobile, onClose }) => {
  const commonClasses = `flex ${isMobile ? 'flex-col w-full gap-4' : 'items-center gap-2'}`;

  return (
    <div className={commonClasses}>
      {Object.entries(menuConfig).map(([title, items]) => (
        Array.isArray(items) ? (
          <MenuDropdown key={title} title={title} items={items} />
        ) : (
          <Link
            key={title}
            to={items}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-3 py-2 transition-colors"
            onClick={() => {
              if (isMobile) onClose?.();
              setTimeout(() => {
                window.scrollTo(0, 0);
              }, 0);
            }}
          >
            {title}
          </Link>
        )
      ))}
    </div>
  );
};

const WalletSection: React.FC = () => {
  const location = useLocation();
  const isStakingPath = location.pathname.includes('/staking');
  const isRafflesAdminPath = location.pathname.includes('/raffles/admin');
  const isRafflesPath = location.pathname.includes('/raffles');
  const isENSPage = location.pathname.includes('/ens');

  return (
    <div className="flex items-center gap-2">
      {isStakingPath || isRafflesAdminPath || isRafflesPath || isENSPage ? (
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
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
                      <CustomButton onClick={openConnectModal}>
                        Connect Wallet
                      </CustomButton>
                    );
                  }

                  return (
                    <CustomButton 
                      onClick={openAccountModal}
                      isWalletConnected={true}
                    >
                      {account.displayName}
                    </CustomButton>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      ) : (
        <CustomButton
          onClick={() => window.open('https://discord.gg/T7Bv5JsFYd', '_blank')}
        >
          <div className="flex items-center gap-2">
            <FaDiscord className="text-xl" />
            <span>Join Discord</span>
          </div>
        </CustomButton>
      )}
    </div>
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
          className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          aria-label="Close menu"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <div className="flex-1 flex flex-col items-center gap-6 max-w-sm mx-auto w-full">
          <NavMenu isMobile onClose={onClose} />
          <WalletSection />
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
    <nav className="sticky top-0 w-full bg-[var(--color-background)]/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between md:justify-center gap-4">
          <Link to="/" className="flex items-center">
            <img
              data-src="images/logo.png"
              alt="Logo"
              loading="lazy"
              className="w-20 sm:w-24 h-8 sm:h-10 hover:opacity-80 transition-opacity"
            />
          </Link>

          <div className="hidden md:flex items-center gap-4 sm:gap-6">
            <NavMenu />
            <SocialIcons className="flex gap-3 sm:gap-4" />
            <WalletSection />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
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