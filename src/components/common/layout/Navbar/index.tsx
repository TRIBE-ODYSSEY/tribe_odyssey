import { useWalletDiscordButtonStore } from '@src/lib/store/walletdiscordStore';
import { ConnectKitButton } from 'connectkit';
import React from 'react';
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

  return (
    <nav className="bg-backgroundPaper text-white px-4 py-3 m-4 h-16 flex items-center justify-between">
      {/* Logo */}
      <img
        data-src="images/logo.png"
        alt="Logo"
        loading="lazy"
        className="p-6 m-4"
      />

      <ul className="hidden md:flex space-x-6 ">
        {menus.map((menu, index) => (
          <li key={index} className="group relative">
            <button className="hover:text-gray-700 border  border-gray-600 p-2 w-36">
              {menu.label}
            </button>
            <Menu items={menu.items} className="group-hover:block hidden" />
          </li>
        ))}
      </ul>

      {/* Social Icons */}
      <div className="flex items-center space-x-4">
        <a href="#" className="hover:text-gray-400">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="hover:text-gray-400">
          <i className="fab fa-telegram"></i>
        </a>
        <a href="#" className="hover:text-gray-400">
          <i className="fab fa-instagram"></i>
        </a>
      </div>

      {/* Discord Button */}

      {/* Przyciski */}
      {isConnected && <div className="text-sm text-gray-400">{address}</div>}
      <div>
        {isConnected ? (
          <a
            href="https://discord.gg/"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm transition duration-300"
          >
            Discord
          </a>
        ) : (
          <ConnectKitButton.Custom>
            {({ show }) => (
              <button
                onClick={show}
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm transition duration-300"
              >
                Connect Wallet
                {address}
              </button>
            )}
          </ConnectKitButton.Custom>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
