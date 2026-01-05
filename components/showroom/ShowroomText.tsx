'use client';

export interface ShowroomTextProps {
  tone?: 'default' | 'muted' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'label';
  children: React.ReactNode;
  className?: string;
}

export function ShowroomText({
  tone = 'default',
  size = 'md',
  weight = 'regular',
  as: Component = 'p',
  children,
  className = '',
}: ShowroomTextProps) {
  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const weightStyles = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const toneColors = {
    default: 'var(--showroom-text)',
    muted: 'var(--showroom-mutedText)',
    danger: 'var(--showroom-danger)',
  };

  return (
    <Component
      className={`${sizeStyles[size]} ${weightStyles[weight]} ${className}`}
      style={{
        color: toneColors[tone],
      }}
    >
      {children}
    </Component>
  );
}
