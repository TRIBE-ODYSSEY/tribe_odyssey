// src/assets/images/types.ts

export enum ImageCategories {
  HERO = 'heroBackground',
  GOLD_APES = 'goldApes',
  THREADS = 'threads',
  ALLIANCE = 'alliance',
  FIGHTERS = 'fighters',
  ODYSSEY = 'odyssey',
  LORE = 'lore',
  ALLIANCE_IMAGES = 'allianceImages',
  ICONS = 'icons',
  MOLTEN_THRONE = 'moltenThrone',
  TRIBUNUS = 'tribunus',
  SHAMAN = 'shaman',
  PLACEHOLDER = 'placeholder'
}

export interface AllianceImage {
  image: string;
  name: string;
  title: string;
}

export interface ThreadsImages {
  logo: string;
  hoodieFront: string;
  hoodieBack: string;
  sendHoodies: string;
  ethLogo: string;
}

export interface AllianceSection {
  verronHaynes: string;
  celebrity2: string;
  celebrity3: string;
}

export interface FightersSection {
  coltonLoud: string;
  coltonLoudNFT: string;
}

export interface OdysseySection {
  nft1: string;
  nft2: string;
  nft3: string;
}

export interface LoreSection {
  exodus: string;
  golden: string;
  digital: string;
}

export interface Icons {
  specialButtonCore: string;
  starIcon: string;
  hexGrid: string;
}

export interface Images {
  [ImageCategories.HERO]: string;
  [ImageCategories.GOLD_APES]: string[];
  [ImageCategories.THREADS]: ThreadsImages;
  [ImageCategories.ALLIANCE]: AllianceSection;
  [ImageCategories.FIGHTERS]: FightersSection;
  [ImageCategories.ODYSSEY]: OdysseySection;
  [ImageCategories.LORE]: LoreSection;
  [ImageCategories.ALLIANCE_IMAGES]: AllianceImage[];
  [ImageCategories.ICONS]: Icons;
  [ImageCategories.MOLTEN_THRONE]: string;
  [ImageCategories.TRIBUNUS]: string;
  [ImageCategories.SHAMAN]: string;
  [ImageCategories.PLACEHOLDER]: string;
}