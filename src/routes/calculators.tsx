import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Zap,
  Activity,
  Gauge,
  Cable,
  Palette,
  Calculator as CalcIcon,
  Cog,
  SlidersHorizontal,
  ShieldCheck,
  AlertTriangle,
  Settings2,
  Waves,
  BatteryCharging,
  Battery,
  Power,
  Fuel,
  Shield,
  Columns3,
  Home,
  Lightbulb,
} from "lucide-react";

export const Route = createFileRoute("/calculators")({
  head: () => ({
    meta: [
      { title: "Calculators — E-Light" },
      {
        name: "description",
        content:
          "Electrical engineering calculators: Ohm's law, power, voltage drop, wire size, motor FLC, VFD, breaker, short circuit, relay, ground fault, PF correction, UPS, battery backup, generator, earthing and busbar.",
      },
    ],
  }),
  component: Calculators,
});

type CalcId =
  | "ohms"
  | "power"
  | "drop"
  | "wire"
  | "color"
  | "flc"
  | "vfd"
  | "breaker"
  | "scc"
  | "relay"
  | "gfc"
  | "pfc"
  | "ups"
  | "battery"
  | "gensize"
  | "fuel"
  | "earth"
  | "busbar";

const calcs: { id: CalcId; name: string; desc: string; icon: typeof Zap }[] = [
  { id: "ohms", name: "Ohm's Law", desc: "V, I, R relationships", icon: Zap },
  { id: "power", name: "Power Calculator", desc: "Single & 3-phase power", icon: Activity },
  { id: "drop", name: "Voltage Drop", desc: "Drop across a cable run", icon: Gauge },
  { id: "wire", name: "Wire Size", desc: "Recommended AWG for load", icon: Cable },
  { id: "color", name: "Resistor Color Code", desc: "4-band decoder", icon: Palette },
  { id: "flc", name: "Motor FLC", desc: "Full-load current", icon: Cog },
  { id: "vfd", name: "VFD Frequency ↔ Speed", desc: "Hz to RPM", icon: SlidersHorizontal },
  { id: "breaker", name: "Breaker Sizing", desc: "Next standard rating", icon: ShieldCheck },
  { id: "scc", name: "Short Circuit Current", desc: "Fault current Isc", icon: AlertTriangle },
  { id: "relay", name: "Relay Setting", desc: "Overcurrent pickup", icon: Settings2 },
  { id: "gfc", name: "Ground Fault Current", desc: "Earth fault loop", icon: Waves },
  { id: "pfc", name: "Power Factor Correction", desc: "Capacitor kVAR", icon: Activity },
  { id: "ups", name: "UPS Sizing", desc: "VA from load", icon: BatteryCharging },
  { id: "battery", name: "Battery Backup Time", desc: "Runtime estimate", icon: Battery },
  { id: "gensize", name: "Generator Sizing", desc: "kVA from kW", icon: Power },
  { id: "fuel", name: "Generator Fuel", desc: "Diesel consumption", icon: Fuel },
  { id: "earth", name: "Earthing Conductor", desc: "IEC 60364 sizing", icon: Shield },
  { id: "busbar", name: "Busbar Sizing", desc: "Copper bar ampacity", icon: Columns3 },
];

function Calculators() {
  const [active, setActive] = useState<CalcId | null>(null);
  const current = calcs.find((c) => c.id === active);

  return (
    <AppShell>
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-8 pb-28 md:pb-8">


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
                  {active === "power" && <PowerCalc />}
                  {active === "drop" && <VDrop />}
                  {active === "wire" && <WireSize />}
                  {active === "color" && <ColorCode />}
                  {active === "flc" && <MotorFLC />}
                  {active === "vfd" && <VFD />}
                  {active === "breaker" && <Breaker />}
                  {active === "scc" && <ShortCircuit />}
                  {active === "relay" && <RelaySetting />}
                  {active === "gfc" && <GroundFault />}
                  {active === "pfc" && <PFCorrection />}
                  {active === "ups" && <UPSSize />}
                  {active === "battery" && <BatteryTime />}
                  {active === "gensize" && <GenSize />}
                  {active === "fuel" && <GenFuel />}
                  {active === "earth" && <Earthing />}
                  {active === "busbar" && <Busbar />}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
    </AppShell>
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

function PowerCalc() {
  const [phase, setPhase] = useState<"1" | "3">("1");
  const [v, setV] = useState("230");
  const [i, setI] = useState("10");
  const [pf, setPf] = useState("0.9");
  const p =
    phase === "1"
      ? num(v) * num(i) * num(pf)
      : Math.sqrt(3) * num(v) * num(i) * num(pf);
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["1", "3"] as const).map((p) => (
          <Button
            key={p}
            type="button"
            variant={phase === p ? "default" : "outline"}
            size="sm"
            onClick={() => setPhase(p)}
          >
            {p === "1" ? "1-Phase" : "3-Phase"}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Field label={phase === "1" ? "Voltage" : "Line-Line"} unit="V" value={v} onChange={setV} />
        <Field label="Current" unit="A" value={i} onChange={setI} />
        <Field label="PF" value={pf} onChange={setPf} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Real power" value={fmt(p)} unit="W" />
        <Result label="Real power" value={fmt(p / 1000, 2)} unit="kW" />
      </div>
    </div>
  );
}

function VDrop() {
  const [length, setLength] = useState("30");
  const [current, setCurrent] = useState("15");
  const [r, setR] = useState("8.89");
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
      <div className="h-2 rounded" style={{ background: colors[val]?.c ?? "#000" }} />
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

function MotorFLC() {
  const [hp, setHp] = useState("10");
  const [v, setV] = useState("400");
  const [eff, setEff] = useState("0.9");
  const [pf, setPf] = useState("0.85");
  const flc = (num(hp) * 746) / (Math.sqrt(3) * num(v) * num(eff) * num(pf));
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Motor" unit="HP" value={hp} onChange={setHp} />
        <Field label="Line-Line" unit="V" value={v} onChange={setV} />
        <Field label="Efficiency" value={eff} onChange={setEff} />
        <Field label="Power factor" value={pf} onChange={setPf} />
      </div>
      <Result label="Full-load current" value={fmt(flc, 2)} unit="A" />
    </div>
  );
}

function VFD() {
  const [f, setF] = useState("50");
  const [poles, setPoles] = useState("4");
  const [slip, setSlip] = useState("3");
  const sync = (120 * num(f)) / num(poles);
  const rpm = sync * (1 - num(slip) / 100);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Frequency" unit="Hz" value={f} onChange={setF} />
        <Field label="Poles" value={poles} onChange={setPoles} />
        <Field label="Slip" unit="%" value={slip} onChange={setSlip} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Synchronous" value={fmt(sync, 0)} unit="RPM" />
        <Result label="Motor speed" value={fmt(rpm, 0)} unit="RPM" />
      </div>
    </div>
  );
}

function Breaker() {
  const [load, setLoad] = useState("32");
  const [continuous, setContinuous] = useState("1.25");
  const standards = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600];
  const required = num(load) * num(continuous);
  const pick = standards.find((s) => s >= required);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Load current" unit="A" value={load} onChange={setLoad} />
        <Field label="Multiplier" value={continuous} onChange={setContinuous} placeholder="1.25 continuous" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Required" value={fmt(required, 1)} unit="A" />
        <Result label="Next standard" value={pick ? String(pick) : "—"} unit="A" />
      </div>
    </div>
  );
}

function ShortCircuit() {
  const [v, setV] = useState("400");
  const [z, setZ] = useState("0.05");
  const isc = num(v) / (Math.sqrt(3) * num(z));
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Line-Line" unit="V" value={v} onChange={setV} />
        <Field label="Loop impedance" unit="Ω" value={z} onChange={setZ} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Isc" value={fmt(isc, 0)} unit="A" />
        <Result label="Isc" value={fmt(isc / 1000, 2)} unit="kA" />
      </div>
    </div>
  );
}

function RelaySetting() {
  const [flc, setFlc] = useState("100");
  const [ct, setCt] = useState("150");
  const [mult, setMult] = useState("1.25");
  const pickup = num(flc) * num(mult);
  const setting = (pickup / num(ct)) * 100;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Load (FLC)" unit="A" value={flc} onChange={setFlc} />
        <Field label="CT primary" unit="A" value={ct} onChange={setCt} />
        <Field label="Multiplier" value={mult} onChange={setMult} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Pickup current" value={fmt(pickup, 1)} unit="A" />
        <Result label="Relay setting" value={fmt(setting, 1)} unit="%" />
      </div>
    </div>
  );
}

function GroundFault() {
  const [vln, setVln] = useState("230");
  const [zs, setZs] = useState("1.2");
  const igf = num(vln) / num(zs);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Phase-Neutral" unit="V" value={vln} onChange={setVln} />
        <Field label="Earth loop Zs" unit="Ω" value={zs} onChange={setZs} />
      </div>
      <Result label="Ground fault current" value={fmt(igf, 1)} unit="A" />
    </div>
  );
}

function PFCorrection() {
  const [p, setP] = useState("100");
  const [pf1, setPf1] = useState("0.75");
  const [pf2, setPf2] = useState("0.95");
  const q = num(p) * (Math.tan(Math.acos(num(pf1))) - Math.tan(Math.acos(num(pf2))));
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Real power" unit="kW" value={p} onChange={setP} />
        <Field label="Existing PF" value={pf1} onChange={setPf1} />
        <Field label="Target PF" value={pf2} onChange={setPf2} />
      </div>
      <Result label="Capacitor required" value={fmt(q, 2)} unit="kVAR" />
    </div>
  );
}

function UPSSize() {
  const [load, setLoad] = useState("1500");
  const [pf, setPf] = useState("0.8");
  const [headroom, setHeadroom] = useState("25");
  const va = (num(load) / num(pf)) * (1 + num(headroom) / 100);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Load" unit="W" value={load} onChange={setLoad} />
        <Field label="UPS PF" value={pf} onChange={setPf} />
        <Field label="Headroom" unit="%" value={headroom} onChange={setHeadroom} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="UPS size" value={fmt(va, 0)} unit="VA" />
        <Result label="UPS size" value={fmt(va / 1000, 2)} unit="kVA" />
      </div>
    </div>
  );
}

function BatteryTime() {
  const [ah, setAh] = useState("100");
  const [vb, setVb] = useState("48");
  const [load, setLoad] = useState("500");
  const [eff, setEff] = useState("0.85");
  const hours = (num(ah) * num(vb) * num(eff)) / num(load);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Battery capacity" unit="Ah" value={ah} onChange={setAh} />
        <Field label="Battery voltage" unit="V" value={vb} onChange={setVb} />
        <Field label="Load" unit="W" value={load} onChange={setLoad} />
        <Field label="Inverter eff." value={eff} onChange={setEff} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Backup time" value={fmt(hours, 2)} unit="h" />
        <Result label="Backup time" value={fmt(hours * 60, 0)} unit="min" />
      </div>
    </div>
  );
}

function GenSize() {
  const [kw, setKw] = useState("80");
  const [pf, setPf] = useState("0.8");
  const [margin, setMargin] = useState("25");
  const kva = (num(kw) / num(pf)) * (1 + num(margin) / 100);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Real load" unit="kW" value={kw} onChange={setKw} />
        <Field label="Power factor" value={pf} onChange={setPf} />
        <Field label="Margin" unit="%" value={margin} onChange={setMargin} />
      </div>
      <Result label="Generator size" value={fmt(kva, 1)} unit="kVA" />
    </div>
  );
}

function GenFuel() {
  // Approx diesel consumption (L/h) by load percentage of prime rating.
  const [kva, setKva] = useState("100");
  const [loadPct, setLoadPct] = useState("75");
  const lookup: Record<number, Record<number, number>> = {
    25: { 20: 4, 50: 8, 75: 12, 100: 16 },
    50: { 20: 7, 50: 14, 75: 19, 100: 25 },
    100: { 20: 12, 50: 24, 75: 33, 100: 42 },
    200: { 20: 22, 50: 41, 75: 56, 100: 73 },
    500: { 20: 50, 50: 95, 75: 132, 100: 170 },
    1000: { 20: 95, 50: 185, 75: 260, 100: 335 },
  };
  // Simple linear approx: 0.22 L/h per kW at full load.
  const kw = num(kva) * 0.8;
  const lph = kw * (num(loadPct) / 100) * 0.27;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Generator" unit="kVA" value={kva} onChange={setKva} />
        <Field label="Load" unit="%" value={loadPct} onChange={setLoadPct} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Consumption" value={fmt(lph, 1)} unit="L/h" />
        <Result label="Per 8 hours" value={fmt(lph * 8, 0)} unit="L" />
      </div>
      <p className="text-xs text-muted-foreground">
        Diesel approximation (~0.27 L/h per kW). Actual usage depends on engine model and ambient conditions.
        {lookup ? "" : ""}
      </p>
    </div>
  );
}

function Earthing() {
  // IEC 60364: A = sqrt(I^2 * t) / k
  const [i, setI] = useState("10000");
  const [t, setT] = useState("1");
  const [k, setK] = useState("143");
  const a = Math.sqrt(num(i) * num(i) * num(t)) / num(k);
  const standards = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400];
  const pick = standards.find((s) => s >= a);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Fault current" unit="A" value={i} onChange={setI} />
        <Field label="Duration" unit="s" value={t} onChange={setT} />
        <Field label="k factor" value={k} onChange={setK} placeholder="Cu PVC 143" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Min. area" value={fmt(a, 2)} unit="mm²" />
        <Result label="Standard size" value={pick ? String(pick) : "—"} unit="mm²" />
      </div>
    </div>
  );
}

function Busbar() {
  // Approximate copper busbar ampacity (A) = 1.2 * A_mm² for natural air cooling
  const [w, setW] = useState("40");
  const [t, setT] = useState("5");
  const area = num(w) * num(t);
  const ampacity = area * 1.2;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Width" unit="mm" value={w} onChange={setW} />
        <Field label="Thickness" unit="mm" value={t} onChange={setT} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Result label="Cross-section" value={fmt(area, 0)} unit="mm²" />
        <Result label="Approx ampacity" value={fmt(ampacity, 0)} unit="A" />
      </div>
      <p className="text-xs text-muted-foreground">
        Copper bar, natural convection. Derate for enclosure, ambient and stacking per IEC 61439.
      </p>
    </div>
  );
}
