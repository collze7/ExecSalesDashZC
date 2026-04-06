'use client';

import { useState } from 'react';

interface Opportunity {
  Id: string;
  Name: string;
  Amount: number;
  StageName: string;
  CloseDate: string;
  Probability: number;
  AccountName?: string;
  OwnerName?: string;
}

interface OpportunitiesWidgetProps {
  opportunities?: {
    recentUpdates: Opportunity[];
    topDeals: Opportunity[];
    totalPipeline: number;
    totalCount: number;
  };
  error?: any;
}

export default function OpportunitiesWidget({ opportunities, error }: OpportunitiesWidgetProps) {
  const [activeTab, setActiveTab] = useState<'recent' | 'top'>('recent');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStageColor = (stage: string) => {
    const colors: { [key: string]: string } = {
      'Prospecting': 'bg-blue-500/20 text-blue-400',
      'Qualification': 'bg-purple-500/20 text-purple-400',
      'Needs Analysis': 'bg-cyan-500/20 text-cyan-400',
      'Value Proposition': 'bg-teal-500/20 text-teal-400',
      'Proposal/Price Quote': 'bg-yellow-500/20 text-yellow-400',
      'Negotiation/Review': 'bg-orange-500/20 text-orange-400',
      'Closed Won': 'bg-green-500/20 text-green-400',
      'Closed Lost': 'bg-red-500/20 text-red-400',
    };
    return colors[stage] || 'bg-gray-500/20 text-gray-400';
  };

  const displayOpportunities = activeTab === 'recent' 
    ? opportunities?.recentUpdates 
    : opportunities?.topDeals;

  return (
    <div className="glass-card p-6 slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="mr-2">💼</span>
          Salesforce Opportunities
        </h2>
        
        {opportunities && (
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-xs text-text-muted">Total Pipeline</div>
              <div className="text-2xl font-bold text-accent-gold">
                {formatCurrency(opportunities.totalPipeline)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-text-muted">Active Deals</div>
              <div className="text-2xl font-bold text-accent-blue">
                {opportunities.totalCount}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab('recent')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'recent'
              ? 'bg-accent-blue text-white'
              : 'bg-background-hover text-text-secondary hover:bg-opacity-80'
          }`}
        >
          Recently Updated
        </button>
        <button
          onClick={() => setActiveTab('top')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'top'
              ? 'bg-accent-blue text-white'
              : 'bg-background-hover text-text-secondary hover:bg-opacity-80'
          }`}
        >
          Top Deals
        </button>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {error ? (
          <div className="col-span-full text-red-400 text-sm text-center py-8">
            Unable to load opportunities
          </div>
        ) : displayOpportunities && displayOpportunities.length > 0 ? (
          displayOpportunities.map((opp) => (
            <div
              key={opp.Id}
              className="bg-background-hover p-4 rounded-lg border border-text-muted/20 hover:border-accent-blue transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-medium text-sm line-clamp-2 flex-1">
                  {opp.Name}
                </h3>
              </div>
              
              {opp.AccountName && (
                <p className="text-text-secondary text-xs mb-3">
                  {opp.AccountName}
                </p>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">Amount</span>
                  <span className="text-sm font-bold text-accent-gold">
                    {formatCurrency(opp.Amount)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">Close Date</span>
                  <span className="text-xs text-text-secondary">
                    {formatDate(opp.CloseDate)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">Probability</span>
                  <span className="text-xs font-medium text-accent-blue">
                    {opp.Probability}%
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <span className={`text-xs px-2 py-1 rounded ${getStageColor(opp.StageName)}`}>
                  {opp.StageName}
                </span>
              </div>
            </div>
          ))
        ) : displayOpportunities && displayOpportunities.length === 0 ? (
          <div className="col-span-full text-center py-12 text-text-muted">
            <p className="text-lg mb-2">📊</p>
            <p className="text-sm">No opportunities to display</p>
          </div>
        ) : (
          <div className="col-span-full animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-background-hover rounded-lg"></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}