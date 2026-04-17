import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B2A57] to-[#2a3f6f] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-200 mb-8">Page not found</p>
        <Link 
          href="/"
          className="bg-[#95BC46] hover:bg-[#7fa038] text-white font-semibold py-3 px-6 rounded-lg transition-all inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}