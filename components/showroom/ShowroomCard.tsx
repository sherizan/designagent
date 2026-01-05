'use client';

export interface ShowroomCardProps {
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function ShowroomCard({
  padding = 'md',
  children,
  className = '',
}: ShowroomCardProps) {
  const paddingStyles = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={`
        ${paddingStyles[padding]}
        bg-[var(--showroom-surface)]
        border border-[var(--showroom-border)]
        ${className}
      `}
      style={{
        borderRadius: 'var(--showroom-radius)',
        boxShadow: 'var(--showroom-shadow)',
      }}
    >
      {children}
    </div>
  );
}
