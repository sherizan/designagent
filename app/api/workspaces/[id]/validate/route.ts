import { NextRequest, NextResponse } from 'next/server';
import { validateWorkspace, workspaceExists } from '@/lib/workspace-manager';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!(await workspaceExists(id))) {
      return NextResponse.json(
        { error: 'Workspace not found' },
        { status: 404 }
      );
    }

    const errors = await validateWorkspace(id);
    return NextResponse.json({ errors });
  } catch (error) {
    console.error('Failed to validate workspace:', error);
    return NextResponse.json(
      { error: 'Failed to validate workspace' },
      { status: 500 }
    );
  }
}
