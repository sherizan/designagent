'use client';

import { ChevronRight, FileJson, FolderOpen, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

interface GroupedTree {
  system: FileNode | null;
  tokens: FileNode[];
  contracts: FileNode[];
}

interface FileExplorerProps {
  tree: GroupedTree | null;
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
}

function FileItem({
  node,
  selected,
  onSelect,
  icon,
}: {
  node: FileNode;
  selected: boolean;
  onSelect: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full flex items-center gap-2 px-2 py-1.5 text-left text-sm rounded-md transition-colors',
        selected
          ? 'bg-zinc-100 text-zinc-900'
          : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
      )}
    >
      {icon || <FileJson className="w-4 h-4 text-zinc-400" />}
      <span className="truncate">{node.name}</span>
    </button>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
        {icon}
        {title}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function FileExplorer({
  tree,
  selectedFile,
  onSelectFile,
}: FileExplorerProps) {
  if (!tree) {
    return (
      <div className="p-4 text-sm text-zinc-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-2">
      {/* System */}
      {tree.system && (
        <Section title="System" icon={<Settings className="w-3.5 h-3.5" />}>
          <FileItem
            node={tree.system}
            selected={selectedFile === tree.system.path}
            onSelect={() => onSelectFile(tree.system!.path)}
            icon={<Settings className="w-4 h-4 text-zinc-400" />}
          />
        </Section>
      )}

      {/* Tokens */}
      {tree.tokens.length > 0 && (
        <Section title="Tokens" icon={<FolderOpen className="w-3.5 h-3.5" />}>
          {tree.tokens.map((file) => (
            <FileItem
              key={file.path}
              node={file}
              selected={selectedFile === file.path}
              onSelect={() => onSelectFile(file.path)}
            />
          ))}
        </Section>
      )}

      {/* Contracts */}
      {tree.contracts.length > 0 && (
        <Section title="Contracts" icon={<FolderOpen className="w-3.5 h-3.5" />}>
          {tree.contracts.map((file) => (
            <FileItem
              key={file.path}
              node={file}
              selected={selectedFile === file.path}
              onSelect={() => onSelectFile(file.path)}
            />
          ))}
        </Section>
      )}

      {tree.tokens.length === 0 && tree.contracts.length === 0 && !tree.system && (
        <div className="p-4 text-sm text-zinc-500 text-center">
          No files found
        </div>
      )}
    </div>
  );
}
