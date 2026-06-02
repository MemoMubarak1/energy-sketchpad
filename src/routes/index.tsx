import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Cpu, Zap, Network, Smartphone, ArrowRight } from "lucide-react";
import logoIcon from "@/assets/elight-icon.svg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "E-Light — Electrical Circuit Simulator" },
      { name: "description", content: "E-Light is a complete electrical lab. Wire real components, simulate live voltage and current, troubleshoot faults — for learning, designing, and testing any wiring circuit." },
      { property: "og:title", content: "E-Light — Electrical Circuit Simulator" },
      { property: "og:description", content: "E-Light is a complete electrical lab. Wire real components, simulate live voltage and current, troubleshoot faults — for learning, designing, and testing any wiring circuit." },
    ],
  }),
  component: Splash,
});

const features = [
  { icon: Cpu, title: "Real components", desc: "Wire resistors, sources, switches and more on a live canvas." },
  { icon: Zap, title: "Live simulation", desc: "See voltage and current update in real time as you build." },
  { icon: Network, title: "Connect everything", desc: "Full residential and industrial circuits in one workspace." },
  { icon: Smartphone, title: "Any device", desc: "Your subscription works on mobile, tablet and desktop." },
];

function Splash() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10">
        <main className="flex flex-1 flex-col justify-center py-10">
          <div className="mb-8 flex justify-center">
            <div className="relative inline-flex h-20 w-20 items-center justify-center animate-pulse-glow rounded-full">
              <img src={logoIcon.url} alt="E-Light" className="h-[140%] w-[140%] max-w-none object-contain" />
            </div>
          </div>


          <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Build, simulate &amp; <span className="text-gradient">troubleshoot</span> circuits
          </h1>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button asChild size="lg" className="h-14 w-full text-base bg-gradient-primary shadow-glow hover:opacity-95 sm:h-12 sm:w-auto sm:px-8">
              <Link to="/auth">
                Get started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 w-full text-base sm:h-12 sm:w-auto sm:px-8">
              <Link to="/home">Use as a guest</Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur transition-colors hover:border-primary"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" strokeWidth={2.4} />
                </div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </main>

        <footer className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} E-Light. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
