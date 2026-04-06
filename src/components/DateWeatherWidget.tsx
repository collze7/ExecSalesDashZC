'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

// PLACEHOLDER COMPONENT - No real weather API integration
export default function DateWeatherWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  // Placeholder weather data
  const placeholderWeather = {
    temp: 72,
    description: 'clear sky',
    icon: '01d',
    city: 'New York',
    humidity: 65,
    windSpeed: 8
  };

  return (
    <div className="glass-card p-6 slide-up">
      <div className="flex items-center justify-between">
        {/* Date and Time - REAL */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-white">
            {format(currentTime, 'EEEE, MMMM d, yyyy')}
          </h2>
          <p className="text-2xl text-text-secondary mt-2">
            {format(currentTime, 'h:mm:ss a')}
          </p>
        </div>

        {/* Weather - PLACEHOLDER */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">☀️</span>
            </div>
            <div>
              <div className="text-5xl font-bold text-white">
                {placeholderWeather.temp}°F
              </div>
              <div className="text-text-secondary capitalize text-sm mt-1">
                {placeholderWeather.description}
              </div>
            </div>
          </div>
          <div className="border-l border-text-muted pl-6 space-y-2">
            <div className="text-text-secondary text-sm">
              <span className="font-medium">{placeholderWeather.city}</span>
            </div>
            <div className="text-text-secondary text-sm">
              Humidity: {placeholderWeather.humidity}%
            </div>
            <div className="text-text-secondary text-sm">
              Wind: {placeholderWeather.windSpeed} mph
            </div>
          </div>
          <div className="text-xs text-text-muted italic">
            Placeholder data
          </div>
        </div>
      </div>
    </div>
  );
}