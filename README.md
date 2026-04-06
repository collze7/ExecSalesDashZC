# ReSource Pro Sales Executive Dashboard

A modern, full-stack sales executive dashboard built with Next.js 14, TypeScript, and Tailwind CSS. Features real-time integration with Microsoft Outlook, Salesforce, weather data, and industry news. Designed to be automatically updated via Writer Playbook routines.

![Dashboard Preview](https://via.placeholder.com/1200x600/1a2942/ffffff?text=Sales+Executive+Dashboard)

## Features

### 🎯 Core Components
- **Real-time Date & Weather Widget**: Live clock and weather conditions with location-based forecasts
- **Outlook Calendar Integration**: Today's schedule with meeting details and online meeting links
- **Prospecting Intelligence**: Latest industry news and triggers with AI-powered email composer
- **Salesforce Opportunities**: Live pipeline data, top deals, and recently updated opportunities

### 🔄 Automation
- **Writer Playbook Integration**: Automated daily updates via scheduled routines
- **Webhook Support**: Trigger dashboard refresh from external systems
- **Auto-refresh**: Configurable intervals for each data source
- **Error Handling**: Graceful degradation with mock data fallbacks

### 🎨 Design
- Dark theme inspired by modern analytics dashboards
- Responsive layout optimized for desktop displays
- Smooth animations and transitions
- Glass-morphism card design
- Dynamic data visualizations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: SWR for client-side data fetching
- **APIs**: 
  - Microsoft Graph API (Calendar)
  - Salesforce REST API
  - OpenWeatherMap API
  - News API
- **Deployment**: Docker-ready with Docker Compose

## Prerequisites

- Node.js 18+ and npm 9+
- Microsoft 365 account with Graph API access
- Salesforce account with API access
- OpenWeatherMap API key (free tier)
- News API key (optional, uses mock data if not provided)
- Writer API access for Playbook integration

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/sales-executive-dashboard.git
cd sales-executive-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API credentials:

```env
# Microsoft Graph API
MICROSOFT_CLIENT_ID=your_client_id
MICROSOFT_CLIENT_SECRET=your_client_secret
MICROSOFT_TENANT_ID=your_tenant_id

# Salesforce API
SALESFORCE_CLIENT_ID=your_client_id
SALESFORCE_CLIENT_SECRET=your_client_secret
SALESFORCE_USERNAME=your_username
SALESFORCE_PASSWORD=your_password
SALESFORCE_SECURITY_TOKEN=your_token

# OpenWeatherMap API
OPENWEATHERMAP_API_KEY=your_api_key
WEATHER_LOCATION=New York,US

# Dashboard Configuration
DASHBOARD_USER_EMAIL=your_email@company.com

# Webhook Security
WEBHOOK_SECRET=your_secure_random_string
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Setup Guide

### Microsoft Graph API (Outlook Calendar)

1. Go to [Azure Portal](https://portal.azure.com)
2. Register a new application in Azure AD
3. Add API permissions:
   - `Calendars.Read`
   - `User.Read`
4. Create a client secret
5. Copy the Application (client) ID, Directory (tenant) ID, and client secret

### Salesforce API

1. Log in to Salesforce
2. Go to Setup > Apps > App Manager
3. Create a new Connected App
4. Enable OAuth settings
5. Select required OAuth scopes:
   - `api` (Access and manage your data)
   - `refresh_token` (Perform requests on your behalf at any time)
6. Copy Consumer Key, Consumer Secret
7. Get your security token from email or reset it in personal settings

### OpenWeatherMap API

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key from the dashboard
3. Free tier includes 60 calls/minute

### News API (Optional)

1. Sign up at [NewsAPI.org](https://newsapi.org/)
2. Get your API key
3. Free tier: 100 requests/day
4. If not provided, dashboard will use mock data

## Docker Deployment

### Build and Run with Docker Compose

```bash
# Build the image
docker-compose build

# Start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Build Docker Image

```bash
docker build -t sales-executive-dashboard .
docker run -p 3000:3000 --env-file .env sales-executive-dashboard
```

## Production Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

- **AWS**: Use ECS or Elastic Beanstalk with Docker
- **Azure**: Deploy to Azure App Service
- **Google Cloud**: Use Cloud Run with Docker image
- **Self-hosted**: Use Docker Compose on your server

## Writer Playbook Integration

### Creating the Playbook

1. Log in to Writer
2. Navigate to Playbooks
3. Use the template from `docs/WRITER_PLAYBOOK.md`
4. Configure variables:
   - `Dashboard_Location`: Your city
   - `User_Email`: Your email address

### Setting Up Daily Routine

1. Create a new Routine in Writer
2. Set schedule: Daily at 7:00 AM
3. Link to your dashboard playbook
4. Add webhook URL: `https://your-dashboard-url.com/api/webhook`
5. Set webhook secret in headers

### Testing the Integration

```bash
# Test webhook manually
curl -X POST https://your-dashboard-url.com/api/webhook \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your-secret" \
  -d '{"source":"test","action":"refresh"}'
```

See `docs/WRITER_PLAYBOOK.md` for complete integration guide.

## Project Structure

```
sales-executive-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── weather/       # Weather endpoint
│   │   │   ├── calendar/      # Calendar endpoint
│   │   │   ├── opportunities/ # Salesforce endpoint
│   │   │   ├── news/          # News endpoint
│   │   │   └── webhook/       # Webhook handler
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Dashboard page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── Header.tsx
│   │   ├── DateWeatherWidget.tsx
│   │   ├── ProspectingSection.tsx
│   │   ├── CalendarWidget.tsx
│   │   ├── OpportunitiesWidget.tsx
│   │   └── LoadingSpinner.tsx
│   ├── lib/                   # Utility libraries
│   │   ├── microsoft-graph.ts # MS Graph client
│   │   ├── salesforce.ts      # Salesforce client
│   │   └── weather.ts         # Weather client
│   └── types/                 # TypeScript types
│       └── index.ts
├── docs/                      # Documentation
│   ├── WRITER_PLAYBOOK.md    # Playbook integration
│   ├── API_DOCUMENTATION.md  # API reference
│   └── DEPLOYMENT.md         # Deployment guide
├── public/                    # Static assets
├── .env.example              # Environment template
├── docker-compose.yml        # Docker Compose config
├── Dockerfile                # Docker configuration
├── next.config.js            # Next.js config
├── tailwind.config.js        # Tailwind config
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checks

# Docker
docker-compose up    # Start with Docker
docker-compose down  # Stop Docker containers
```

## API Endpoints

- `GET /api/weather` - Current weather data
- `GET /api/calendar` - Today's calendar events
- `GET /api/opportunities` - Salesforce opportunities
- `GET /api/news` - Industry news and triggers
- `POST /api/webhook` - Refresh webhook handler

See `docs/API_DOCUMENTATION.md` for complete API reference.

## Customization

### Colors & Theme

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    DEFAULT: '#1e3a5f',  // Change primary color
    dark: '#0f1c2e',
    light: '#2d5a8f',
  },
  // ... more colors
}
```

### Refresh Intervals

Edit `src/app/page.tsx` to adjust data refresh rates:

```typescript
const { data: weatherData } = useSWR(
  '/api/weather',
  fetcher,
  { refreshInterval: 300000 } // 5 minutes
);
```

### Dashboard Widgets

Add new widgets by:
1. Creating component in `src/components/`
2. Adding API route in `src/app/api/`
3. Importing component in `src/app/page.tsx`

## Troubleshooting

### Calendar Events Not Loading

```bash
# Check Microsoft Graph permissions
# Verify email in .env matches your M365 account
# Ensure app has Calendar.Read permission
```

### Salesforce Connection Failed

```bash
# Verify credentials are correct
# Check security token (reset if needed)
# Ensure IP is whitelisted in Salesforce
```

### Weather Data Unavailable

```bash
# Verify API key is valid
# Check location format (City,CountryCode)
# Ensure you haven't exceeded rate limits
```

### Docker Build Issues

```bash
# Clear Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache
```

## Performance Optimization

- Server-side caching for API responses
- Lazy loading of components
- Image optimization with Next.js Image
- Code splitting with dynamic imports
- SWR for efficient client-side data fetching

## Security Best Practices

- All API keys stored in environment variables
- Webhook authentication with secret headers
- HTTPS required in production
- CORS properly configured
- Rate limiting on sensitive endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check `docs/` folder for detailed guides
- Review API documentation
- Contact your IT administrator for API access

## Acknowledgments

- Built with Next.js, React, and Tailwind CSS
- Integrates with Microsoft Graph API
- Powered by Writer Playbook automation
- Designed for ReSource Pro sales team

---

**Built for ReSource Pro Sales Excellence** 🚀