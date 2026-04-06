# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints use server-side authentication via environment variables. The webhook endpoint requires a secret header.

## Endpoints

### 1. Weather Data

#### Get Current Weather
```http
GET /api/weather
```

**Response**
```json
{
  "temp": 72,
  "feels_like": 70,
  "temp_min": 68,
  "temp_max": 75,
  "humidity": 65,
  "description": "clear sky",
  "icon": "01d",
  "windSpeed": 8,
  "city": "New York"
}
```

**Status Codes**
- `200`: Success
- `500`: Server error

---

### 2. Calendar Events

#### Get Today's Calendar Events
```http
GET /api/calendar
```

**Response**
```json
[
  {
    "id": "AAMkAGI...",
    "subject": "Sales Team Standup",
    "start": {
      "dateTime": "2026-04-06T09:00:00",
      "timeZone": "Eastern Standard Time"
    },
    "end": {
      "dateTime": "2026-04-06T09:30:00",
      "timeZone": "Eastern Standard Time"
    },
    "location": {
      "displayName": "Conference Room A"
    },
    "attendees": [
      {
        "emailAddress": {
          "name": "John Doe",
          "address": "john@company.com"
        }
      }
    ],
    "isOnlineMeeting": true,
    "onlineMeetingUrl": "https://teams.microsoft.com/..."
  }
]
```

**Status Codes**
- `200`: Success
- `400`: User email not configured
- `500`: Server error

---

### 3. Salesforce Opportunities

#### Get Opportunities Dashboard Data
```http
GET /api/opportunities
```

**Response**
```json
{
  "recentUpdates": [
    {
      "Id": "006...",
      "Name": "Acme Corp - BPO Services",
      "Amount": 150000,
      "StageName": "Proposal/Price Quote",
      "CloseDate": "2026-05-15",
      "Probability": 60,
      "AccountName": "Acme Corporation",
      "OwnerName": "Zachary Collins"
    }
  ],
  "topDeals": [
    {
      "Id": "006...",
      "Name": "Enterprise Insurance - Premium Audit",
      "Amount": 500000,
      "StageName": "Negotiation/Review",
      "CloseDate": "2026-04-30",
      "Probability": 75,
      "AccountName": "Enterprise Insurance Co",
      "OwnerName": "Zachary Collins"
    }
  ],
  "totalPipeline": 2500000,
  "totalCount": 15
}
```

**Status Codes**
- `200`: Success
- `500`: Server error

---

### 4. News & Triggers

#### Get Latest Industry News
```http
GET /api/news
```

**Response**
```json
[
  {
    "id": "1",
    "title": "Progressive Insurance Expands Digital Transformation Initiative",
    "description": "Progressive announces major investment in AI and automation...",
    "url": "https://example.com/news/1",
    "source": "Insurance Business",
    "publishedAt": "2026-04-06T08:00:00Z",
    "relevantTo": "Progressive Insurance"
  }
]
```

**Status Codes**
- `200`: Success (returns mock data if News API key not configured)
- `500`: Server error

---

### 5. Webhook Handler

#### Trigger Dashboard Refresh
```http
POST /api/webhook
```

**Headers**
```json
{
  "Content-Type": "application/json",
  "x-webhook-secret": "your-webhook-secret-here"
}
```

**Request Body**
```json
{
  "source": "writer-playbook",
  "action": "refresh",
  "timestamp": "2026-04-06T10:00:00Z",
  "triggeredBy": "scheduled-routine"
}
```

**Response**
```json
{
  "success": true,
  "message": "Dashboard refresh initiated",
  "timestamp": "2026-04-06T10:00:01Z"
}
```

**Status Codes**
- `200`: Success
- `401`: Unauthorized (invalid webhook secret)
- `500`: Server error

#### Check Webhook Status
```http
GET /api/webhook
```

**Response**
```json
{
  "service": "Writer Playbook Dashboard Webhook",
  "status": "active",
  "endpoints": {
    "refresh": "/api/webhook"
  }
}
```

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common error scenarios:
- Missing environment variables
- API authentication failures
- Rate limit exceeded
- Network connectivity issues

## Rate Limits

- Weather API: 60 calls/minute (OpenWeatherMap free tier)
- Microsoft Graph: 10,000 requests per 10 minutes per app
- Salesforce API: Varies by Salesforce edition
- News API: 100 requests/day (free tier)

## Data Refresh Intervals

The frontend automatically refreshes data at these intervals:

- Weather: Every 5 minutes (300,000ms)
- Calendar: Every 1 minute (60,000ms)
- Opportunities: Every 5 minutes (300,000ms)
- News: Every 10 minutes (600,000ms)

## Development Testing

### Using cURL

**Test Weather Endpoint**
```bash
curl http://localhost:3000/api/weather
```

**Test Calendar Endpoint**
```bash
curl http://localhost:3000/api/calendar
```

**Test Webhook**
```bash
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -H "x-webhook-secret: your-secret" \
  -d '{"source":"test","action":"refresh"}'
```

### Using Postman

1. Import the API collection
2. Set environment variables for base URL
3. Configure authentication headers
4. Test each endpoint individually

## Writer Playbook Integration

The dashboard is designed to work seamlessly with Writer Playbook:

1. Create a playbook that calls these API endpoints
2. Set up a routine to run daily
3. Use the webhook endpoint to trigger refresh
4. Monitor logs for successful updates

See `docs/WRITER_PLAYBOOK.md` for detailed integration instructions.