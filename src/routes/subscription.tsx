import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/subscription")({
  head: () => ({ meta: [{ title: "Subscription — E-Light" }] }),
  component: Subscription,
});

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$4.99",
    cadence: "/mo",
    save: null,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "$12.99",
    cadence: "/3mo",
    save: "Save 13%",
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "$39.99",
    cadence: "/yr",
    save: "Best value",
  },
];

const features = [
  "Unlimited projects",
  "Advanced components (op-amps, ICs, microcontrollers)",
  "Real-time oscilloscope & spectrum analyzer",
  "Export to PDF / Netlist / Gerber",
  "Cloud sync across devices",
  "Priority support",
];

function Subscription() {
  const [selected, setSelected] = useState("yearly");

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-6 py-10 pb-24 md:pb-10">
        <div className="text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
            <Crown className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="mt-5 text-4xl font-bold">Unlock <span className="text-gradient">E-Light Pro</span></h1>
          <p className="mt-3 text-muted-foreground">Power tools for engineers, students and tinkerers.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {plans.map((p) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className={cn(
                  "relative rounded-2xl border-2 bg-card p-5 text-left transition-all",
                  active ? "border-primary shadow-elegant" : "border-border hover:border-primary/40",
                )}
              >
                {p.save && (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-gradient-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                    {p.save}
                  </span>
                )}
                <p className="text-sm font-medium text-muted-foreground">{p.name}</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.cadence}</span>
                </div>
                <div
                  className={cn(
                    "mt-4 flex h-5 w-5 items-center justify-center rounded-full border-2",
                    active ? "border-primary bg-primary" : "border-border",
                  )}
                >
                  {active && <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Everything in Pro</h2>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-primary">
                  <Check className="h-2.5 w-2.5 text-primary-foreground" strokeWidth={4} />
                </div>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <Button size="lg" className="mt-8 w-full bg-gradient-primary shadow-elegant hover:opacity-95">
          <Zap className="mr-1.5 h-4 w-4" />
          Continue with {plans.find((p) => p.id === selected)?.name}
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Cancel anytime · Secure billing · 3-day money-back guarantee
        </p>
      </div>
    </AppShell>
  );
}
