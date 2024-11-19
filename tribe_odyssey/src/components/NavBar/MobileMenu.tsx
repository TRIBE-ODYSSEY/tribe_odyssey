import { Box, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "./Header";
import { GradientText } from "./StyledComponents";
import { NavLink } from '../../types/nav';

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
    <Menu
      anchorEl={mobileMenuAnchor}
      open={Boolean(mobileMenuAnchor)}
      onClose={onMobileMenuClose}
      PaperProps={{
        sx: {
          backgroundColor: '#14121b',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          minWidth: '200px',
          backdropFilter: 'blur(10px)',
        }
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {NAV_ITEMS.map((item, index) => (
        <Box key={item.text}>
          <MenuItem
            onClick={(event) => {
              event.stopPropagation();
              const submenuAnchor = navMenuAnchors[index];
              if (submenuAnchor) {
                onNavMenuClose(index);
              } else {
                onNavMenuOpen(event, index);
              }
            }}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1.5,
            }}
          >
            <GradientText>{item.text}</GradientText>
            <ArrowDropDownIcon 
              sx={{ 
                color: 'white',
                transform: navMenuAnchors[index] ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease',
              }} 
            />
          </MenuItem>
          <Menu
            anchorEl={navMenuAnchors[index]}
            open={Boolean(navMenuAnchors[index])}
            onClose={() => onNavMenuClose(index)}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: '#14121b',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                ml: 1,
              },
            }}
          >
            {item.links.map((link) => (
              <MenuItem
                key={link.name}
                onClick={() => handleMenuItemClick(link, index)}
              >
                <GradientText>
                  {link.name}
                  {link.external && (
                    <Box 
                      component="span" 
                      sx={{ 
                        ml: 1, 
                        fontSize: '0.8em',
                        opacity: 0.7 
                      }}
                    >
                      ↗
                    </Box>
                  )}
                </GradientText>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ))}
    </Menu>
  );
}; 