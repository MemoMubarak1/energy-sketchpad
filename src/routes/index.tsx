import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Cpu, Calculator, Mail, Crown, Settings, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "E-Light — Electrical Circuit Simulator" },
      { name: "description", content: "E-Light is a complete electrical lab. Wire real components, simulate live voltage and current, troubleshoot faults — for learning, designing, and testing any wiring circuit." },
      { property: "og:title", content: "E-Light — Electrical Circuit Simulator" },
      { property: "og:description", content: "E-Light is a complete electrical lab. Wire real components, simulate live voltage and current, troubleshoot faults — for learning, designing, and testing any wiring circuit." },
    ],
  }),
  component: Home,
});

const actions = [
  {
    to: "/dashboard",
    label: "Simulator",
    desc: "Wire live circuits, run live voltage & current simulations.",
    icon: Cpu,
  },
  {
    to: "/calculators",
    label: "Calculators",
    desc: "Ohm's law, wire sizing & more.",
    icon: Calculator,
  },
  {
    to: "/subscription",
    label: "Pro",
    desc: "Unlock every feature.",
    icon: Crown,
  },
  {
    to: "/settings",
    label: "Settings",
    desc: "Preferences & account.",
    icon: Settings,
  },
  {
    to: "/contact",
    label: "Contact us",
    desc: "Help & feedback.",
    icon: Mail,
  },
] as const;

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col px-6 py-6">
        <header className="flex items-center justify-center">
          <Logo className="h-10" />
        </header>

        <main className="mt-5 flex flex-1 flex-col">
          <h1 className="text-center text-2xl font-bold tracking-tight">
            What would you like to do?
          </h1>

          <div className="mt-5 flex flex-1 flex-col gap-3">
            {actions.map(({ to, label, desc, icon: Icon }, i) => {
              const isSimulator = i === 0;
              const isPro = label === "Pro";
              return (
                <Link
                  key={to}
                  to={to}
                  className={
                    "group flex flex-1 items-center gap-3 rounded-2xl border bg-card/70 p-4 backdrop-blur transition-all hover:bg-card hover:shadow-elegant " +
                    (isSimulator
                      ? "border-[#c9a84c] ring-1 ring-[#c9a84c]/40 hover:border-[#c9a84c] hover:shadow-[0_0_30px_-5px_#c9a84c33]"
                      : "border-border hover:border-primary")
                  }
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Icon className={"h-5 w-5 " + (isPro ? "text-[#c9a84c]" : "")} strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              );
            })}
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Report problems, suggest new features or ask any question — we'd love to hear from you.
          </p>
        </main>
      </div>
    </div>
  );
}
