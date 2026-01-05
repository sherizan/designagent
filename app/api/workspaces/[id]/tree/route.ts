import { NextRequest, NextResponse } from 'next/server';
import { getWorkspaceTree, workspaceExists } from '@/lib/workspace-manager';

export async function GET(
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

    const tree = await getWorkspaceTree(id);
    return NextResponse.json({ tree });
  } catch (error) {
    console.error('Failed to get workspace tree:', error);
    return NextResponse.json(
      { error: 'Failed to get workspace tree' },
      { status: 500 }
    );
  }
}
