import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Certifications } from './components/sections/Certifications';
import { ResumeSection } from './components/sections/ResumeSection';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { analyticsService } from './services/analyticsService';
import { profile } from './data/profile';
import { Loader2 } from 'lucide-react';

// Code Splitting / Lazy Loading for project detail page
const ProjectDetailPage = lazy(() => 
  import('./components/pages/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage }))
);

// Fallback Loading Indicator for Suspense boundaries
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-900 gap-3">
    <div className="relative">
      <div className="w-10 h-10 rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin" />
      <Loader2 className="w-4 h-4 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
    </div>
    <p className="text-xs font-mono text-slate-500">Loading...</p>
  </div>
);

type ViewType = 'portfolio' | 'project-detail';

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/projects/')) return 'project-detail';
    return 'portfolio';
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string>(() => {
    const match = window.location.pathname.match(/\/projects\/([^/]+)/);
    return match ? match[1] : '';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path.startsWith('/projects/')) {
        const id = path.replace('/projects/', '').replace(/\/$/, '');
        setSelectedProjectId(id);
        setCurrentView('project-detail');
      } else {
        setSelectedProjectId('');
        setCurrentView('portfolio');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Track page view event on view change and sync document title
  useEffect(() => {
    document.title = `${profile.name} | ${profile.professionalTitle}`;
    analyticsService.trackEvent(
      'PAGE_VIEW', 
      selectedProjectId || currentView,
      window.location.pathname
    );
  }, [currentView, selectedProjectId]);

  const navigateToHome = () => {
    setCurrentView('portfolio');
    setSelectedProjectId('');
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  const navigateToProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentView('project-detail');
    window.history.pushState(null, '', `/projects/${id}`);
  };

  // 1. Project Detail Page View (/projects/:id)
  if (currentView === 'project-detail' && selectedProjectId) {
    return (
      <Suspense fallback={<PageLoader />}>
        <ProjectDetailPage
          projectId={selectedProjectId}
          onNavigateHome={navigateToHome}
        />
      </Suspense>
    );
  }

  // 2. Default Public Portfolio View
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Skip to Content for Screen Readers & Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-mono font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Technical Skills Section */}
        <Skills />

        {/* 4. Projects Section with Instant Filter & Deep Linking */}
        <Projects onSelectProject={navigateToProject} />

        {/* 5. Project Experience Section */}
        <Experience onSelectProject={navigateToProject} />

        {/* 6. Education Section */}
        <Education />

        {/* 7. Certifications Section */}
        <Certifications />

        {/* 8. Resume Section with ATS Viewer & Analytics */}
        <ResumeSection />

        {/* 9. Contact Section */}
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

export default App;
