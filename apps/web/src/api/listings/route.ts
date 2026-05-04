import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://api:3001';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const url = queryString ? `${API_BASE_URL}/listings?${queryString}` : `${API_BASE_URL}/listings`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'API Error' }));
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Listings API error:', error);
    return NextResponse.json(
      { message: 'İlanlar yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
