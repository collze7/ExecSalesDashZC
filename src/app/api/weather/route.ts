import { NextResponse } from 'next/server';
import { getCurrentWeather } from '@/lib/weather';

export async function GET() {
  try {
    const weatherData = await getCurrentWeather();
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}