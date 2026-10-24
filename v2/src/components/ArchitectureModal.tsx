import React, { useState } from 'react';
import { ProjectArtifact } from '../types';
import {
  X,
  Cpu,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  CheckCircle2,
  RefreshCw,
  Copy,
  Check,
  Play,
  ArrowRight
} from 'lucide-react';

interface ArchitectureModalProps {
  project: ProjectArtifact | null;
  onClose: () => void;
  onOpenScoping: (projectTitle: string) => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  project,
  onClose,
  onOpenScoping
}) => {
  if (!project) return null;

  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    project.flowNodes[0]?.id || ''
  );
  const [isSimulatingOffline, setIsSimulatingOffline] = useState(false);
  const [offlineCachedCount, setOfflineCachedCount] = useState(1420);
  const [syncStatus, setSyncStatus] = useState<'IDLE' | 'SYNCING' | 'RECONCILED'>('IDLE');
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);

  const selectedNode =
    project.flowNodes.find((n) => n.id === selectedNodeId) || project.flowNodes[0];

  const handleToggleOfflineSim = () => {
    if (!isSimulatingOffline) {
      setIsSimulatingOffline(true);
      setSyncStatus('IDLE');
      // simulate client writing offline
      setOfflineCachedCount((prev) => prev + 12);
    } else {
      setIsSimulatingOffline(false);
      setSyncStatus('SYNCING');
      setTimeout(() => {
        setSyncStatus('RECONCILED');
        setTimeout(() => setSyncStatus('IDLE'), 3500);
      }, 1200);
    }
  };

  const handleCopyBlueprint = () => {
    const text = `// ARCHITECTURAL BLUEPRINT: ${project.title}\n// Schema: ${project.systemSchemaFlow}\n// Client: ${project.architectureDetails.clientLayer}\n// Local Storage: ${project.architectureDetails.offlineStorage}\n// API Gateway: ${project.architectureDetails.apiGateway}\n// Cloud DB: ${project.architectureDetails.cloudDatabase}`;
    navigator.clipboard.writeText(text);
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2000);
  };

  return (
    <div
      id="architecture-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="architecture-modal-dialog"
        className="relative w-full max-w-5xl bg-[#080b09] border border-[#00FF66]/40 rounded-xl shadow-neon-green overflow-hidden my-auto"
      >
        {/* HUD corner brackets */}
        <div className="hud-bracket-tl"></div>
        <div className="hud-bracket-tr"></div>
        <div className="hud-bracket-bl"></div>
        <div className="hud-bracket-br"></div>

        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(0,255,102,0.2)] bg-black/60">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 font-semibold">
              {project.artifactNumber} // SPEC_DEEP_DIVE
            </span>
            <span className="font-mono text-xs text-[#00E5FF] hidden sm:inline">
              SYS.STATUS: OPERATIONAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyBlueprint}
              className="font-mono text-xs px-3 py-1.5 rounded border border-[rgba(0,255,102,0.2)] text-[#99ab9f] hover:text-[#00FF66] hover:border-[#00FF66] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy system blueprint"
            >
              {copiedBlueprint ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00FF66]" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">COPY BLUEPRINT</span>
                </>
              )}
            </button>

            <button
              id="architecture-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded text-[#7d8b83] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8 font-sans">
          {/* Project Title and Tags */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs text-[#00E5FF]">
              <span>[CATEGORY: {project.category}]</span>
              <span>•</span>
              <span>[{project.throughputStat}]</span>
              <span>•</span>
              <span className="text-[#00FF66]">[{project.latencyStat}]</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#99ab9f] max-w-3xl leading-relaxed">
              {project.subtitle} — {project.description}
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 mt-4 font-mono text-xs">
              {project.techTags.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-[#0d100e] border border-[rgba(0,255,102,0.25)] text-white font-medium flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66]"></span>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Overview Diagram Area */}
          <div className="border border-[rgba(0,255,102,0.25)] rounded-xl bg-black/75 p-5 sm:p-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <span className="font-mono text-xs text-[#00FF66] font-bold tracking-widest uppercase flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#00FF66]" />
                  INTERACTIVE ARCHITECTURE TOPOLOGY &amp; DATA FLOW
                </span>
                <p className="text-xs text-[#7d8b83] mt-1 font-mono">
                  Click any node to inspect payload vectors, state machine, and retry policies.
                </p>
              </div>

              {/* Interactive Offline Simulation Button */}
              <div className="flex items-center gap-2">
                <button
                  id="simulate-offline-dropout-btn"
                  onClick={handleToggleOfflineSim}
                  className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSimulatingOffline
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg'
                      : 'bg-[#00FF66]/10 border-[#00FF66]/30 text-[#00FF66] hover:bg-[#00FF66]/20'
                  }`}
                >
                  {isSimulatingOffline ? (
                    <>
                      <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>SIMULATING NETWORK DROPOUT</span>
                    </>
                  ) : (
                    <>
                      <Wifi className="w-3.5 h-3.5 text-[#00FF66]" />
                      <span>SIMULATE OFFLINE DROPOUT</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Offline Simulation Live Banner if active */}
            {isSimulatingOffline && (
              <div className="mb-4 p-3 rounded bg-amber-950/40 border border-amber-500/40 font-mono text-xs text-amber-200 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
                  <span>CLIENT DISCONNECTED FROM WAN. Writes buffering into Dexie.js append-only log.</span>
                </span>
                <span className="font-bold text-amber-400">QUEUED: {offlineCachedCount} TX</span>
              </div>
            )}

            {syncStatus === 'SYNCING' && (
              <div className="mb-4 p-3 rounded bg-[#00FF66]/15 border border-[#00FF66]/50 font-mono text-xs text-[#00FF66] flex items-center justify-between animate-pulse">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#00FF66]" />
                  <span>RECONNECTING... Flushing {offlineCachedCount} cached operations via REST Batch API</span>
                </span>
                <span className="font-bold">CONFLICT RESOLUTION: 100% OK</span>
              </div>
            )}

            {syncStatus === 'RECONCILED' && (
              <div className="mb-4 p-3 rounded bg-[#00E5FF]/15 border border-[#00E5FF]/50 font-mono text-xs text-[#00E5FF] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                  <span>RECONCILIATION COMPLETE: Zero inventory anomalies. Master ledger synced.</span>
                </span>
                <span className="font-bold">LATENCY: 0.02s</span>
              </div>
            )}

            {/* Flow diagram steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {project.flowNodes.map((node, index) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`text-left p-4 rounded-lg border transition-all duration-200 relative cursor-pointer ${
                      isSelected
                        ? 'bg-[#0d1510] border-[#00FF66] shadow-neon-green-sm'
                        : 'bg-[#070908] border-[rgba(0,255,102,0.15)] hover:border-[rgba(0,255,102,0.4)]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#7d8b83] mb-1.5">
                      <span>STEP 0{index + 1}</span>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isSimulatingOffline && index > 1
                            ? 'bg-amber-400'
                            : 'bg-[#00FF66]'
                        }`}
                      ></span>
                    </div>
                    <div className="font-mono text-sm font-bold text-white mb-1">
                      {node.name}
                    </div>
                    <div className="font-mono text-xs text-[#00E5FF] mb-2">{node.tech}</div>
                    <div className="text-[11px] text-[#99ab9f] line-clamp-2">
                      {node.role}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Node Inspector Drawer */}
            {selectedNode && (
              <div className="mt-4 p-4 rounded-lg bg-[#050706] border border-[rgba(0,255,102,0.2)] font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                  <span className="text-white font-bold flex items-center gap-2">
                    <span className="text-[#00FF66]">▶</span> NODE INSPECTOR: {selectedNode.name}
                  </span>
                  <span className="text-[#00E5FF]">TECH: {selectedNode.tech}</span>
                </div>
                <p className="text-[#99ab9f] mb-2">{selectedNode.notes}</p>
                <div className="text-[11px] text-[#7d8b83] flex items-center gap-4">
                  <span>ROLE: {selectedNode.role}</span>
                  <span>STATUS: {isSimulatingOffline ? 'DECOUPLED_SAFE' : 'NOMINAL'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Key Engineering Challenges Solved */}
          <div>
            <div className="font-mono text-xs text-[#00FF66] font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
              KEY ENGINEERING CHALLENGES &amp; PERFORMANCE BENCHMARKS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.engineeringChallenges.map((ch, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b0e0c] border border-[rgba(0,255,102,0.15)] p-5 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-mono text-xs text-white font-bold tracking-wide">
                      {ch.title}
                    </h4>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 font-semibold">
                      {ch.metric}
                    </span>
                  </div>
                  <p className="text-xs text-[#99ab9f] leading-relaxed font-sans">
                    {ch.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Layer Breakdown */}
          <div className="p-5 rounded-xl bg-[#090d0b] border border-[rgba(0,255,102,0.2)] font-mono text-xs space-y-3">
            <div className="text-[#00FF66] font-bold uppercase tracking-wider mb-2">
              STACK LAYERING &amp; DEPENDENCY SPECIFICATION
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#99ab9f]">
              <div>
                <span className="text-white font-bold">CLIENT LAYER: </span>
                <span>{project.architectureDetails.clientLayer}</span>
              </div>
              <div>
                <span className="text-white font-bold">OFFLINE STORAGE: </span>
                <span className="text-[#00FF66]">
                  {project.architectureDetails.offlineStorage}
                </span>
              </div>
              <div>
                <span className="text-white font-bold">API GATEWAY: </span>
                <span>{project.architectureDetails.apiGateway}</span>
              </div>
              <div>
                <span className="text-white font-bold">CLOUD DATABASE: </span>
                <span className="text-[#00E5FF]">
                  {project.architectureDetails.cloudDatabase}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="px-6 py-4 border-t border-[rgba(0,255,102,0.2)] bg-black/80 flex flex-wrap items-center justify-between gap-4">
          <button
            id="back-to-portfolio-btn"
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded border border-[rgba(0,255,102,0.2)] text-[#99ab9f] hover:text-white hover:border-white/40 transition-colors cursor-pointer"
          >
            [Back to Portfolio]
          </button>

          <div className="flex items-center gap-3">
            <button
              id="modal-scope-similar-btn"
              onClick={() => {
                onClose();
                onOpenScoping(project.title);
              }}
              className="font-mono text-xs uppercase tracking-wider font-bold px-6 py-2.5 rounded bg-[#00FF66] text-black hover:bg-[#2eff81] transition-all shadow-neon-green cursor-pointer flex items-center gap-2"
            >
              <span>[SCOPE ARCHITECTURE FOR YOUR SYSTEM]</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
