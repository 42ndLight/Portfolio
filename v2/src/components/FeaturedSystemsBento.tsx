import React from 'react';
import { ProjectArtifact } from '../types';
import { ArrowRight, ExternalLink, Cpu, Database, Server } from 'lucide-react';

interface FeaturedBentoProps {
  projects: ProjectArtifact[];
  onSelectProject: (project: ProjectArtifact) => void;
}

export const FeaturedSystemsBento: React.FC<FeaturedBentoProps> = ({
  projects,
  onSelectProject
}) => {
  const homepointPos = projects.find((p) => p.id === 'homepoint-pos') || projects[0];
  const kaziLine = projects.find((p) => p.id === 'kaziline') || projects[1];
  const invoiceEngine = projects.find((p) => p.id === 'invoice-engine') || projects[2];

  return (
    <section id="systems" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="font-mono text-xs text-[#00FF66] tracking-widest uppercase mb-2 flex items-center gap-2">
            <span className="w-4 h-px bg-[#00FF66]"></span>
            PROVEN MISSION-CRITICAL DEPLOYMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Featured Systems &amp; Deployments
          </h2>
        </div>
        <div className="font-mono text-xs text-[#7d8b83] bg-black/60 px-3 py-1.5 rounded border border-[rgba(0,255,102,0.15)]">
          PAYLESS AFRICA BENTO ARCHITECTURE // [V3.1]
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CARD 1: Large Bento Hero (Homepoint POS) - 8 cols */}
        {homepointPos && (
          <div
            id="bento-card-homepoint"
            className="lg:col-span-8 bg-[#0d100e] border border-[rgba(0,255,102,0.2)] hover:border-[#00FF66]/60 rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group hover:shadow-neon-green"
          >
            <div className="hud-bracket-tl"></div>
            <div className="hud-bracket-br"></div>

            <div>
              {/* Header Status Tag */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 font-semibold tracking-wide">
                  {homepointPos.artifactNumber} // {homepointPos.category}
                </span>
                <span className="font-mono text-xs text-[#00E5FF] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse"></span>
                  {homepointPos.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-[#00FF66] transition-colors mb-3">
                {homepointPos.title}
              </h3>
              <p className="text-[#99ab9f] text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                {homepointPos.description}
              </p>

              {/* System Architecture Blueprint Box */}
              <div className="p-4 rounded-lg bg-black/85 border border-[rgba(0,255,102,0.2)] font-mono text-xs mb-6 text-[#7d8b83] overflow-x-auto">
                <div className="text-[11px] text-[#00FF66] font-semibold mb-2 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#00FF66]" />
                  <span>SYSTEM SCHEMA: OFFLINE-FIRST FLOW</span>
                </div>
                <div className="text-white/90 whitespace-nowrap font-mono text-[11px] sm:text-xs">
                  {homepointPos.systemSchemaFlow}
                </div>
                <div className="text-[#00E5FF] text-[11px] mt-2">
                  {homepointPos.schemaStatus}
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
                {homepointPos.techTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded bg-black/60 border border-[rgba(0,255,102,0.18)] ${
                      tag.includes('Dexie')
                        ? 'text-[#00FF66] border-[#00FF66]/40'
                        : tag.includes('eTIMS')
                        ? 'text-[#00E5FF] border-[#00E5FF]/40'
                        : 'text-white'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[rgba(0,255,102,0.15)] flex items-center justify-between">
              <button
                id="view-homepoint-architecture-btn"
                onClick={() => onSelectProject(homepointPos)}
                className="font-mono text-xs uppercase tracking-wider text-[#00FF66] hover:text-white font-bold flex items-center gap-2 group-hover:translate-x-1 transition-all cursor-pointer"
              >
                <span>[View Architecture &amp; Case Study →]</span>
              </button>
              <span className="font-mono text-[11px] text-[#7d8b83]">
                {homepointPos.latencyStat}
              </span>
            </div>
          </div>
        )}

        {/* Right Column Stacked Bento Cards - 4 cols */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Card 2: KaziLine Workforce Manager */}
          {kaziLine && (
            <div
              id="bento-card-kaziline"
              className="bg-[#0d100e] border border-[rgba(0,255,102,0.18)] hover:border-[#00E5FF]/60 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 relative group hover:shadow-neon-cyan-sm flex-1"
            >
              <div className="hud-bracket-tr"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-semibold tracking-wide">
                    {kaziLine.artifactNumber} // {kaziLine.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#00FF66]">{kaziLine.badge}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors mb-2">
                  {kaziLine.title}
                </h3>
                <p className="text-[#99ab9f] text-xs leading-relaxed mb-4">
                  {kaziLine.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 font-mono text-[11px]">
                  {kaziLine.techTags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded bg-black/60 border border-[rgba(0,255,102,0.15)] ${
                        tag.includes('Africa') ? 'text-[#00E5FF]' : 'text-white'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[rgba(0,255,102,0.15)] flex items-center justify-between">
                <button
                  id="view-kaziline-architecture-btn"
                  onClick={() => onSelectProject(kaziLine)}
                  className="font-mono text-xs uppercase tracking-wider text-[#00E5FF] hover:text-white font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>[Launch Architecture Specs ↗]</span>
                </button>
                <span className="font-mono text-[10px] text-[#7d8b83]">
                  {kaziLine.throughputStat}
                </span>
              </div>
            </div>
          )}

          {/* Card 3: Automated Invoice & Quotation Engine */}
          {invoiceEngine && (
            <div
              id="bento-card-invoice"
              className="bg-[#0d100e] border border-[rgba(0,255,102,0.18)] hover:border-[#00FF66]/60 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 relative group hover:shadow-neon-green-sm flex-1"
            >
              <div className="hud-bracket-bl"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 font-semibold tracking-wide">
                    {invoiceEngine.artifactNumber} // {invoiceEngine.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#00E5FF]">{invoiceEngine.badge}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#00FF66] transition-colors mb-2">
                  {invoiceEngine.title}
                </h3>
                <p className="text-[#99ab9f] text-xs leading-relaxed mb-4">
                  {invoiceEngine.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 font-mono text-[11px]">
                  {invoiceEngine.techTags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded bg-black/60 border border-[rgba(0,255,102,0.15)] ${
                        tag.includes('FastAPI') ? 'text-[#00FF66]' : 'text-white'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[rgba(0,255,102,0.15)] flex items-center justify-between">
                <button
                  id="view-invoice-schema-btn"
                  onClick={() => onSelectProject(invoiceEngine)}
                  className="font-mono text-xs uppercase tracking-wider text-[#00FF66] hover:text-white font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-all cursor-pointer"
                >
                  <span>[Inspect Schema &amp; Flow →]</span>
                </button>
                <span className="font-mono text-[10px] text-[#7d8b83]">
                  {invoiceEngine.latencyStat}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
