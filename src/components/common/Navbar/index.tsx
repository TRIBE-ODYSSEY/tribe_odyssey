import useLazyLoading from '@src/lib/hooks/useLazyLoading';
import React, { useEffect, useState } from 'react';
import {
  FaBars,
  FaInstagram,
  FaTelegram,
  FaTimes,
  FaTwitter,
} from 'react-icons/fa';
import Menu from './menu';
/* ------------------------------------------
 * 1. Definicje danych (menu, profil, ikony)
 * ------------------------------------------ */
const menusData = [
  {
    label: 'Element',
    items: [
      { label: 'Drops', href: '#' },
      { label: 'Option 2', href: '#' },
    ],
  },
  {
    label: 'Assets',
    items: [
      { label: 'Asset 1', href: '#' },
      { label: 'Asset 2', href: '#' },
    ],
  },
  {
    label: 'Marketplace',
    items: [
      { label: 'Marketplace 1', href: '#' },
      { label: 'Marketplace 2', href: '#' },
    ],
  },
  {
    label: 'Staking',
    items: [
      { label: 'Staking 1', href: '#' },
      { label: 'Staking 2', href: '#' },
    ],
  },
  {
    label: 'The Council',
    items: [
      { label: 'Council 1', href: '#' },
      { label: 'Council 2', href: '#' },
    ],
  },
];

const profileData = {
  label: 'Profile',
  items: [
    { label: 'Profile 1', href: '#' },
    { label: 'Profile 2', href: '#' },
  ],
};

const socialIconsData = [
  { icon: <FaTwitter />, href: '#' },
  { icon: <FaTelegram />, href: '#' },
  { icon: <FaInstagram />, href: '#' },
];

/* ------------------------------------------
 * 2. Mniejsze komponenty
 * ------------------------------------------ */
const SocialIcons: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    {socialIconsData.map((social, idx) => (
      <a
        key={idx}
        href={social.href}
        className="text-gray-600 hover:text-blue-500 text-xl whitespace-nowrap"
      >
        {social.icon}
      </a>
    ))}
  </div>
);

const MenuList: React.FC<{ data: typeof menusData }> = ({ data }) => (
  <ul className="flex items-center gap-2">
    {data.map((menu, index) => (
      <li key={index} className="relative group m-0.5">
        <button className="text-gray-700 hover:text-blue-500 whitespace-nowrap">
          {menu.label}
        </button>
        <Menu items={menu.items} />
      </li>
    ))}
  </ul>
);

const ProfileSection: React.FC = () => (
  <div className="flex items-center gap-1 ml-4 m-1">
    <div className="flex items-center space-x-1 m-0.5">
      <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap">
        {profileData.label}
      </button>
      <Menu items={profileData.items} />
    </div>
  </div>
);

const DesktopNav: React.FC = () => (
  <div
    className="
      hidden md:flex 
      flex-wrap items-center gap-4 m-1 
      md:justify-center  /* na dużych ekranach wyśrodkuj */
    "
  >
    <MenuList data={menusData} />

    <SocialIcons className="flex space-x-4 ml-4 m-1" />

    <ProfileSection />
  </div>
);

/**
 * Menu na mobile (fullscreen overlay).
 */
interface MobileNavProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isMenuOpen, closeMenu }) => {
  useLazyLoading();
  if (!isMenuOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 md:hidden">
      <div className="flex flex-col h-full">
        <button
          onClick={closeMenu}
          className="absolute top-2 right-2 text-white text-xl"
        >
          <FaTimes />
        </button>

        <ul className="flex-1 flex flex-col justify-center items-center space-y-4 text-white text-lg">
          {menusData.map((menu, index) => (
            <li key={index} className="text-center">
              <a
                href={menu.items[0].href}
                className="hover:text-blue-400 transition-colors whitespace-nowrap"
                onClick={closeMenu}
              >
                {menu.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ------------------------------------------
 * 3. Główny komponent Navbar
 * ------------------------------------------ */
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <nav className="w-full bg-backgroundDark py-2 text-white">
      {/* 
        Kontener, który ogranicza szerokość i centruje (mx-auto) 
        na dużych ekranach. Dzięki flex i justify-between 
        osiągamy "logo po lewej, hamburger po prawej" na mobile.
        Od md wzwyż stosujemy justify-center, by elementy zebrały się 
        po środku w DesktopNav.
      */}
      <div
        className="
          max-w-screen-lg mx-auto 
          flex flex-row items-center px-2
          justify-between md:justify-center 
          flex-nowrap
        "
      >
        {/* Logo */}
        <div className="flex-shrink-0 m-0.5">
          <img
            data-src="images/logo.png"
            alt="Logo"
            loading="lazy"
            className="w-24 h-10 flex-shrink-0"
          />
        </div>

        {/* DesktopNav */}
        <DesktopNav />

        {/* Mobile – ikony społecznościowe w jednym miejscu */}
        <div className="flex ml-auto space-x-4 md:hidden m-1">
          <SocialIcons className="flex space-x-4 p-4 " />
        </div>

        {/* Hamburger (mobile) */}
        <div className="flex items-center space-x-2 m-1 md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl focus:outline-none whitespace-nowrap"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MobileNav – pełnoekranowe menu */}
      <MobileNav
        isMenuOpen={isMenuOpen}
        closeMenu={() => setIsMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
