'use client';

import { useState } from 'react';

// PLACEHOLDER COMPONENT - No real Salesforce integration yet
export default function OpportunitiesWidget() {
  const [activeTab, setActiveTab] = useState<'recent' | 'top'>('recent');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Placeholder data
  const placeholderData = {
    totalPipeline: 2500000,
    totalCount: 15,
    opportunities: [
      {
        Id: '1',
        Name: 'Acme Insurance - Premium Audit Services',
        Amount: 250000,
        StageName: 'Proposal/Price Quote',
        CloseDate: '2026-05-15',
        Probability: 60,
        AccountName: 'Acme Insurance Co',
      },
      {
        Id: '2',
        Name: 'Enterprise Carriers - BPO Implementation',
        Amount: 500000,
        StageName: 'Negotiation/Review',
        CloseDate: '2026-04-30',
        Probability: 75,
        AccountName: 'Enterprise Carriers',
      },
      {
        Id: '3',
        Name: 'Regional P&C - Claims Processing',
        Amount: 180000,
        StageName: 'Value Proposition',
        CloseDate: '2026-06-10',
        Probability: 40,
        AccountName: 'Regional P&C Group',
      },
    ]
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

  return (
    <div className="glass-card p-6 slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="mr-2">💼</span>
          Salesforce Opportunities
          <span className="ml-3 text-xs bg-gray-500/20 text-gray-400 px-2 py-1 rounded">
            PLACEHOLDER
          </span>
        </h2>
        
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-xs text-text-muted">Total Pipeline</div>
            <div className="text-2xl font-bold text-accent-gold">
              {formatCurrency(placeholderData.totalPipeline)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-text-muted">Active Deals</div>
            <div className="text-2xl font-bold text-accent-blue">
              {placeholderData.totalCount}
            </div>
          </div>
        </div>
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

      {/* Opportunities List - Placeholder Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {placeholderData.opportunities.map((opp) => (
          <div
            key={opp.Id}
            className="bg-background-hover p-4 rounded-lg border border-text-muted/20 hover:border-accent-blue/50 transition-all opacity-60"
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
                  {new Date(opp.CloseDate).toLocaleDateString()}
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
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-text-muted italic">
        Placeholder data - Salesforce integration pending
      </div>
    </div>
  );
}