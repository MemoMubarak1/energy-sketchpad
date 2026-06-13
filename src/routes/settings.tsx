import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Bell, Palette, Shield, LogOut, Cpu } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — E-Light" }] }),
  component: SettingsPage,
});

function Section({ icon: Icon, title, desc, children }: { icon: any; title: string; desc: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}

function ComingSoon() {
  return <span className="text-xs font-medium text-muted-foreground">Coming soon</span>;
}

function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-6 py-10 pb-24 md:pb-10">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account, app preferences and security.</p>

        <div className="mt-8 space-y-6">
          <Section icon={User} title="Profile" desc="Your personal info">
            <div className="space-y-1.5">
              <Label htmlFor="n">Name</Label>
              <Input id="n" defaultValue="Ada Lovelace" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="e">Email</Label>
              <Input id="e" defaultValue="ada@elight.app" readOnly disabled />
            </div>
            <Button className="bg-gradient-primary hover:opacity-95">Save changes</Button>
          </Section>

          <Section icon={Cpu} title="Simulator" desc="Customize the simulation workspace">
            <Row label="Show component labels"><Switch defaultChecked /></Row>
            <Row label="Wiring style">
              <div className="flex flex-col items-end gap-1.5">
                <Select defaultValue="bezier" disabled>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bezier">Bezier</SelectItem>
                    <SelectItem value="orthogonal">Orthogonal</SelectItem>
                  </SelectContent>
                </Select>
                <ComingSoon />
              </div>
            </Row>
          </Section>

          <Section icon={Palette} title="Appearance" desc="Theme & editor preferences">
            <Row label="Zoom level">
              <Select defaultValue="125">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100%</SelectItem>
                  <SelectItem value="125">125%</SelectItem>
                  <SelectItem value="150">150%</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Color mode">
              <div className="flex flex-col items-end gap-1.5">
                <Select defaultValue="dark" disabled>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                    <SelectItem value="light">Light Mode</SelectItem>
                  </SelectContent>
                </Select>
                <ComingSoon />
              </div>
            </Row>
            <Row label="Language">
              <div className="flex flex-col items-end gap-1.5">
                <Select defaultValue="english" disabled>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
                <ComingSoon />
              </div>
            </Row>
          </Section>

          <Section icon={Bell} title="Notifications" desc="Decide what we ping you about">
            <Row label="Product updates"><Switch /></Row>
          </Section>

          <Section icon={Shield} title="Security" desc="Keep your account safe">
            <Row label="Two-factor auth">
              <div className="flex flex-col items-end gap-1.5">
                <Switch disabled />
                <ComingSoon />
              </div>
            </Row>
            <Button variant="outline">Change password</Button>
          </Section>

          <Link to="/" className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-4 text-sm font-medium text-destructive hover:bg-destructive/5">
            <LogOut className="h-4 w-4" /> Sign out
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
