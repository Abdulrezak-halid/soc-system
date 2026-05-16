import React, { useState, useEffect } from "react";
import { Shield, Activity, Terminal, Network, Cpu, Zap } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "./lib/utils";
import { SecurityAlert, TrafficStats } from "./types";
import { triggerAttack } from "./lib/simulation";
import { TopologyNode } from "./components/TopologyNode";
import { StatusLine } from "./components/StatusLine";
import { MetricBlock } from "./components/MetricBlock";

export default function App() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [stats, setStats] = useState<TrafficStats>({
    packetsPerSecond: 0,
    activeConnections: 0,
    blockedThreats: 0,
  });
  const [trafficHistory, setTrafficHistory] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Clock
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // Mock Traffic Generator
    const trafficTimer = setInterval(() => {
      const newStats = {
        packetsPerSecond: 10 + Math.floor(Math.random() * 20),
        activeConnections: 5 + Math.floor(Math.random() * 5),
        blockedThreats: alerts.length,
      };

      setStats(newStats);
      setTrafficHistory((prev) => {
        const next = [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            val: newStats.packetsPerSecond,
          },
        ];
        return next.slice(-20);
      });
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(trafficTimer);
    };
  }, [alerts]);

  const simulateAttack = (type: string) => {
    const newAlert = triggerAttack(type);
    if (newAlert) {
      setAlerts((prev) => [newAlert, ...prev]);
    }
  };

  return (
    <div className="h-screen bg-bg-deep text-[#D1D5DB] font-sans flex flex-col overflow-hidden selection:bg-blue-500/30">
      <header className="h-16 border-b border-border-dim bg-bg-panel flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
          <h1 className="font-mono font-bold text-lg tracking-widest text-white uppercase">
            MINI-SOC // ALPHA_V1.04
          </h1>
          <span className="px-2 py-0.5 border border-blue-500/50 text-blue-400 text-[10px] font-mono rounded uppercase">
            System Active
          </span>
        </div>
        <div className="flex items-center gap-8 font-mono text-xs">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-text-dim uppercase text-[9px]">
              System Uptime
            </span>
            <span className="text-white tracking-widest">142:45:12:09</span>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-text-dim uppercase text-[9px]">
              Environment
            </span>
            <span className="text-white">VERCEL_EDGE</span>
          </div>
          <div className="text-right text-blue-400 min-w-25">
            <div className="text-lg leading-none font-bold tabular-nums">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-[9px] uppercase tracking-tighter">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>

      <main className="grow flex overflow-hidden">
        {/* Sidebar: Network Topology & Simulators */}
        <aside className="w-68 border-r border-border-dim bg-[#0F172A]/50 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          <div className="p-4 border-b border-border-dim bg-[#1E293B]/30 mb-2">
            <h2 className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Network className="w-3 h-3" /> Network Topology
            </h2>
            <div className="space-y-2">
              <TopologyNode
                label="KALI_ATTACKER"
                ip="192.168.56.10"
                active
                variant="attacker"
              />
              <TopologyNode label="UBUNTU_PROD" ip="192.168.56.20" />
              <TopologyNode label="WIN_TARGET_01" ip="192.168.56.30" />
              <TopologyNode
                label="MONITOR_NODE"
                ip="192.168.56.40"
                variant="monitor"
              />
            </div>
          </div>

          <div className="p-4 border-b border-border-dim">
            <h2 className="text-[10px] font-mono text-text-dim uppercase tracking-widest mb-3 flex items-center gap-2">
              <Zap className="w-3 h-3" /> Attack Simulator
            </h2>
            <div className="space-y-1.5">
              <button
                onClick={() => simulateAttack("port-scan")}
                className="w-full text-left p-2 border border-border-dim bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 rounded text-[11px] font-mono transition-all group"
              >
                <span className="text-blue-400 group-hover:text-blue-300">
                  # LAUNCH_PORT_SCAN
                </span>
              </button>
              <button
                onClick={() => simulateAttack("brute-force")}
                className="w-full text-left p-2 border border-border-dim bg-white/5 hover:bg-amber-500/10 hover:border-amber-500/30 rounded text-[11px] font-mono transition-all group"
              >
                <span className="text-amber-400 group-hover:text-amber-300">
                  # SSH_BRUTE_FORCE
                </span>
              </button>
              <button
                onClick={() => simulateAttack("http-flood")}
                className="w-full text-left p-2 border border-border-dim bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 rounded text-[11px] font-mono transition-all group"
              >
                <span className="text-red-400 group-hover:text-red-300">
                  # HTTP_FLOOD_SIM
                </span>
              </button>
            </div>
          </div>

          <div className="p-4 grow">
            <h2 className="text-[10px] font-mono text-text-dim uppercase tracking-widest mb-3">
              Engine Status
            </h2>
            <div className="space-y-1.5">
              <StatusLine label="Brute Force Filter" status="RUNNING" />
              <StatusLine label="Port Scan Analyzer" status="RUNNING" />
              <StatusLine label="DoS Threshold" status="PENDING" isWarning />
              <StatusLine label="PCAP Streamer" status="RUNNING" />
            </div>
          </div>
        </aside>

        <div className="grow flex flex-col overflow-hidden relative">
          <div className="h-28 border-b border-border-dim grid grid-cols-1 md:grid-cols-4 divide-x divide-border-dim shrink-0 bg-bg-deep">
            <MetricBlock
              label="Packets / Sec"
              value={stats.packetsPerSecond.toLocaleString()}
              progress={30}
            />
            <MetricBlock
              label="Active Threats"
              value={alerts.length.toString()}
              variant="threat"
              sub="Security alerts logged"
            />
            <MetricBlock
              label="Avg Packet Rate"
              value="1.2k p/s"
              progress={75}
            />
            <MetricBlock
              label="Primary Target"
              value="192.168.56.20"
              sub="Ubuntu Prod Server"
            />
          </div>

          {/* Traffic Chart Layer */}
          <div className="px-6 py-4 bg-bg-panel/30 border-b border-border-dim h-40 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                Global Ingress Stream
              </span>
              <Activity className="w-3 h-3 text-red-500 animate-pulse" />
            </div>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficHistory}>
                  <defs>
                    <linearGradient
                      id="colorTraffic"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis dataKey="time" hide />
                  <YAxis
                    stroke="rgba(255,255,255,0.2)"
                    fontSize={9}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #1F2937",
                      color: "#fff",
                      fontSize: "9px",
                    }}
                  />
                  <Area
                    type="stepAfter"
                    dataKey="val"
                    stroke="#3b82f6"
                    fill="url(#colorTraffic)"
                    strokeWidth={1}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alert Stream Table */}
          <div className="grow flex flex-col overflow-hidden bg-bg-deep">
            <div className="bg-bg-panel px-4 py-2 border-b border-border-dim flex justify-between items-center shrink-0">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">
                Incident Evidence Stream
              </span>
              <div className="flex gap-4">
                <span className="text-[10px] font-mono text-red-500 font-bold">
                  [ACTIVE:{" "}
                  {
                    alerts.filter(
                      (a) => a.severity === "critical" || a.severity === "high",
                    ).length
                  }
                  ]
                </span>
                <span className="text-[10px] font-mono text-white/40 tracking-tighter">
                  SYSLOG_FEED_V4
                </span>
              </div>
            </div>

            <div className="grow overflow-auto custom-scrollbar font-mono text-[11px]">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-bg-deep/95 backdrop-blur-sm z-10 shadow-sm shadow-black">
                  <tr className="text-left text-[#4B5563] border-b border-border-dim uppercase text-[10px]">
                    <th className="p-3 w-1/6">Timestamp</th>
                    <th className="p-3 w-32">Priority</th>
                    <th className="p-3 w-1/4">Source IP</th>
                    <th className="p-3">Alert Pattern</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dim">
                  <AnimatePresence initial={false}>
                    {alerts.map((alert) => (
                      <motion.tr
                        key={alert.id}
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        className={cn(
                          "transition-colors group",
                          alert.severity === "critical"
                            ? "bg-red-950/10 text-red-400 hover:bg-red-950/20"
                            : alert.severity === "high"
                              ? "bg-amber-950/10 text-amber-500 hover:bg-amber-950/20"
                              : "text-slate-300 hover:bg-white/5",
                        )}
                      >
                        <td className="p-3 whitespace-nowrap text-white/50">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="p-3 font-bold uppercase">
                          {alert.severity}
                        </td>
                        <td className="p-3 tracking-tighter">
                          {alert.sourceIp}
                        </td>
                        <td className="p-3 line-clamp-1">
                          {alert.type}: {alert.message}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Console Footer */}
          <div className="h-44 border-t border-border-dim bg-[#0A0A0A] p-4 flex gap-4 shrink-0">
            <div className="grow flex flex-col min-w-0">
              <div className="text-[10px] font-mono text-text-dim uppercase mb-1 tracking-widest flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Runtime Security Logs
              </div>
              <div className="grow bg-[#050505] p-3 rounded border border-border-dim font-mono text-[10px] text-green-500/80 overflow-y-auto custom-scrollbar leading-relaxed">
                <div className="opacity-50">
                  [SYSTEM] Initializing detection matrices... done.
                </div>
                <div>
                  [DEBUG] Edge Runtime: Sniffing on eth0 (192.168.56.40)...
                </div>
                {alerts.length > 0 &&
                  alerts.slice(0, 5).map((a) => (
                    <div key={a.id} className="text-blue-400/80">
                      [ENGINE] {a.type}Detector: Signature matched. Source:{" "}
                      {a.sourceIp}.
                    </div>
                  ))}
                {alerts.length > 0 && (
                  <div className="text-red-500 animate-pulse">
                    [ALERT] Broadcast packet sent to dashboard.
                  </div>
                )}
                <div className="text-white/20">_ cursor_blink</div>
              </div>
            </div>
            <div className="w-80 bg-slate-900/50 rounded border border-border-dim p-4 flex flex-col justify-between shrink-0">
              <div className="text-[10px] font-mono text-blue-400 uppercase font-bold flex items-center gap-2">
                <Shield className="w-3 h-3" /> SOC RECOMMENDATION
              </div>
              <div className="text-[11px] font-mono leading-tight mt-2 text-slate-300 italic">
                {alerts.length > 0
                  ? `"Detected ${alerts[0].type} from ${alerts[0].sourceIp}. Immediate isolation recommended via iptables. Block incoming on relevant ports."`
                  : `"No active threats detected. System monitoring baseline traffic. Ensure all virtual nodes are connected."`}
              </div>
              <button
                onClick={() => window.print()}
                className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-[10px] uppercase font-bold rounded transition-colors"
              >
                Generate Incident Report (PDF)
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Status Bar Footer */}
      <footer className="h-7 bg-bg-panel border-t border-border-dim flex items-center justify-between px-4 text-[9px] font-mono text-slate-500 uppercase shrink-0">
        <div className="flex gap-4">
          <div>
            SOC NODE: <span className="text-green-500">192.168.56.40:3000</span>
          </div>
          <div className="text-white/20">|</div>
          <div>
            STATUS: <span className="text-white">OPERATIONAL</span>
          </div>
        </div>
        <div className="hidden sm:flex gap-6 italic">
          <span className="flex items-center gap-1">
            <Cpu className="w-2.5 h-2.5" /> CPU: 12%
          </span>
          <span>RAM: 1.4GB / 4GB</span>
          <span className="text-blue-400">WS_IO: LOCAL_MOCK</span>
        </div>
        <div className="tracking-widest">MINI SOC ENGINE V1.0</div>
      </footer>
    </div>
  );
}
