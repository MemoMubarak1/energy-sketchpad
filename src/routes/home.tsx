import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Cpu, Calculator, Mail, Crown, Settings, ChevronRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "E-Light — Home" },
      { name: "description", content: "Quick access to the E-Light simulator, calculators, and settings." },
    ],
  }),
  component: Home,
});

const actions = [
  { to: "/calculators", label: "Calculators", desc: "Ohm's law, wire sizing & more.", icon: Calculator },
  { to: "/settings", label: "Settings", desc: "Preferences & account.", icon: Settings },
  { to: "/subscription", label: "Pro", desc: "Unlock every feature.", icon: Crown },
  { to: "/contact", label: "Contact us", desc: "Help & feedback.", icon: Mail },
] as const;

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col px-6 py-6">
        <header className="flex items-center justify-center">
          <Logo className="h-10" />
        </header>

        {/* Welcome / Pro banner */}
        <Link
          to="/subscription"
          className="mt-5 group flex items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-3 backdrop-blur transition-all hover:border-primary hover:shadow-elegant"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Welcome, User</p>
              <p className="text-xs text-muted-foreground">Subscribe to Pro — unlock everything</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </Link>

        <main className="mt-6 flex flex-1 flex-col">
          <h1 className="text-center text-2xl font-bold tracking-tight">
            What would you like to do?
          </h1>

          {/* Featured Simulator card */}
          <Link
            to="/dashboard"
            className="group relative mt-5 flex items-center gap-4 overflow-hidden rounded-2xl border-2 border-primary/40 bg-card p-5 shadow-elegant transition-all hover:border-primary hover:shadow-glow"
          >
            {/* Featured ribbon */}
            <div className="absolute left-0 top-0 z-10">
              <div
                className="relative flex items-center gap-1 py-1.5 pl-3 pr-6 text-xs font-bold text-[#3a2400]"
                style={{
                  background: "linear-gradient(135deg, #fff3a8 0%, #f5c542 35%, #d99514 70%, #f5c542 100%)",
                  borderTopLeftRadius: "0.875rem",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)",
                  boxShadow: "0 2px 8px rgba(217,149,20,0.45)",
                }}
              >
                <span>⚡</span>
                <span className="tracking-wide">Featured</span>
              </div>
            </div>

            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Cpu className="h-7 w-7" strokeWidth={2.4} />
            </div>
            <div className="relative flex-1 text-left pt-3">
              <p className="text-lg font-bold">Simulator</p>
              <p className="text-xs text-muted-foreground">
                Wire live circuits, run live voltage &amp; current simulations.
              </p>
            </div>
            <ChevronRight className="relative h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>

          <div className="mt-3 flex flex-1 flex-col gap-3">
            {actions.map(({ to, label, desc, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group relative flex flex-1 items-center gap-3 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur transition-all hover:border-primary hover:bg-card hover:shadow-elegant"
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" strokeWidth={2.4} />
                </div>
                <div className="relative flex-1 text-left">
                  <p className="font-semibold">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <ChevronRight className="relative h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Report problems, suggest new features or ask any question — we'd love to hear from you.
          </p>
        </main>
      </div>
    </div>
  );
}
