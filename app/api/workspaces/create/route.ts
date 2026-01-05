import { NextResponse } from 'next/server';
import { createWorkspace } from '@/lib/workspace-manager';

export async function POST() {
  try {
    const result = await createWorkspace();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to create workspace:', error);
    return NextResponse.json(
      { error: 'Failed to create workspace' },
      { status: 500 }
    );
  }
}
