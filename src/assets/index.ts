import { ALLIANCE } from './alliances';
import { FIGHTERS } from './fighters';
import { ICONS } from './icons';
import { LORE } from './lore';
import { ODYSSEY } from './odyssey';
import { THREADS } from './threads';
import { ImageCategories, Images, GoldApe } from './types';

const IMAGE_PATHS = {
  HERO_BACKGROUND: '/images/hero-bg.webp',
  // Gold Apes
  GOLD_APE_1: 'images/gold-ape-1.png',  
  GOLD_APE_2: 'images/gold-ape-2.png',
  GOLD_APE_3: 'images/gold-ape-3.png',
  GOLD_APE_4: 'images/gold-ape-4.png',
  GOLD_APE_5: 'images/gold-ape-5.png',
  GOLD_APE_6: 'images/gold-ape-6.png',
  GOLD_APE_7: 'images/gold-ape-7.png',
  GOLD_APE_8: 'images/gold-ape-8.png',
  GOLD_APE_9: 'images/gold-ape-9.png',
  GOLD_APE_10: 'images/gold-ape-10.png',
  GOLD_APE_11: 'images/gold-ape-11.png',
  // Threads
  THREADS_LOGO: 'images/THREADS-logo.png',
  THREADS_HOODIE_FRONT: 'images/THREADS-hoodie-front.png',
  THREADS_HOODIE_BACK: 'images/THREADS-hoodie-back.png',
  SEND_HOODIES: 'images/send-hoodies.png',
  ETH_LOGO: 'images/eth-logo.png',
  THREADS_MAIN: 'images/ThreadHoodieMain.png',
  // Alliance
  VERRON_HAYNES: 'images/vyron.jpg',
  CELEBRITY2: 'images/vyron.jpg', 
  CELEBRITY3: 'images/vyron.jpg', 
  // Fighters
  COLTON_LOUD: 'images/Loud.png',
  COLTON_LOUD_NFT: 'images/10169.png',
  // Odyssey
  NFT1: 'images/molten-throne.png',
  NFT2: 'images/tribunus.png',
  NFT3: 'images/shaman1.jpeg',
  // Lore
  EXODUS: 'images/golden-ape-eye.png',
  GOLDEN: 'images/golden-ape-eye.png',
  DIGITAL: 'images/digital-ape-eye.png',
  // Icons
  SPECIAL_BUTTON_CORE: 'images/special-button-core.svg',
  SPECIAL_BUTTON_CORE_2: 'images/special-button-core.svg',
  SPECIAL_BUTTON_CORE_5: 'images/special-button-core.svg',
  SPECIAL_BUTTON_CORE_4: 'images/special-button-core.svg',
  STAR_ICON: 'images/StarIcon.svg',
  HEX_GRID: 'images/hex-grid.svg',
  TOXIC_ICON_RED: 'images/ToxicIconRed.png',
  TOXIN_ICON_RED: 'images/ToxinIconRed.png',
  TOXIC_ICON: 'images/ToxicIcon.png',
  // Others
  MOLTEN_THRONE: "images/molten-throne.png",
  TRIBUNUS: 'images/tribunus.png',
  SHAMAN: 'images/shaman1.jpeg',
  PLACEHOLDER: 'images/placeholder.png',
  // T19 Profiles
  T19_PROFILE_1: 'images/gold-ape-1.png',
  T19_PROFILE_2: 'images/gold-ape-2.png',
  T19_PROFILE_3: 'images/gold-ape-3.png',
  T19_PROFILE_4: 'images/gold-ape-4.png',
  T19_PROFILE_5: 'images/gold-ape-5.png'
} as const;

export const GOLD_APES: GoldApe[] = [
  { 
    id: 1, 
    image: IMAGE_PATHS.GOLD_APE_1, 
    name: 'Odyssey Mascot', 
    twitter: 'https://x.com/tribeodyssey',
    alt: 'Gold Ape 1' 
  },
  { 
    id: 2, 
    image: IMAGE_PATHS.GOLD_APE_2, 
    name: 'Tribe Member 2', 
    twitter: 'https://x.com/tribemember2',
    alt: 'Gold Ape 2' 
  },
  {
    id: 3,
    image: IMAGE_PATHS.GOLD_APE_3,
    name: 'OxPhr33dom',
    twitter: 'https://x.com/phr33dom',
    alt: 'Gold Ape 3'
  },
  {
    id: 4,
    image: IMAGE_PATHS.GOLD_APE_4,
    name: 'Tribe Member 4',
    twitter: 'https://x.com/tribemember4',
    alt: 'Gold Ape 4'
  },
  {
    id: 5,
    image: IMAGE_PATHS.GOLD_APE_5,
    name: 'Gobln',
    twitter: 'https://x.com/goblnnft',
    alt: 'Gold Ape 5'
  },
  {
    id: 6,
    image: IMAGE_PATHS.GOLD_APE_6,
    name: 'Spiffy Ritzy',
    twitter: 'https://x.com/spiffyritzy',
    alt: 'Gold Ape 6'
  },
  {
    id: 7,
    image: IMAGE_PATHS.GOLD_APE_7,
    name: 'Tribe Member 7',
    twitter: 'https://x.com/tribemember7',
    alt: 'Gold Ape 7'
  },
  {
    id: 8,
    image: IMAGE_PATHS.GOLD_APE_8,
    name: 'WarWizard',
    twitter: 'https://x.com/WarWizardNFT',
    alt: 'Gold Ape 8'
  },
  {
    id: 9,
    image: IMAGE_PATHS.GOLD_APE_9,
    name: 'HetzDoge',
    twitter: 'https://x.com/HetzDoge',
    alt: 'Gold Ape 9'
  },
  {
    id: 10,
    image: IMAGE_PATHS.GOLD_APE_10,
    name: 'ApeSafari',
    twitter: 'https://x.com/ApeSafari',
    alt: 'Gold Ape 10'
  },
  {
    id: 11,
    image: IMAGE_PATHS.GOLD_APE_11,
    name: 'Deso',
    twitter: 'https://x.com/brokaw_24',
    alt: 'Gold Ape 11'
  }
];

export const IMAGES: Images = {
  [ImageCategories.HERO]: IMAGE_PATHS.HERO_BACKGROUND,
  [ImageCategories.GOLD_APES]: GOLD_APES,
  [ImageCategories.THREADS]: THREADS,
  [ImageCategories.ALLIANCE]: ALLIANCE,
  [ImageCategories.FIGHTERS]: FIGHTERS,
  [ImageCategories.ODYSSEY]: ODYSSEY,
  [ImageCategories.LORE]: LORE,
  [ImageCategories.ALLIANCE_IMAGES]: [
    { image: IMAGE_PATHS.VERRON_HAYNES, name: 'Verron Haynes', title: 'NFL Legend' },
    { image: IMAGE_PATHS.CELEBRITY2, name: 'Celebrity 2', title: 'Role 2' },
    { image: IMAGE_PATHS.CELEBRITY3, name: 'Celebrity 3', title: 'Role 3' }
  ],
  [ImageCategories.ICONS]: ICONS,
  [ImageCategories.MOLTEN_THRONE]: IMAGE_PATHS.MOLTEN_THRONE,
  [ImageCategories.TRIBUNUS]: IMAGE_PATHS.TRIBUNUS,
  [ImageCategories.SHAMAN]: IMAGE_PATHS.SHAMAN,
  [ImageCategories.PLACEHOLDER]: IMAGE_PATHS.PLACEHOLDER,
  [ImageCategories.T19_PROFILES]: [
    { name: 'WarWizard', social: 'https://twitter.com/t19profile1', id: '1' },
    { name: 'Gobln', social: 'https://twitter.com/t19profile2', id: '2' },
    { name: 'Matt No Tap', social: 'https://twitter.com/t19profile3', id: '3' },
    { name: 'Jay Vasity', social: 'https://twitter.com/t19profile4', id: '4' },
    { name: 'Spiffy Ritzy', social: 'https://twitter.com/t19profile5', id: '5' }
  ]
} as const;

export { ImageCategories };
