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
    <div className="flex flex-row">
      <ul
        className={` absolute menu bg-white shadow-lg rounded-lg  ${className}`}
        style={{ width }}
      >
        {items.map((item, index) => (
          <li key={index} className=" hover:bg-gray-200">
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
    </div>
  );
};

export default Menu;
