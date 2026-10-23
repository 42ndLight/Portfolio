import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BLOG_SITE_CONFIG } from '../data/portfolioData';
import {
  X,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Tag,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenOtherPost: (postId: string) => void;
  onOpenScoping: (context: string) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  onClose,
  onOpenOtherPost,
  onOpenScoping
}) => {
  if (!post) return null;

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = () => {
    if (post.codeBlock) {
      navigator.clipboard.writeText(post.codeBlock.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(post.externalUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      id="blog-reader-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto font-sans"
    >
      <div
        id="blog-reader-modal-dialog"
        className="relative w-full max-w-4xl bg-[#070a08] border border-[#00FF66]/40 rounded-xl shadow-neon-green overflow-hidden my-auto"
      >
        {/* HUD corner brackets */}
        <div className="hud-bracket-tl"></div>
        <div className="hud-bracket-tr"></div>
        <div className="hud-bracket-bl"></div>
        <div className="hud-bracket-br"></div>

        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(0,255,102,0.2)] bg-black/75">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#00FF66]" />
              ENGINEERING_DISPATCH // {post.category.split('//')[0].trim()}
            </span>
            <span className="font-mono text-xs text-[#7d8b83] hidden sm:inline">
              {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Share / Copy Link */}
            <button
              onClick={handleCopyLink}
              title="Copy dispatch link"
              className="font-mono text-xs px-2.5 py-1.5 rounded border border-[rgba(0,255,102,0.2)] text-[#99ab9f] hover:text-[#00FF66] hover:border-[#00FF66] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00FF66]" />
                  <span className="text-[#00FF66]">LINK COPIED</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">SHARE</span>
                </>
              )}
            </button>

            {/* External blog site link */}
            <a
              href={BLOG_SITE_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-3 py-1.5 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>[BLOG SITE ↗]</span>
            </a>

            {/* Close Button */}
            <button
              id="blog-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded text-[#7d8b83] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 max-h-[78vh] overflow-y-auto space-y-8">
          {/* Metadata Meta Header */}
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#00E5FF] mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#00FF66]" />
                {post.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="text-[#00FF66]">{post.viewsCount}</span>
              <span>•</span>
              <span className="text-white/80">BY {post.author.toUpperCase()}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-[#99ab9f] leading-relaxed border-l-2 border-[#00FF66] pl-4 italic">
              {post.subtitle}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-[#0d120f] border border-[rgba(0,255,102,0.2)] text-white/90 flex items-center gap-1.5"
              >
                <Tag className="w-3 h-3 text-[#00FF66]" />
                {tag}
              </span>
            ))}
          </div>

          {/* Key Architectural Takeaways Box */}
          <div className="bg-[#0b0e0c] border border-[rgba(0,255,102,0.25)] rounded-xl p-5 sm:p-6 relative">
            <div className="font-mono text-xs text-[#00FF66] font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
              CORE ARCHITECTURAL TAKEAWAYS &amp; IMPLEMENTATION RULES
            </div>
            <ul className="space-y-2.5 font-mono text-xs sm:text-sm text-white/90">
              {post.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#00FF66] font-bold">0{i + 1}.</span>
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-[#d0ded5] text-sm sm:text-base leading-relaxed">
            {post.content.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          {/* Code Block Snippet */}
          {post.codeBlock && (
            <div className="rounded-xl overflow-hidden border border-[rgba(0,255,102,0.25)] bg-black/90">
              <div className="px-4 py-2.5 bg-[#0e1410] border-b border-[rgba(0,255,102,0.2)] flex items-center justify-between font-mono text-xs">
                <span className="text-[#00FF66] font-bold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00FF66]"></span>
                  {post.codeBlock.filename}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="text-[#7d8b83] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00FF66]" />
                      <span className="text-[#00FF66]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY CODE</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 sm:p-5 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-[#00FF66] leading-relaxed">
                  <code>{post.codeBlock.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* External Blogsite Banner Card */}
          <div className="bg-[#0c120e] border border-[#00E5FF]/30 p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#00E5FF] font-bold tracking-wider uppercase mb-1">
                42NDLIGHT BLOG ARCHIVE // ENGINEERING DISPATCHES
              </div>
              <h4 className="text-white font-bold text-base mb-1">
                Read the entire backlog on {BLOG_SITE_CONFIG.title}
              </h4>
              <p className="text-xs text-[#99ab9f] max-w-xl">
                Subscribe to new articles on offline-first architectures, African telecom protocols, and fintech resiliency.
              </p>
            </div>
            <a
              id="visit-external-blog-btn"
              href={BLOG_SITE_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase px-5 py-3 rounded bg-[#00E5FF] text-black font-bold hover:bg-[#52edff] transition-all shadow-neon-cyan-sm whitespace-nowrap cursor-pointer"
            >
              <span>VISIT BLOGSITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-4 border-t border-[rgba(0,255,102,0.2)] bg-black/85 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="font-mono text-xs uppercase px-4 py-2.5 rounded border border-[rgba(0,255,102,0.2)] text-[#99ab9f] hover:text-white transition-colors cursor-pointer"
          >
            [Close Dispatch]
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenScoping(`Consultation regarding: ${post.title}`);
              }}
              className="font-mono text-xs uppercase font-bold px-6 py-2.5 rounded bg-[#00FF66] text-black hover:bg-[#2eff81] transition-all shadow-neon-green flex items-center gap-2 cursor-pointer"
            >
              <span>[CONSULT ON THIS ARCHITECTURE]</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
