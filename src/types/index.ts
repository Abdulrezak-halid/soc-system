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

export interface RawSecurityEvent {
  id: string;
  timestamp: string;
  eventId: number;
  sourceIp: string;
  targetIp: string;
  protocol: "TCP" | "UDP" | "HTTP" | "SSH";
  action: "allowed" | "blocked" | "flagged";
  signature: string;
}

export interface AttackScenario {
  alert: SecurityAlert;
  events: RawSecurityEvent[];
  trafficSpike: number;
}

export interface TrafficStats {
  packetsPerSecond: number;
  activeConnections: number;
  blockedThreats: number;
}
