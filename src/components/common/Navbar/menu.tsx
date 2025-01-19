import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface MenuProps {
  items: MenuItem[];
  width?: string;
  className?: string;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const Menu: React.FC<MenuProps> = ({ 
  items, 
  width = '200px', 
  className = '',
  isMobile = false,
  isOpen,
  onClose 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showMenu = isMobile ? isOpen : isMenuOpen;

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      const closeMenu = (e: MouseEvent) => {
        if (!(e.target as Element).closest('.menu-container')) {
          setIsMenuOpen(false);
        }
      };
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener('click', closeMenu);
    }
  }, [isMobile, isMenuOpen]);

  if (!showMenu && !isMobile) return null;

  const handleItemClick = (e: React.MouseEvent, item: MenuItem) => {
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
    if (isMobile && onClose) {
      onClose();
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="menu-container relative z-50">
      <div 
        className={`
          menu relative transition-all duration-300 overflow-hidden
          ${isMobile ? 'w-full mt-2' : 'absolute min-w-[180px]'}
          ${className}
        `}
        style={!isMobile ? { width } : undefined}
      >
        <div className={`
          ${isMobile 
            ? 'bg-[var(--color-overlay-dark)] shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
            : 'bg-[var(--color-overlay-light)]'} 
          backdrop-blur-xl border border-[var(--color-text-primary)]/15 
          shadow-xl rounded-2xl
          ${isMobile ? 'p-2' : 'p-1'}
        `}>
          <ul className={`space-y-1 ${isMobile ? 'divide-y divide-[var(--color-text-primary)]/5' : ''}`}>
            {items.map((item, index) => (
              <li key={index} className={`${isMobile ? 'py-1 first:pt-0 last:pb-0' : ''}`}>
                {item.href?.startsWith('/') ? (
                  <Link
                    to={item.href}
                    onClick={(e) => handleItemClick(e, item)}
                    className={`
                      block w-full text-left px-4 py-3
                      transition-all duration-200 rounded-xl
                      ${isMobile 
                        ? 'text-[var(--color-text-on-dark)] hover:bg-[var(--color-text-primary)]/10 active:bg-[var(--color-text-primary)]/15 text-base font-medium' 
                        : 'text-[var(--color-text-on-light)] hover:bg-[var(--color-text-primary)]/5 text-sm'
                      }
                      hover:translate-x-1 hover:shadow-md
                    `}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href || '#'}
                    onClick={(e) => handleItemClick(e, item)}
                    className={`
                      block w-full text-left px-4 py-3
                      transition-all duration-200 rounded-xl
                      ${isMobile 
                        ? 'text-[var(--color-text-on-dark)] hover:bg-[var(--color-text-primary)]/10 active:bg-[var(--color-text-primary)]/15 text-base font-medium' 
                        : 'text-[var(--color-text-on-light)] hover:bg-[var(--color-text-primary)]/5 text-sm'
                      }
                      hover:translate-x-1 hover:shadow-md
                    `}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;