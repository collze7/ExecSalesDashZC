export interface CalendarEvent {
  id: string;
  subject: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location?: {
    displayName: string;
  };
  attendees?: Array<{
    emailAddress: {
      name: string;
      address: string;
    };
  }>;
  isOnlineMeeting?: boolean;
  onlineMeetingUrl?: string;
}

export interface ProspectData {
  id: string;
  company: string;
  contact: string;
  title: string;
  email: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal';
  lastContact?: string;
  nextAction?: string;
}

export interface NewsTrigger {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  relevantTo: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface OpportunityData {
  Id: string;
  Name: string;
  Amount: number;
  StageName: string;
  CloseDate: string;
  Probability: number;
  AccountName?: string;
  OwnerName?: string;
}

export interface DashboardData {
  weather?: {
    temp: number;
    description: string;
    icon: string;
    city: string;
  };
  calendar?: CalendarEvent[];
  prospects?: ProspectData[];
  news?: NewsTrigger[];
  opportunities?: OpportunityData[];
  pipelineValue?: number;
  lastUpdated?: string;
}

export interface EmailTemplate {
  to: string;
  subject: string;
  body: string;
  context?: NewsTrigger | ProspectData;
}