import { Box, Stack, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "./Header";
import { GradientText } from "./StyledComponents";
import { NavLink } from '../../types/nav';

// Styled components with improved styling
const StyledNavItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  minWidth: 120,
  height: 40,
  padding: '0 16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },

  '&:hover': {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-1px)',
    
    '&::before': {
      opacity: 1,
    },

    '& .MuiSvgIcon-root': {
      transform: 'rotate(180deg)',
    },
  },

  '& .MuiSvgIcon-root': {
    transition: 'transform 0.3s ease',
    fontSize: '20px',
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#14121b',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: '8px',
    minWidth: '160px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    
    '& .MuiList-root': {
      padding: '8px',
    },
    
    '& .MuiMenuItem-root': {
      borderRadius: '8px',
      padding: '10px 16px',
      transition: 'all 0.2s ease',
      
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        transform: 'translateX(4px)',
      },
    },
  },
}));

interface DesktopMenuProps {
  navMenuAnchors: (HTMLElement | null)[];
  onNavMenuOpen: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  onNavMenuClose: (index: number) => void;
}

export const DesktopMenu = ({
  navMenuAnchors,
  onNavMenuOpen,
  onNavMenuClose,
}: DesktopMenuProps) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (link: NavLink, index: number) => {
    onNavMenuClose(index);
    if (link.external) {
      window.open(link.path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(link.path);
    }
  };

  return (
    <Stack 
      direction="row" 
      spacing={2}
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        ml: 2,
      }}
    >
      {NAV_ITEMS.map((item, index) => (
        <Box key={item.text}>
          <StyledNavItem 
            onClick={(e) => onNavMenuOpen(e, index)}
            role="button"
            aria-haspopup="true"
            aria-expanded={Boolean(navMenuAnchors[index])}
          >
            <GradientText variant="body2">{item.text}</GradientText>
            <ArrowDropDownIcon />
          </StyledNavItem>
          
          <StyledMenu
            anchorEl={navMenuAnchors[index]}
            open={Boolean(navMenuAnchors[index])}
            onClose={() => onNavMenuClose(index)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            MenuListProps={{
              'aria-labelledby': `nav-button-${index}`,
            }}
            sx={{
              '& .MuiPaper-root': {
                mt: 1,
              }
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
          </StyledMenu>
        </Box>
      ))}
    </Stack>
  );
};