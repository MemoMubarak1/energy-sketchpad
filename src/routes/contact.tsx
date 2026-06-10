import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact us — E-Light" },
      { name: "description", content: "Report problems, request features, or ask any question about E-Light." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState<"bug" | "feature" | "question">("question");

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col px-6 py-8">
        <header className="flex items-center justify-center">
          <Logo className="h-8" />
        </header>

        <main className="mt-10 flex-1">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-elegant sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold leading-tight">Contact us</h1>
                <p className="text-sm text-muted-foreground">
                  Report a bug, request a feature, or ask anything.
                </p>
              </div>
            </div>

            {sent ? (
              <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-border bg-accent/40 p-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <p className="text-lg font-semibold">Message sent</p>
                <p className="text-sm text-muted-foreground">
                  Thanks for reaching out — we'll get back to you shortly.
                </p>
                <Button variant="outline" className="mt-2" onClick={() => setSent(false)}>
                  Send another
                </Button>
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="space-y-1.5">
                  <Label>Topic</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: "bug", label: "Report a bug" },
                        { id: "feature", label: "Feature idea" },
                        { id: "question", label: "Question" },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTopic(t.id)}
                        className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                          topic === t.id
                            ? "border-primary bg-accent text-foreground"
                            : "border-border bg-card text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Ada Lovelace" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us what's on your mind…"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary shadow-elegant hover:opacity-95"
                >
                  Send message
                </Button>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
