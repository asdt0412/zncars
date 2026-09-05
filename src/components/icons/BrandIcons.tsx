export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SnapchatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 3c3.2 0 5.6 2.2 5.6 5.4 0 1.4-.3 2.3.4 3.2.4.5 1 .6 1.5.8.4.1.7.4.7.8 0 .6-.7 1-1.3 1.2-.2.1-.4.3-.3.6.1.6.8 1.1 1.3 1.6.5.5.4 1.1-.3 1.3-1.2.3-2.2-.2-3.1.3-.8.4-1.2 1.3-2.4 1.6-.4.1-.8.4-1.1.9-.2.3-.5.5-1 .5s-.8-.2-1-.5c-.3-.5-.7-.8-1.1-.9-1.2-.3-1.6-1.2-2.4-1.6-.9-.5-1.9 0-3.1-.3-.7-.2-.8-.8-.3-1.3.5-.5 1.2-1 1.3-1.6.1-.3-.1-.5-.3-.6C4.4 14.2 3.7 13.8 3.7 13.2c0-.4.3-.7.7-.8.5-.2 1.1-.3 1.5-.8.7-.9.4-1.8.4-3.2C6.3 5.2 8.8 3 12 3z" />
    </svg>
  );
}
