import { Discord } from '@src/assets/icons/Discord';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Element19: [
      { name: 'Drops', path: '/drops' },
      { name: 'Collection', path: '/collection' },
    ],
    Assets: [
      { name: '4K Tribe', path: '/4ktribe' },
      { name: 'Wallpapers', path: '/wallpaper' },
      { name: 'ENS', path: '/ens' },
      { name: 'Tribal Beats', path: '/beats' },
      { name: 'Tribe 19 Checker', path: '/checker' },
      { name: 'Molten', path: '/molten' },
    ],
    Marketplace: [
      { name: 'Marketplace', path: '/marketplace' },
      { name: 'Opensea', path: 'https://opensea.io/tribe' },
      { name: 'Looksrare', path: 'https://looksrare.org/tribe' },
      { name: 'X2Y2', path: 'https://x2y2.io/tribe' },
    ],
    Staking: [
      { name: 'Stake Apes', path: '/staking' },
      { name: 'Raffles', path: '/raffles' },
      { name: 'Winners', path: '/winners' },
    ],
    'The Council': [{ name: 'Council', path: '/council' }],
  };

  const socialLinks = [{ Icon: Discord, href: '#discord' }];

  return (
    <footer className="flex flex-col w-full p-10 bg-gradient-to-b from-transparent to-[#14121b]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-1">
            <img
              data-src="images/logored.png"
              alt="Tribe Logo"
              className="w-20 h-8 object-cover mb-6"
            />
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h6 className="mb-4 text-lg font-normal text-white">{title}</h6>
              <div className="flex flex-col gap-1">
                {links.map((link) =>
                  link.path.startsWith('http') ? (
                    <a
                      key={link.name}
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:underline"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-white hover:underline"
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}

          <div className="col-span-1"></div>
        </div>

        <hr className="my-10 border-t border-white" />

        <div className="flex flex-wrap justify-between items-center gap-2">
          <p className="text-white font-normal">
            © {currentYear} TRIBE. All rights reserved.
          </p>

          <div className="flex gap-3">
            {socialLinks.map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
