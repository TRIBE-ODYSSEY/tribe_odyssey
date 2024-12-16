import React, { useEffect, useState } from 'react';

interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => boolean;
}

interface MenuProps {
  items: MenuItem[];
  width?: string;
  className?: string;
}

const Menu: React.FC<MenuProps> = ({
  items,
  width = '200px',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  
  
  useEffect(() => {
    if (open) {
      const closeMenu = () => {
        setOpen(false);
        document.removeEventListener('click', closeMenu);
      };
      document.addEventListener('click', closeMenu);
    }
  }, [open]);
  
  
  return (
    <ul
      className={`absolute bg-white shadow-lg rounded-lg ${className}`}
      style={{ width }}
    >
      {items.map((item, index) => (
        <li key={index} className="px-4 py-2 hover:bg-gray-200">
          <a
            href={item.href || '#'}
            onClick={() => {
              if (item.onClick) {
                return item.onClick();
              }
              setOpen(false);
              return true;
            }}
            className="block text-black"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
