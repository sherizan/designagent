'use client';

import { AlertCircle, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidationError {
  file: string;
  message: string;
  line?: number;
  column?: number;
  level: 'error' | 'warn';
}

interface ErrorsPanelProps {
  errors: ValidationError[];
  onClose: () => void;
  onErrorClick?: (error: ValidationError) => void;
}

export function ErrorsPanel({ errors, onClose, onErrorClick }: ErrorsPanelProps) {
  const errorCount = errors.filter((e) => e.level === 'error').length;
  const warnCount = errors.filter((e) => e.level === 'warn').length;

  if (errors.length === 0) {
    return (
      <div className="border-t border-zinc-200 bg-zinc-50 p-3">
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle2 className="w-4 h-4" />
          No errors found
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-zinc-200 bg-white">
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100 bg-zinc-50">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-medium text-zinc-700">Problems</span>
          {errorCount > 0 && (
            <span className="flex items-center gap-1 text-red-600">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorCount}
            </span>
          )}
          {warnCount > 0 && (
            <span className="flex items-center gap-1 text-amber-600">
              <AlertTriangle className="w-3.5 h-3.5" />
              {warnCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-zinc-200 transition-colors"
        >
          <X className="w-4 h-4 text-zinc-500" />
        </button>
      </div>
      <div className="max-h-40 overflow-auto">
        {errors.map((error, index) => (
          <button
            key={index}
            onClick={() => onErrorClick?.(error)}
            className="w-full flex items-start gap-2 px-3 py-2 text-left hover:bg-zinc-50 transition-colors"
          >
            {error.level === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <div className="text-sm text-zinc-900 break-words">
                {error.message}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">
                {error.file}
                {error.line && `:${error.line}`}
                {error.column && `:${error.column}`}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
