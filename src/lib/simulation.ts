import { AttackScenario, RawSecurityEvent, SecurityAlert } from "../types";

const id = () => Math.random().toString(36).substr(2, 9);

const buildEvents = (
  signature: string,
  protocol: RawSecurityEvent["protocol"],
  sourceIp: string,
  targetIp: string,
  action: RawSecurityEvent["action"],
  count: number,
): RawSecurityEvent[] =>
  Array.from({ length: count }, (_, index) => ({
    id: id(),
    timestamp: new Date(Date.now() - index * 650).toISOString(),
    eventId: 1000 + Math.floor(Math.random() * 9000),
    sourceIp,
    targetIp,
    protocol,
    action,
    signature,
  }));

export const triggerAttack = (type: string): AttackScenario | null => {
  const now = new Date().toISOString();
  let newAlert: SecurityAlert | null = null;
  let events: RawSecurityEvent[] = [];
  let trafficSpike = 0;

  switch (type) {
    case "port-scan":
      newAlert = {
        id: id(),
        timestamp: now,
        severity: "medium",
        type: "Port Scan",
        sourceIp: "192.168.56.10",
        targetIp: "192.168.56.20",
        message: "Sequential connection attempts detected",
        details:
          "Multiple ports (80, 443, 22, 21, 3306) scanned within 2 seconds. Matching Nmap stealth scan signature.",
        status: "active",
      };
      events = buildEvents(
        "SYN_SCAN_MULTIPORT",
        "TCP",
        "192.168.56.10",
        "192.168.56.20",
        "flagged",
        8,
      );
      trafficSpike = 55;
      break;
    case "brute-force":
      newAlert = {
        id: id(),
        timestamp: now,
        severity: "high",
        type: "SSH Brute Force",
        sourceIp: "192.168.56.10",
        targetIp: "192.168.56.20",
        message: "Repeated authentication failures",
        details:
          "50+ failed SSH login attempts for user 'admin' and 'root' from 192.168.56.10. High confidence Brute Force attack.",
        status: "active",
      };
      events = buildEvents(
        "SSH_AUTH_FAILURE_BURST",
        "SSH",
        "192.168.56.10",
        "192.168.56.20",
        "blocked",
        12,
      );
      trafficSpike = 95;
      break;
    case "http-flood":
      newAlert = {
        id: id(),
        timestamp: now,
        severity: "critical",
        type: "HTTP Flood / DoS",
        sourceIp: "192.168.56.10",
        targetIp: "192.168.56.20",
        message: "High traffic volume from single IP",
        details:
          "Received 5000+ GET requests per second from source IP. Target service latency increased by 400%.",
        status: "active",
      };
      events = buildEvents(
        "HTTP_GET_RATE_THRESHOLD",
        "HTTP",
        "192.168.56.10",
        "192.168.56.20",
        "blocked",
        18,
      );
      trafficSpike = 180;
      break;
  }

  if (!newAlert) {
    return null;
  }

  return {
    alert: newAlert,
    events,
    trafficSpike,
  };
};
