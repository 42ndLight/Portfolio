import React, { useState, useEffect } from 'react';
import { Bolt, ArrowDownRight, CheckCircle2, ShieldAlert, Cpu, User, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  onOpenScoping: () => void;
  onExploreSystems: () => void;
  onOpenDiagnostics: () => void;
  onOpenProfile: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenScoping,
  onExploreSystems,
  onOpenDiagnostics,
  onOpenProfile
}) => {
  const [activeCommand, setActiveCommand] = useState<string>('ping -c 1 deploy.42ndlight.africa');
  const [terminalOutput, setTerminalOutput] = useState<string>('[200 OK - 0% loss - 14.2ms]');
  const [pingPulse, setPingPulse] = useState(14);

  // Live jitter on latency
  useEffect(() => {
    const interval = setInterval(() => {
      setPingPulse(Math.floor(13 + Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const runTerminalCommand = (cmd: string, output: string) => {
    setActiveCommand(cmd);
    setTerminalOutput('Executing...');
    setTimeout(() => {
      setTerminalOutput(output);
    }, 350);
  };

  return (
    <section id="hero" className="relative pt-10 md:pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#00FF66]/[0.04] blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#00E5FF]/[0.04] blur-[140px] rounded-full pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Hero Column */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* System Init Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#00FF66]/30 bg-[#00FF66]/[0.07] mb-6">
            <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse"></span>
            <span className="font-mono text-xs text-[#00FF66] font-semibold tracking-wider uppercase">
              SYSTEM READY // LATENCY {pingPulse}ms // NAIROBI_CLUSTER
            </span>
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12] mb-6 font-sans">
            Engineering{' '}
            <span className="text-[#00FF66] neon-text-green font-mono">Resilient Full-Stack</span>{' '}
            Systems &amp;{' '}
            <span className="text-[#00E5FF] neon-text-cyan font-mono">Offline-First</span>{' '}
            Architectures.
          </h1>

          {/* Subcopy */}
          <p className="font-sans text-base sm:text-lg text-[#99ab9f] leading-relaxed mb-8 max-w-2xl">
            Architecting zero-downtime platforms specializing in{' '}
            <span className="text-white font-mono text-sm px-2 py-0.5 rounded bg-white/5 border border-white/10">
              Django
            </span>
            ,{' '}
            <span className="text-white font-mono text-sm px-2 py-0.5 rounded bg-white/5 border border-white/10">
              Vue 3
            </span>
            , Cloud Infrastructure, and Scalable Backend Pipelines for mission-critical African &amp;
            global enterprise.
          </p>

          {/* Dual Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-9">
            <button
              id="hero-initiate-consultation-btn"
              onClick={onOpenScoping}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2.5 font-mono text-sm uppercase tracking-wider font-bold px-7 py-3.5 rounded bg-[#00FF66] text-black hover:bg-[#26ff7b] transition-all duration-200 shadow-neon-green cursor-pointer"
            >
              <span>[INITIATE CONSULTATION]</span>
              <Bolt className="w-4 h-4 fill-black" />
            </button>
            <button
              id="hero-explore-systems-btn"
              onClick={onExploreSystems}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 font-mono text-sm uppercase tracking-wider font-semibold px-6 py-3.5 rounded border border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/5 hover:bg-[#00E5FF]/15 hover:shadow-neon-cyan-sm transition-all duration-200 cursor-pointer"
            >
              <span>[EXPLORE SYSTEMS]</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>
          </div>

          {/* Live Terminal Output Bar with Interactive Simulator */}
          <div className="w-full max-w-xl bg-black/85 border border-[rgba(0,255,102,0.2)] rounded-lg p-3.5 font-mono text-xs text-[#00FF66]/90 shadow-2xl backdrop-blur-md relative group">
            {/* Terminal Window Chrome */}
            <div className="flex items-center justify-between border-b border-[rgba(0,255,102,0.15)] pb-2 mb-2.5 text-[11px] text-[#7d8b83]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#00FF66]/80"></span>
                <span className="ml-1.5 text-white/80 font-mono">bash - session #4210</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#00E5FF] font-mono">TLS 1.3 SECURE</span>
                <button
                  onClick={onOpenDiagnostics}
                  className="text-[10px] text-[#7d8b83] hover:text-[#00FF66] underline cursor-pointer"
                >
                  [TELEMETRY]
                </button>
              </div>
            </div>

            {/* Terminal Command Execution line */}
            <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
              <span className="text-[#00E5FF] font-bold">42ndlight@node01:~$</span>
              <span className="text-white">{activeCommand}</span>
              <span className="text-[#00FF66] font-semibold">{terminalOutput}</span>
              <span className="blinking-cursor"></span>
            </div>

            {/* Quick Command Selector Chips */}
            <div className="pt-2 border-t border-[rgba(0,255,102,0.1)] flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-[#7d8b83]">PRESETS:</span>
              <button
                onClick={() =>
                  runTerminalCommand(
                    'ping -c 1 deploy.42ndlight.africa',
                    '[200 OK - 0% loss - 14.2ms]'
                  )
                }
                className="text-[10px] px-2 py-0.5 rounded bg-black/50 border border-[rgba(0,255,102,0.2)] text-[#99ab9f] hover:text-[#00FF66] hover:border-[#00FF66]/40 cursor-pointer"
              >
                ping deploy
              </button>
              <button
                onClick={() =>
                  runTerminalCommand(
                    'systemctl status dexie-sync',
                    '[ACTIVE: 14,000 tx cached - 0 conflict]'
                  )
                }
                className="text-[10px] px-2 py-0.5 rounded bg-black/50 border border-[rgba(0,255,102,0.2)] text-[#99ab9f] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 cursor-pointer"
              >
                status dexie-sync
              </button>
              <button
                onClick={() =>
                  runTerminalCommand(
                    'curl -s kra.etims.gov.ke/vscu',
                    '[VSCU 2.1: SIGNED & COMPLIANT]'
                  )
                }
                className="text-[10px] px-2 py-0.5 rounded bg-black/50 border border-[rgba(0,255,102,0.2)] text-[#99ab9f] hover:text-[#00FF66] hover:border-[#00FF66]/40 cursor-pointer"
              >
                check eTIMS
              </button>
            </div>
          </div>
        </div>

        {/* Right Hero Photographic Portrait Card with HUD Telemetry */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            {/* Outer Cybernetic Container */}
            <div
              id="hero-telemetry-hud-card"
              className="relative bg-[#0d100e] border border-[rgba(0,255,102,0.18)] rounded-xl p-3 shadow-cyber-card transition-all duration-500 group hover:border-[#00FF66]/50"
            >
              {/* HUD Corner Brackets */}
              <div className="hud-bracket-tl"></div>
              <div className="hud-bracket-tr"></div>
              <div className="hud-bracket-bl"></div>
              <div className="hud-bracket-br"></div>

              {/* Top HUD Status Banner */}
              <div className="flex items-center justify-between font-mono text-[10px] text-[#7d8b83] px-2 py-1.5 border-b border-[rgba(0,255,102,0.15)] mb-2.5">
                <span className="text-[#00FF66] font-bold tracking-widest flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse"></span>
                  HUD_TELEMETRY.SYS
                </span>
                <span className="text-[#00E5FF] font-mono tracking-wider">[01° 17' S, 36° 49' E]</span>
              </div>

              {/* Photographic Portrait Image Container */}
              <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-square scanline bg-black">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD93RUkAqp9qJCx5PJlm7rdr3idgMLK_bdm1_t2QnUGk656ofAtoOhfP_s8E90eVYpzFkzhTalMPcUfV06jGqJ-zjowotFUGVwDAPqhMQ5K7DJqDwFrs_9jaLnykuW_efw9BN-SZeVT0yCfBYpX96qMjGtwHILiUhdrukFCwAuQKutvkxIAG7QrkS7-fnI48ZnSHpWir6ag-6Ry0YFVgbls_dKhTuz8BSQgwr5_iDvyZ1q0hri8F4E8kg"
                  alt="Kennedy Kinyua - Lead Software Architect in server environment"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Ambient Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

                {/* Floating Status Badges Inside Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="bg-black/85 backdrop-blur-md border border-[#00FF66]/40 px-2.5 py-1 rounded text-[11px] font-mono text-white flex items-center gap-1.5 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-[#00FF66]"></span>
                    <span className="font-bold tracking-wide">TECH LEAD / ARCHITECT</span>
                  </div>
                  <div className="bg-black/85 backdrop-blur-md border border-[#00E5FF]/40 px-2.5 py-1 rounded text-[11px] font-mono text-[#00E5FF] flex items-center gap-1 shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span className="font-bold">VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Telemetry Grid */}
              <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-center pt-1">
                <div className="bg-black/60 p-2 rounded border border-[rgba(0,255,102,0.15)]">
                  <div className="text-[10px] text-[#7d8b83] uppercase tracking-wider">STACK</div>
                  <div className="text-xs text-white font-bold mt-0.5">FULL-STACK</div>
                </div>
                <div className="bg-black/60 p-2 rounded border border-[rgba(0,255,102,0.15)]">
                  <div className="text-[10px] text-[#7d8b83] uppercase tracking-wider">STATUS</div>
                  <div className="text-xs text-[#00FF66] font-bold mt-0.5 flex items-center justify-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-ping"></span>
                    DEPLOYING
                  </div>
                </div>
                <div className="bg-black/60 p-2 rounded border border-[rgba(0,255,102,0.15)]">
                  <div className="text-[10px] text-[#7d8b83] uppercase tracking-wider">LOCATION</div>
                  <div className="text-xs text-[#00E5FF] font-bold mt-0.5">GLOBAL/KE</div>
                </div>
              </div>

              {/* Profile Screen Trigger Action */}
              <div className="mt-3 pt-2.5 border-t border-[rgba(0,255,102,0.15)] flex items-center justify-between">
                <button
                  id="hero-open-profile-btn"
                  onClick={onOpenProfile}
                  className="w-full font-mono text-xs font-semibold py-2 px-3 rounded bg-[#00FF66]/10 hover:bg-[#00FF66] text-[#00FF66] hover:text-black border border-[#00FF66]/30 transition-all flex items-center justify-center gap-2 cursor-pointer group/prof"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>[OPEN ARCHITECT PROFILE SCREEN]</span>
                  <ArrowDownRight className="w-3.5 h-3.5 -rotate-90 group-hover/prof:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
