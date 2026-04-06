import { ConfidentialClientApplication } from '@azure/msal-node';
import { Client } from '@microsoft/microsoft-graph-client';

const msalConfig = {
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID || '',
    authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

export async function getAccessToken(): Promise<string> {
  try {
    const tokenResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    return tokenResponse?.accessToken || '';
  } catch (error) {
    console.error('Error acquiring token:', error);
    throw new Error('Failed to acquire access token');
  }
}

export async function getGraphClient(): Promise<Client> {
  const accessToken = await getAccessToken();
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
}

export async function getTodayCalendarEvents(userEmail: string) {
  try {
    const client = await getGraphClient();
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

    const events = await client
      .api(`/users/${userEmail}/calendarView`)
      .query({
        startDateTime: startOfDay,
        endDateTime: endOfDay,
        $select: 'subject,start,end,location,attendees,isOnlineMeeting,onlineMeetingUrl',
        $orderby: 'start/dateTime',
      })
      .get();

    return events.value;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw error;
  }
}

export async function getUpcomingEvents(userEmail: string, hours: number = 24) {
  try {
    const client = await getGraphClient();
    const now = new Date();
    const future = new Date(now.getTime() + hours * 60 * 60 * 1000);

    const events = await client
      .api(`/users/${userEmail}/calendarView`)
      .query({
        startDateTime: now.toISOString(),
        endDateTime: future.toISOString(),
        $select: 'subject,start,end,location,attendees,importance,showAs',
        $orderby: 'start/dateTime',
        $top: 10,
      })
      .get();

    return events.value;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
}