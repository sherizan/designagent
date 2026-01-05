'use client';

import { Loader2 } from 'lucide-react';

export interface ShowroomButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function ShowroomButton({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
}: ShowroomButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-medium transition-all
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  const variantStyles = {
    primary: `
      bg-[var(--showroom-primary)]
      text-[var(--showroom-primaryText)]
      hover:opacity-90
      focus:ring-[var(--showroom-primary)]
    `,
    secondary: `
      bg-transparent
      border border-[var(--showroom-border)]
      text-[var(--showroom-text)]
      hover:bg-[var(--showroom-surface)]
      focus:ring-[var(--showroom-border)]
    `,
    ghost: `
      bg-transparent
      text-[var(--showroom-text)]
      hover:bg-[var(--showroom-surface)]
      focus:ring-[var(--showroom-border)]
    `,
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}
      style={{
        borderRadius: 'var(--showroom-radius)',
      }}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
