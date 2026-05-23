import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Cpu, Calculator, Mail, ChevronRight } from "lucide-react";

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
    desc: "Open your projects and wire live circuits.",
    icon: Cpu,
  },
  {
    to: "/calculators",
    label: "Calculators",
    desc: "Ohm's law, voltage drop, wire sizing and more.",
    icon: Calculator,
  },
  {
    to: "/contact",
    label: "Contact us",
    desc: "We're here to help.",
    icon: Mail,
  },
] as const;

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col px-6 py-10">
        <header className="flex items-center justify-center">
          <Logo className="h-10" />
        </header>

        <main className="mt-12 flex flex-1 flex-col">
          <h1 className="text-center text-3xl font-bold tracking-tight">
            What would you like to do?
          </h1>

          <div className="mt-10 flex flex-col gap-4">
            {actions.map(({ to, label, desc, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-5 backdrop-blur transition-all hover:border-primary hover:bg-card hover:shadow-elegant"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-lg font-semibold">{label}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Report problems, suggest new features or ask any question — we'd love to hear from you.
          </p>
        </main>
      </div>
    </div>
  );
}
