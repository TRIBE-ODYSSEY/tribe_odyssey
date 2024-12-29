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
    <footer className="w-full px-4 py-8 sm:py-10 bg-gradient-to-b from-transparent to-[#14121b]">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img
              data-src="images/logored.png"
              alt="Tribe Logo"
              className="w-20 h-8 object-cover"
            />
          </div>

          {/* Links Section */}
          <div className="flex-grow">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h6 className="mb-3 text-base font-medium text-white/90">
                    {title}
                  </h6>
                  <div className="flex flex-col gap-2">
                    {links.map((link) =>
                      link.path.startsWith('http') ? (
                        <a
                          key={link.name}
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          key={link.name}
                          to={link.path}
                          className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © {currentYear} TRIBE. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-200"
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
