type MenuLink = {
  name: string;
  path: string;
};

type MenuConfig = {
  [key: string]: MenuLink[] | string;
};

export const menuConfig: MenuConfig = {
  Assets: [
    { name: '4K Tribe', path: '/4ktribe' },
    { name: 'Wallpapers', path: '/wallpapers' },
    { name: 'ENS', path: '/ens' },
    { name: 'Tribal Beats', path: '/tribalbeats' },
    { name: 'Tribe 19 Checker', path: '/checker' },
    { name: 'Molten', path: '/molten' },
  ],
  Marketplace: [
    { name: 'Marketplace', path: 'https://apeshop.tribeodyssey.com/' },
    { name: 'Opensea', path: 'https://opensea.io/collection/tribe-odyssey' },
    { name: 'Magic Eden', path: 'https://magiceden.io/collections/ethereum/0x77f649385ca963859693c3d3299d36dfc7324eb9' },
    { name: 'Tribe Ordinals', path: 'https://magiceden.io/ordinals/marketplace/tribeordinals' },
  ],
  Staking: [
    { name: 'Stake Apes', path: '/staking' },
    { name: 'Raffles', path: '/maintenance' },
    { name: 'Winners', path: '/maintenance' },
  ],
  Council: '/council',
  Threads: '/threads'
};