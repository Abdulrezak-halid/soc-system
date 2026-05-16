import React from 'react';

export function StatusLine({ label, status, isWarning }: any) {
  return (
    <div className="flex items-center justify-between text-[11px] font-mono">
      <span className="text-[#94A3B8]">{label}</span>
      <span className={isWarning ? "text-yellow-500" : "text-green-500"}>
        {status}
      </span>
    </div>
  );
}
