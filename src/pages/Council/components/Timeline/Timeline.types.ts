export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  status: 'completed' | 'current' | 'upcoming';
  link?: string;
}

export interface TimelineSectionProps {
  events: TimelineEvent[];
  title: string;
  subtitle: string;
} 