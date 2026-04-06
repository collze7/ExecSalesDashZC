# Quick Setup Guide - Streamlined Dashboard

## What You Need

### ✅ Required (Working Features)
1. **Microsoft 365 account** (for Outlook Calendar)
2. **Azure AD App Registration** (free)
3. **Writer account** with API access

### 📦 Not Needed Yet (Placeholders)
- Salesforce API (placeholder only)
- Weather API (placeholder only)

## Step-by-Step Setup

### Step 1: Azure AD Setup (15 minutes)

1. **Go to Azure Portal**
   - Visit [portal.azure.com](https://portal.azure.com)
   - Sign in with your Microsoft 365 account

2. **Register App**
   - Azure Active Directory → App registrations → New registration
   - Name: "Sales Dashboard"
   - Supported account types: "Single tenant"
   - Click Register

3. **Add API Permissions**
   - Go to "API permissions"
   - Click "Add a permission"
   - Choose "Microsoft Graph"
   - Select "Application permissions"
   - Add these permissions:
     * `Calendars.Read`
     * `User.Read.All`
   - Click "Grant admin consent" (requires admin)

4. **Create Client Secret**
   - Go to "Certificates & secrets"
   - Click "New client secret"
   - Description: "Dashboard API"
   - Expires: 24 months
   - Click Add
   - **COPY THE SECRET VALUE NOW** (you can't see it again!)

5. **Copy IDs**
   - Go to Overview page
   - Copy these values:
     * Application (client) ID
     * Directory (tenant) ID

### Step 2: Writer API Setup (5 minutes)

1. **Get Writer API Key**
   - Log in to [Writer](https://app.writer.com)
   - Go to Settings → API
   - Click "Generate API Key"
   - Copy the key and Organization ID

### Step 3: Install Dashboard (5 minutes)

```bash
# Extract zip file
unzip sales-executive-dashboard-lite.zip
cd sales-executive-dashboard-lite

# Install dependencies
npm install

# This will take 2-3 minutes
```

### Step 4: Configure Environment (5 minutes)

```bash
# Copy template
cp .env.example .env

# Edit file
nano .env
# or use your preferred editor
```

Add your values:

```env
# From Azure AD (Step 1)
MICROSOFT_CLIENT_ID=paste-application-id-here
MICROSOFT_CLIENT_SECRET=paste-secret-value-here
MICROSOFT_TENANT_ID=paste-tenant-id-here
DASHBOARD_USER_EMAIL=zachary_collins@resourcepro.com

# From Writer (Step 2)
WRITER_API_KEY=paste-writer-api-key-here
WRITER_ORG_ID=paste-org-id-here

# Keep these as-is for now
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Step 5: Start Dashboard

```bash
# Start development server
npm run dev

# You should see:
# ▲ Next.js 14.x.x
# - Local: http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Verify It's Working

### ✅ Calendar Section
- Should show your Outlook events for today
- If empty and you have no events today, that's correct!
- If showing error, check:
  * Email address matches your Microsoft 365 account
  * Azure AD app permissions were granted
  * Client secret is correct and not expired

### ✅ Prospecting Section
- Will show placeholder data initially
- Once Writer Playbook is configured, will show real data
- Should be able to click prospects and generate emails
- Emails should NOT contain em-dashes

### 📦 Weather & Opportunities
- These show placeholder data
- This is expected and correct!
- UI is there for visual reference

## Setting Up Writer Playbook

### Create Prospecting Playbook

1. **Go to Writer Playbooks**
   - Log in to Writer
   - Navigate to Playbooks section
   - Click "Create Playbook"

2. **Add Playbook Steps**

```markdown
### 1. Research Insurance News

- Search Google News for "insurance" AND ("modernization" OR "digital transformation" OR "expansion" OR "automation")
- Filter results from last 7 days
- Focus on mid-market P&C carriers

### 2. Extract Prospect Data

- For each relevant article, extract:
  * Company name
  * Trigger event (headline)
  * Description (2-3 sentences)
  * Source
  * Date
- Format as JSON array

### 3. Send to Dashboard

- POST data to https://your-dashboard-url.com/api/prospecting
- Include Authorization header with Writer API key
- Verify successful response
```

3. **Schedule Daily Run**
   - Set schedule: Every weekday at 7:00 AM
   - This updates your prospecting data fresh each morning

### Test Prospecting Integration

```bash
# Manually test the endpoint
curl -X POST http://localhost:3000/api/prospecting \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_WRITER_API_KEY" \
  -d '[{
    "id": "test-1",
    "company": "Test Insurance Co",
    "trigger": "Announces Digital Initiative",
    "description": "Test company investing in automation",
    "source": "Test Source",
    "publishedAt": "2026-04-06T10:00:00Z",
    "relevantTo": "Process Automation"
  }]'
```

If successful, refresh your dashboard and you should see this test data!

## Common Issues & Solutions

### "Cannot read property of undefined" Error

**Problem**: Missing environment variables

**Solution**: 
```bash
# Check .env file exists
ls -la .env

# Verify it has all required values
cat .env | grep MICROSOFT_CLIENT_ID
```

### Calendar Shows "Unable to load"

**Problem**: Azure AD permissions not granted

**Solution**:
1. Go back to Azure Portal
2. Find your app registration
3. Go to API permissions
4. Click "Grant admin consent for [your org]"
5. Wait 5 minutes, restart dashboard

### Calendar Shows Empty

**Problem**: Email address mismatch

**Solution**:
```env
# Ensure email exactly matches your Microsoft 365 email
DASHBOARD_USER_EMAIL=zachary_collins@resourcepro.com
# Not: zach@..., zachary.collins@..., etc.
```

### Writer Playbook Not Updating

**Problem**: Authorization or endpoint issue

**Solution**:
1. Verify Writer API key in .env
2. Check Playbook is using correct endpoint
3. Ensure Authorization header format: `Bearer YOUR_KEY`
4. Check dashboard logs: `npm run dev` terminal

### Port 3000 Already in Use

**Solution**:
```bash
# Use different port
PORT=3001 npm run dev
```

## Production Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-org/dashboard.git
git push -u origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Add Environment Variables**
   - In Vercel project settings
   - Add all variables from your .env file
   - Deploy!

4. **Update Writer Playbook**
   - Change endpoint from localhost to your Vercel URL
   - Example: `https://your-dashboard.vercel.app/api/prospecting`

### Update Azure AD Redirect URIs

When deployed, update Azure AD app:
1. Go to app registration
2. Add redirect URI: `https://your-domain.com/api/auth/callback`

## Next Steps

Once running:

1. **Use Your Dashboard Daily**
   - Check calendar each morning
   - Review prospecting intelligence
   - Generate outreach emails
   - Copy to Outlook for sending

2. **Set Up Writer Playbook Routine**
   - Schedule for 7 AM weekdays
   - Ensures fresh data every morning

3. **Later: Add Real Integrations**
   - When Salesforce is ready, add those credentials
   - When you want weather, add OpenWeatherMap key
   - Placeholder UI is ready for real data!

## Support Contacts

- **Azure AD issues**: Your IT admin
- **Writer Playbook**: Writer support
- **Dashboard code**: Check console logs in browser DevTools

---

**You're all set!** 🚀

Your dashboard should now show:
- ✅ Real Outlook calendar
- ✅ Writer Playbook prospecting (once configured)
- 📦 Placeholder weather & opportunities