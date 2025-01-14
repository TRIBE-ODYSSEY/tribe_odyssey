import { TimelineEvent } from '../components/Timeline/Timeline.types';
import { 
  FaFlag,
  FaGem, // Changed from FaSparkles which doesn't exist
  FaUsers,
  FaLandmark,
  FaExclamationCircle
} from 'react-icons/fa';
import React from 'react';

const iconClasses = "h-6 w-6 text-white/70";

// Create icon element
const createIcon = (Icon: React.ElementType) => {
  return React.createElement(Icon, { className: iconClasses });
};

export const timelineEvents: TimelineEvent[] = [
  {
    date: "Q1 2025",
    title: "Council Formation", 
    description: "Establishment of the Tribe Council through democratic election.",
    icon: createIcon(FaFlag),
    status: "completed"
  },
  {
    date: "Q2 2025",
    title: "Governance Framework",
    description: "Implementation of decentralized voting mechanisms and proposal systems.",
    icon: createIcon(FaLandmark),
    status: "current",
    link: "https://app.aragon.org/"
  },
  {
    date: "Q3 2025",
    title: "Community Expansion",
    description: "Launching initiatives to grow and strengthen our community.",
    icon: createIcon(FaUsers),
    status: "upcoming"
  },
  {
    date: "Q4 2025",
    title: "Innovation Phase",
    description: "Rolling out new features and improvements for the ecosystem.",
    icon: createIcon(FaGem),
    status: "upcoming"
  }
];

// Type guard to ensure timeline events are valid
timelineEvents.forEach((event, index) => {
  if (!event.icon) {
    console.warn(`Warning: Missing icon for timeline event at index ${index}`);
    event.icon = createIcon(FaExclamationCircle);
  }
  if (!['completed', 'current', 'upcoming'].includes(event.status)) {
    console.error(`Invalid status for timeline event at index ${index}`);
    event.status = 'upcoming';
  }
});

export default timelineEvents;