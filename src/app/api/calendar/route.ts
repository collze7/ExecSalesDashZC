import { NextResponse } from 'next/server';
import { getTodayCalendarEvents } from '@/lib/microsoft-graph';

export async function GET() {
  try {
    const userEmail = process.env.DASHBOARD_USER_EMAIL || '';
    
    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email not configured' },
        { status: 400 }
      );
    }

    const events = await getTodayCalendarEvents(userEmail);
    return NextResponse.json(events);
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
}