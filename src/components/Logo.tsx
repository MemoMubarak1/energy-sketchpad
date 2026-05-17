import logo from "@/assets/elight-logo.png";

export function Logo({ className = "h-10" }: { className?: string }) {
  return <img src={logo} alt="E-Light" className={className} />;
}
