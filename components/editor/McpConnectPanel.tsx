'use client';

import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Copy, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface McpConnectPanelProps {
  workspacePath: string;
}

export function McpConnectPanel({ workspacePath }: McpConnectPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const mcpConfig = {
    mcpServers: {
      designagent: {
        command: 'npm',
        args: [
          'run',
          'designagent',
          '--',
          'serve-mcp',
          '--workspace',
          workspacePath,
        ],
      },
    },
  };

  const configString = JSON.stringify(mcpConfig, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(configString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-t border-zinc-200 bg-zinc-50">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-zinc-100 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-700">
          <Terminal className="w-4 h-4" />
          Connect to Cursor
        </div>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        ) : (
          <ChevronUp className="w-4 h-4 text-zinc-500" />
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4">
          <p className="text-xs text-zinc-500 mb-3">
            Add this configuration to your Cursor MCP settings to enable AI
            assistance with your design system.
          </p>
          <div className="relative">
            <pre className="bg-zinc-900 text-zinc-100 text-xs p-3 rounded-lg overflow-x-auto">
              <code>{configString}</code>
            </pre>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className={cn(
                'absolute top-2 right-2 h-7 px-2 text-xs',
                copied && 'bg-green-100 text-green-700 hover:bg-green-100'
              )}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
