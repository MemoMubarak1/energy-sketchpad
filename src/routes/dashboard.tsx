import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Plus, CircuitBoard, MoreHorizontal, Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "My Projects — E-Light" }] }),
  component: Dashboard,
});

const projects = [
  { name: "RC Low-pass Filter", updated: "2h ago", components: 8, status: "Running" },
  { name: "555 Timer Astable", updated: "Yesterday", components: 12, status: "Draft" },
  { name: "Op-amp Inverter", updated: "3d ago", components: 6, status: "Running" },
  { name: "Full-wave Rectifier", updated: "1w ago", components: 10, status: "Draft" },
];

function Dashboard() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-6 py-10 pb-24 md:pb-10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="mt-1 text-3xl font-bold">My Projects</h1>
          </div>
          <Link to="/simulator">
            <Button className="bg-gradient-primary shadow-elegant hover:opacity-95">
              <Plus className="mr-1.5 h-4 w-4" /> New project
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/simulator"
            className="group flex min-h-[160px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card/40 p-6 text-center transition-colors hover:border-primary hover:bg-accent"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
              <Plus className="h-5 w-5" />
            </div>
            <p className="mt-3 font-semibold">Blank circuit</p>
            <p className="text-xs text-muted-foreground">Start from scratch</p>
          </Link>

          {projects.map((p) => (
            <Link
              key={p.name}
              to="/simulator"
              className="group rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-elegant"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <CircuitBoard className="h-5 w-5" />
                </div>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-secondary group-hover:opacity-100"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-4 font-semibold">{p.name}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" /> {p.updated} · {p.components} parts
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    p.status === "Running" ? "bg-primary animate-pulse" : "bg-muted-foreground"
                  }`}
                />
                {p.status}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
