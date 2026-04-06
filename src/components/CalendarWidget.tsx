'use client';

import { format } from 'date-fns';

interface CalendarEvent {
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

interface CalendarWidgetProps {
  events?: CalendarEvent[];
  error?: any;
}

export default function CalendarWidget({ events, error }: CalendarWidgetProps) {
  const formatTime = (dateTimeString: string) => {
    return format(new Date(dateTimeString), 'h:mm a');
  };

  const formatDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMinutes = Math.round((endDate.getTime() - startDate.getTime()) / 60000);
    
    if (durationMinutes < 60) {
      return `${durationMinutes}m`;
    }
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  };

  return (
    <div className="glass-card p-6 slide-up h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="mr-2">📅</span>
          Today's Schedule
        </h2>
        <div className="text-xs text-text-muted">
          Outlook Calendar
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {error ? (
          <div className="text-red-400 text-sm text-center py-8">
            Unable to load calendar events
          </div>
        ) : events && events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-background-hover p-4 rounded-lg border-l-4 border-accent-blue hover:bg-opacity-80 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm mb-1">
                    {event.subject}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-xs text-text-secondary mb-2">
                    <span className="font-medium">
                      {formatTime(event.start.dateTime)}
                    </span>
                    <span>-</span>
                    <span className="font-medium">
                      {formatTime(event.end.dateTime)}
                    </span>
                    <span className="text-text-muted">
                      ({formatDuration(event.start.dateTime, event.end.dateTime)})
                    </span>
                  </div>

                  {event.location?.displayName && (
                    <div className="flex items-center text-xs text-text-muted mb-2">
                      <span className="mr-1">📍</span>
                      {event.location.displayName}
                    </div>
                  )}

                  {event.isOnlineMeeting && (
                    <div className="flex items-center text-xs text-accent-blue mb-2">
                      <span className="mr-1">💻</span>
                      <span>Online Meeting</span>
                    </div>
                  )}

                  {event.attendees && event.attendees.length > 0 && (
                    <div className="flex items-center text-xs text-text-muted mt-2">
                      <span className="mr-2">👥</span>
                      <span>
                        {event.attendees.length} attendee{event.attendees.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>

                {event.isOnlineMeeting && event.onlineMeetingUrl && (
                  <a
                    href={event.onlineMeetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 px-3 py-1 bg-accent-blue hover:bg-opacity-80 text-white text-xs rounded transition-all"
                  >
                    Join
                  </a>
                )}
              </div>
            </div>
          ))
        ) : events && events.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <p className="text-lg mb-2">📭</p>
            <p className="text-sm">No events scheduled for today</p>
          </div>
        ) : (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 bg-background-hover rounded-lg"></div>
            ))}
          </div>
        )}
      </div>

      {events && events.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-xs text-accent-blue hover:text-accent-gold transition-colors">
            View all events →
          </button>
        </div>
      )}
    </div>
  );
}