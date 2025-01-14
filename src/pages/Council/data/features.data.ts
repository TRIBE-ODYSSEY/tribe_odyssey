import { 
  FaBalanceScale, 
  FaShieldAlt, 
  FaFire, 
  FaUsers 
} from 'react-icons/fa';
import { CouncilFeature } from './Council.types';

export const features: CouncilFeature[] = [
    {
      title: "Justice & Order", 
      desc: "The Council maintains order through ancient laws and traditions.",
      icon: FaBalanceScale
    },
    {
      title: "Protection",
      desc: "Under the watchful eye of Tribunus Plebis, the tribe's interests are protected.", 
      icon: FaShieldAlt
    },
    {
      title: "Sacred Flame",
      desc: "The eternal flame of leadership burns bright, guiding our tribe.",
      icon: FaFire
    },
    {
      title: "Tribal Unity",
      desc: "Fostering unity and strength through collective wisdom.",
      icon: FaUsers
    }
];