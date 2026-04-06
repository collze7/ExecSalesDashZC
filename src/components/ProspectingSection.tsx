'use client';

import { useState } from 'react';

// REAL COMPONENT - Integrates with Writer Playbook prospecting data
interface ProspectItem {
  id: string;
  company: string;
  trigger: string;
  description: string;
  source: string;
  publishedAt: string;
  relevantTo?: string;
}

interface ProspectingSectionProps {
  data?: ProspectItem[];
  error?: any;
}

export default function ProspectingSection({ data, error }: ProspectingSectionProps) {
  const [selectedProspect, setSelectedProspect] = useState<ProspectItem | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const generateEmail = (prospect: ProspectItem) => {
    setSelectedProspect(prospect);
    setEmailSubject(`Following up on ${prospect.company}`);
    
    // Generate email WITHOUT em-dashes
    const body = `Hi [First Name],

I noticed some interesting developments at ${prospect.company} that caught my attention:

${prospect.trigger}

${prospect.description}

Given these changes, I thought it might be a good time to discuss how ReSource Pro can help ${prospect.company} navigate this transition. Our expertise in ${prospect.relevantTo || 'insurance operations'} has helped similar organizations improve efficiency and reduce costs.

Would you be available for a brief conversation this week to explore how we might support your initiatives?

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
        <span className="ml-3 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
          LIVE - Writer Playbook
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* News & Triggers - REAL DATA from Writer Playbook */}
        <div>
          <h3 className="text-lg font-semibold text-accent-gold mb-3">
            Latest Prospects & Triggers
          </h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {error ? (
              <div className="text-red-400 text-sm">Failed to load prospecting data from Writer Playbook</div>
            ) : data && data.length > 0 ? (
              data.map((item) => (
                <div
                  key={item.id}
                  className="bg-background-hover p-4 rounded-lg border border-text-muted/20 hover:border-accent-blue transition-all cursor-pointer"
                  onClick={() => generateEmail(item)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm mb-1">
                        {item.company}
                      </h4>
                      <p className="text-accent-gold text-xs mb-2 font-semibold">
                        {item.trigger}
                      </p>
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
                <div className="h-32 bg-background-hover rounded-lg flex items-center justify-center">
                  <span className="text-text-muted text-sm">Loading Writer Playbook data...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Email Composer - REAL functionality */}
        <div>
          <h3 className="text-lg font-semibold text-accent-gold mb-3">
            Outreach Email (No Em-Dashes)
          </h3>
          <div className="bg-background-hover p-4 rounded-lg border border-text-muted/20">
            {selectedProspect ? (
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
                    onClick={() => setSelectedProspect(null)}
                    className="px-4 py-2 bg-background-dark hover:bg-opacity-80 text-text-secondary rounded transition-all text-sm"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-text-muted">
                <p className="text-sm">
                  Click on a prospect to generate a personalized outreach email
                </p>
                <p className="text-xs mt-2 text-green-400">
                  ✓ No em-dashes in generated emails
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}