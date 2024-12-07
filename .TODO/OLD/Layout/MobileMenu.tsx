import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import { NavLink } from '@src/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../../../src/components/common/layout/NavBar/Header';
import { GradientText } from '../../../src/components/common/layout/NavBar/StyledComponents';

interface MobileMenuProps {
  mobileMenuAnchor: HTMLElement | null;
  navMenuAnchors: (HTMLElement | null)[];
  onMobileMenuClose: () => void;
  onNavMenuOpen: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  onNavMenuClose: (index: number) => void;
}

export const MobileMenu = ({
  mobileMenuAnchor,
  navMenuAnchors,
  onMobileMenuClose,
  onNavMenuOpen,
  onNavMenuClose,
}: MobileMenuProps) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (link: NavLink, index: number) => {
    onNavMenuClose(index);
    onMobileMenuClose();
    if (link.external) {
      window.open(link.path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(link.path);
    }
  };

  return (
    <>
      {/* Overlay */}
      {mobileMenuAnchor && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onMobileMenuClose}
        ></div>
      )}

      {/* Menu */}
      <div
        className={`fixed top-16 right-4 w-64 bg-backgroundPaper rounded-lg border border-white border-opacity-10 backdrop-blur-lg z-50 transition-transform duration-300 ${
          mobileMenuAnchor ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="py-2">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.text} className="relative">
              {/* Menu Item */}
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  const submenuAnchor = navMenuAnchors[index];
                  if (submenuAnchor) {
                    onNavMenuClose(index);
                  } else {
                    onNavMenuOpen(event, index);
                  }
                }}
                className="w-full flex justify-between items-center py-2 px-4 hover:bg-backgroundDark transition-colors duration-200"
              >
                <GradientText>{item.text}</GradientText>
                <ArrowDropDownIcon
                  className={`text-white transition-transform duration-200 ${
                    navMenuAnchors[index] ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {/* Submenu */}
              {navMenuAnchors[index] && (
                <ul className="ml-4 mt-1 space-y-1 bg-backgroundDark rounded-lg">
                  {item.links.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => handleMenuItemClick(link, index)}
                        className="w-full text-left py-2 px-4 hover:bg-backgroundDarkest transition-colors duration-200 flex items-center"
                      >
                        <GradientText className="flex items-center">
                          {link.name}
                          {link.external && (
                            <span className="ml-1 text-sm opacity-70">↗</span>
                          )}
                        </GradientText>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
