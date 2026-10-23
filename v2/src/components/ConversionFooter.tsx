import React, { useState } from 'react';
import { MessageSquare, Mail, Copy, Check, ShieldCheck, User, BookOpen, ExternalLink } from 'lucide-react';
import { BLOG_SITE_CONFIG } from '../data/portfolioData';

interface ConversionFooterProps {
  onOpenScoping: () => void;
  onOpenProfile?: () => void;
}

export const ConversionFooter: React.FC<ConversionFooterProps> = ({
  onOpenScoping,
  onOpenProfile
}) => {
  const [copiedPgp, setCopiedPgp] = useState(false);
  const [showColophon, setShowColophon] = useState(false);
  const pgpKey = '42F9 8B21 A0C4 513E E790';

  const copyPgpToClipboard = () => {
    navigator.clipboard.writeText(pgpKey);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2500);
  };

  return (
    <footer className="relative">
      {/* SECTION 5: HIGH-IMPACT CONVERSION FOOTER & CTA */}
      <section
        id="contact"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative"
      >
        <div className="bg-[#0d100e] border border-[#00FF66]/40 p-8 sm:p-14 rounded-2xl relative shadow-neon-green overflow-hidden">
          <div className="hud-bracket-tl"></div>
          <div className="hud-bracket-tr"></div>
          <div className="hud-bracket-bl"></div>
          <div className="hud-bracket-br"></div>

          {/* Ambient glow inside card */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00FF66]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <span className="font-mono text-xs font-bold text-[#00FF66] uppercase tracking-widest px-3 py-1 rounded bg-[#00FF66]/10 border border-[#00FF66]/30 inline-block mb-4">
              READY TO SCALE OR UNBLOCK YOUR SPRINT?
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 font-sans">
              Ready to Scale Your Infrastructure or Build Your Next MVP?
            </h2>

            <p className="text-[#99ab9f] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
              Eliminate technical debt, unblock engineering bottlenecks, and engineer
              high-performance solutions engineered for the African digital frontier.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="footer-schedule-consultation-btn"
                onClick={onOpenScoping}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 font-mono text-sm uppercase tracking-wider font-extrabold px-8 py-4 rounded bg-[#00FF66] text-black hover:bg-[#2eff81] transition-all duration-200 shadow-neon-green group cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>[SCHEDULE A TECHNICAL CONSULTATION]</span>
              </button>

              <a
                id="footer-pgp-email-btn"
                href="mailto:kennedy@42ndlight.africa?subject=Architecture%20Inquiry%20%5B42ndLight%5D"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-wider font-semibold px-7 py-4 rounded border border-[rgba(0,255,102,0.2)] hover:border-[#00E5FF] text-white hover:text-[#00E5FF] bg-black/60 transition-all duration-200 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>[DISPATCH PGP ENCRYPTED EMAIL]</span>
              </a>
            </div>

            {/* Direct availability indicator */}
            <div className="mt-8 font-mono text-xs text-[#7d8b83] flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-ping"></span>
              <span>CURRENT AVAILABILITY: ACCEPTING Q2 / Q3 2025 ARCHITECTURE RETAINERS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cyber Matrix Bottom Footer */}
      <div className="w-full border-t border-[rgba(0,255,102,0.18)] bg-[#030403] py-10 px-4 sm:px-6 lg:px-8 font-mono text-xs text-[#7d8b83]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Rights */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="font-bold text-white tracking-wider">
              KENNEDY KINYUA <span className="text-[#00FF66]">//</span> 42ndLight
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>© 2025 ALL RIGHTS RESERVED</span>
          </div>

          {/* PGP Fingerprint Box */}
          <button
            onClick={copyPgpToClipboard}
            title="Click to copy PGP Fingerprint"
            className="font-mono text-[11px] text-[#7d8b83] bg-black/80 px-3.5 py-1.5 rounded border border-[rgba(0,255,102,0.2)] hover:border-[#00FF66]/60 text-center flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" />
            <span>
              PGP: <span className="text-[#00FF66]">{pgpKey}</span> // SHA256 VERIFIED
            </span>
            {copiedPgp ? (
              <Check className="w-3.5 h-3.5 text-[#00FF66]" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#7d8b83]" />
            )}
          </button>

          {/* Links & Colophon */}
          <div className="flex flex-wrap items-center gap-6">
            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                className="hover:text-[#00FF66] text-[#99ab9f] transition-colors cursor-pointer flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                <span>[PROFILE]</span>
              </button>
            )}
            <a
              href={BLOG_SITE_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00E5FF] text-[#00E5FF] transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>[BLOGSITE ↗]</span>
            </a>
            <button
              onClick={() => setShowColophon(!showColophon)}
              className="hover:text-[#00FF66] transition-colors cursor-pointer"
            >
              {showColophon ? '[HIDE COLOPHON]' : '[COLOPHON]'}
            </button>
            <a
              href="https://github.com/42ndlight"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00FF66] transition-colors"
            >
              [GITHUB]
            </a>
            <a
              href="https://linkedin.com/in/kennedykinyua"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00FF66] transition-colors"
            >
              [LINKEDIN]
            </a>
          </div>
        </div>

        {/* Colophon Drawer */}
        {showColophon && (
          <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-white/10 text-[11px] text-[#99ab9f] grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-[#00FF66] font-bold">ENGINEERING STACK:</span>
              <p className="mt-1">React 19, TypeScript, Vite, Tailwind CSS Modern Cyber Grid, Dexie.js offline persistence.</p>
            </div>
            <div>
              <span className="text-[#00E5FF] font-bold">CORE PHILOSOPHY:</span>
              <p className="mt-1">Offline is baseline default. Zero network dependencies for critical point of sale operations.</p>
            </div>
            <div>
              <span className="text-white font-bold">EDGE NETWORK:</span>
              <p className="mt-1">Nairobi [AF-EAST-1] primary cluster with automated WAL failover and multi-cloud mirrors.</p>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
