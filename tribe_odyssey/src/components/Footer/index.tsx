import React from 'react';
import { Box, Container, Grid, Typography, Divider, styled } from '@mui/material';
import { Twitter, Telegram, Instagram } from '@mui/icons-material';
import { Discord } from '../icons/Discord';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

// Styled Components
const StyledFooter = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '40px 24px 20px',
  background: 'linear-gradient(180deg, rgba(20,18,27,0) 0%, #14121b 100%)',
});

const GradientTypography = styled(Typography)({
  background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 8.85%, rgb(255,255,255) 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontFamily: 'Inter-Regular, Helvetica',
  fontWeight: 'normal',
  fontSize: '1.25rem',
  lineHeight: '1.5rem',
  marginBottom: '16px'
});

const FooterLink = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.8)',
  fontFamily: 'Inter-Regular, Helvetica',
  fontSize: '1rem',
  lineHeight: '1.5rem',
  cursor: 'pointer',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: 'rgba(255, 255, 255, 1)',
  }
}) as typeof Typography;

const Logo = styled('img')({
  width: '83.2px',
  height: '32px',
  objectFit: 'cover',
  marginBottom: '24px'
});

const StyledDivider = styled(Divider)({
  margin: '40px 0',
  borderColor: 'rgba(255, 255, 255, 0.16)',
  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.16) 50%, rgba(255,255,255,0))',
});

const SocialIcon = styled('a')({
  color: 'white',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  }
});

// Footer Data with proper routing paths
const footerLinks = {
  Assets: [
    { name: '4K Tribe', path: '/4ktribe' },
    { name: 'Wallpapers', path: '/wallpaper' },
    { name: 'ENS', path: '/ens' },
    { name: 'Tribal Beats', path: '/beats' },
    { name: 'Tribe 19 Checker', path: '/checker' }
  ],
  Marketplace: [
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Opensea', path: 'https://opensea.io/tribe' },
    { name: 'Looksrare', path: 'https://looksrare.org/tribe' },
    { name: 'X2Y2', path: 'https://x2y2.io/tribe' }
  ],
  Staking: [
    { name: 'Stake Apes', path: '/staking' },
    { name: 'Raffles', path: '/raffles' },
    { name: 'Winners', path: '/winners' }
  ],
  'The Council': [
    { name: 'Council', path: '/council' }
  ]
};

const socialLinks = [
  { Icon: Twitter, href: '#twitter' },
  { Icon: Telegram, href: '#telegram' },
  { Icon: Discord, href: '#discord' },
  { Icon: Instagram, href: '#instagram' }
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <Logo src={logo} alt="Tribe Logo" />
          </Grid>

          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} md={2} key={title}>
              <GradientTypography variant="h6">
                {title}
              </GradientTypography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {links.map((link) => (
                  link.path.startsWith('http') ? (
                    <FooterLink
                      key={link.name}
                      component="a"
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </FooterLink>
                  ) : (
                    <FooterLink
                      key={link.name}
                      component={Link}
                      to={link.path}
                    >
                      {link.name}
                    </FooterLink>
                  )
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <StyledDivider />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter-Regular, Helvetica',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            © {currentYear} TRIBE. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            {socialLinks.map(({ Icon, href }) => (
              <SocialIcon
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
              </SocialIcon>
            ))}
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
