import React, { useEffect, useState } from 'react';

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
        const target = e.target as HTMLElement;
        if (!target.closest('.menu-container')) {
          setIsMenuOpen(false);
        }
      };
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener('click', closeMenu);
    }
  }, [isMobile, isMenuOpen]);

  const menuStyles = isMobile 
    ? 'relative bg-transparent p-2' 
    : 'absolute bg-white/95 backdrop-blur-sm p-4 shadow-lg rounded-lg';

  if (!showMenu && !isMobile) return null;

  return (
    <div className="menu-container">
      <ul
        className={`menu ${menuStyles} ${className}`}
        style={!isMobile ? { width } : undefined}
      >
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`${
              isMobile 
                ? 'py-2' 
                : 'hover:bg-gray-200/80 rounded transition-colors'
            }`}
          >
            <a
              href={item.href || '#'}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
                if (isMobile && onClose) {
                  onClose();
                } else {
                  setIsMenuOpen(false);
                }
              }}
              className={`block ${
                isMobile 
                  ? 'text-white/80 hover:text-white text-center text-lg' 
                  : 'text-gray-800 py-2 px-3'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
