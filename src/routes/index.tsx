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
                    "group relative flex flex-1 items-center gap-3 rounded-2xl border p-4 backdrop-blur transition-all overflow-hidden " +
                    (isSimulator
                      ? "gold-card gold-sweep bg-card/90 hover:scale-[1.01]"
                      : "border-border bg-card/70 hover:bg-card hover:border-primary hover:shadow-elegant")
                  }
                >
                  <div
                    className={
                      "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-primary-foreground " +
                      (isPro
                        ? "bg-gold-shine gold-glow"
                        : isSimulator
                          ? "bg-gold-shine gold-glow"
                          : "bg-gradient-primary shadow-glow")
                    }
                  >
                    <Icon className={"h-5 w-5 " + (isPro || isSimulator ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" : "")} strokeWidth={2.4} />
                  </div>
                  <div className="relative flex-1 text-left">
                    <p className={"font-semibold " + (isSimulator ? "text-[#8a6a1f] dark:text-[#f7e8a8]" : "")}>
                      {label}
                      {isSimulator && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-gold-shine px-2 py-0.5 text-[10px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,243,194,0.4)]">
                          MAIN
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <ChevronRight className={"relative h-4 w-4 transition-transform group-hover:translate-x-1 " + (isSimulator ? "text-[#c9a84c]" : "text-muted-foreground group-hover:text-primary")} />
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
