import logoIcon from "@/assets/elight-icon.svg.asset.json";

export function Logo({ className = "h-10", iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <img src={logoIcon.url} alt="E-Light" className="h-full w-auto" />
      {!iconOnly && (
        <span className="text-lg font-bold tracking-tight text-foreground">E-light</span>
      )}
    </div>
  );
}
