import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Zap,
  Activity,
  Gauge,
  Lightbulb,
  Cable,
  Palette,
  Sigma,
  Calculator as CalcIcon,
} from "lucide-react";

export const Route = createFileRoute("/calculators")({
  head: () => ({
    meta: [
      { title: "Calculators — E-Light" },
      {
        name: "description",
        content:
          "Electrical calculators: Ohm's law, power, voltage divider, voltage drop, LED resistor, wire size and resistor color codes.",
      },
    ],
  }),
  component: Calculators,
});

type CalcId =
  | "ohms"
  | "power"
  | "divider"
  | "led"
  | "drop"
  | "wire"
  | "color"
  | "threephase";

const calcs: { id: CalcId; name: string; desc: string; icon: typeof Zap }[] = [
  { id: "ohms", name: "Ohm's Law", desc: "V, I, R relationships", icon: Zap },
  { id: "power", name: "Power", desc: "P = V × I", icon: Activity },
  { id: "divider", name: "Voltage Divider", desc: "Two-resistor output", icon: Sigma },
  { id: "led", name: "LED Resistor", desc: "Series resistor for an LED", icon: Lightbulb },
  { id: "drop", name: "Voltage Drop", desc: "Single-phase drop over a run", icon: Gauge },
  { id: "wire", name: "Wire Size", desc: "Recommended AWG for load", icon: Cable },
  { id: "color", name: "Resistor Color Code", desc: "4-band decoder", icon: Palette },
  { id: "threephase", name: "3-Phase Power", desc: "Line-to-line power", icon: Activity },
];

function Calculators() {
  const [active, setActive] = useState<CalcId | null>(null);
  const current = calcs.find((c) => c.id === active);

  return (
    <AppShell>
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8 pb-28 md:pb-8">
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
          <Logo className="h-8" />
        </header>


        <main className="mt-8 flex-1">
          {!active ? (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <CalcIcon className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold leading-tight">Calculators</h1>
                  <p className="text-sm text-muted-foreground">
                    Quick electrical math, right in your pocket.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {calcs.map(({ id, name, desc, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-elegant"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold">{name}</p>
                      <p className="truncate text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setActive(null)}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> All calculators
              </button>

              <div className="mt-4 rounded-3xl border border-border bg-card p-6 shadow-elegant sm:p-8">
                <div className="flex items-center gap-3">
                  {current && (
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                      <current.icon className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold">{current?.name}</h2>
                    <p className="text-sm text-muted-foreground">{current?.desc}</p>
                  </div>
                </div>

                <div className="mt-6">
                  {active === "ohms" && <OhmsLaw />}
                  {active === "power" && <Power />}
                  {active === "divider" && <Divider />}
                  {active === "led" && <Led />}
                  {active === "drop" && <VDrop />}
                  {active === "wire" && <WireSize />}
                  {active === "color" && <ColorCode />}
                  {active === "threephase" && <ThreePhase />}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

/* ---------- Shared bits ---------- */

function Field({
  label,
  value,
  onChange,
  unit,
  placeholder,
  type = "number",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}{unit ? ` (${unit})` : ""}</Label>
      <Input
        type={type}
        inputMode="decimal"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Result({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="rounded-xl border border-border bg-accent/40 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold">
        {value}
        {unit && <span className="ml-1 text-base font-medium text-muted-foreground">{unit}</span>}
      </p>
    </div>
  );
}

const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : NaN;
};
const fmt = (n: number, d = 3) =>
  !Number.isFinite(n) ? "—" : Math.abs(n) >= 1000 ? n.toFixed(0) : n.toFixed(d).replace(/\.?0+$/, "");

/* ---------- Calculators ---------- */

function OhmsLaw() {
  const [v, setV] = useState("12");
  const [i, setI] = useState("0.5");
  const r = useMemo(() => num(v) / num(i), [v, i]);
  const p = useMemo(() => num(v) * num(i), [v, i]);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Voltage" unit="V" value={v} onChange={setV} />
        <Field label="Current" unit="A" value={i} onChange={setI} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Resistance" value={fmt(r)} unit="Ω" />
        <Result label="Power" value={fmt(p)} unit="W" />
      </div>
    </div>
  );
}

function Power() {
  const [v, setV] = useState("120");
  const [i, setI] = useState("2");
  const p = num(v) * num(i);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Voltage" unit="V" value={v} onChange={setV} />
        <Field label="Current" unit="A" value={i} onChange={setI} />
      </div>
      <Result label="Power" value={fmt(p)} unit="W" />
    </div>
  );
}

function Divider() {
  const [vin, setVin] = useState("12");
  const [r1, setR1] = useState("1000");
  const [r2, setR2] = useState("2200");
  const vout = (num(vin) * num(r2)) / (num(r1) + num(r2));
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Vin" unit="V" value={vin} onChange={setVin} />
        <Field label="R1" unit="Ω" value={r1} onChange={setR1} />
        <Field label="R2" unit="Ω" value={r2} onChange={setR2} />
      </div>
      <Result label="Vout" value={fmt(vout)} unit="V" />
    </div>
  );
}

function Led() {
  const [vs, setVs] = useState("5");
  const [vf, setVf] = useState("2.1");
  const [i, setI] = useState("20");
  const r = (num(vs) - num(vf)) / (num(i) / 1000);
  const p = (num(vs) - num(vf)) * (num(i) / 1000);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Supply" unit="V" value={vs} onChange={setVs} />
        <Field label="LED Vf" unit="V" value={vf} onChange={setVf} />
        <Field label="Current" unit="mA" value={i} onChange={setI} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Resistor" value={fmt(r, 1)} unit="Ω" />
        <Result label="Dissipation" value={fmt(p * 1000, 1)} unit="mW" />
      </div>
    </div>
  );
}

function VDrop() {
  // Single phase: Vd = 2 * L * I * R / 1000  (R in Ω/km of conductor)
  const [length, setLength] = useState("30");
  const [current, setCurrent] = useState("15");
  const [r, setR] = useState("8.89"); // 2.5 mm² copper Ω/km
  const [v, setV] = useState("230");
  const vd = (2 * num(length) * num(current) * num(r)) / 1000;
  const pct = (vd / num(v)) * 100;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Length" unit="m" value={length} onChange={setLength} />
        <Field label="Current" unit="A" value={current} onChange={setCurrent} />
        <Field label="Cable R" unit="Ω/km" value={r} onChange={setR} />
        <Field label="Source" unit="V" value={v} onChange={setV} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Voltage drop" value={fmt(vd, 2)} unit="V" />
        <Result label="Drop %" value={fmt(pct, 2)} unit="%" />
      </div>
    </div>
  );
}

function WireSize() {
  // Simple ampacity lookup (copper, 60°C insulation, NEC-style ballpark)
  const [load, setLoad] = useState("20");
  const table = [
    { awg: "14", a: 15 },
    { awg: "12", a: 20 },
    { awg: "10", a: 30 },
    { awg: "8", a: 40 },
    { awg: "6", a: 55 },
    { awg: "4", a: 70 },
    { awg: "2", a: 95 },
    { awg: "1/0", a: 125 },
    { awg: "2/0", a: 145 },
    { awg: "4/0", a: 195 },
  ];
  const pick = table.find((t) => t.a >= num(load));
  return (
    <div className="space-y-4">
      <Field label="Load current" unit="A" value={load} onChange={setLoad} />
      <Result label="Minimum AWG (copper)" value={pick ? `#${pick.awg}` : "Exceeds 4/0"} />
      <p className="text-xs text-muted-foreground">
        Estimate based on copper conductors at 60°C insulation. Always verify against local code.
      </p>
    </div>
  );
}

function ColorCode() {
  const colors = [
    { n: "Black", v: 0, c: "#000" },
    { n: "Brown", v: 1, c: "#7a4a1a" },
    { n: "Red", v: 2, c: "#d33" },
    { n: "Orange", v: 3, c: "#e8821c" },
    { n: "Yellow", v: 4, c: "#f4c430" },
    { n: "Green", v: 5, c: "#2a8a3a" },
    { n: "Blue", v: 6, c: "#2360c4" },
    { n: "Violet", v: 7, c: "#7a3fb5" },
    { n: "Grey", v: 8, c: "#888" },
    { n: "White", v: 9, c: "#eee" },
  ];
  const [b1, setB1] = useState(1);
  const [b2, setB2] = useState(0);
  const [mult, setMult] = useState(2);
  const value = (b1 * 10 + b2) * Math.pow(10, mult);
  const Band = ({
    label,
    val,
    set,
    max = 9,
  }: {
    label: string;
    val: number;
    set: (n: number) => void;
    max?: number;
  }) => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <select
        value={val}
        onChange={(e) => set(parseInt(e.target.value))}
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
      >
        {colors.slice(0, max + 1).map((c) => (
          <option key={c.n} value={c.v}>
            {c.n} ({c.v})
          </option>
        ))}
      </select>
      <div
        className="h-2 rounded"
        style={{ background: colors[val]?.c ?? "#000" }}
      />
    </div>
  );
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Band label="Band 1" val={b1} set={setB1} />
        <Band label="Band 2" val={b2} set={setB2} />
        <Band label="Multiplier" val={mult} set={setMult} />
      </div>
      <Result
        label="Resistance"
        value={value >= 1e6 ? fmt(value / 1e6, 2) + "M" : value >= 1e3 ? fmt(value / 1e3, 2) + "k" : fmt(value)}
        unit="Ω"
      />
    </div>
  );
}

function ThreePhase() {
  const [v, setV] = useState("400");
  const [i, setI] = useState("16");
  const [pf, setPf] = useState("0.9");
  const p = Math.sqrt(3) * num(v) * num(i) * num(pf);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Line-Line" unit="V" value={v} onChange={setV} />
        <Field label="Line current" unit="A" value={i} onChange={setI} />
        <Field label="Power factor" value={pf} onChange={setPf} />
      </div>
      <Result label="Real power" value={fmt(p / 1000, 2)} unit="kW" />
    </div>
  );
}
