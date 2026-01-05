'use client';

export interface ShowroomInputProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  type?: 'text' | 'password' | 'email';
  onChange?: (value: string) => void;
}

export function ShowroomInput({
  placeholder = '',
  value = '',
  disabled = false,
  type = 'text',
  onChange,
}: ShowroomInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={`
        w-full h-10 px-3 text-sm
        bg-[var(--showroom-bg)]
        text-[var(--showroom-text)]
        placeholder:text-[var(--showroom-mutedText)]
        border border-[var(--showroom-border)]
        focus:outline-none focus:ring-2 focus:ring-[var(--showroom-primary)] focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all
      `}
      style={{
        borderRadius: 'var(--showroom-radius)',
      }}
    />
  );
}
