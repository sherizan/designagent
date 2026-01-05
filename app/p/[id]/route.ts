import { NextRequest, NextResponse } from 'next/server';
import { loadPreset } from '@/lib/preset-store';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /p/[id]
 * Returns a stored preset JSON by id
 */
export async function GET(
  _request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const preset = await loadPreset(id);
    
    if (!preset) {
      return NextResponse.json(
        { error: 'Preset not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(preset);
  } catch (error) {
    console.error('Error loading preset:', error);
    return NextResponse.json(
      { error: 'Failed to load preset' },
      { status: 500 }
    );
  }
}
