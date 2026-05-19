import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Zap, CircuitBoard, Gauge, ArrowRight, Network, Smartphone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "E-Light — Electrical Circuit Simulator" },
      { name: "description", content: "Design, simulate and learn electrical circuits on the go with E-Light." },
      { property: "og:title", content: "E-Light — Electrical Circuit Simulator" },
      { property: "og:description", content: "Design, simulate and learn electrical circuits on the go with E-Light." },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <Logo className="h-9" />
          <Link to="/auth">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-primary shadow-glow animate-pulse-glow">
            <Zap className="h-10 w-10 text-primary-foreground" strokeWidth={2.5} />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl">
            Build circuits at the <span className="text-gradient">speed of thought</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            E-Light is a pocket-sized electrical lab. Connect components, simulate real-time voltage and current — anywhere.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary shadow-elegant hover:opacity-95">
                Get started <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">Try demo</Button>
            </Link>
          </div>

          <div className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: CircuitBoard, title: "Drag & drop", desc: "Resistors, capacitors, sources." },
              { icon: Gauge, title: "Live measurements", desc: "Probe voltage and current in real time." },
              { icon: Network, title: "Connect everything", desc: "Wire up full residential and industrial circuits." },
              { icon: Smartphone, title: "Any device", desc: "One subscription unlocks mobile, tablet and desktop." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border bg-card/60 p-5 text-left backdrop-blur">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
