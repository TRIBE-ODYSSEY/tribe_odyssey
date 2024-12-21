import { useWalletDiscordButtonStore } from '@src/lib/store/walletdiscordStore';
import { ConnectKitButton } from 'connectkit';
import React from 'react';
import { FaInstagram, FaTelegram, FaTwitter } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import Menu from './menu';

const Navbar: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { setIsConnected } = useWalletDiscordButtonStore();

  React.useEffect(() => {
    setIsConnected(isConnected);
  }, [isConnected, setIsConnected]);

  const menus = [
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
  const profile = {
    label: 'Profile',
    items: [
      { label: 'Profile 1', href: '#' },
      { label: 'Profile 2', href: '#' },
    ],
  };
  return (
    <nav className="relative fine-flex flex items-center justify-between flex-col  p-6  border-white ">
      {/* Logo */}
      <img
        data-src="images/logo.png"
        alt="Logo"
        loading="lazy"
        className="w-auto h-12"
      />

      <ul className=" flex   items-center   justify-center   margin-0  space-x-2  text-center ">
        {menus.map((menu, index) => (
          <li key={index} className="group relative">
            <button className="text-white">{menu.label}</button>
            <Menu items={menu.items} className="" />
          </li>
        ))}
      </ul>
      <div className="  flex flex-row  space-x-6 justify-center text-center items-center xsm:flex-col">
        {/* Social Icons */}
        <div className="flex flex-row  space-x-3 nav-btns ">
          <a href="#" className="text-gray-400">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-400">
            <FaTelegram />
          </a>
          <a href="#" className="text-gray-400">
            <FaInstagram />
          </a>
        </div>
        {/* Discord Button */}

        {/* Przyciski */}
        {isConnected && <div className="text-sm text-gray-400">{address}</div>}
        <div className="flex items-center space-x-4 border rounded-full  to-white  p-2 text-gray-200">
          {isConnected ? (
            <div className="relative group z-10">
              <button
                className=" asolute bg-gradient-to-tl z-10 from-transparent to-white 
                bg-clip-text text-transparent 
                px-4 py-2 rounded-full text-sm font-semibold 
                transition duration-300"
              >
                Profile
              </button>
              <Menu items={profile.items} className=" z-20" />
            </div>
          ) : (
            <ConnectKitButton.Custom>
              {({ show }) => (
                <button
                  onClick={show}
                  className="
                  bg-gradient-to-tl from-transparent to-white 
                  bg-clip-text text-transparent 
                  px-4 py-2 rounded-full text-sm font-semibold 
                  transition duration-300
                  "
                >
                  Connect Wallet
                  {address}
                </button>
              )}
            </ConnectKitButton.Custom>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0  w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
    </nav>
  );
};

export default Navbar;
