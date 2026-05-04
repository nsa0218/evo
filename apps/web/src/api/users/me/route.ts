import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://api:3001';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json(
        { message: 'Yetkilendirme gerekli' },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        'Authorization': authHeader,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Kullanıcı bilgileri alınamadı' }));
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('User API error:', error);
    return NextResponse.json(
      { message: 'Kullanıcı bilgileri alınırken hata oluştu' },
      { status: 500 }
    );
  }
}
