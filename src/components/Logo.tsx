export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center rounded-md bg-primary p-1.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9z" />
        </svg>
      </div>
      <span className="text-lg font-bold tracking-tight text-foreground">E-light</span>
    </div>
  );
}
