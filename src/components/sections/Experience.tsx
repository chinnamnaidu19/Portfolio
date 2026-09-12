import React, { useState, useEffect, useCallback } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  GitBranch,
  Code2
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { DataStateWrapper } from '../ui/DataStateWrapper';
import { experienceService } from '../../services/experienceService';
import { portfolioService } from '../../services/portfolioService';
import { experienceData } from '../../data/portfolioData';
import type { ExperienceItem } from '../../types/portfolio';

interface ExperienceProps {
  onSelectProject?: (id: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onSelectProject }) => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(experienceData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExperience = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await experienceService.getExperiences();
      if (data && data.length > 0) {
        setExperiences(data);
      } else {
        setExperiences(experienceData);
      }
    } catch (err) {
      console.warn('Experience API fetch error, falling back to local dataset:', err);
      setError(null);
      setExperiences(experienceData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperience();
    const unsubscribe = portfolioService.onDataChanged(() => {
      fetchExperience();
    });
    return () => unsubscribe();
  }, [fetchExperience]);

  return (
    <section id="experience" className="py-20 lg:py-24 bg-slate-50/60 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Hands-on Development"
          title="PROJECT EXPERIENCE"
          subtitle="Selected project demonstrating my full-stack development, backend engineering, database design, and problem-solving skills."
        />

        <div className="max-w-4xl mx-auto">
          <DataStateWrapper
            isLoading={isLoading}
            error={error}
            isEmpty={experiences.length === 0}
            onRetry={fetchExperience}
            emptyTitle="No Project Experience"
            emptyMessage="No project experience items currently listed."
            skeletonType="card"
            loadingCount={1}
          >
            <div className="space-y-8">
              {experiences.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all overflow-hidden relative"
                >
                  {/* Top Accent Gradient Bar */}
                  <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600" />

                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Top Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex-shrink-0">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
                            {item.category || 'Full Stack / Java'}
                          </span>
                          <span className="text-xs text-slate-400 block sm:inline sm:ml-2">
                            • {item.type || 'Academic Full-Stack Project'}
                          </span>
                        </div>
                      </div>

                      <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        Featured System
                      </span>
                    </div>

                    {/* Project Title & Overview */}
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                        {item.title || item.project}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    {/* Two-Column Breakdown: Key Features & Contributions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {/* Left: Key Features */}
                      {item.features && item.features.length > 0 && (
                        <div className="space-y-3 bg-slate-50/70 p-5 rounded-xl border border-slate-200/80">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-emerald-600" />
                            KEY FEATURES:
                          </h4>
                          <ul className="space-y-2">
                            {item.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Right: My Contribution */}
                      {item.contributions && item.contributions.length > 0 && (
                        <div className="space-y-3 bg-indigo-50/40 p-5 rounded-xl border border-indigo-100/80">
                          <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-900 font-bold flex items-center gap-2">
                            <GitBranch className="w-4 h-4 text-indigo-600" />
                            MY CONTRIBUTION:
                          </h4>
                          <ul className="space-y-2">
                            {item.contributions.map((contrib, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                                <span>{contrib}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Technology Stack Tags */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="pt-2 space-y-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {item.technologies.map((tech) => (
                            <Badge key={tech} variant="slate" size="sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 sm:px-8 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <span>Full Stack Academic Project</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors shadow-xs"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>GitHub ↗</span>
                        </a>
                      )}

                      <button
                        onClick={() => {
                          const slug = item.projectSlug || 'tame-timetable-management';
                          if (onSelectProject) {
                            onSelectProject(slug);
                          } else {
                            window.location.href = `/projects/${slug}`;
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm cursor-pointer"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DataStateWrapper>
        </div>
      </div>
    </section>
  );
};

export default Experience;
