import React from 'react';
import { DIAGNOSTIC_METRICS } from '../data/portfolioData';
import { Activity, ArrowUpRight } from 'lucide-react';

interface SystemDiagnosticsBarProps {
  onOpenDiagnostics: () => void;
}

export const SystemDiagnosticsBar: React.FC<SystemDiagnosticsBarProps> = ({
  onOpenDiagnostics
}) => {
  return (
    <section
      id="diagnostics"
      className="py-10 border-y border-[rgba(0,255,102,0.18)] bg-[#070908]/90 backdrop-blur-md relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Diagnostics Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 bg-[#00FF66] inline-block shadow-neon-green-sm"></span>
            <span className="font-mono text-xs text-[#00FF66] font-bold uppercase tracking-widest">
              DIAGNOSTIC_METRICS // INFRASTRUCTURE BENCHMARKS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-[#7d8b83] hidden sm:inline">
              CYCLE: REALTIME // REGION: GLOBAL
            </span>
            <button
              id="diagnostics-open-console-btn"
              onClick={onOpenDiagnostics}
              className="font-mono text-[11px] text-[#00E5FF] hover:text-white flex items-center gap-1 border border-[#00E5FF]/30 px-2 py-0.5 rounded bg-[#00E5FF]/5 transition-colors cursor-pointer"
            >
              <Activity className="w-3 h-3 text-[#00E5FF]" />
              <span>[LIVE CONSOLE]</span>
            </button>
          </div>
        </div>

        {/* 4 Diagnostics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIAGNOSTIC_METRICS.map((metric) => {
            const isGreen = metric.color === 'green';
            return (
              <div
                key={metric.id}
                id={`metric-card-${metric.id}`}
                onClick={onOpenDiagnostics}
                className={`bg-[#0d100e] border border-[rgba(0,255,102,0.15)] hover:border-${
                  isGreen ? '[#00FF66]/60' : '[#00E5FF]/60'
                } p-5 rounded-lg transition-all duration-300 relative group cursor-pointer ${
                  isGreen ? 'hover:shadow-neon-green-sm' : 'hover:shadow-neon-cyan-sm'
                }`}
              >
                {/* Metric Header */}
                <div className="font-mono text-[11px] text-[#7d8b83] uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>{metric.label}</span>
                  <span className={isGreen ? 'text-[#00FF66]' : 'text-[#00E5FF]'}>
                    {metric.numberTag}
                  </span>
                </div>

                {/* Big Number */}
                <div
                  className={`font-mono text-4xl font-extrabold text-white group-hover:${
                    isGreen ? 'text-[#00FF66]' : 'text-[#00E5FF]'
                  } transition-colors ${
                    isGreen ? 'neon-text-green' : 'neon-text-cyan'
                  }`}
                >
                  {metric.value}
                </div>

                {/* Explanation */}
                <p className="font-sans text-xs text-[#99ab9f] mt-2 leading-relaxed">
                  {metric.description}
                </p>

                {/* Sub-trend telemetry */}
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#7d8b83]">
                  <span>{metric.trend}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#7d8b83] group-hover:text-white transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
