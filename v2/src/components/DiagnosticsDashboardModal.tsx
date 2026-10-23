import React, { useState, useEffect } from 'react';
import { GLOBAL_NODES } from '../data/portfolioData';
import {
  X,
  Activity,
  Terminal,
  Server,
  GitBranch,
  GitCommit,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Radio,
  ExternalLink
} from 'lucide-react';

interface DiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScoping: () => void;
}

export const DiagnosticsDashboardModal: React.FC<DiagnosticsModalProps> = ({
  isOpen,
  onClose,
  onOpenScoping
}) => {
  if (!isOpen) return null;

  const [liveNodes, setLiveNodes] = useState(GLOBAL_NODES);
  const [isRefreshingPing, setIsRefreshingPing] = useState(false);
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  const terminalLogs = [
    '2025-09-14 15:14:02.102 [INFO] AF-EAST-1 health check: 14ms (Optimal)',
    '2025-09-14 15:14:03.490 [INFO] Dexie.js offline conflict resolution daemon: 0 errors',
    '2025-09-14 15:14:04.812 [METRIC] M-Pesa webhook callback queue latency: 22ms',
    '2025-09-14 15:14:05.110 [SEC] TLS 1.3 session renegotiation successful for 42ndlight.africa',
    '2025-09-14 15:14:06.741 [DAEMON] KRA eTIMS VSCU signing worker heartbeat received',
    '2025-09-14 15:14:07.922 [RETAINER] Q2-Q3 capacity: 1 active deployment slot remaining'
  ];

  const triggerPingRefresh = () => {
    setIsRefreshingPing(true);
    setTimeout(() => {
      setLiveNodes((prev) =>
        prev.map((node) => ({
          ...node,
          latencyMs: Math.max(10, node.latencyMs + Math.floor((Math.random() - 0.45) * 6))
        }))
      );
      setIsRefreshingPing(false);
    }, 600);
  };

  // Activity heatmap blocks (simulated 24-week GitHub grid)
  const weeks = Array.from({ length: 20 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      // higher intensity on weekdays
      const intensity = d < 5 ? (w % 3 === 0 ? 3 : w % 2 === 0 ? 2 : 1) : (w % 4 === 0 ? 1 : 0);
      return intensity;
    })
  );

  return (
    <div
      id="diagnostics-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto font-sans"
    >
      <div
        id="diagnostics-modal-dialog"
        className="relative w-full max-w-5xl bg-[#060807] border border-[#00FF66]/50 rounded-xl shadow-neon-green overflow-hidden my-auto"
      >
        <div className="hud-bracket-tl"></div>
        <div className="hud-bracket-tr"></div>
        <div className="hud-bracket-bl"></div>
        <div className="hud-bracket-br"></div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(0,255,102,0.2)] bg-black/80">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 font-semibold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-ping"></span>
              SYS.DIAGNOSTICS // LIVE TELEMETRY DASHBOARD
            </span>
            <span className="font-mono text-xs text-[#00E5FF] hidden sm:inline">
              NODE: AF-EAST-1 [NAIROBI]
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerPingRefresh}
              disabled={isRefreshingPing}
              className="font-mono text-xs px-3 py-1 rounded border border-[rgba(0,255,102,0.2)] text-[#99ab9f] hover:text-[#00FF66] flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshingPing ? 'animate-spin' : ''}`} />
              <span>TEST PINGS</span>
            </button>

            <button
              id="diagnostics-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded text-[#7d8b83] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto space-y-6">
          {/* Status Grid - Simulated terminal lines */}
          <div>
            <div className="font-mono text-xs text-[#00FF66] font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00FF66]" />
              ACTIVE SYSTEM DIAGNOSTICS &amp; CAPACITY TELEMETRY
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
              <div className="bg-[#0b0f0c] border border-[rgba(0,255,102,0.25)] p-3.5 rounded-lg">
                <div className="text-[#7d8b83] text-[10px] uppercase">CORE STATUS</div>
                <div className="text-white font-bold text-sm mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse"></span>
                  [SYSTEM: ONLINE]
                </div>
                <div className="text-[10px] text-[#00FF66] mt-1">Uptime: 99.98% / SLA</div>
              </div>

              <div className="bg-[#0b0f0c] border border-[rgba(0,255,102,0.25)] p-3.5 rounded-lg">
                <div className="text-[#7d8b83] text-[10px] uppercase">ENGINEERING LOAD</div>
                <div className="text-white font-bold text-sm mt-1">
                  [1 ACTIVE DEPLOYMENT]
                </div>
                <div className="text-[10px] text-[#00E5FF] mt-1">Capacity: 1 Slot Open</div>
              </div>

              <div className="bg-[#0b0f0c] border border-[rgba(0,255,102,0.25)] p-3.5 rounded-lg">
                <div className="text-[#7d8b83] text-[10px] uppercase">COORDINATES &amp; TIMEZONE</div>
                <div className="text-white font-bold text-sm mt-1">
                  [LOCATION: NAIROBI, KE]
                </div>
                <div className="text-[10px] text-[#99ab9f] mt-1">EAT (UTC+3) / Global Ready</div>
              </div>

              <div className="bg-[#0b0f0c] border border-[rgba(0,255,102,0.25)] p-3.5 rounded-lg">
                <div className="text-[#7d8b83] text-[10px] uppercase">HOST CLUSTER</div>
                <div className="text-white font-bold text-sm mt-1">
                  [CLUSTER: AF-EAST-1]
                </div>
                <div className="text-[10px] text-[#00FF66] mt-1">Hardware: Container Pods</div>
              </div>
            </div>
          </div>

          {/* Global Node Latency Monitor */}
          <div className="bg-[#0a0d0b] border border-[rgba(0,255,102,0.2)] rounded-xl p-5 font-mono text-xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-bold flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#00E5FF]" />
                GLOBAL EDGE NODE ROUND-TRIP LATENCY (ICMP PING)
              </span>
              <span className="text-[11px] text-[#7d8b83]">REFRESH RATE: 4s</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {liveNodes.map((node) => (
                <div
                  key={node.code}
                  className="bg-black/70 border border-white/10 p-3 rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[#7d8b83] text-[10px]">{node.region}</div>
                    <div className="text-white font-bold">{node.city}</div>
                    <div className="text-[#00E5FF] text-[10px]">{node.code}</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[#00FF66] font-bold text-base">
                      {node.latencyMs}ms
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30">
                      {node.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOSS Contributions & Stack Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* GitHub Matrix Heat Grid - 7 cols */}
            <div className="lg:col-span-7 bg-[#0a0d0b] border border-[rgba(0,255,102,0.2)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <span className="text-white font-bold flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-[#00FF66]" />
                  OPEN-SOURCE ACTIVITY &amp; PRODUCTION COMMITS
                </span>
                <span className="text-[#00FF66]">842 Commits (2024-2025)</span>
              </div>

              {/* Heat map visual */}
              <div className="p-3 bg-black/60 rounded-lg border border-white/5 overflow-x-auto">
                <div className="flex gap-1">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                      {week.map((val, dIdx) => {
                        const bgColors = [
                          'bg-[#121614]',
                          'bg-[#00FF66]/25',
                          'bg-[#00FF66]/60',
                          'bg-[#00FF66]'
                        ];
                        return (
                          <div
                            key={dIdx}
                            className={`w-2.5 h-2.5 rounded-xs ${bgColors[val]}`}
                            title={`Activity Intensity: Level ${val}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#7d8b83] mt-2">
                  <span>20 WEEKS SPRINT LOG</span>
                  <div className="flex items-center gap-1.5">
                    <span>Less</span>
                    <div className="w-2 h-2 bg-[#121614] rounded-xs"></div>
                    <div className="w-2 h-2 bg-[#00FF66]/25 rounded-xs"></div>
                    <div className="w-2 h-2 bg-[#00FF66]/60 rounded-xs"></div>
                    <div className="w-2 h-2 bg-[#00FF66] rounded-xs"></div>
                    <span>More</span>
                  </div>
                </div>
              </div>

              {/* Active FOSS Repos */}
              <div className="mt-4 space-y-2 font-mono text-xs">
                <div className="p-2.5 rounded bg-black/50 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <GitBranch className="w-3.5 h-3.5 text-[#00FF66]" />
                    <span className="font-bold">42ndlight/dexie-offline-queue</span>
                  </div>
                  <span className="text-[10px] text-[#00E5FF]">v2.4.1 [TypeScript]</span>
                </div>
                <div className="p-2.5 rounded bg-black/50 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <GitBranch className="w-3.5 h-3.5 text-[#00FF66]" />
                    <span className="font-bold">42ndlight/kra-etims-vscu-client</span>
                  </div>
                  <span className="text-[10px] text-[#00FF66]">v1.8.0 [Python]</span>
                </div>
              </div>
            </div>

            {/* Stack Allocation Radar - 5 cols */}
            <div className="lg:col-span-5 bg-[#0a0d0b] border border-[rgba(0,255,102,0.2)] rounded-xl p-5 font-mono text-xs">
              <div className="text-white font-bold mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00E5FF]" />
                CURRENT TECHNICAL FOCUS ALLOCATION
              </div>

              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-white">BACKEND &amp; DISTRIBUTED PIPELINES</span>
                    <span className="text-[#00FF66]">40%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#00FF66] h-full w-[40%]"></div>
                  </div>
                  <div className="text-[10px] text-[#7d8b83] mt-0.5">
                    Django, FastAPI, PostgreSQL, Redis Streams
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-white">OFFLINE-FIRST &amp; PWA STORAGE</span>
                    <span className="text-[#00E5FF]">35%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#00E5FF] h-full w-[35%]"></div>
                  </div>
                  <div className="text-[10px] text-[#7d8b83] mt-0.5">
                    Dexie.js, IndexedDB, Web Workers, Hardware Drivers
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-white">CLOUD, DOCKER &amp; FINTECH APIS</span>
                    <span className="text-white/80">25%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-white/80 h-full w-[25%]"></div>
                  </div>
                  <div className="text-[10px] text-[#7d8b83] mt-0.5">
                    Docker, Nginx, Safaricom Daraja, Africa's Talking
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live System Log Box */}
          <div className="p-4 rounded-xl bg-black/90 border border-[rgba(0,255,102,0.2)] font-mono text-xs text-[#7d8b83]">
            <div className="text-white font-bold mb-2 flex items-center justify-between border-b border-white/10 pb-1.5">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#00FF66]" />
                SYSTEM_HEARTBEAT_STREAM.LOG
              </span>
              <span className="text-[10px] text-[#00FF66]">STREAM ACTIVE</span>
            </div>
            <div className="space-y-1">
              {terminalLogs.map((log, i) => (
                <div key={i} className="hover:text-white transition-colors">
                  <span className="text-[#00FF66]">▶</span> {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-4 border-t border-[rgba(0,255,102,0.2)] bg-black/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="font-mono text-xs uppercase px-5 py-2 rounded border border-[rgba(0,255,102,0.2)] text-[#99ab9f] hover:text-white cursor-pointer"
          >
            [CLOSE CONSOLE]
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenScoping();
            }}
            className="font-mono text-xs uppercase font-bold px-6 py-2.5 rounded bg-[#00FF66] text-black hover:bg-[#2eff81] transition-all shadow-neon-green flex items-center gap-2 cursor-pointer"
          >
            <span>[RESERVE REMAINING DEPLOYMENT SLOT]</span>
          </button>
        </div>
      </div>
    </div>
  );
};
