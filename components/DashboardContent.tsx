'use client'

import { useState } from 'react'
import Image from 'next/image'

// Dashboard data
const dashboardData = {
  stats: {
    totalAccounts: 68,
    highPriority: 3,
    triggerEvents: 8,
    outreachReady: 5
  },
  priorLeads: [
    { company: 'ProAssurance Insurance', date: 'Apr 10, 2026', trigger: 'Premium Audit Expansion' },
    { company: 'Old Republic General', date: 'Apr 8, 2026', trigger: 'Claims Support Initiative' },
    { company: 'Selective Insurance', date: 'Apr 5, 2026', trigger: 'Underwriting Modernization' },
    { company: 'Cincinnati Financial', date: 'Apr 1, 2026', trigger: 'Tech Implementation' },
    { company: 'Erie Insurance', date: 'Mar 28, 2026', trigger: 'Process Optimization' }
  ],
  accounts: {
    high: [
      {
        id: 'rli',
        company: 'RLI Corporation',
        tier: 'Tier 2',
        priority: 'high',
        whyNow: "RLI is experiencing rapid 18% premium growth but struggling with premium audit processing (45-day turnaround vs industry standard 21 days). This operational bottleneck is impacting cash flow and profitability. ReSource Pro's Premium Audit services can immediately reduce turnaround time by 50% and scale with their growth.",
        news: [
          {
            title: 'RLI Corp Announces Q1 2026 Results, Reports 18% Premium Growth',
            date: 'April 10, 2026',
            summary: 'RLI Corporation reported first quarter results with gross written premiums increasing 18% year-over-year. The company highlighted expansion challenges in processing premium audits and managing increased claim volumes.',
            url: 'https://example.com/rli-q1-2026'
          },
          {
            title: 'RLI Seeks Operations Support for Premium Audit Backlog',
            date: 'April 8, 2026',
            summary: 'Company CFO mentioned in earnings call that premium audit processing has become a bottleneck with 45-day average turnaround times.',
            url: 'https://example.com/rli-audit-backlog'
          }
        ],
        triggers: [
          'Rapid premium growth (18% YoY) creating operational strain in audit and claims processing',
          'Premium audit backlog with 45-day turnaround time'
        ],
        outreach: "I noticed RLI Corporation recently reported strong 18% premium growth in Q1 2026, which is impressive in the current market. However, your CFO mentioned premium audit processing has become a bottleneck with 45-day average turnaround times. At ReSource Pro, we have helped carriers in similar growth phases reduce premium audit turnaround by 50% while maintaining accuracy and compliance. Our scalable Premium Audit services could help you convert that growth into cash flow more efficiently without adding headcount. Would you be open to a brief conversation about how we have helped other mid-market carriers manage audit operations during rapid expansion?"
      },
      {
        id: 'markel',
        company: 'Markel Corporation',
        tier: 'Tier 2',
        priority: 'high',
        whyNow: "Markel is investing $45M in underwriting technology modernization, which typically creates a 6-12 month transition period where carriers need external support to maintain service levels. ReSource Pro's Underwriting support can provide immediate capacity augmentation, ensuring no disruption to submission processing while their internal teams focus on technology adoption and training.",
        news: [
          {
            title: 'Markel Announces Major Technology Investment for Underwriting Operations',
            date: 'April 12, 2026',
            summary: 'Markel Corporation announced $45M investment in underwriting technology and AI-driven risk assessment tools to modernize operations.',
            url: 'https://example.com/markel-tech-investment'
          },
          {
            title: 'Markel Seeks Underwriting Support Partners for Tech Transition',
            date: 'April 14, 2026',
            summary: 'During tech implementation, Markel will need partner support to maintain underwriting throughput and service levels.',
            url: 'https://example.com/markel-transition'
          }
        ],
        triggers: [
          'Major underwriting technology modernization initiative',
          'Underwriting capacity needs during technology transition'
        ],
        outreach: "Congratulations on Markel's $45M investment in underwriting technology modernization. Having worked with several carriers through similar transformations, I know this transition period often creates capacity challenges while teams adapt to new systems and workflows. ReSource Pro specializes in providing surge underwriting support during technology implementations, ensuring submission quality and turnaround times remain consistent. We have helped carriers maintain 99% SLA compliance during modernization projects. Would it make sense to discuss how we could support your underwriting operations during this transition?"
      },
      {
        id: 'af',
        company: 'AF Group',
        tier: 'Tier 3',
        priority: 'high',
        whyNow: "AF Group's $180M acquisition brings significant integration complexity across claims, premium audit, and underwriting operations. Post-merger periods create immediate demand for scalable operations support to harmonize processes without disrupting service to policyholders. ReSource Pro's end-to-end Insurance Management Services can accelerate integration by 40% while maintaining quality standards.",
        news: [
          {
            title: "AF Group Acquires Regional Workers' Comp Carrier in $180M Deal",
            date: 'April 5, 2026',
            summary: 'AF Group completed acquisition of Michigan-based workers\' comp carrier, adding $220M in premium and expanding into new territories.',
            url: 'https://example.com/af-acquisition'
          },
          {
            title: 'AF Group Integration Challenges: Systems and Process Harmonization',
            date: 'April 9, 2026',
            summary: 'Integration teams working to harmonize claims processes, premium audit procedures, and underwriting guidelines across legacy and acquired systems.',
            url: 'https://example.com/af-integration'
          }
        ],
        triggers: [
          'Post-merger integration and operations consolidation needs',
          'Claims, audit, and underwriting process consolidation'
        ],
        outreach: "I saw AF Group completed the acquisition of the Michigan workers' comp carrier. Congratulations on the expansion. Having supported several carriers through post-merger integrations, I know the next 90-120 days are critical for harmonizing claims, audit, and underwriting processes without service disruption. ReSource Pro has helped carriers reduce integration timelines by 40% through our Insurance Management Services, providing dedicated teams that understand both legacy and acquired operations. We recently supported a similar workers' comp integration that maintained 98% policyholder satisfaction scores throughout the transition. Would you be interested in exploring how we could support your integration objectives?"
      }
    ],
    medium: [
      {
        id: 'acuity',
        company: 'Acuity, A Mutual Insurance Company',
        tier: 'Tier 3',
        priority: 'medium',
        whyNow: "Acuity is actively focused on improving claims efficiency to address elevated loss ratios. ReSource Pro's Claims support services can immediately impact cycle time reduction and improve first-contact resolution rates.",
        news: [
          {
            title: 'Acuity Mutual Reports Record Loss Ratios, Focuses on Claims Efficiency',
            date: 'April 11, 2026',
            summary: 'Acuity reported elevated loss ratios in commercial lines and announced initiatives to improve claims processing efficiency and reduce cycle times.',
            url: 'https://example.com/acuity-claims'
          }
        ],
        triggers: ['Claims efficiency improvement initiative'],
        outreach: "I noticed Acuity's recent focus on claims efficiency improvements in response to elevated loss ratios. ReSource Pro has helped mutual carriers achieve 25-30% reductions in claims cycle time while improving customer satisfaction. Our Claims support teams specialize in commercial lines processing and could provide immediate capacity to accelerate your efficiency initiatives. Would you be open to discussing how we have helped similar mutuals optimize claims operations?"
      },
      {
        id: 'emc',
        company: 'EMC Insurance Companies',
        tier: 'Tier 3',
        priority: 'medium',
        whyNow: "EMC's three-state expansion creates immediate needs for scalable underwriting and policy administration support in new markets. ReSource Pro can provide rapid deployment of resources familiar with multi-state compliance requirements.",
        news: [
          {
            title: 'EMC Insurance Expands Into Three New States for Commercial Lines',
            date: 'April 2, 2026',
            summary: 'EMC announced geographic expansion into Colorado, Arizona, and Nevada for commercial property and casualty products.',
            url: 'https://example.com/emc-expansion'
          }
        ],
        triggers: ['Geographic expansion requiring scalable operations'],
        outreach: "Congratulations on EMC's expansion into Colorado, Arizona, and Nevada. Geographic expansion typically creates temporary capacity challenges as you build out local operations and ensure compliance across new regulatory environments. ReSource Pro has helped regional carriers scale underwriting and policy operations quickly in new states, with teams that understand multi-state compliance nuances. Would it make sense to explore how we could support your expansion while you establish permanent operations?"
      }
    ],
    monitor: [
      {
        id: 'auto',
        company: 'Auto-Owners Insurance Company',
        tier: 'Tier 2',
        priority: 'monitor',
        whyNow: 'No immediate trigger event. Continue monitoring for operational changes, tech initiatives, or expansion announcements.',
        news: [
          {
            title: 'Auto-Owners Reports Stable Q1 Performance, No Major Initiatives Announced',
            date: 'March 28, 2026',
            summary: 'Auto-Owners reported steady Q1 results with no significant operational changes or strategic initiatives announced.',
            url: 'https://example.com/auto-owners-q1'
          }
        ],
        triggers: ['Stable operations, no immediate triggers. Continue monitoring.'],
        outreach: ''
      }
    ]
  }
}

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState('overview')
  const [filterPriority, setFilterPriority] = useState('all')
  const [expandedAccounts, setExpandedAccounts] = useState<Record<string, boolean>>({})
  const [activeInnerTabs, setActiveInnerTabs] = useState<Record<string, string>>({})
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const toggleAccount = (accountId: string) => {
    setExpandedAccounts(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }))
  }

  const switchInnerTab = (accountId: string, tabName: string) => {
    setActiveInnerTabs(prev => ({
      ...prev,
      [accountId]: tabName
    }))
  }

  const copyOutreach = (accountId: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAccount(accountId)
    setTimeout(() => setCopiedAccount(null), 2000)
  }

  const getFilteredAccounts = () => {
    const allAccounts = [
      ...dashboardData.accounts.high,
      ...dashboardData.accounts.medium,
      ...dashboardData.accounts.monitor
    ]

    if (filterPriority === 'all') return allAccounts
    return allAccounts.filter(acc => acc.priority === filterPriority)
  }

  return (
    <div className="dashboard-container flex min-h-screen">
      {/* Sidebar */}
      <aside className="sidebar w-[280px] bg-[#1B2A57] text-white p-6 fixed h-screen overflow-y-auto">
        <div className="logo mb-8">
          <Image src="/logo.png" alt="ReSource Pro" width={180} height={60} />
        </div>
        
        <div className="sidebar-section mb-8">
          <div className="text-xs uppercase tracking-wider opacity-70 mb-3 font-semibold">Dashboard Statistics</div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex justify-between mb-2 text-sm">
              <span>Total Accounts</span>
              <span className="font-semibold text-[#95BC46]">{dashboardData.stats.totalAccounts}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>High Priority</span>
              <span className="font-semibold text-[#95BC46]">{dashboardData.stats.highPriority}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Trigger Events</span>
              <span className="font-semibold text-[#95BC46]">{dashboardData.stats.triggerEvents}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Outreach Drafts</span>
              <span className="font-semibold text-[#95BC46]">{dashboardData.stats.outreachReady}</span>
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="text-xs uppercase tracking-wider opacity-70 mb-3 font-semibold">Prior Leads (Last 30 Days)</div>
          <div className="bg-white/5 rounded-lg p-3 max-h-[300px] overflow-y-auto">
            {dashboardData.priorLeads.map((lead, idx) => (
              <div key={idx} className="p-2 mb-2 bg-white/10 rounded text-sm">
                <div><strong>{lead.company}</strong></div>
                <div className="text-xs opacity-70">{lead.date} - {lead.trigger}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content ml-[280px] flex-1 p-6">
        <header className="bg-white p-6 rounded-xl mb-6 shadow-sm">
          <h1 className="text-3xl font-bold text-[#1B2A57] mb-2">ReSource Pro Carrier NCA Sales Dashboard</h1>
          <div className="text-sm text-gray-500">Q2 2026 Pipeline Ready | Last Updated: April 17, 2026 11:00 AM UTC</div>
        </header>

        {/* Main Tabs */}
        <div className="tabs flex gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`tab px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'overview' ? 'bg-[#1B2A57] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('prospects')}
            className={`tab px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'prospects' ? 'bg-[#1B2A57] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Prospects
          </button>
          <button
            onClick={() => setActiveTab('commitments')}
            className={`tab px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'commitments' ? 'bg-[#1B2A57] text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Commitments
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                <div className="text-sm text-gray-500 mb-2">High Priority Accounts</div>
                <div className="text-4xl font-bold text-[#1B2A57]">3</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                <div className="text-sm text-gray-500 mb-2">Medium Priority Accounts</div>
                <div className="text-4xl font-bold text-[#1B2A57]">2</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#95BC46]">
                <div className="text-sm text-gray-500 mb-2">Total Trigger Events</div>
                <div className="text-4xl font-bold text-[#1B2A57]">8</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#95BC46]">
                <div className="text-sm text-gray-500 mb-2">Outreach Drafts Ready</div>
                <div className="text-4xl font-bold text-[#1B2A57]">5</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-[#1B2A57] mb-4">Top Opportunities</h2>
              
              {dashboardData.accounts.high.map((account) => (
                <div key={account.id} className="mb-5 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-700 mb-2">🔥 {account.company} ({account.tier})</h3>
                  <p className="text-gray-700 mb-2">{account.triggers[0]}</p>
                  <p className="text-sm text-gray-600"><strong>Why Now:</strong> {account.whyNow.substring(0, 150)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prospects Tab */}
        {activeTab === 'prospects' && (
          <div className="tab-content">
            <div className="filters flex items-center gap-3 bg-white p-4 rounded-xl mb-6 shadow-sm">
              <span className="font-semibold text-[#1B2A57]">Filter by Priority:</span>
              <button
                onClick={() => setFilterPriority('all')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterPriority === 'all' ? 'bg-[#95BC46] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Accounts
              </button>
              <button
                onClick={() => setFilterPriority('high')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterPriority === 'high' ? 'bg-[#95BC46] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                High Priority
              </button>
              <button
                onClick={() => setFilterPriority('medium')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterPriority === 'medium' ? 'bg-[#95BC46] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Medium Priority
              </button>
              <button
                onClick={() => setFilterPriority('monitor')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterPriority === 'monitor' ? 'bg-[#95BC46] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Monitor
              </button>
            </div>

            <div className="accounts-container space-y-5">
              {getFilteredAccounts().map((account) => (
                <div
                  key={account.id}
                  className={`account-card bg-white rounded-xl shadow-md overflow-hidden transition-all ${
                    expandedAccounts[account.id] ? 'ring-2 ring-[#95BC46]' : ''
                  }`}
                >
                  <div
                    onClick={() => toggleAccount(account.id)}
                    className="account-header flex justify-between items-center p-5 bg-gradient-to-r from-[#1B2A57] to-[#2a3f6f] text-white cursor-pointer hover:opacity-90"
                  >
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{account.company}</h3>
                      <div className="flex gap-4 text-sm opacity-90">
                        <span>{account.tier}</span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            account.priority === 'high'
                              ? 'bg-red-500'
                              : account.priority === 'medium'
                              ? 'bg-yellow-500'
                              : 'bg-gray-500'
                          }`}
                        >
                          {account.priority === 'high'
                            ? 'High Priority'
                            : account.priority === 'medium'
                            ? 'Medium Priority'
                            : 'Monitor'}
                        </span>
                      </div>
                    </div>
                    <div className={`text-2xl transition-transform ${expandedAccounts[account.id] ? 'rotate-180' : ''}`}>
                      ▼
                    </div>
                  </div>

                  {expandedAccounts[account.id] && (
                    <div className="account-body p-6">
                      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-5">
                        <div className="font-semibold text-blue-900 mb-2">💡 Why Now</div>
                        <div className="text-blue-800 text-sm">{account.whyNow}</div>
                      </div>

                      <div className="inner-tabs flex gap-2 mb-5 border-b-2 border-gray-200">
                        <button
                          onClick={() => switchInnerTab(account.id, 'news')}
                          className={`px-5 py-3 font-medium transition-all ${
                            (activeInnerTabs[account.id] || 'news') === 'news'
                              ? 'text-[#1B2A57] border-b-4 border-[#95BC46]'
                              : 'text-gray-500 hover:text-[#1B2A57]'
                          }`}
                        >
                          News Feed
                        </button>
                        <button
                          onClick={() => switchInnerTab(account.id, 'triggers')}
                          className={`px-5 py-3 font-medium transition-all ${
                            activeInnerTabs[account.id] === 'triggers'
                              ? 'text-[#1B2A57] border-b-4 border-[#95BC46]'
                              : 'text-gray-500 hover:text-[#1B2A57]'
                          }`}
                        >
                          Trigger Events
                        </button>
                        {account.outreach && (
                          <button
                            onClick={() => switchInnerTab(account.id, 'outreach')}
                            className={`px-5 py-3 font-medium transition-all ${
                              activeInnerTabs[account.id] === 'outreach'
                                ? 'text-[#1B2A57] border-b-4 border-[#95BC46]'
                                : 'text-gray-500 hover:text-[#1B2A57]'
                            }`}
                          >
                            Recommended Outreach
                          </button>
                        )}
                      </div>

                      {(activeInnerTabs[account.id] || 'news') === 'news' && (
                        <div className="inner-tab-content">
                          {account.news.map((item, idx) => (
                            <div key={idx} className="mb-3 p-4 bg-gray-50 border-l-4 border-[#95BC46] rounded-lg">
                              <div className="font-semibold text-[#1B2A57] mb-1">{item.title}</div>
                              <div className="text-xs text-gray-500 mb-2">{item.date}</div>
                              <div className="text-sm text-gray-700 mb-2">{item.summary}</div>
                              <a href={item.url} className="text-sm text-[#95BC46] hover:underline" target="_blank" rel="noopener noreferrer">
                                Read More →
                              </a>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeInnerTabs[account.id] === 'triggers' && (
                        <div className="inner-tab-content">
                          {account.triggers.map((trigger, idx) => (
                            <div key={idx} className="mb-3 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                              <div className="font-semibold text-yellow-900 mb-2">⚡ {idx === 0 ? 'Primary' : 'Secondary'} Trigger</div>
                              <div className="text-yellow-800 text-sm">{trigger}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeInnerTabs[account.id] === 'outreach' && account.outreach && (
                        <div className="inner-tab-content">
                          <div className="bg-gray-50 rounded-lg p-5">
                            <div className="text-gray-800 mb-4 leading-relaxed">{account.outreach}</div>
                            <button
                              onClick={() => copyOutreach(account.id, account.outreach)}
                              className="bg-[#95BC46] hover:bg-[#7fa038] text-white font-semibold py-3 px-6 rounded-lg transition-all"
                            >
                              📋 Copy Outreach
                            </button>
                            {copiedAccount === account.id && (
                              <span className="ml-3 text-green-600 font-medium">✓ Copied!</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commitments Tab */}
        {activeTab === 'commitments' && (
          <div className="tab-content">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#1B2A57] mb-2">Action Items & Commitments</h2>
              <p className="text-gray-500">Track follow-ups and next steps for each opportunity</p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#95BC46]">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-lg text-[#1B2A57]">RLI Corporation - Initial Outreach</div>
                    <div className="text-gray-600 text-sm mt-1">Send personalized email referencing Q1 premium growth and audit processing bottleneck</div>
                  </div>
                  <div className="text-sm text-gray-500">Due: Apr 19, 2026</div>
                </div>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Pending</span>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#95BC46]">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-lg text-[#1B2A57]">Markel Corporation - Discovery Call</div>
                    <div className="text-gray-600 text-sm mt-1">Schedule 30-minute discovery call to discuss underwriting support during tech transition</div>
                  </div>
                  <div className="text-sm text-gray-500">Due: Apr 20, 2026</div>
                </div>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Pending</span>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#95BC46]">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-lg text-[#1B2A57]">AF Group - Integration Support Proposal</div>
                    <div className="text-gray-600 text-sm mt-1">Develop custom proposal for post-merger integration support across claims, audit, and underwriting</div>
                  </div>
                  <div className="text-sm text-gray-500">Due: Apr 22, 2026</div>
                </div>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Pending</span>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#95BC46]">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-lg text-[#1B2A57]">Acuity Mutual - Claims Efficiency Case Study</div>
                    <div className="text-gray-600 text-sm mt-1">Share relevant case study on claims cycle time reduction for similar mutual carriers</div>
                  </div>
                  <div className="text-sm text-gray-500">Due: Apr 23, 2026</div>
                </div>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Pending</span>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-[#95BC46]">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-lg text-[#1B2A57]">EMC Insurance - Multi-State Expansion Brief</div>
                    <div className="text-gray-600 text-sm mt-1">Create brief on our multi-state expansion support capabilities and compliance expertise</div>
                  </div>
                  <div className="text-sm text-gray-500">Due: Apr 24, 2026</div>
                </div>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Pending</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}