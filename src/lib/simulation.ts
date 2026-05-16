import { SecurityAlert } from '../types';

export const triggerAttack = (type: string): SecurityAlert | null => {
  const now = new Date().toISOString();
  let newAlert: SecurityAlert | null = null;

  switch (type) {
    case "port-scan":
      newAlert = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: now,
        severity: "medium",
        type: "Port Scan",
        sourceIp: "192.168.56.10",
        targetIp: "192.168.56.20",
        message: "Sequential connection attempts detected",
        details: "Multiple ports (80, 443, 22, 21, 3306) scanned within 2 seconds. Matching Nmap stealth scan signature.",
        status: "active"
      };
      break;
    case "brute-force":
      newAlert = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: now,
        severity: "high",
        type: "SSH Brute Force",
        sourceIp: "192.168.56.10",
        targetIp: "192.168.56.20",
        message: "Repeated authentication failures",
        details: "50+ failed SSH login attempts for user 'admin' and 'root' from 192.168.56.10. High confidence Brute Force attack.",
        status: "active"
      };
      break;
    case "http-flood":
      newAlert = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: now,
        severity: "critical",
        type: "HTTP Flood / DoS",
        sourceIp: "192.168.56.10",
        targetIp: "192.168.56.20",
        message: "High traffic volume from single IP",
        details: "Received 5000+ GET requests per second from source IP. Target service latency increased by 400%.",
        status: "active"
      };
      break;
  }

  return newAlert;
};
