import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Save, Share2, Zap } from "lucide-react";

export const Route = createFileRoute("/simulator")({
  head: () => ({ meta: [{ title: "Simulator — E-Light" }] }),
  component: Simulator,
});

function Simulator() {
  return (
    <AppShell>
      <div className="flex h-screen flex-col">
        <div className="flex items-center justify-between border-b border-border bg-background px-6 py-3">
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <p className="font-semibold">Untitled Circuit</p>
              <p className="text-xs text-muted-foreground">Auto-saved</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><Share2 className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm"><Save className="mr-1.5 h-4 w-4" /> Save</Button>
            <Button size="sm" className="bg-gradient-primary hover:opacity-95">
              <Play className="mr-1.5 h-4 w-4" /> Run
            </Button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden bg-surface">
          {/* Placeholder — replace this div's contents with <iframe src="/elight.html" /> later */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.58 0.22 262 / 0.12) 1px, transparent 1px), linear-gradient(90deg, oklch(0.58 0.22 262 / 0.12) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative flex h-full items-center justify-center p-6 pb-28 md:pb-6">
            <div className="max-w-md rounded-3xl border border-border bg-card/80 p-8 text-center backdrop-blur shadow-elegant">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                <Zap className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <h2 className="mt-5 text-xl font-bold">Simulator canvas</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Drop <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">elight.html</code> in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">/public</code> and embed it here via an iframe to load the live simulator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
