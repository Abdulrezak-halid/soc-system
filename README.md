# Mini SOC System 🛡️

A frontend simulation of a Security Operations Center (SOC) dashboard. This project provides a fully static UI with simulated real-time traffic statistics and security alerts, suitable for demonstration purposes.

## Features ✨

- **Mock Attack Simulation**: Trigger Port Scans, SSH Brute Force, and HTTP Floods internally to demonstrate UI responsiveness.
- **Dynamic Traffic Monitoring**: Visualizes mocked network traffic streams using Recharts area charts.
- **Incident Evidence Stream**: Live-updating log table of simulated security incidents.
- **Topology View**: Visual mapping of the simulated network environment.
- **Vercel-Ready**: Entirely client-side deployment architecture, perfectly configured for scaling on Vercel Edge.

## Tech Stack 🛠️

- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **Framer Motion**
- **Recharts**
- **Lucide React**

## Getting Started 🚀

To run this project locally:

1. **Install Dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Start the Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Navigate to the local URL provided in the console.

3. **Build for Production:**
   \`\`\`bash
   npm run build
   \`\`\`

## Deployment 🌐

This project requires exactly zero backend components and is structurally optimized for static deployment on **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Ensure the Framework Preset is set to **Vite**.
3. Use the Default Build Command: \`npm run build\`
4. The application handles route fallbacks natively using the provided \`vercel.json\`.

## Project Structure 📁

- \`/src/components\` - Contains modular UI parts (TopologyNode, MetricBlocks)
- \`/src/lib\` - Utility functions, including the \`simulation.ts\` which mocks backend event cycles.
- \`/src/types\` - Unified TypeScript interfaces for Alerts and Traces.
- \`vercel.json\` - Handles Vercel standard SPA fallbacks.
