'use client';

import { ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PreviewPaneProps {
  url: string | null;
  loading: boolean;
  onRefresh?: () => void;
}

export function PreviewPane({ url, loading, onRefresh }: PreviewPaneProps) {
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-3 text-zinc-500">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm">Starting preview...</span>
        </div>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-50">
        <div className="text-sm text-zinc-500">
          Preview not available
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 bg-zinc-50">
        <span className="text-xs text-zinc-500 truncate max-w-[200px]">
          {url}
        </span>
        <div className="flex items-center gap-1">
          {onRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              className="h-7 px-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="h-7 px-2"
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-white">
        <iframe
          src={url}
          className="w-full h-full border-0"
          title="Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
