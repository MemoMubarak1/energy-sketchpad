import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Cpu, Calculator, Mail, Crown, Settings, ArrowUpRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "E-Light — Home" },
      { name: "description", content: "Quick access to the E-Light simulator, calculators, and settings." },
    ],
  }),
  component: Home,
});

const tiles = [
  { to: "/calculators", label: "Calculators", desc: "Ohm's law, wire sizing", icon: Calculator },
  { to: "/subscription", label: "Pro", desc: "Unlock everything", icon: Crown },
  { to: "/settings", label: "Settings", desc: "Preferences", icon: Settings },
  { to: "/contact", label: "Contact", desc: "Help & feedback", icon: Mail },
] as const;

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary-glow/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-5 py-6 pb-24">
        {/* Top bar */}
        <header className="flex items-center justify-center">
          <Logo className="h-9" />
        </header>

        {/* Welcome */}
        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Welcome back</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
            Hello, <span className="text-gradient">User</span>
          </h1>
        </div>

        {/* Pro upsell strip */}
        <Link
          to="/subscription"
          className="group mt-4 flex items-center gap-3 rounded-2xl border border-primary/30 bg-card/70 px-4 py-3 backdrop-blur transition-all hover:border-primary hover:shadow-elegant"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <p className="flex-1 text-sm">
            <span className="font-semibold">Subscribe to Pro</span>
            <span className="text-muted-foreground"> — unlock everything</span>
          </p>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </Link>

        {/* Featured Simulator — hero card */}
        <Link
          to="/dashboard"
          className="group relative mt-5 block overflow-hidden rounded-3xl border-2 border-primary/40 bg-gradient-primary p-6 text-primary-foreground shadow-elegant transition-all hover:shadow-glow"
        >
          {/* Decorative grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(circle at 80% 20%, black, transparent 70%)",
            }}
          />
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
                <Cpu className="h-7 w-7" strokeWidth={2.4} />
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:translate-x-1">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold">Circuit Simulator</h2>
            <p className="mt-1 text-sm text-white/85">
              Wire live circuits. Run real voltage &amp; current simulations.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Live engine ready
            </div>
          </div>
        </Link>

        {/* Quick actions — 2x2 grid */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Quick actions
            </p>
            <span className="h-px flex-1 ml-3 bg-gradient-to-r from-border to-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tiles.map(({ to, label, desc, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card/70 p-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-elegant"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Icon className="h-4 w-4" strokeWidth={2.4} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <div>
                  <p className="font-semibold leading-tight">{label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Report problems, suggest features or ask anything — we'd love to hear from you.
        </p>
      </div>
    </div>
  );
}
