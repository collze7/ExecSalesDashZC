'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="glass-card p-6 fade-in">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {/* ReSource Pro Logo Placeholder */}
            <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-gold rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">RP</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                Executive Dashboard
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                Real-time Sales Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-accent-blue hover:bg-opacity-80 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            Refresh Data
          </button>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">ZC</span>
          </div>
        </div>
      </div>
    </header>
  );
}