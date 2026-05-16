import React from "react";
import { cn } from "../lib/utils";

export function TopologyNode({ label, ip, active, variant }: any) {
  const colorClass =
    variant === "attacker"
      ? "text-red-500"
      : variant === "monitor"
        ? "text-blue-500"
        : "text-slate-300";
  const bgClass =
    variant === "attacker"
      ? "bg-red-950/20 shadow-[0_0_10px_rgba(239,68,68,0.2)] border-red-500/30"
      : variant === "monitor"
        ? "bg-blue-950/20 border-blue-500/30"
        : "bg-slate-800/40 border-slate-700";

  return (
    <div
      className={cn(
        "p-2 border rounded flex justify-between items-center transition-all hover:translate-x-1",
        bgClass,
      )}
    >
      <div className="text-[11px] font-mono">
        <div className={cn("font-bold uppercase", colorClass)}>{label}</div>
        <div className="text-[9px] opacity-70 tracking-tighter">{ip}</div>
      </div>
      <div
        className={cn(
          "h-2 w-2 rounded-full",
          active
            ? "bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]"
            : variant === "monitor"
              ? "bg-blue-500"
              : "bg-green-500",
        )}
      ></div>
    </div>
  );
}
