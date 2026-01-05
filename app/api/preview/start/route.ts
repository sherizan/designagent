import { NextRequest, NextResponse } from 'next/server';
import { startPreview } from '@/lib/preview-manager';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workspaceId } = body;

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'Missing workspaceId' },
        { status: 400 }
      );
    }

    const result = await startPreview(workspaceId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to start preview:', error);
    return NextResponse.json(
      { error: 'Failed to start preview: ' + String(error) },
      { status: 500 }
    );
  }
}
