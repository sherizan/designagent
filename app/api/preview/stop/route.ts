import { NextResponse } from 'next/server';
import { stopPreview } from '@/lib/preview-manager';

export async function POST() {
  try {
    await stopPreview();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Failed to stop preview:', error);
    return NextResponse.json(
      { error: 'Failed to stop preview' },
      { status: 500 }
    );
  }
}
