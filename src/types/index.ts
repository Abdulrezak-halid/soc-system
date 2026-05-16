export interface SecurityAlert {
  id: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  type: string;
  sourceIp: string;
  targetIp: string;
  message: string;
  details: string;
  status: "active" | "mitigated" | "investigating";
}

export interface TrafficStats {
  packetsPerSecond: number;
  activeConnections: number;
  blockedThreats: number;
}
