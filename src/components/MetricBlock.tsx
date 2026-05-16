import React from 'react';
import { cn } from '../lib/utils';

export function MetricBlock({ label, value, sub, progress, variant }: any) {
  const isThreat = variant === "threat";
  return (
    <div
      className={cn(
        "p-4 flex flex-col justify-between group transition-colors",
        isThreat ? "bg-red-950/10 hover:bg-red-950/20" : "hover:bg-white/5",
      )}
    >
      <span
        className={cn(
          "text-[9px] font-mono uppercase tracking-tighter",
          isThreat ? "text-red-400" : "text-[#6B7280]",
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "text-2xl font-mono leading-none tracking-tighter my-1",
          isThreat ? "text-red-500" : "text-white",
        )}
      >
        {value}
      </div>
      {sub ? (
        <span
          className={cn(
            "text-[10px] font-mono opacity-60",
            isThreat ? "text-red-400" : "text-slate-500",
          )}
        >
          {sub}
        </span>
      ) : progress !== undefined ? (
        <div className="h-1 w-full bg-[#1F2937] mt-1 overflow-hidden rounded-full">
          <div
            className={cn(
              "h-full transition-all duration-1000",
              isThreat ? "bg-red-500" : "bg-blue-500",
            )}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
