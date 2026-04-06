'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface WeatherProps {
  weather?: {
    temp: number;
    description: string;
    icon: string;
    city: string;
    humidity?: number;
    windSpeed?: number;
  };
  error?: any;
}

export default function DateWeatherWidget({ weather, error }: WeatherProps) {
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

  return (
    <div className="glass-card p-6 slide-up">
      <div className="flex items-center justify-between">
        {/* Date and Time */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-white">
            {format(currentTime, 'EEEE, MMMM d, yyyy')}
          </h2>
          <p className="text-2xl text-text-secondary mt-2">
            {format(currentTime, 'h:mm:ss a')}
          </p>
        </div>

        {/* Weather */}
        <div className="flex items-center space-x-6">
          {error ? (
            <div className="text-red-400 text-sm">Weather unavailable</div>
          ) : weather ? (
            <>
              <div className="flex items-center space-x-4">
                {weather.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                    className="w-16 h-16"
                  />
                )}
                <div>
                  <div className="text-5xl font-bold text-white">
                    {weather.temp}°F
                  </div>
                  <div className="text-text-secondary capitalize text-sm mt-1">
                    {weather.description}
                  </div>
                </div>
              </div>
              <div className="border-l border-text-muted pl-6 space-y-2">
                <div className="text-text-secondary text-sm">
                  <span className="font-medium">{weather.city}</span>
                </div>
                {weather.humidity && (
                  <div className="text-text-secondary text-sm">
                    Humidity: {weather.humidity}%
                  </div>
                )}
                {weather.windSpeed && (
                  <div className="text-text-secondary text-sm">
                    Wind: {weather.windSpeed} mph
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="animate-pulse">
              <div className="h-16 w-32 bg-background-hover rounded"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}