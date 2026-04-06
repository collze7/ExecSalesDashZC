'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Header from '@/components/Header';
import DateWeatherWidget from '@/components/DateWeatherWidget';
import ProspectingSection from '@/components/ProspectingSection';
import CalendarWidget from '@/components/CalendarWidget';
import OpportunitiesWidget from '@/components/OpportunitiesWidget';
import LoadingSpinner from '@/components/LoadingSpinner';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // REAL INTEGRATIONS - Calendar from Outlook
  const { data: calendarData, error: calendarError } = useSWR(
    isClient ? '/api/calendar' : null,
    fetcher,
    { refreshInterval: 60000 } // Refresh every minute
  );

  // REAL INTEGRATIONS - Prospecting from Writer Playbook
  const { data: prospectingData, error: prospectingError } = useSWR(
    isClient ? '/api/prospecting' : null,
    fetcher,
    { refreshInterval: 300000 } // Refresh every 5 minutes
  );

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-dark p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Header Section */}
        <Header />

        {/* Date & Weather Widget - PLACEHOLDER */}
        <div className="mt-6">
          <DateWeatherWidget />
        </div>

        {/* Main Dashboard Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Prospecting Section (REAL - Writer Playbook) */}
          <div className="lg:col-span-2">
            <ProspectingSection 
              data={prospectingData} 
              error={prospectingError} 
            />
          </div>

          {/* Right Column - Calendar (REAL - Outlook) */}
          <div className="lg:col-span-1">
            <CalendarWidget 
              events={calendarData} 
              error={calendarError} 
            />
          </div>
        </div>

        {/* Bottom Section - Opportunities - PLACEHOLDER */}
        <div className="mt-6">
          <OpportunitiesWidget />
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-text-muted text-sm">
          <p>ReSource Pro Sales Executive Dashboard - Powered by Writer Playbook</p>
          <p className="mt-1">Last updated: {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </main>
  );
}