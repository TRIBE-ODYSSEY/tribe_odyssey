import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Twitter, Telegram, Instagram, Wallet } from "@mui/icons-material";
import { Discord } from "../../../../assets/icons/Discord";
import { ConnectKitButton } from "connectkit";
import { MobileMenu } from "../../../../../.TODO/OLD/Layout/MobileMenu";
import { GradientText } from "./StyledComponents";
import { DesktopMenu } from "./DesktopMenu";

// Types
interface NavLink {
  name: string;
  path: string;
  external?: boolean;
}

interface NavItem {
  text: string;
  links: NavLink[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    text: "Element19",
    links: [
      { name: "Drops", path: "/drops" },
      { name: "Collection", path: "/element19" },
    ],
  },
  // ... inne elementy
];

// Add type safety for social links
interface SocialLink {
  url: string;
  icon: React.ComponentType;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { url: "https://twitter.com/tribeodyssey", icon: Twitter, label: "Twitter" },
  { url: "https://t.me/tribeodyssey", icon: Telegram, label: "Telegram" },
  {
    url: "https://instagram.com/tribeodyssey",
    icon: Instagram,
    label: "Instagram",
  },
  // ... inne linki społecznościowe
];

const logo = "/logored.png";

export const Header: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [navMenuAnchors, setNavMenuAnchors] = useState<(HTMLElement | null)[]>(
    new Array(NAV_ITEMS.length).fill(null)
  );
  const location = useLocation();

  


  const handleNavMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    const newAnchors = [...navMenuAnchors];
    newAnchors[index] = event.currentTarget;
    setNavMenuAnchors(newAnchors);
  };

  const handleNavMenuClose = (index: number) => {
    const newAnchors = [...navMenuAnchors];
    newAnchors[index] = null;
    setNavMenuAnchors(newAnchors);
  };

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex items-center justify-between p-4 md:p-6 relative z-50 max-w-7xl mx-auto w-full">
      <div className="flex items-center">
        <img
          src={logo}
          alt="TRIBE Logo"
          className="h-8 md:h-10 cursor-pointer mr-4"
          onClick={() => navigate("/")}
        />
        {!isMobile && (
          <DesktopMenu
            navMenuAnchors={navMenuAnchors}
            onNavMenuOpen={handleNavMenuOpen}
            onNavMenuClose={handleNavMenuClose}
          />
        )}
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <div className="hidden md:flex gap-2">
          {SOCIAL_LINKS.map((social) => (
            <button
              key={social.label}
              onClick={() => handleSocialClick(social.url)}
              className="p-2 text-white transition-colors duration-200 hover:bg-white hover:bg-opacity-10"
              aria-label={social.label}
            >
              <social.icon fontSize="large" />
            </button>
          ))}
        </div>
        {location.pathname === "/ens" ? (
          <div>
                <div className="flex items-center gap-1">
                  <Wallet fontSize="large" />
                  <GradientText>Connect Wallet</GradientText>
                </div>
              </button>
            ) : (
              <div className="flex gap-1">
                <button
                  onClick={openChainModal}
                  className="bg-white bg-opacity-5 border border-white border-opacity-10 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:border-opacity-20 hover:-translate-y-1"
                >
                  <GradientText>
                    {chain.hasIcon && (
                      <img
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                        className="w-5 h-5 mr-1"
                      />
                    )}
                    {chain.name}
                  </GradientText>
                </button>
                <button
                  onClick={openAccountModal}
                  className="bg-white bg-opacity-5 border border-white border-opacity-10 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:border-opacity-20 hover:-translate-y-1"
                >
                  <GradientText>
                    {address}
                    {chain.hasIcon ? ` (${chain.name})` : ""}
                  </GradientText>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => handleSocialClick("https://discord.gg/tribeodyssey")}
            className="bg-white bg-opacity-5 border border-white border-opacity-10 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:border-opacity-20 hover:-translate-y-1"
          >
            <div className="flex items-center gap-1">
              <Discord fontSize="large" />
              <GradientText>Join Discord</GradientText>
            </div>
          </button>
        )}
        {isMobile && (
          <button
            onClick={handleMobileMenuOpen}
            className="p-2 text-white transition-colors duration-200 hover:bg-white hover:bg-opacity-10"
            aria-label="Open mobile menu"
          >
            <MenuIcon fontSize="large" />
          </button>
        )}
      </div>
      {isMobile && (
        <MobileMenu
          mobileMenuAnchor={mobileMenuAnchor}
          navMenuAnchors={navMenuAnchors}
          onMobileMenuClose={handleMobileMenuClose}
          onNavMenuOpen={handleNavMenuOpen}
          onNavMenuClose={handleNavMenuClose}
        />
      )}
    </div>
  );
};