'use client';

import Link from 'next/link';
import { Check, Loader2, Play, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface TopBarProps {
  workspaceName: string;
  platform: 'web' | 'rn';
  theme: 'light' | 'dark';
  onPlatformChange: (platform: 'web' | 'rn') => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
  onValidate: () => void;
  validating: boolean;
  hasErrors: boolean;
  previewRunning: boolean;
  saving: boolean;
  dirty: boolean;
  onSave: () => void;
}

export function TopBar({
  workspaceName,
  platform,
  theme,
  onPlatformChange,
  onThemeChange,
  onValidate,
  validating,
  hasErrors,
  previewRunning,
  saving,
  dirty,
  onSave,
}: TopBarProps) {
  return (
    <div className="h-12 border-b border-zinc-200 bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="font-medium text-sm text-zinc-900">
            {workspaceName}
          </span>
        </div>

        <div className="h-4 w-px bg-zinc-200" />

        <div className="flex items-center gap-2">
          <Select value={platform} onValueChange={onPlatformChange}>
            <SelectTrigger className="h-8 w-28 text-xs">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="rn">React Native</SelectItem>
            </SelectContent>
          </Select>

          <Select value={theme} onValueChange={onThemeChange}>
            <SelectTrigger className="h-8 w-24 text-xs">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-4 w-px bg-zinc-200" />

        <Link
          href="/create"
          className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Create theme
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {/* Preview status */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 mr-2">
          <div
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              previewRunning ? 'bg-green-500' : 'bg-zinc-300'
            )}
          />
          Preview {previewRunning ? 'running' : 'stopped'}
        </div>

        {/* Save button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onSave}
          disabled={saving || !dirty}
          className="h-8 text-xs"
        >
          {saving ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Check className="w-3.5 h-3.5 mr-1.5" />
          )}
          {dirty ? 'Save' : 'Saved'}
        </Button>

        {/* Validate button */}
        <Button
          variant={hasErrors ? 'destructive' : 'secondary'}
          size="sm"
          onClick={onValidate}
          disabled={validating}
          className="h-8 text-xs"
        >
          {validating ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : hasErrors ? (
            <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
          ) : (
            <Play className="w-3.5 h-3.5 mr-1.5" />
          )}
          Validate
        </Button>
      </div>
    </div>
  );
}
