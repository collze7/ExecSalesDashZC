import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B2A57] to-[#2a3f6f]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-12">
            <Image 
              src="/logo.png" 
              alt="ReSource Pro" 
              width={300} 
              height={100}
              className="mx-auto"
            />
          </div>

          {/* Hero Section */}
          <h1 className="text-5xl font-bold text-white mb-6">
            Sales Executive Dashboard
          </h1>
          <p className="text-xl text-gray-200 mb-12">
            Comprehensive sales intelligence and pipeline management for Q2 2026
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <div className="text-4xl font-bold text-[#95BC46]">68</div>
              <div className="text-gray-200 mt-2">Accounts Analyzed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <div className="text-4xl font-bold text-[#95BC46]">3</div>
              <div className="text-gray-200 mt-2">High Priority</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <div className="text-4xl font-bold text-[#95BC46]">8</div>
              <div className="text-gray-200 mt-2">Trigger Events</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <div className="text-4xl font-bold text-[#95BC46]">5</div>
              <div className="text-gray-200 mt-2">Outreach Ready</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="bg-[#95BC46] hover:bg-[#7fa038] text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg text-lg"
            >
              📊 View Dashboard
            </Link>
            <Link 
              href="/dashboard#prospects"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white font-semibold py-4 px-8 rounded-lg transition-all border border-white/20 text-lg"
            >
              🎯 View Prospects
            </Link>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-white mb-3">Overview Tab</h3>
              <p className="text-gray-300">Command center with key stats and top urgent opportunities</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-3">Prospects Tab</h3>
              <p className="text-gray-300">Expandable account cards with news feeds and copy-ready outreach</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-white mb-3">Commitments Tab</h3>
              <p className="text-gray-300">Action item tracking with due dates and follow-up planning</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-20 text-gray-400 text-sm">
            <p>Generated: April 17, 2026 · Confidential and Proprietary</p>
          </div>
        </div>
      </div>
    </div>
  )
}