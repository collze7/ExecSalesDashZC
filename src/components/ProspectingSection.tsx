'use client';

import { useState } from 'react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  relevantTo?: string;
}

interface ProspectingSectionProps {
  news?: NewsItem[];
  error?: any;
}

export default function ProspectingSection({ news, error }: ProspectingSectionProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const generateEmail = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setEmailSubject(`Regarding: ${newsItem.title}`);
    
    const body = `Hi [First Name],

I came across some interesting news that I thought would be relevant to ${newsItem.relevantTo || 'your organization'}:

${newsItem.title}

${newsItem.description}

I'd love to discuss how this development might impact your strategy and how ReSource Pro can help you navigate these changes.

Would you be available for a brief call this week?

Best regards,
Zachary Collins
Sales Executive, ReSource Pro`;
    
    setEmailBody(body);
  };

  const copyToClipboard = () => {
    const emailText = `Subject: ${emailSubject}\n\n${emailBody}`;
    navigator.clipboard.writeText(emailText);
    alert('Email copied to clipboard!');
  };

  return (
    <div className="glass-card p-6 slide-up">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <span className="mr-2">📊</span>
        Today's Prospecting Intelligence
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* News & Triggers */}
        <div>
          <h3 className="text-lg font-semibold text-accent-gold mb-3">
            Latest News & Triggers
          </h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {error ? (
              <div className="text-red-400 text-sm">Failed to load news</div>
            ) : news && news.length > 0 ? (
              news.map((item) => (
                <div
                  key={item.id}
                  className="bg-background-hover p-4 rounded-lg border border-text-muted/20 hover:border-accent-blue transition-all cursor-pointer"
                  onClick={() => generateEmail(item)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm mb-1 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-text-secondary text-xs mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-3 text-xs text-text-muted">
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                      </div>
                      {item.relevantTo && (
                        <div className="mt-2">
                          <span className="text-xs bg-accent-blue/20 text-accent-blue px-2 py-1 rounded">
                            {item.relevantTo}
                          </span>
                        </div>
                      )}
                    </div>
                    <button className="ml-3 text-accent-gold hover:text-accent-orange">
                      →
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-background-hover rounded-lg"></div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Email Composer */}
        <div>
          <h3 className="text-lg font-semibold text-accent-gold mb-3">
            Outreach Email
          </h3>
          <div className="bg-background-hover p-4 rounded-lg border border-text-muted/20">
            {selectedNews ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-text-muted block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-background-dark text-white px-3 py-2 rounded border border-text-muted/30 focus:border-accent-blue outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-muted block mb-1">
                    Email Body
                  </label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={14}
                    className="w-full bg-background-dark text-white px-3 py-2 rounded border border-text-muted/30 focus:border-accent-blue outline-none text-sm resize-none"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-accent-blue hover:bg-opacity-80 text-white px-4 py-2 rounded transition-all text-sm font-medium"
                  >
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="px-4 py-2 bg-background-dark hover:bg-opacity-80 text-text-secondary rounded transition-all text-sm"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-text-muted">
                <p className="text-sm">
                  Click on a news item to generate an outreach email
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}