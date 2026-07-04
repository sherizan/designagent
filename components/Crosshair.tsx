/** A blueprint `+` mark — sits at the intersections of the ruled frame. */
export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      aria-hidden
      className={`text-on-surface-faint ${className}`}
    >
      <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
