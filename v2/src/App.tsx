import React, { useState } from 'react';
import { PROJECTS, LATEST_BLOG_POSTS } from './data/portfolioData';
import { ProjectArtifact, BlogPost } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SystemDiagnosticsBar } from './components/SystemDiagnosticsBar';
import { FeaturedSystemsBento } from './components/FeaturedSystemsBento';
import { BlogSection } from './components/BlogSection';
import { ConsultingCapabilities } from './components/ConsultingCapabilities';
import { ConversionFooter } from './components/ConversionFooter';
import { ArchitectureModal } from './components/ArchitectureModal';
import { ScopingModal } from './components/ScopingModal';
import { DiagnosticsDashboardModal } from './components/DiagnosticsDashboardModal';
import { ProfileModal } from './components/ProfileModal';
import { BlogPostModal } from './components/BlogPostModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectArtifact | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isScopingOpen, setIsScopingOpen] = useState(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scopingPrefill, setScopingPrefill] = useState<string | undefined>(undefined);

  const handleOpenScoping = (projectTitle?: string) => {
    setScopingPrefill(projectTitle);
    setIsScopingOpen(true);
  };

  const handleSelectSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="cyber-grid-bg text-[#d4ded8] font-sans antialiased selection:bg-[#00FF66] selection:text-black min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Fixed Top Neon Accent Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF66] to-transparent z-50 opacity-90"></div>

      {/* Main Header Navigation */}
      <Header
        onOpenScoping={() => handleOpenScoping()}
        onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSelectSection={handleSelectSection}
      />

      {/* Main Content Sections */}
      <main className="flex-grow pt-24 pb-12">
        {/* Section 1: Hero Section */}
        <HeroSection
          onOpenScoping={() => handleOpenScoping()}
          onExploreSystems={() => handleSelectSection('systems')}
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Section 2: System Diagnostics Bar */}
        <SystemDiagnosticsBar
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        />

        {/* Section 3: Featured Systems Bento Grid */}
        <FeaturedSystemsBento
          projects={PROJECTS}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Section 4: Blog Section (Runs Top 2 Latest Posts + Link to Blogsite) */}
        <BlogSection
          posts={LATEST_BLOG_POSTS}
          onSelectPost={(post) => setSelectedBlogPost(post)}
          onOpenScoping={(topic) => handleOpenScoping(topic)}
        />

        {/* Section 5: Consulting Capabilities */}
        <ConsultingCapabilities
          onSelectCapability={(protocolName) => handleOpenScoping(protocolName)}
        />

        {/* Section 6: High-Impact Conversion Footer */}
        <ConversionFooter
          onOpenScoping={() => handleOpenScoping()}
          onOpenProfile={() => setIsProfileOpen(true)}
        />
      </main>

      {/* Screen 1: The Interactive System / Case Study Modal */}
      {selectedProject && (
        <ArchitectureModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenScoping={(projectTitle) => {
            setSelectedProject(null);
            handleOpenScoping(projectTitle);
          }}
        />
      )}

      {/* Screen 2: The Technical Consultation Booking / Scoping Flow */}
      <ScopingModal
        isOpen={isScopingOpen}
        onClose={() => setIsScopingOpen(false)}
        prefillProject={scopingPrefill}
      />

      {/* Screen 3: The System Diagnostics / Live Status Dashboard */}
      <DiagnosticsDashboardModal
        isOpen={isDiagnosticsOpen}
        onClose={() => setIsDiagnosticsOpen(false)}
        onOpenScoping={() => {
          setIsDiagnosticsOpen(false);
          handleOpenScoping();
        }}
      />

      {/* Screen 4: The Profile Screen Component */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenScoping={() => handleOpenScoping('Architectural Advisory Retainer')}
        onSelectPost={(post) => {
          setIsProfileOpen(false);
          setSelectedBlogPost(post);
        }}
      />

      {/* Screen 5: The Interactive Blog Reader Modal */}
      {selectedBlogPost && (
        <BlogPostModal
          post={selectedBlogPost}
          onClose={() => setSelectedBlogPost(null)}
          onOpenOtherPost={(postId) => {
            const nextPost = LATEST_BLOG_POSTS.find((p) => p.id === postId);
            if (nextPost) setSelectedBlogPost(nextPost);
          }}
          onOpenScoping={(context) => {
            setSelectedBlogPost(null);
            handleOpenScoping(context);
          }}
        />
      )}
    </div>
  );
}
