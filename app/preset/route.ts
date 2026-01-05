import { NextRequest, NextResponse } from 'next/server';
import { generatePreset, parsePresetParams, type PresetParams, DEFAULT_PARAMS } from '@/lib/preset-generator';
import { storePreset } from '@/lib/preset-store';

/**
 * GET /preset
 * Returns a preset JSON based on query parameters
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params = parsePresetParams(searchParams);
    const preset = generatePreset(params);
    
    return NextResponse.json(preset);
  } catch (error) {
    console.error('Error generating preset:', error);
    return NextResponse.json(
      { error: 'Failed to generate preset' },
      { status: 500 }
    );
  }
}

/**
 * POST /preset
 * Accepts preset params in body, generates preset, stores it, returns { id, url }
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json() as Partial<PresetParams>;
    
    // Merge with defaults
    const params: PresetParams = {
      platform: body.platform || DEFAULT_PARAMS.platform,
      mode: body.mode || DEFAULT_PARAMS.mode,
      baseColor: body.baseColor || DEFAULT_PARAMS.baseColor,
      brand: body.brand || DEFAULT_PARAMS.brand,
      radius: body.radius || DEFAULT_PARAMS.radius,
      font: body.font || DEFAULT_PARAMS.font,
      density: body.density || DEFAULT_PARAMS.density,
      style: body.style || DEFAULT_PARAMS.style,
    };
    
    // Generate preset
    const preset = generatePreset(params);
    
    // Store preset and get id
    const { id, url } = await storePreset(preset);
    
    return NextResponse.json({ id, url });
  } catch (error) {
    console.error('Error storing preset:', error);
    return NextResponse.json(
      { error: 'Failed to store preset' },
      { status: 500 }
    );
  }
}
