
import { ALLIANCE } from './alliances';
import { FIGHTERS } from './fighters';
import { ICONS } from './icons';
import { LORE } from './lore';
import { ODYSSEY } from './odyssey';
import { THREADS } from './threads';
import { ImageCategories, Images } from './types';

const IMAGE_PATHS = {
  HERO_BACKGROUND: '/images/hero-bg.webp',
  // Gold Apes
  GOLD_APE_1: '/images/gold-ape-1.png',
  GOLD_APE_2: '/images/gold-ape-2.png',
  GOLD_APE_3: '/images/gold-ape-3.png',
  GOLD_APE_4: '/images/gold-ape-4.png',
  GOLD_APE_5: '/images/gold-ape-5.png',
  // Threads
  THREADS_LOGO: '/images/THREADS-logo.png',
  THREADS_HOODIE_FRONT: '/images/THREADS-hoodie-front.png',
  THREADS_HOODIE_BACK: '/images/THREADS-hoodie-back.png',
  SEND_HOODIES: '/images/send-hoodies.png',
  ETH_LOGO: '/images/eth-logo.png',
  // Alliance
  VERRON_HAYNES: '/images/vyron.jpg',
  CELEBRITY2: '/images/vyron.jpg', 
  CELEBRITY3: '/images/vyron.jpg', 
  // Fighters
  COLTON_LOUD: '/images/Loud.png',
  COLTON_LOUD_NFT: '/images/10169.png',
  // Odyssey
  NFT1: '/images/molten-throne.png',
  NFT2: '/images/tribunus.png',
  NFT3: '/images/shaman1.jpeg',
  // Lore
  EXODUS: '/images/molten-throne.png',
  GOLDEN: '/images/golden.png',
  DIGITAL: '/images/digital.png',
  // Icons
  SPECIAL_BUTTON_CORE: '/images/special-button-core.svg',
  STAR_ICON: '/images/StarIcon.svg',
  HEX_GRID: '/images/hex-grid.svg',
  // Others
  MOLTEN_THRONE: '/images/molten-throne.png',
  TRIBUNUS: '/images/tribunus.png',
  SHAMAN: '/images/shaman1.jpeg',
  PLACEHOLDER: '/images/placeholder.png'
} as const;

export const IMAGES: Images = {
  [ImageCategories.HERO]: IMAGE_PATHS.HERO_BACKGROUND,
  [ImageCategories.GOLD_APES]: [
    IMAGE_PATHS.GOLD_APE_1,
    IMAGE_PATHS.GOLD_APE_2,
    IMAGE_PATHS.GOLD_APE_3,
    IMAGE_PATHS.GOLD_APE_4,
    IMAGE_PATHS.GOLD_APE_5
  ],
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
  [ImageCategories.PLACEHOLDER]: IMAGE_PATHS.PLACEHOLDER
} as const;