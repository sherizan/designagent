'use client';

import { useMemo } from 'react';
import { Settings, User, Bell, Shield } from 'lucide-react';
import { ShowroomButton } from './ShowroomButton';
import { ShowroomInput } from './ShowroomInput';
import { ShowroomCard } from './ShowroomCard';
import { ShowroomText } from './ShowroomText';
import { ShowroomBadge } from './ShowroomBadge';
import type { PresetJSON } from '@/lib/preset-generator';

interface ShowroomPreviewProps {
  preset: PresetJSON | null;
  theme: 'light' | 'dark';
  density: 'compact' | 'comfortable';
}

export function ShowroomPreview({ preset, theme, density }: ShowroomPreviewProps) {
  // Resolve token values to CSS custom properties
  const cssVariables = useMemo(() => {
    if (!preset) return {};

    const semantic = theme === 'dark' && preset.tokens.semantic.dark
      ? preset.tokens.semantic.dark
      : preset.tokens.semantic.light;

    const coreTokens = preset.tokens.core.tokens;

    // Helper to resolve a token reference
    const resolveToken = (token: { ref?: string; value?: string | number }): string | number => {
      if (token.value !== undefined) return token.value;
      if (token.ref) {
        const resolved = coreTokens[token.ref];
        if (resolved) return resolved.value;
      }
      return '';
    };

    const semanticTokens = semantic.tokens;

    return {
      '--showroom-bg': resolveToken(semanticTokens['color.bg']),
      '--showroom-surface': resolveToken(semanticTokens['color.surface']),
      '--showroom-text': resolveToken(semanticTokens['color.text']),
      '--showroom-mutedText': resolveToken(semanticTokens['color.mutedText']),
      '--showroom-border': resolveToken(semanticTokens['color.border']),
      '--showroom-primary': resolveToken(semanticTokens['color.primary']),
      '--showroom-primaryText': resolveToken(semanticTokens['color.primaryText']),
      '--showroom-danger': resolveToken(semanticTokens['color.danger']),
      '--showroom-shadow': resolveToken(semanticTokens['shadow.sm']),
      '--showroom-radius': `${resolveToken(semanticTokens['radius.default'])}px`,
    } as React.CSSProperties;
  }, [preset, theme]);

  const spacing = density === 'compact' ? 'gap-3' : 'gap-4';
  const cardPadding = density === 'compact' ? 'sm' : 'md';

  if (!preset) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-400">
        Loading preview...
      </div>
    );
  }

  return (
    <div
      className="h-full overflow-auto p-4"
      style={{
        ...cssVariables,
        backgroundColor: 'var(--showroom-bg)',
      }}
    >
      <div className={`flex flex-col ${spacing} max-w-sm mx-auto`}>
        {/* Auth Card */}
        <ShowroomCard padding={cardPadding}>
          <div className={`flex flex-col ${spacing}`}>
            <ShowroomText size="lg" weight="semibold">
              Welcome back
            </ShowroomText>
            <ShowroomText tone="muted" size="sm">
              Enter your credentials to sign in
            </ShowroomText>
            <ShowroomInput
              type="email"
              placeholder="Email address"
            />
            <ShowroomInput
              type="password"
              placeholder="Password"
            />
            <ShowroomButton variant="primary" size="md">
              Sign in
            </ShowroomButton>
            <ShowroomText tone="muted" size="sm" className="text-center">
              Don&apos;t have an account?{' '}
              <span style={{ color: 'var(--showroom-primary)' }} className="cursor-pointer">
                Sign up
              </span>
            </ShowroomText>
          </div>
        </ShowroomCard>

        {/* Settings List */}
        <ShowroomCard padding={cardPadding}>
          <ShowroomText size="md" weight="medium" className="mb-3">
            Settings
          </ShowroomText>
          <div className="flex flex-col">
            <div className="flex items-center justify-between py-2 border-b border-[var(--showroom-border)]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" style={{ color: 'var(--showroom-mutedText)' }} />
                <ShowroomText size="sm">Account</ShowroomText>
              </div>
              <ShowroomBadge variant="primary">Pro</ShowroomBadge>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[var(--showroom-border)]">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" style={{ color: 'var(--showroom-mutedText)' }} />
                <ShowroomText size="sm">Notifications</ShowroomText>
              </div>
              <ShowroomBadge variant="muted">3 new</ShowroomBadge>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: 'var(--showroom-mutedText)' }} />
                <ShowroomText size="sm">Security</ShowroomText>
              </div>
              <ShowroomBadge variant="default">Enabled</ShowroomBadge>
            </div>
          </div>
        </ShowroomCard>

        {/* Button Row */}
        <ShowroomCard padding={cardPadding}>
          <ShowroomText size="md" weight="medium" className="mb-3">
            Actions
          </ShowroomText>
          <div className="flex flex-wrap gap-2">
            <ShowroomButton variant="primary" size="sm">
              Primary
            </ShowroomButton>
            <ShowroomButton variant="secondary" size="sm">
              Secondary
            </ShowroomButton>
            <ShowroomButton variant="ghost" size="sm">
              Ghost
            </ShowroomButton>
          </div>
        </ShowroomCard>

        {/* Typography Sample */}
        <ShowroomCard padding={cardPadding}>
          <ShowroomText size="md" weight="medium" className="mb-3">
            Typography
          </ShowroomText>
          <div className="flex flex-col gap-1">
            <ShowroomText size="lg" weight="bold">Large Bold</ShowroomText>
            <ShowroomText size="md" weight="medium">Medium Regular</ShowroomText>
            <ShowroomText size="sm" tone="muted">Small Muted</ShowroomText>
            <ShowroomText size="sm" tone="danger">Danger Text</ShowroomText>
          </div>
        </ShowroomCard>
      </div>
    </div>
  );
}
