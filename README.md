# ReSource Pro Sales Executive Dashboard (Streamlined)

A focused sales executive dashboard with **real integrations** for Writer Playbook prospecting and Microsoft Outlook Calendar, plus placeholder UI for future features.

## What's REAL vs Placeholder

### ✅ REAL & WORKING
1. **Writer Playbook Integration** - Prospecting section pulls live data from Writer
2. **Microsoft Outlook Calendar** - Today's schedule from your Microsoft 365 calendar
3. **Email Composer** - Generates outreach emails (no em-dashes) from prospects
4. **Live Date/Time** - Real-time clock display

### 📦 PLACEHOLDER (UI Only)
1. **Weather Widget** - Shows static placeholder data
2. **Salesforce Opportunities** - Shows example opportunity cards
3. **Pipeline Metrics** - Static numbers for visual reference

## Quick Start

### Prerequisites
- Node.js 18+
- Microsoft 365 account with calendar access
- Writer account with API access
- Azure AD app registration (for Outlook)

### 1. Install & Configure

```bash
# Extract and install
unzip sales-executive-dashboard-lite.zip
cd sales-executive-dashboard-lite
npm install

# Configure environment
cp .env.example .env
nano .env
```

### 2. Required Configuration

Edit `.env` with these values:

```env
# Microsoft Outlook Calendar (REQUIRED)
MICROSOFT_CLIENT_ID=your_azure_app_id
MICROSOFT_CLIENT_SECRET=your_azure_secret
MICROSOFT_TENANT_ID=your_azure_tenant_id
DASHBOARD_USER_EMAIL=zachary_collins@resourcepro.com

# Writer API (REQUIRED)
WRITER_API_KEY=your_writer_api_key
WRITER_ORG_ID=your_writer_org_id
```

### 3. Run the Dashboard

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Getting API Credentials

### Microsoft Graph API (Outlook Calendar)

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to Azure Active Directory > App registrations
3. Click "New registration"
4. Add API permissions:
   - `Calendars.Read`
   - `User.Read`
5. Under "Certificates & secrets", create a new client secret
6. Copy:
   - Application (client) ID → `MICROSOFT_CLIENT_ID`
   - Directory (tenant) ID → `MICROSOFT_TENANT_ID`
   - Client secret value → `MICROSOFT_CLIENT_SECRET`

### Writer API

1. Log in to your Writer account
2. Go to Settings > API
3. Generate an API key
4. Copy:
   - API Key → `WRITER_API_KEY`
   - Organization ID → `WRITER_ORG_ID`

## Writer Playbook Integration

### Prospecting Playbook Setup

Your Writer Playbook should send prospecting data to the dashboard API:

**Endpoint**: `POST https://your-dashboard-url.com/api/prospecting`

**Headers**:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_WRITER_API_KEY"
}
```

**Request Body**:
```json
[
  {
    "id": "unique-id",
    "company": "Company Name",
    "trigger": "News headline or trigger event",
    "description": "Detailed description of the trigger",
    "source": "Source publication",
    "publishedAt": "2026-04-06T10:00:00Z",
    "relevantTo": "Category or service line"
  }
]
```

### Example Playbook Template

```markdown
### 1. Prospecting Research

- Search for recent insurance industry news about [w-var](Target_Companies)
- Identify companies with operational changes, expansions, or modernization initiatives
- Filter for mid-market P&C carriers (exclude Tier 1 except Progressive)

### 2. Data Processing

- Extract company name, trigger event, and description
- Format as JSON array
- Add source and timestamp

### 3. Dashboard Update

- Send formatted prospecting data to dashboard API
- POST to https://your-dashboard-url.com/api/prospecting
- Include Writer API key in Authorization header

### Completion

- Prospecting dashboard updated with latest intelligence
- Email templates ready for outreach
```

## Features

### Prospecting Intelligence (REAL)
- Live data from Writer Playbook
- Company triggers and news
- AI-powered email composer
- **No em-dashes in generated emails**
- Copy-to-clipboard functionality

### Outlook Calendar (REAL)
- Today's schedule
- Meeting details and durations
- Online meeting links (Teams, etc.)
- Attendee counts
- Auto-refresh every minute

### Email Generation
Click any prospect to generate a personalized outreach email. The system:
- Uses the company name and trigger
- Creates professional, context-aware content
- **Never uses em-dashes** (uses hyphens or commas instead)
- Includes your signature
- Allows editing before sending

### Placeholder Sections
The following sections show UI mockups but don't connect to real APIs:
- Weather widget (static data)
- Salesforce opportunities (example cards)
- Pipeline metrics (placeholder numbers)

## Project Structure

```
sales-executive-dashboard-lite/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── calendar/       ✅ REAL - Outlook integration
│   │   │   └── prospecting/    ✅ REAL - Writer Playbook
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── DateWeatherWidget.tsx     📦 PLACEHOLDER
│   │   ├── ProspectingSection.tsx    ✅ REAL
│   │   ├── CalendarWidget.tsx        ✅ REAL
│   │   ├── OpportunitiesWidget.tsx   📦 PLACEHOLDER
│   │   └── LoadingSpinner.tsx
│   └── lib/
│       └── microsoft-graph.ts        ✅ REAL
├── .env.example
├── package.json
└── README.md
```

## API Endpoints

### GET /api/calendar
Returns today's calendar events from Outlook

**Response:**
```json
[
  {
    "id": "event-id",
    "subject": "Meeting title",
    "start": { "dateTime": "2026-04-06T09:00:00", "timeZone": "EST" },
    "end": { "dateTime": "2026-04-06T10:00:00", "timeZone": "EST" },
    "location": { "displayName": "Conference Room A" },
    "isOnlineMeeting": true,
    "onlineMeetingUrl": "https://teams.microsoft.com/..."
  }
]
```

### GET /api/prospecting
Returns current prospecting data from Writer Playbook

**Response:**
```json
[
  {
    "id": "1",
    "company": "Progressive Insurance",
    "trigger": "Digital Transformation Initiative",
    "description": "Details about the initiative...",
    "source": "Insurance Business",
    "publishedAt": "2026-04-06T08:00:00Z",
    "relevantTo": "Claims Processing"
  }
]
```

### POST /api/prospecting
Writer Playbook posts new prospecting data here

**Headers:** `Authorization: Bearer YOUR_WRITER_API_KEY`

**Body:** Array of prospect objects (see GET response format)

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Adding Real Integrations Later

When you're ready to connect Salesforce and weather APIs:

1. **Weather**: 
   - Get OpenWeatherMap API key
   - Create `/api/weather` route
   - Update `DateWeatherWidget.tsx` to fetch real data

2. **Salesforce**:
   - Add Salesforce credentials to `.env`
   - Create `/api/opportunities` route
   - Update `OpportunitiesWidget.tsx` to fetch real data

The placeholder components are already structured to accept real data with minimal changes.

## Troubleshooting

### Calendar not loading
- Verify your email matches your Microsoft 365 account
- Check Azure AD app permissions are granted
- Ensure client secret hasn't expired

### Prospecting section empty
- Verify Writer API key is correct
- Check Writer Playbook is sending data to correct endpoint
- Review console logs for API errors

### Can't copy email to clipboard
- Ensure you're using HTTPS (required for clipboard API)
- Check browser permissions for clipboard access

## Support

For issues:
1. Check console logs in browser DevTools
2. Verify all required environment variables are set
3. Test API endpoints directly with curl/Postman
4. Review Azure AD and Writer API configurations

## Deployment

Ready to deploy to:
- **Vercel** (recommended for Next.js)
- **Azure App Service**
- **Docker** (Dockerfile included in full version)

When deploying, ensure:
- All environment variables are set
- Domain is HTTPS (required for clipboard)
- CORS is configured for Writer Playbook
- Azure AD redirect URIs are updated

---

**Built for ReSource Pro Sales Team** 🚀

**Status**: Production-ready for Prospecting + Calendar
**Future**: Salesforce & Weather APIs when available