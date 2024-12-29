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
    <div className="menu-container">
      <div 
        className={`
          menu relative transition-all duration-200 overflow-hidden
          ${isMobile ? 'w-full mt-1' : 'absolute min-w-[180px]'}
          ${className}
        `}
        style={!isMobile ? { width } : undefined}
      >
        <div className={`
          ${isMobile ? 'bg-black/40' : 'bg-white/90'} 
          backdrop-blur-lg border border-white/10 
          shadow-xl rounded-xl
        `}>
          <ul className="p-1">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href || '#'}
                  onClick={(e) => handleItemClick(e, item)}
                  className={`
                    block w-full text-left px-4 py-2.5 
                    transition-colors rounded-lg my-0.5
                    ${isMobile 
                      ? 'text-white/90 hover:text-white hover:bg-white/10' 
                      : 'text-gray-800 hover:bg-gray/5'
                    }
                  `}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
