import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Verify webhook secret
    const headersList = headers();
    const webhookSecret = headersList.get('x-webhook-secret');
    
    if (webhookSecret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Log the webhook trigger
    console.log('Dashboard refresh triggered by Writer Playbook:', {
      timestamp: new Date().toISOString(),
      source: body.source || 'writer-playbook',
      action: body.action || 'refresh',
    });

    // In a production environment, you might want to:
    // 1. Trigger a revalidation of cached data
    // 2. Send a push notification
    // 3. Store the refresh event in a database
    // 4. Trigger background jobs to fetch fresh data
    
    return NextResponse.json({
      success: true,
      message: 'Dashboard refresh initiated',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'Writer Playbook Dashboard Webhook',
    status: 'active',
    endpoints: {
      refresh: '/api/webhook',
    },
  });
}