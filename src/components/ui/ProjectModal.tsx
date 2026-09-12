import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { ProjectItem } from '../../types/portfolio';
import { Badge } from './Badge';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Header Image / Banner */}
        <div className="relative h-48 sm:h-64 w-full bg-slate-900 flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Pill */}
          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-indigo-600 text-white shadow-sm">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-indigo-600 mt-1">
              {project.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Overview
            </h4>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Key Capabilities & Features
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture Highlights */}
          {project.architecturePoints && project.architecturePoints.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-600" />
                Architectural Highlights
              </h4>
              <ul className="space-y-2">
                {project.architecturePoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="slate" size="md">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-8 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-medium transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
