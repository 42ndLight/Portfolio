import React, { useState } from 'react';
import { ENGINEER_PROFILE, BLOG_SITE_CONFIG, LATEST_BLOG_POSTS } from '../data/portfolioData';
import { BlogPost } from '../types';
import {
  X,
  User,
  ShieldCheck,
  Terminal,
  Cpu,
  Layers,
  Award,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  BookOpen,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Radio
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScoping: () => void;
  onSelectPost: (post: BlogPost) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenScoping,
  onSelectPost
}) => {
  if (!isOpen) return null;

  const [copiedPgp, setCopiedPgp] = useState(false);
  const profile = ENGINEER_PROFILE;

  const copyPgp = () => {
    navigator.clipboard.writeText(profile.pgpKey);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2000);
  };

  return (
    <div
      id="profile-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto font-sans"
    >
      <div
        id="profile-modal-dialog"
        className="relative w-full max-w-5xl bg-[#060807] border border-[#00FF66]/50 rounded-2xl shadow-neon-green overflow-hidden my-auto"
      >
        {/* HUD corner brackets */}
        <div className="hud-bracket-tl"></div>
        <div className="hud-bracket-tr"></div>
        <div className="hud-bracket-bl"></div>
        <div className="hud-bracket-br"></div>

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(0,255,102,0.2)] bg-black/80">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 font-semibold flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#00FF66]" />
              ENGINEER_PROFILE // KENNEDY_KINYUA
            </span>
            <span className="font-mono text-xs text-[#00E5FF] hidden sm:inline">
              SYS.ARCHITECT // 42NDLIGHT
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={BLOG_SITE_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-3 py-1.5 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>[BLOGSITE ↗]</span>
            </a>

            <button
              id="profile-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded text-[#7d8b83] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close profile screen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-8">
          {/* Hero Profile Overview Card */}
          <div className="bg-[#0b0f0c] border border-[rgba(0,255,102,0.25)] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start relative">
            {/* Avatar with HUD Frame */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden border-2 border-[#00FF66] shadow-neon-green relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt="Kennedy Kinyua portrait"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#00FF66]/10 mix-blend-overlay pointer-events-none"></div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-black border border-[#00FF66] text-[#00FF66] whitespace-nowrap">
                VERIFIED ARCHITECT
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                  {profile.title}
                </span>
                <span className="font-mono text-xs text-[#00FF66] flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-ping"></span>
                  {profile.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                {profile.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 font-mono text-xs text-[#7d8b83] mb-4">
                <span className="flex items-center gap-1.5 text-white/90">
                  <MapPin className="w-3.5 h-3.5 text-[#00FF66]" />
                  {profile.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-[#00E5FF]">
                  <Award className="w-3.5 h-3.5 text-[#00E5FF]" />
                  {profile.experienceYears}
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#99ab9f] leading-relaxed mb-6 font-sans">
                {profile.bio}
              </p>

              {/* Social & Contact Links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs px-3 py-1.5 rounded border border-white/15 hover:border-[#00FF66] text-white hover:text-[#00FF66] bg-black/60 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB</span>
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs px-3 py-1.5 rounded border border-white/15 hover:border-[#00E5FF] text-white hover:text-[#00E5FF] bg-black/60 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href={profile.socials.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs px-3 py-1.5 rounded border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/10 bg-black/60 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>TECH BLOG</span>
                </a>
                <button
                  onClick={copyPgp}
                  className="font-mono text-xs px-3 py-1.5 rounded border border-[rgba(0,255,102,0.3)] text-[#00FF66] hover:bg-[#00FF66]/10 bg-black/60 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Click to copy PGP fingerprint"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>PGP: {profile.pgpKey.substring(0, 9)}...</span>
                  {copiedPgp ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3 text-[#7d8b83]" />}
                </button>
              </div>
            </div>
          </div>

          {/* Architecture Philosophy & Engineering Tenets */}
          <div>
            <div className="font-mono text-xs text-[#00FF66] font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00FF66]" />
              ARCHITECTURAL PRINCIPLES // OPERATING SYSTEM
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profile.philosophy.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b0e0c] border border-[rgba(0,255,102,0.18)] p-5 rounded-xl flex flex-col justify-between hover:border-[#00FF66]/50 transition-colors"
                >
                  <div>
                    <div className="font-mono text-xs text-[#00FF66] font-bold mb-2">
                      {item.rule}
                    </div>
                    <p className="text-xs text-[#99ab9f] leading-relaxed font-sans">
                      {item.principle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Production Milestones & High-Impact Deployments */}
          <div>
            <div className="font-mono text-xs text-[#00E5FF] font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00E5FF]" />
              PRODUCTION TIMELINE &amp; IMPACT MILESTONES
            </div>

            <div className="space-y-3 font-mono text-xs">
              {profile.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[#090c0a] border border-white/10 hover:border-[#00FF66]/40 p-4 rounded-xl transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[#00FF66] font-bold">{m.year}</span>
                      <span className="text-white/40">|</span>
                      <span className="text-white font-bold">{m.role}</span>
                    </div>
                    <span className="text-[#00E5FF]">{m.company}</span>
                  </div>
                  <p className="text-[#99ab9f] font-sans text-xs leading-relaxed">
                    {m.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Full Technical Stack Matrix */}
          <div>
            <div className="font-mono text-xs text-white font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00FF66]" />
              TECHNICAL WEAPONRY &amp; STACK MASTERY
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {profile.stackBreakdown.map((group, idx) => (
                <div
                  key={idx}
                  className="bg-[#090c0a] border border-[rgba(0,255,102,0.18)] p-4 rounded-xl"
                >
                  <div className="text-[#00FF66] font-bold mb-2.5 flex items-center justify-between">
                    <span>{group.area}</span>
                    <span className="text-[10px] text-[#7d8b83]">[{group.technologies.length} VECTORS]</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-black/70 border border-white/10 text-[#d4ded8] text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Articles Teaser inside Profile Screen */}
          <div className="p-6 rounded-xl bg-[#090e0b] border border-[rgba(0,255,102,0.3)] font-mono text-xs">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <span className="text-white font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#00FF66]" />
                LATEST ESSAYS BY KENNEDY // FROM THE 42NDLIGHT BLOG
              </span>
              <a
                href={BLOG_SITE_CONFIG.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>VISIT BLOGSITE ↗</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LATEST_BLOG_POSTS.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    onClose();
                    onSelectPost(post);
                  }}
                  className="p-3.5 rounded-lg bg-black/60 border border-[rgba(0,255,102,0.15)] hover:border-[#00FF66] transition-all cursor-pointer group"
                >
                  <div className="text-[10px] text-[#00FF66] mb-1">
                    {post.category.split('//')[0].trim()}
                  </div>
                  <h4 className="text-white font-bold group-hover:text-[#00FF66] transition-colors line-clamp-2 mb-2 font-sans text-xs">
                    {post.title}
                  </h4>
                  <div className="text-[10px] text-[#7d8b83] flex items-center justify-between">
                    <span>{post.readTime}</span>
                    <span className="text-[#00E5FF] group-hover:translate-x-0.5 transition-transform">
                      [Read Dispatch →]
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="px-6 py-4 border-t border-[rgba(0,255,102,0.2)] bg-black/85 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="font-mono text-xs uppercase px-4 py-2.5 rounded border border-[rgba(0,255,102,0.2)] text-[#99ab9f] hover:text-white transition-colors cursor-pointer"
          >
            [Close Profile]
          </button>

          <button
            id="profile-initiate-consultation-btn"
            onClick={() => {
              onClose();
              onOpenScoping();
            }}
            className="font-mono text-xs uppercase font-bold px-6 py-2.5 rounded bg-[#00FF66] text-black hover:bg-[#2eff81] transition-all shadow-neon-green flex items-center gap-2 cursor-pointer"
          >
            <span>[SCHEDULE TECHNICAL CONSULTATION WITH KENNEDY]</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
