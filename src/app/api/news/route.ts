import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const newsApiKey = process.env.NEWS_API_KEY;
    
    if (!newsApiKey) {
      // Return mock data if no API key configured
      return NextResponse.json([
        {
          id: '1',
          title: 'Progressive Insurance Expands Digital Transformation Initiative',
          description: 'Progressive announces major investment in AI and automation to streamline claims processing and improve customer experience.',
          url: 'https://example.com/news/1',
          source: 'Insurance Business',
          publishedAt: new Date().toISOString(),
          relevantTo: 'Progressive Insurance',
        },
        {
          id: '2',
          title: 'Mid-Market Carriers Face Pressure to Modernize Operations',
          description: 'Industry report reveals that mid-market P&C carriers are increasing spending on process automation and outsourcing to remain competitive.',
          url: 'https://example.com/news/2',
          source: 'Insurance Journal',
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          relevantTo: 'Mid-Market Carriers',
        },
        {
          id: '3',
          title: 'Regulatory Changes Impact Premium Audit Requirements',
          description: 'New state regulations require enhanced audit trails and compliance documentation for premium calculations.',
          url: 'https://example.com/news/3',
          source: 'Compliance Today',
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          relevantTo: 'Premium Audit Compliance',
        },
        {
          id: '4',
          title: 'Insurance BPO Market Expected to Grow 12% Annually',
          description: 'Market analysis shows increasing demand for business process outsourcing in the insurance sector, driven by cost pressures and talent shortages.',
          url: 'https://example.com/news/4',
          source: 'Market Insights',
          publishedAt: new Date(Date.now() - 259200000).toISOString(),
          relevantTo: 'Insurance BPO',
        },
      ]);
    }

    // If API key is configured, fetch real news
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'insurance OR "property and casualty" OR "commercial insurance"',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
        apiKey: newsApiKey,
      },
    });

    const newsItems = response.data.articles.map((article: any, index: number) => ({
      id: `news-${index}`,
      title: article.title,
      description: article.description || article.content?.substring(0, 200) || '',
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
      relevantTo: 'Insurance Industry',
    }));

    return NextResponse.json(newsItems);
  } catch (error) {
    console.error('News API error:', error);
    
    // Return mock data on error
    return NextResponse.json([
      {
        id: '1',
        title: 'Progressive Insurance Expands Digital Transformation Initiative',
        description: 'Progressive announces major investment in AI and automation to streamline claims processing and improve customer experience.',
        url: 'https://example.com/news/1',
        source: 'Insurance Business',
        publishedAt: new Date().toISOString(),
        relevantTo: 'Progressive Insurance',
      },
      {
        id: '2',
        title: 'Mid-Market Carriers Face Pressure to Modernize Operations',
        description: 'Industry report reveals that mid-market P&C carriers are increasing spending on process automation and outsourcing to remain competitive.',
        url: 'https://example.com/news/2',
        source: 'Insurance Journal',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        relevantTo: 'Mid-Market Carriers',
      },
    ]);
  }
}