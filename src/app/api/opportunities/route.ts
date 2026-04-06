import { NextResponse } from 'next/server';
import { 
  getRecentlyUpdatedOpportunities, 
  getOpenOpportunities,
  getTotalPipelineValue 
} from '@/lib/salesforce';

export async function GET() {
  try {
    const [recentUpdates, topDeals, pipelineData] = await Promise.all([
      getRecentlyUpdatedOpportunities(7),
      getOpenOpportunities(),
      getTotalPipelineValue(),
    ]);

    // Sort top deals by amount and take top 6
    const sortedTopDeals = topDeals
      .sort((a: any, b: any) => (b.Amount || 0) - (a.Amount || 0))
      .slice(0, 6);

    return NextResponse.json({
      recentUpdates: recentUpdates.slice(0, 6),
      topDeals: sortedTopDeals,
      totalPipeline: pipelineData.totalValue || 0,
      totalCount: pipelineData.totalCount || 0,
    });
  } catch (error) {
    console.error('Opportunities API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}