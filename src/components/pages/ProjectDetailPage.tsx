import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  ShieldAlert, 
  Cpu, 
  Activity,
  AlertTriangle,
  UserCheck
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { projectService } from '../../services/projectService';
import { projectsData } from '../../data/portfolioData';
import type { ProjectItem } from '../../types/portfolio';

interface ProjectDetailPageProps {
  projectId: string;
  onNavigateHome: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId, onNavigateHome }) => {
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let isMounted = true;

    projectService.getProjects().then((list) => {
      if (!isMounted) return;
      const found = list.find((p) => String(p.id) === String(projectId) || p.slug === projectId);
      if (found) {
        setProject(found);
      } else {
        const fallback = projectsData.find((p) => String(p.id) === String(projectId) || p.slug === projectId);
        setProject(fallback || projectsData[0]);
      }
      setIsLoading(false);
    }).catch(() => {
      if (!isMounted) return;
      const fallback = projectsData.find((p) => String(p.id) === String(projectId) || p.slug === projectId);
      setProject(fallback || projectsData[0]);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  if (isLoading || !project) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-6">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-500">Loading Project Details...</p>
        </div>
      </div>
    );
  }

  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0 && !project.githubUrl.includes('YOUR-GITHUB-USERNAME'));
  const hasLiveDemo = Boolean(project.liveUrl && project.liveUrl.trim().length > 0 && !project.liveUrl.includes('YOUR-LIVE-DEMO'));

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-600 selection:text-white pb-24">
      {/* Top Breadcrumb Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Overview</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span>PROJECT:</span>
          <span className="text-indigo-600 font-bold">#{project.id}</span>
        </div>
      </header>

      {/* Hero Header Area */}
      <div className="relative py-12 lg:py-16 border-b border-slate-200 bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Featured Project
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-3xl leading-relaxed">
            {project.tagline || project.shortDescription || project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm transition-all shadow-sm"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Explore GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            )}

            {hasLiveDemo && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
              >
                <Activity className="w-4 h-4" />
                <span>Launch Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            )}
          </div>

        </div>
      </div>

      {/* Main Breakdown Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        {/* Project Image Banner */}
        {project.image && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md relative max-h-[420px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 1. Problem Statement & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Problem Card */}
          <div className="bg-rose-50/50 rounded-2xl p-6 sm:p-8 border border-rose-100 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Problem Statement</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              The Challenge & Need Addressed
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {project.problem || project.problemStatement || 
                'Organizations and end users face severe operational friction, manual planning bottlenecks, and lack of transparency across traditional non-automated workflows.'}
            </p>
          </div>

          {/* Solution Card */}
          <div className="bg-emerald-50/50 rounded-2xl p-6 sm:p-8 border border-emerald-100 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Proposed Solution</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Implemented Technical Solution
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {project.solution || 
                'Constructed an end-to-end full stack architecture leveraging modern Java Spring Boot backend services and an interactive React frontend for high responsiveness, structured data storage, and automated workflows.'}
            </p>
          </div>

        </div>

        {/* 2. Key Features */}
        {project.features && project.features.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Key Features & Capabilities</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Tech Stack Deep-Dive */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Technology Stack</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 4. Architecture & Engineering Details */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Architecture & System Highlights</span>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            {project.longDescription || project.description}
          </p>

          {project.architecturePoints && project.architecturePoints.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
              {project.architecturePoints.map((point, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-mono font-bold flex-shrink-0 text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5. Challenges & My Contribution (if available) */}
        {(project.challenges || project.contribution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.challenges && project.challenges.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Engineering Challenges</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.contribution && project.contribution.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                  <UserCheck className="w-4 h-4 text-indigo-600" />
                  <span>My Contribution</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {project.contribution.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>

          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source on GitHub</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
