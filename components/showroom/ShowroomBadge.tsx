'use client';

export interface ShowroomBadgeProps {
  variant?: 'default' | 'primary' | 'muted';
  children: React.ReactNode;
}

export function ShowroomBadge({
  variant = 'default',
  children,
}: ShowroomBadgeProps) {
  const variantStyles = {
    default: `
      bg-[var(--showroom-surface)]
      text-[var(--showroom-text)]
      border border-[var(--showroom-border)]
    `,
    primary: `
      bg-[var(--showroom-primary)]
      text-[var(--showroom-primaryText)]
    `,
    muted: `
      bg-[var(--showroom-surface)]
      text-[var(--showroom-mutedText)]
    `,
  };

  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 text-xs font-medium
        ${variantStyles[variant]}
      `}
      style={{
        borderRadius: 'calc(var(--showroom-radius) * 0.5)',
      }}
    >
      {children}
    </span>
  );
}
