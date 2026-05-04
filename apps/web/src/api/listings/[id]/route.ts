import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://api:3001';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/listings/${params.id}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'İlan bulunamadı' }));
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Listing API error:', error);
    return NextResponse.json(
      { message: 'İlan yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
