import { Scissors } from "lucide-react";

export function SnapCutLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span
        className="flex size-9 items-center justify-center rounded-xl gradient-cta"
        aria-hidden="true"
      >
        <Scissors className="size-5" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        SnapCut <span className="text-gradient">AI</span>
      </span>
    </span>
  );
}
