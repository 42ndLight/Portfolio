import React, { useState } from 'react';
import { ScopingFormData } from '../types';
import {
  X,
  ShieldCheck,
  Cpu,
  Layers,
  Clock,
  DollarSign,
  Send,
  CheckCircle,
  Copy,
  Terminal,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ScopingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillProject?: string;
}

export const ScopingModal: React.FC<ScopingModalProps> = ({
  isOpen,
  onClose,
  prefillProject
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<ScopingFormData>({
    projectType: prefillProject
      ? prefillProject.includes('POS')
        ? 'Offline-First / PWA System'
        : 'Full-Stack MVP'
      : 'Full-Stack MVP',
    urgency: 'SPRINT_ACCELERATION: 4-6 WEEKS',
    budgetRange: '$7,000 - $15,000 Production Scale',
    techPreferences: ['Django', 'Vue 3', 'Dexie.js / IndexedDB', 'Docker'],
    clientName: '',
    clientEmail: '',
    companyName: '',
    systemDescription: prefillProject ? `Inquiry regarding architectural pattern from ${prefillProject}` : '',
    requireOfflineCapability: true,
    requireFintechIntegration: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmissionHash, setTransmissionHash] = useState('');
  const [copiedHash, setCopiedHash] = useState(false);

  const projectTypes = [
    {
      id: 'Full-Stack MVP',
      title: '[Full-Stack MVP]',
      desc: 'Ground-up architecture for high-velocity startup launch with production-grade backend.'
    },
    {
      id: 'Offline-First / PWA System',
      title: '[Offline-First / PWA System]',
      desc: 'Zero-downtime apps executing with intermittent connectivity via Dexie & local stores.'
    },
    {
      id: 'Cloud Infrastructure / DevOps Audit',
      title: '[Cloud Infrastructure / DevOps Audit]',
      desc: 'Dockerization, CI/CD hardening, security review, horizontal failover & scaling.'
    },
    {
      id: 'Custom API / Fintech Integration',
      title: '[Custom API / Fintech Integration]',
      desc: 'Safaricom M-Pesa Daraja, KRA eTIMS, bank rails, and telco USSD relays.'
    }
  ];

  const timelineOptions = [
    { label: '[CRITICAL_HOTFIX: < 2 WEEKS]', sub: 'Emergency production stabilization or audit' },
    { label: '[SPRINT_ACCELERATION: 4-6 WEEKS]', sub: 'Rapid MVP or dedicated feature engine' },
    { label: '[ENTERPRISE_SYSTEM: 2-3 MONTHS]', sub: 'Comprehensive multi-tier distributed build' },
    { label: '[ADVISORY_RETAINER: ONGOING]', sub: 'Fractional Tech Lead & architectural oversight' }
  ];

  const budgetOptions = [
    { label: '$3,000 - $7,000', tier: 'MVP Launchpad', desc: 'Proof of concept or focused micro-service' },
    { label: '$7,000 - $15,000', tier: 'Production Scale Engine', desc: 'Full-stack platform with offline sync & APIs' },
    { label: '$15,000 - $35,000', tier: 'Enterprise Architecture', desc: 'High-concurrency infrastructure & multi-outlet' },
    { label: '$35,000+', tier: 'Sovereign Infrastructure', desc: 'Custom fintech or nationwide deployment' }
  ];

  const techOptions = [
    'Django REST Framework',
    'Vue 3 / React 19',
    'Dexie.js / IndexedDB',
    'PostgreSQL / TimescaleDB',
    'Docker & Compose',
    'M-Pesa Daraja API',
    'KRA eTIMS Fiscalization',
    'Africa’s Talking USSD/SMS',
    'FastAPI / Python',
    'Redis Caching & Streams'
  ];

  const toggleTech = (tech: string) => {
    if (formData.techPreferences.includes(tech)) {
      setFormData({
        ...formData,
        techPreferences: formData.techPreferences.filter((t) => t !== tech)
      });
    } else {
      setFormData({
        ...formData,
        techPreferences: [...formData.techPreferences, tech]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedHash =
      '42ND-' +
      Math.random().toString(36).substring(2, 8).toUpperCase() +
      '-' +
      Math.random().toString(36).substring(2, 6).toUpperCase();

    setTimeout(() => {
      setTransmissionHash(generatedHash);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1100);
  };

  return (
    <div
      id="scoping-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="scoping-modal-dialog"
        className="relative w-full max-w-4xl bg-[#080b09] border border-[#00FF66]/50 rounded-xl shadow-neon-green overflow-hidden my-auto"
      >
        <div className="hud-bracket-tl"></div>
        <div className="hud-bracket-tr"></div>
        <div className="hud-bracket-bl"></div>
        <div className="hud-bracket-br"></div>

        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(0,255,102,0.2)] bg-black/70">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" />
              TECHNICAL_CONSULTATION // SCOPING_FLOW
            </span>
            <span className="font-mono text-xs text-[#7d8b83] hidden sm:inline">
              [ENCRYPTED TRANSMISSION]
            </span>
          </div>

          <button
            id="scoping-modal-close-btn"
            onClick={onClose}
            className="p-1.5 rounded text-[#7d8b83] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        {!isSubmitted && (
          <div className="px-6 py-3 bg-[#060807] border-b border-[rgba(0,255,102,0.15)] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-3">
              <span
                className={`px-2 py-0.5 rounded border ${
                  step === 1
                    ? 'bg-[#00FF66] text-black border-[#00FF66] font-bold'
                    : 'bg-black/50 text-[#00FF66] border-[#00FF66]/40'
                }`}
              >
                STEP 01
              </span>
              <span className={step === 1 ? 'text-white font-bold' : 'text-[#7d8b83]'}>
                PROJECT SCOPE &amp; VECTORS
              </span>

              <span className="text-[#7d8b83]">──►</span>

              <span
                className={`px-2 py-0.5 rounded border ${
                  step === 2
                    ? 'bg-[#00FF66] text-black border-[#00FF66] font-bold'
                    : 'bg-black/50 text-[#99ab9f] border-white/10'
                }`}
              >
                STEP 02
              </span>
              <span className={step === 2 ? 'text-white font-bold' : 'text-[#7d8b83]'}>
                TIMELINE, BUDGET &amp; TRANSMISSION
              </span>
            </div>

            <span className="text-[#00E5FF] hidden md:inline">
              RETAINER SLOTS: 2 AVAILABLE
            </span>
          </div>
        )}

        {/* Modal Form Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="space-y-6">
                  <div>
                    <label className="block font-mono text-xs text-[#00FF66] font-bold uppercase tracking-wider mb-2">
                      SELECT PROJECT TYPE / ARCHITECTURAL OBJECTIVE:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {projectTypes.map((type) => {
                        const isSelected = formData.projectType === type.id;
                        return (
                          <button
                            type="button"
                            key={type.id}
                            onClick={() =>
                              setFormData({ ...formData, projectType: type.id })
                            }
                            className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#0d1510] border-[#00FF66] shadow-neon-green-sm'
                                : 'bg-[#090c0a] border-[rgba(0,255,102,0.15)] hover:border-[rgba(0,255,102,0.4)]'
                            }`}
                          >
                            <div className="font-mono text-sm font-bold text-white mb-1">
                              {type.title}
                            </div>
                            <p className="text-xs text-[#99ab9f] font-sans">
                              {type.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tech stack vector multi-select */}
                  <div>
                    <label className="block font-mono text-xs text-[#00E5FF] font-bold uppercase tracking-wider mb-2">
                      DESIRED TECHNICAL VECTORS &amp; DEPENDENCIES:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {techOptions.map((tech) => {
                        const isSelected = formData.techPreferences.includes(tech);
                        return (
                          <button
                            type="button"
                            key={tech}
                            onClick={() => toggleTech(tech)}
                            className={`font-mono text-xs px-3 py-1.5 rounded border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#00FF66]/20 border-[#00FF66] text-[#00FF66] font-semibold'
                                : 'bg-black/50 border-[rgba(0,255,102,0.15)] text-[#99ab9f] hover:text-white'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* System overview brief */}
                  <div>
                    <label className="block font-mono text-xs text-[#99ab9f] font-bold uppercase tracking-wider mb-2">
                      BRIEF SYSTEM OVERVIEW OR PROBLEM STATEMENT:
                    </label>
                    <textarea
                      rows={3}
                      value={formData.systemDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, systemDescription: e.target.value })
                      }
                      placeholder="e.g., We have a retail POS in Western Kenya experiencing 4-hour power and WiFi drops, need offline transaction persistence and KRA eTIMS signing..."
                      className="w-full bg-black/70 border border-[rgba(0,255,102,0.25)] rounded-lg p-3 text-sm text-white font-mono placeholder:text-[#525f57] focus:outline-none focus:border-[#00FF66]"
                    />
                  </div>

                  {/* Step 1 CTA */}
                  <div className="pt-4 border-t border-[rgba(0,255,102,0.15)] flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="font-mono text-xs uppercase tracking-wider font-bold px-6 py-3 rounded bg-[#00FF66] text-black hover:bg-[#26ff7b] transition-all shadow-neon-green flex items-center gap-2 cursor-pointer"
                    >
                      <span>PROCEED TO TIMELINE &amp; BUDGET</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* STEP 2 */
                <div className="space-y-6">
                  {/* Urgency */}
                  <div>
                    <label className="block font-mono text-xs text-[#00FF66] font-bold uppercase tracking-wider mb-2">
                      ESTIMATED TIMELINE / URGENCY VECTOR:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {timelineOptions.map((opt) => {
                        const isSelected = formData.urgency === opt.label;
                        return (
                          <button
                            type="button"
                            key={opt.label}
                            onClick={() => setFormData({ ...formData, urgency: opt.label })}
                            className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#0d1510] border-[#00FF66] shadow-neon-green-sm'
                                : 'bg-[#090c0a] border-[rgba(0,255,102,0.15)] hover:border-[rgba(0,255,102,0.4)]'
                            }`}
                          >
                            <div className="font-mono text-xs font-bold text-white mb-0.5">
                              {opt.label}
                            </div>
                            <div className="text-[11px] text-[#99ab9f] font-sans">
                              {opt.sub}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget range */}
                  <div>
                    <label className="block font-mono text-xs text-[#00E5FF] font-bold uppercase tracking-wider mb-2">
                      BUDGET RANGE &amp; RESOURCE ALLOCATION:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {budgetOptions.map((b) => {
                        const isSelected = formData.budgetRange.startsWith(b.label);
                        return (
                          <button
                            type="button"
                            key={b.label}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                budgetRange: `${b.label} ${b.tier}`
                              })
                            }
                            className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#0d1510] border-[#00E5FF] shadow-neon-cyan-sm'
                                : 'bg-[#090c0a] border-[rgba(0,255,102,0.15)] hover:border-[rgba(0,255,102,0.4)]'
                            }`}
                          >
                            <div className="font-mono text-xs font-bold text-[#00FF66]">
                              {b.label}
                            </div>
                            <div className="text-xs text-white font-medium">{b.tier}</div>
                            <div className="text-[10px] text-[#7d8b83] font-sans">
                              {b.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-mono text-[11px] text-[#99ab9f] uppercase mb-1">
                        YOUR NAME:
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) =>
                          setFormData({ ...formData, clientName: e.target.value })
                        }
                        placeholder="e.g. Alex Kamau"
                        className="w-full bg-black/70 border border-[rgba(0,255,102,0.25)] rounded p-2 text-sm text-white font-mono focus:border-[#00FF66] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] text-[#99ab9f] uppercase mb-1">
                        ENCRYPTED / WORK EMAIL:
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.clientEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, clientEmail: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full bg-black/70 border border-[rgba(0,255,102,0.25)] rounded p-2 text-sm text-white font-mono focus:border-[#00FF66] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] text-[#99ab9f] uppercase mb-1">
                        ORGANIZATION / STARTUP:
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        placeholder="e.g. Apex Logistics Ltd"
                        className="w-full bg-black/70 border border-[rgba(0,255,102,0.25)] rounded p-2 text-sm text-white font-mono focus:border-[#00FF66] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Step 2 Actions */}
                  <div className="pt-4 border-t border-[rgba(0,255,102,0.15)] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="font-mono text-xs uppercase text-[#7d8b83] hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>BACK TO SCOPE</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="font-mono text-sm uppercase tracking-wider font-extrabold px-8 py-3.5 rounded bg-[#00FF66] text-black hover:bg-[#2eff81] transition-all shadow-neon-green flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          <span>ENCRYPTING &amp; DISPATCHING...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 fill-black" />
                          <span>[INITIATE DISCOVERY CALL]</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* SUBMISSION CONFIRMATION TRANSMISSION */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#00FF66]/15 border-2 border-[#00FF66] text-[#00FF66] flex items-center justify-center mx-auto shadow-neon-green">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs text-[#00FF66] font-bold tracking-widest uppercase px-3 py-1 bg-[#00FF66]/10 rounded border border-[#00FF66]/30 inline-block mb-3">
                  TRANSMISSION ENCRYPTED &amp; RECEIVED
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Discovery Protocol Initialized
                </h3>
                <p className="text-sm text-[#99ab9f] max-w-lg mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.clientName || 'Engineer'}</span>.
                  Your architecture parameters have been securely stored in our sprint pipeline.
                  Kennedy will review your technical vector within 24 business hours.
                </p>
              </div>

              {/* Encrypted Packet Output Box */}
              <div className="bg-black/90 border border-[rgba(0,255,102,0.3)] rounded-lg p-4 font-mono text-xs max-w-xl mx-auto text-left">
                <div className="text-[11px] text-[#7d8b83] border-b border-white/10 pb-1.5 mb-2 flex justify-between">
                  <span>PACKET_DIGEST: SHA256</span>
                  <span className="text-[#00FF66]">STATUS: DISPATCHED</span>
                </div>
                <div className="space-y-1 text-[#99ab9f]">
                  <div>
                    <span className="text-white">PROJECT: </span>
                    <span className="text-[#00FF66]">{formData.projectType}</span>
                  </div>
                  <div>
                    <span className="text-white">TIMELINE: </span>
                    <span>{formData.urgency}</span>
                  </div>
                  <div>
                    <span className="text-white">BUDGET TIER: </span>
                    <span>{formData.budgetRange}</span>
                  </div>
                  <div>
                    <span className="text-white">VERIFICATION HASH: </span>
                    <span className="text-[#00E5FF] font-bold">{transmissionHash}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `42ndLight Protocol: ${transmissionHash} | Project: ${formData.projectType}`
                      );
                      setCopiedHash(true);
                      setTimeout(() => setCopiedHash(false), 2000);
                    }}
                    className="text-[11px] text-[#7d8b83] hover:text-[#00FF66] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedHash ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-[#00FF66]" />
                        <span>COPIED HASH</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY RECEIPT HASH</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={onClose}
                  className="font-mono text-xs uppercase px-6 py-2.5 rounded bg-[#00FF66] text-black font-bold hover:bg-[#2eff81] transition-all cursor-pointer"
                >
                  [RETURN TO INTERFACE]
                </button>
                <a
                  href={`https://wa.me/254700000000?text=Hi%20Kennedy,%20I%20just%20initiated%20a%20technical%20scoping%20protocol%20(${transmissionHash})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase px-6 py-2.5 rounded border border-[#00FF66] text-[#00FF66] hover:bg-[#00FF66]/10 transition-all cursor-pointer"
                >
                  [EXPEDITE VIA DIRECT WHATSAPP]
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
