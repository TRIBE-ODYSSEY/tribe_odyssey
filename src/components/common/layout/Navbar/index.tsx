import logo from '@assets/images/logo.png';
import React from 'react';
import Menu from './menu'; 

const Navbar: React.FC = () => {
  const menus = [
    {
      label: 'Elementi9',
      items: [
        { label: 'Option 1', href: '#' },
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
    <nav className="bg-black text-white px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <img src={logo} alt="Logo" loading="lazy" />

      <ul className="hidden md:flex space-x-6">
        {menus.map((menu, index) => (
          <li key={index} className="group relative">
            <button className="hover:text-gray-400">{menu.label}</button>
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
      <div>
        <a
          href="#"
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm"
        >
          Join Discord
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
