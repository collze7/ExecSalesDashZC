# Writer Playbook Integration Guide

## Overview
This dashboard is designed to be updated automatically using Writer Playbook. The playbook can trigger daily updates or on-demand refreshes of the dashboard data.

## Playbook Template

### Daily Dashboard Refresh Playbook

```markdown
### 1. Data Collection & Refresh

- Fetch latest weather information for [w-var](Dashboard_Location)
- Retrieve today's calendar events from [w-connector](MICROSOFT_OUTLOOK) for [w-var](User_Email)
- Pull current Salesforce opportunities from [w-connector](SALESFORCE)
- Gather latest insurance industry news and triggers

### 2. Data Processing

- Process and format weather data for dashboard display
- Parse calendar events and identify key meetings
- Analyze Salesforce pipeline and identify top opportunities
- Filter news items for relevance to target accounts

### 3. Dashboard Update

- Send refresh trigger to dashboard webhook endpoint
- Verify successful data update
- Log refresh timestamp and status

### Completion

- Dashboard successfully refreshed with latest data
- All widgets updated with current information
- System ready for user access
```

## Webhook Integration

### Endpoint
```
POST https://your-dashboard-url.com/api/webhook
```

### Headers
```json
{
  "Content-Type": "application/json",
  "x-webhook-secret": "your-webhook-secret-here"
}
```

### Request Body
```json
{
  "source": "writer-playbook",
  "action": "refresh",
  "timestamp": "2026-04-06T10:00:00Z",
  "triggeredBy": "scheduled-routine"
}
```

### Response
```json
{
  "success": true,
  "message": "Dashboard refresh initiated",
  "timestamp": "2026-04-06T10:00:01Z"
}
```

## Setting Up Automated Refresh

### Step 1: Create the Playbook in Writer
1. Log in to your Writer account
2. Navigate to Playbooks
3. Create a new playbook using the template above
4. Configure the variables:
   - `Dashboard_Location`: Your city for weather data
   - `User_Email`: Your Microsoft 365 email address

### Step 2: Configure Connectors
1. Connect Microsoft Outlook integration
2. Connect Salesforce integration
3. Verify all permissions are granted

### Step 3: Set Up Routine
1. Create a new Routine in Writer
2. Set the schedule (e.g., Daily at 7:00 AM)
3. Link the routine to your dashboard refresh playbook
4. Add the webhook URL as a final action

### Step 4: Test the Integration
1. Run the playbook manually
2. Verify the dashboard updates
3. Check the webhook logs in your dashboard
4. Confirm all data sources are refreshing

## Manual Refresh Options

### Option 1: Refresh Button
Click the "Refresh Data" button in the dashboard header to manually reload all data.

### Option 2: Browser Reload
Simply refresh your browser to fetch the latest data from all sources.

### Option 3: API Call
Make a direct API call to the webhook endpoint with proper authentication.

## Monitoring & Troubleshooting

### Check Webhook Logs
```bash
# View recent webhook activity
curl https://your-dashboard-url.com/api/webhook \
  -H "x-webhook-secret: your-secret"
```

### Common Issues

1. **Calendar events not loading**
   - Verify Microsoft Graph API credentials
   - Check user email is correctly configured
   - Ensure calendar permissions are granted

2. **Salesforce data missing**
   - Verify Salesforce credentials
   - Check security token is current
   - Ensure Salesforce user has proper permissions

3. **Weather data unavailable**
   - Verify OpenWeatherMap API key
   - Check location setting is valid
   - Ensure API rate limits not exceeded

4. **Webhook not triggering**
   - Verify webhook secret matches
   - Check URL is accessible from Writer
   - Review webhook logs for errors

## API Endpoints Reference

### Weather Data
```
GET /api/weather
Response: { temp, description, icon, city, humidity, windSpeed }
```

### Calendar Events
```
GET /api/calendar
Response: [{ id, subject, start, end, location, attendees }]
```

### Salesforce Opportunities
```
GET /api/opportunities
Response: { recentUpdates, topDeals, totalPipeline, totalCount }
```

### News & Triggers
```
GET /api/news
Response: [{ id, title, description, url, source, publishedAt }]
```

### Webhook Handler
```
POST /api/webhook
Body: { source, action, timestamp }
Response: { success, message, timestamp }
```

## Best Practices

1. **Schedule During Off-Hours**: Set playbook routines for early morning (7 AM) to ensure fresh data when you start work
2. **Error Handling**: Configure playbook to retry failed API calls
3. **Monitoring**: Set up alerts for failed playbook runs
4. **Security**: Rotate webhook secrets regularly
5. **Testing**: Test playbook in a development environment first

## Security Considerations

- Store all API keys and secrets in environment variables
- Use HTTPS for all webhook communications
- Implement rate limiting on webhook endpoint
- Log all webhook activities for audit purposes
- Regularly rotate authentication credentials

## Support

For issues with:
- Dashboard functionality: Check application logs
- Writer Playbook: Contact Writer support
- API integrations: Verify credentials and permissions