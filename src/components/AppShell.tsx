import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Cpu, Calculator, Settings, Crown, LogOut, Home } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/dashboard", label: "Projects", icon: LayoutDashboard },
  { to: "/simulator", label: "Simulator", icon: Cpu },
  { to: "/calculators", label: "Calculators", icon: Calculator },
  { to: "/subscription", label: "Pro", icon: Crown },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-background p-6">
        <Link to="/dashboard" className="mb-10 flex items-center">
          <Logo className="h-9" />
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Link>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <div className="md:hidden flex items-center justify-between border-b border-border bg-background px-4 py-3">
          <Logo className="h-7" />
        </div>
        {children}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-6 border-t border-border bg-background">
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-xs",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </main>
    </div>
  );
}
