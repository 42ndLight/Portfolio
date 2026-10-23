import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  Activity,
  Menu,
  X,
  ChevronDown,
  User,
  BookOpen,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { BLOG_SITE_CONFIG } from '../data/portfolioData';

interface HeaderProps {
  onOpenScoping: () => void;
  onOpenDiagnostics: () => void;
  onOpenProfile: () => void;
  onSelectSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenScoping,
  onOpenDiagnostics,
  onOpenProfile,
  onSelectSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    if (sectionId === 'diagnostics') {
      onOpenDiagnostics();
      return;
    }
    if (sectionId === 'profile') {
      onOpenProfile();
      return;
    }
    onSelectSection(sectionId);
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full z-40 bg-[#050505]/92 backdrop-blur-xl border-b border-[rgba(0,255,102,0.15)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand & Live Edge Region Status */}
        <div className="flex items-center gap-4">
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('hero')}
            className="flex flex-col text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-mono text-sm tracking-wider font-extrabold text-white flex items-center gap-2">
              KENNEDY KINYUA <span className="text-[#00FF66]">//</span> 42ndLight{' '}
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66]">
                SYS.V2.4
              </span>
            </span>
            <span className="font-mono text-[11px] text-[#7d8b83] flex items-center gap-2 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF66] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF66]"></span>
              </span>
              SYSTEM: ONLINE{' '}
              <span className="text-[#00E5FF] opacity-80 font-mono">[AF-EAST-1]</span>
            </span>
          </button>
        </div>

        {/* Streamlined Monospace Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs tracking-widest uppercase">
          <button
            id="nav-systems-btn"
            onClick={() => handleNavClick('systems')}
            className="text-[#99ab9f] hover:text-[#00FF66] transition-colors flex items-center gap-1 group cursor-pointer py-1"
          >
            <span className="text-[#00FF66]/50 group-hover:text-[#00FF66]">01.</span>
            [SYSTEMS]
          </button>

          <button
            id="nav-services-btn"
            onClick={() => handleNavClick('services')}
            className="text-[#99ab9f] hover:text-[#00FF66] transition-colors flex items-center gap-1 group cursor-pointer py-1"
          >
            <span className="text-[#00FF66]/50 group-hover:text-[#00FF66]">02.</span>
            [SERVICES]
          </button>

          <button
            id="nav-blog-btn"
            onClick={() => handleNavClick('blog')}
            className="text-[#99ab9f] hover:text-[#00E5FF] transition-colors flex items-center gap-1 group cursor-pointer py-1"
          >
            <span className="text-[#00E5FF]/50 group-hover:text-[#00E5FF]">03.</span>
            [DISPATCHES]
          </button>

          {/* Cybernetic HUD Dropdown for Profile, Diagnostics, & External Archives */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="nav-dropdown-toggle-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`font-mono text-xs uppercase px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer border ${
                dropdownOpen
                  ? 'bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/50 shadow-neon-green-sm'
                  : 'text-[#99ab9f] hover:text-white border-[rgba(0,255,102,0.2)] bg-black/40 hover:border-[#00FF66]/40'
              }`}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <span className="text-[#00FF66]/60">04.</span>
              <span>[EXPLORE]</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180 text-[#00FF66]' : 'text-[#7d8b83]'
                }`}
              />
            </button>

            {/* Dropdown Menu Popover */}
            {dropdownOpen && (
              <div
                id="header-explore-dropdown"
                className="absolute top-full right-0 mt-3 w-80 bg-[#080c09] border border-[#00FF66]/40 rounded-xl shadow-neon-green p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {/* HUD corner brackets */}
                <div className="hud-bracket-tl"></div>
                <div className="hud-bracket-tr"></div>
                <div className="hud-bracket-bl"></div>
                <div className="hud-bracket-br"></div>

                <div className="px-3 py-2 border-b border-[rgba(0,255,102,0.15)] mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#00FF66] uppercase tracking-wider font-semibold">
                    SYS.DIRECTORY // SUBSYSTEMS
                  </span>
                  <span className="font-mono text-[10px] text-[#7d8b83]">ESC TO CLOSE</span>
                </div>

                <div className="space-y-1 font-sans">
                  {/* Item 1: Profile Screen */}
                  <button
                    id="dropdown-profile-item"
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenProfile();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#00FF66]/10 border border-transparent hover:border-[#00FF66]/30 transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="p-2 rounded bg-black/60 border border-[#00FF66]/30 text-[#00FF66] group-hover:border-[#00FF66] transition-colors shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-white group-hover:text-[#00FF66] transition-colors flex items-center gap-1.5">
                        <span>ARCHITECT PROFILE</span>
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#00FF66]/15 text-[#00FF66]">
                          KENNEDY
                        </span>
                      </div>
                      <p className="text-[11px] text-[#99ab9f] leading-snug mt-0.5">
                        Bio, operating tenets, milestones &amp; verified PGP key
                      </p>
                    </div>
                  </button>

                  {/* Item 2: Live Diagnostics */}
                  <button
                    id="dropdown-diagnostics-item"
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenDiagnostics();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-[#00E5FF]/10 border border-transparent hover:border-[#00E5FF]/30 transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="p-2 rounded bg-black/60 border border-[#00E5FF]/30 text-[#00E5FF] group-hover:border-[#00E5FF] transition-colors shrink-0 mt-0.5">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors flex items-center gap-1.5">
                        <span>LIVE DIAGNOSTICS</span>
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#00E5FF]/15 text-[#00E5FF]">
                          TELEMETRY
                        </span>
                      </div>
                      <p className="text-[11px] text-[#99ab9f] leading-snug mt-0.5">
                        Multi-region edge latencies, cluster health &amp; failover
                      </p>
                    </div>
                  </button>

                  {/* Item 3: External Blogsite */}
                  <a
                    id="dropdown-external-blog-item"
                    href={BLOG_SITE_CONFIG.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDropdownOpen(false)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/20 transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="p-2 rounded bg-black/60 border border-white/20 text-[#d4ded8] group-hover:text-[#00FF66] group-hover:border-[#00FF66] transition-colors shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-xs font-bold text-white group-hover:text-[#00FF66] transition-colors flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          BLOG ARCHIVE
                          <ExternalLink className="w-3 h-3 text-[#7d8b83]" />
                        </span>
                        <span className="text-[9px] font-mono text-[#00E5FF]">
                          42NDLIGHT
                        </span>
                      </div>
                      <p className="text-[11px] text-[#99ab9f] leading-snug mt-0.5">
                        Full engineering publication backlog on blog.42ndlight.africa
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Clean, Decluttered Right Action Area */}
        <div className="flex items-center gap-3">
          {/* Quick Telemetry Status Pill (Triggers Diagnostics) */}
          <button
            id="header-live-telemetry-btn"
            onClick={onOpenDiagnostics}
            title="Open Live Diagnostics Console"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[rgba(0,255,102,0.2)] bg-black/50 text-[11px] font-mono text-[#7d8b83] hover:text-[#00FF66] hover:border-[#00FF66]/50 transition-colors cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-[#00FF66]" />
            <span>PING 14ms</span>
          </button>

          {/* Primary High-Contrast Call to Action */}
          <button
            id="initiate-protocol-header-btn"
            onClick={onOpenScoping}
            className="font-mono text-xs tracking-wider uppercase px-4 py-2.5 rounded border border-[#00FF66] text-[#00FF66] bg-[#00FF66]/5 hover:bg-[#00FF66] hover:text-black font-semibold transition-all duration-200 shadow-neon-green-sm flex items-center gap-2 group cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
            <span>[INITIATE PROTOCOL]</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded border border-[rgba(0,255,102,0.2)] text-[#99ab9f] hover:text-[#00FF66] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[rgba(0,255,102,0.2)] bg-[#080b09] px-4 py-5 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
          <div className="text-[10px] text-[#7d8b83] border-b border-white/10 pb-2">
            PAGE NAVIGATION
          </div>

          <button
            onClick={() => handleNavClick('systems')}
            className="text-left py-1.5 text-[#99ab9f] hover:text-[#00FF66] flex items-center gap-2"
          >
            <span className="text-[#00FF66]">01.</span>
            <span>[SYSTEMS &amp; BENTO GRID]</span>
          </button>

          <button
            onClick={() => handleNavClick('services')}
            className="text-left py-1.5 text-[#99ab9f] hover:text-[#00FF66] flex items-center gap-2"
          >
            <span className="text-[#00FF66]">02.</span>
            <span>[CONSULTING CAPABILITIES]</span>
          </button>

          <button
            onClick={() => handleNavClick('blog')}
            className="text-left py-1.5 text-[#00E5FF] hover:text-white flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span className="text-[#00E5FF]">03.</span>
              <span>[ENGINEERING DISPATCHES]</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-[#00E5FF]/10 text-[#00E5FF] rounded border border-[#00E5FF]/30">
              TOP 2 POSTS
            </span>
          </button>

          <div className="text-[10px] text-[#7d8b83] border-b border-white/10 pb-2 pt-2">
            TERMINAL DIRECTORY
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenProfile();
            }}
            className="text-left py-1.5 text-[#00FF66] flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#00FF66]" />
              <span>[ARCHITECT PROFILE SCREEN]</span>
            </span>
            <span className="text-[10px] text-[#7d8b83]">DOSSIER</span>
          </button>

          <button
            onClick={() => handleNavClick('diagnostics')}
            className="text-left py-1.5 text-[#99ab9f] hover:text-[#00FF66] flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#00FF66]" />
              <span>[LIVE DIAGNOSTICS CONSOLE]</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-[#00FF66]/10 text-[#00FF66] rounded border border-[#00FF66]/30">
              LIVE
            </span>
          </button>

          <a
            href={BLOG_SITE_CONFIG.url}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded border border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF] text-center flex items-center justify-center gap-2 mt-1"
          >
            <BookOpen className="w-4 h-4" />
            <span>[VISIT BLOGSITE: blog.42ndlight.africa ↗]</span>
          </a>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenScoping();
            }}
            className="mt-2 py-3 rounded bg-[#00FF66] text-black font-bold text-center flex items-center justify-center gap-2 cursor-pointer shadow-neon-green"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>[INITIATE DISCOVERY CALL]</span>
          </button>
        </div>
      )}
    </header>
  );
};
