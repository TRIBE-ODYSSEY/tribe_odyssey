// filepath: /home/dg-neural23/extended/nvme2n1p3_mount/projects/pro/clean/sdsd/tribe-odyssey/src/components/common/Navbar/index.tsx
import useLazyLoading from '@src/lib/hooks/useLazyLoading';
import { useWalletDiscordButtonStore } from '@src/lib/store/walletdiscordStore';
import { ConnectKitButton } from 'connectkit';
import React from 'react';
import { FaInstagram, FaTelegram, FaTwitter } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import Menu from './menu';

const Navbar: React.FC = () => {
  useLazyLoading();
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
    <nav className="flex min-h-24 flex-col  max-w-full grid-cols-1 min-sm orde2 md:flex-row gap-6 items-center justify-center">
      {/* SECTION 1: Logo i Menu */}
      <section className="flex  shrink-0 flex-col sm:flex-col  items-center justify-center gap-6 order-1 xl:flex-row xl:order-1">
        <img
          data-src="images/logo.png"
          alt="Logo"
          loading="lazy"
          className="w-auto h-20"
        />

        <ul className=" gap-5 p-4 m-4">
          {menus.map((menu, index) => (
            <li key={index} className="l1">
              <button>{menu.label}</button>
              <Menu items={menu.items} />
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 2: Ikony społecznościowe */}
      <div className="flex text-4xl   order-1  min-sm:order-2 md:flex-row md:order-1 xl:order-2 flex-row   gap-4 xl:flex-row  justify-center ">
        <a href="#" className=" ">
          <FaTwitter />
        </a>
        <a href="#">
          <FaTelegram />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
      </div>

      <section className="flex flex-col order-3 items-center justify-center">
        {/* SECTION 3: Połączenie i profil */}
        {isConnected && <div className="order-3 ">{address}</div>}

        {isConnected ? (
          <div className="order-3 flex items-center space-x-2">
            <button>Profile</button>
            <Menu items={profile.items} />
          </div>
        ) : (
          <div className="order-3">
            <ConnectKitButton.Custom>
              {({ show }) => (
                <button onClick={show}>
                  Connect Wallet
                  {address}
                </button>
              )}
            </ConnectKitButton.Custom>
          </div>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
