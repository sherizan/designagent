import { NextResponse } from 'next/server';
import { getPreviewStatus } from '@/lib/preview-manager';

export async function GET() {
  try {
    const status = getPreviewStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error('Failed to get preview status:', error);
    return NextResponse.json(
      { error: 'Failed to get preview status' },
      { status: 500 }
    );
  }
}
