import { Discord } from '@src/assets/icons/Discord';
import React from 'react';
import { Link } from 'react-router-dom';
import { menuConfig } from '@src/lib/config/menuConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [{ Icon: Discord, href: 'https://discord.gg/T7Bv5JsFYd' }];

  return (
    <footer className="w-full px-4 py-8 sm:py-10 bg-gradient-to-b from-transparent to-[var(--color-tertiary)]">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0">
            <img
              data-src="images/logored.png"
              alt="Tribe Logo"
              className="w-20 h-8 object-cover hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Links Section */}
          <div className="flex-grow">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
              {Object.entries(menuConfig).map(([title, links]) => (
                <div key={title}>
                  <h6 className="mb-3 text-base font-medium text-[var(--color-text-primary)]">
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
                          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          key={link.name}
                          to={link.path}
                          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
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

        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-text-secondary)]/20 to-transparent my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            © {currentYear} TRIBE ODYSSEY. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
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
