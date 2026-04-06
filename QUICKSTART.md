# Quick Start Guide

Get your Sales Executive Dashboard running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- API credentials ready (see below)

## Step 1: Extract and Install

```bash
# Extract the zip file
unzip sales-executive-dashboard.zip
cd sales-executive-dashboard

# Install dependencies
npm install
```

## Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit with your credentials
nano .env
```

### Minimum Required Configuration

```env
# Microsoft Graph (for Calendar)
MICROSOFT_CLIENT_ID=your_client_id
MICROSOFT_CLIENT_SECRET=your_secret
MICROSOFT_TENANT_ID=your_tenant_id
DASHBOARD_USER_EMAIL=zachary_collins@resourcepro.com

# Salesforce
SALESFORCE_USERNAME=your_username
SALESFORCE_PASSWORD=your_password
SALESFORCE_SECURITY_TOKEN=your_token

# Weather (free tier)
OPENWEATHERMAP_API_KEY=your_key
WEATHER_LOCATION=New York,US

# Security
WEBHOOK_SECRET=your_random_secret_string
```

## Step 3: Run the Dashboard

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Step 4: Set Up Writer Playbook (Optional)

1. Create a Writer Playbook using the template in `docs/WRITER_PLAYBOOK.md`
2. Set up a daily routine (e.g., 7:00 AM)
3. Configure the webhook endpoint: `https://your-domain.com/api/webhook`

## Getting API Credentials

### Microsoft Graph API
1. Go to [portal.azure.com](https://portal.azure.com)
2. Azure Active Directory > App registrations > New registration
3. Add API permissions: `Calendars.Read`, `User.Read`
4. Create client secret under Certificates & secrets
5. Copy: Application ID, Directory ID, and Secret value

### Salesforce
1. Setup > Apps > App Manager > New Connected App
2. Enable OAuth, add scopes: `api`, `refresh_token`
3. Get Consumer Key and Secret
4. Reset security token: Personal Settings > Reset Security Token

### OpenWeatherMap (Free)
1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Get API key from dashboard
3. Free tier: 60 calls/minute

## Troubleshooting

### "Cannot connect to Calendar"
- Verify your email matches your Microsoft 365 account
- Check if permissions are granted in Azure AD

### "Salesforce login failed"
- Ensure security token is current (check email)
- Verify username and password are correct
- Add IP to Salesforce whitelist if needed

### "Port 3000 already in use"
```bash
# Use different port
PORT=3001 npm run dev
```

## Next Steps

- Read full documentation in `README.md`
- Review Writer Playbook integration: `docs/WRITER_PLAYBOOK.md`
- Check API documentation: `docs/API_DOCUMENTATION.md`
- Deploy to production: `docs/DEPLOYMENT.md`

## Support

For detailed setup and configuration, see the complete `README.md` file.

---

**Built for ReSource Pro Sales Excellence** 🚀