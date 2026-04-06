/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e3a5f',
          dark: '#0f1c2e',
          light: '#2d5a8f',
        },
        accent: {
          orange: '#ff6b35',
          gold: '#ffd700',
          blue: '#4a90e2',
        },
        background: {
          dark: '#0a1628',
          card: '#1a2942',
          hover: '#243654',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b8c5d6',
          muted: '#6b7c93',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(135deg, #0a1628 0%, #1a2942 100%)',
        'gradient-card': 'linear-gradient(135deg, #1a2942 0%, #243654 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(74, 144, 226, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}