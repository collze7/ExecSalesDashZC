import { NextResponse } from 'next/server';

// REAL API - Integrates with Writer Playbook for prospecting data
// This endpoint expects Writer Playbook to send prospecting intelligence data
export async function GET() {
  try {
    // In production, this would fetch from a database where Writer Playbook
    // stores the latest prospecting data via webhook
    
    // For now, return structure that Writer Playbook will populate
    // Writer Playbook should POST to /api/prospecting/webhook to update this data
    
    // Placeholder: In production, fetch from your data store
    const prospectingData = [
      {
        id: '1',
        company: 'Progressive Insurance',
        trigger: 'Digital Transformation Initiative Announced',
        description: 'Progressive announces major investment in AI and automation to streamline claims processing and improve customer experience.',
        source: 'Insurance Business Magazine',
        publishedAt: new Date().toISOString(),
        relevantTo: 'Claims Processing & Automation'
      },
      {
        id: '2',
        company: 'Travelers Insurance',
        trigger: 'Expanding Mid-Market Portfolio',
        description: 'Travelers announces expansion into mid-market commercial lines with focus on operational efficiency.',
        source: 'Insurance Journal',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        relevantTo: 'Commercial Insurance Operations'
      }
    ];

    return NextResponse.json(prospectingData);
  } catch (error) {
    console.error('Prospecting API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prospecting data' },
      { status: 500 }
    );
  }
}

// Writer Playbook will POST prospecting data here
export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Verify Writer API key
    const authHeader = request.headers.get('authorization');
    const expectedKey = `Bearer ${process.env.WRITER_API_KEY}`;
    
    if (authHeader !== expectedKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // In production, store this data in your database
    // For now, just acknowledge receipt
    console.log('Received prospecting data from Writer Playbook:', data);

    // TODO: Store data in database for GET endpoint to retrieve
    
    return NextResponse.json({
      success: true,
      message: 'Prospecting data received',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Prospecting webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process prospecting data' },
      { status: 500 }
    );
  }
}