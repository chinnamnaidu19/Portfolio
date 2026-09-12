import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  ExternalLink, 
  Maximize2, 
  CheckCircle2, 
  Filter,
  Search,
  ArrowRight
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { ProjectModal } from '../ui/ProjectModal';
import { DataStateWrapper } from '../ui/DataStateWrapper';
import { projectService } from '../../services/projectService';
import { portfolioService } from '../../services/portfolioService';
import { projectsData } from '../../data/portfolioData';
import type { ProjectItem } from '../../types/portfolio';

interface ProjectsProps {
  onSelectProject?: (id: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<ProjectItem[]>(projectsData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await projectService.getProjects();
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(projectsData);
      }
    } catch (err) {
      console.warn('Projects API fetch error, falling back to local dataset:', err);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    const unsubscribe = portfolioService.onDataChanged(() => {
      fetchProjects();
    });
    return () => unsubscribe();
  }, [fetchProjects]);

  const filterTags = [
    'All',
    'Full Stack',
    'Java',
    'AI'
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      let matchesTag = true;
      if (selectedTag !== 'All') {
        const tagLower = selectedTag.toLowerCase();
        const inCategory = project.category?.toLowerCase().includes(tagLower);
        const inTech = project.technologies?.some(t => t.toLowerCase().includes(tagLower));
        const inTitle = project.title?.toLowerCase().includes(tagLower);
        matchesTag = Boolean(inCategory || inTech || inTitle);
      }

      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = project.title.toLowerCase().includes(query);
        const inDesc = project.description.toLowerCase().includes(query);
        const inTech = project.technologies.some(t => t.toLowerCase().includes(query));
        matchesSearch = inTitle || inDesc || inTech;
      }

      return matchesTag && matchesSearch;
    });
  }, [projects, selectedTag, searchQuery]);

  return (
    <section id="projects" className="py-20 lg:py-24 bg-slate-50/60 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Engineering Work"
          title="Featured Projects & Systems"
          subtitle="Selected projects demonstrating my software engineering, full-stack development and AI application development skills."
        />

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, technology (e.g. Java, React)..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all shadow-sm font-sans"
              aria-label="Search projects by technology or title"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 hover:text-slate-800 px-1.5 py-0.5 rounded bg-slate-100 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Multi-Tag Filters */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            <div className="inline-flex items-center gap-1.5 mr-1 text-xs font-mono text-slate-500 hidden sm:flex">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </div>

            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with DataStateWrapper */}
        <DataStateWrapper
          isLoading={isLoading}
          error={error}
          isEmpty={filteredProjects.length === 0}
          onRetry={fetchProjects}
          emptyTitle="No Matching Architectures"
          emptyMessage="No projects currently match your active search and filter criteria."
          skeletonType="card"
          loadingCount={4}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={project.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-full bg-white/90 text-indigo-700 shadow-sm">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-indigo-600 text-white shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Tagline */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-xs font-mono text-slate-100 line-clamp-1">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Key Features Bullet List */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Highlights:
                        </h4>
                        {project.features.slice(0, 2).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Badges */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="pt-2">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <Badge key={tech} variant="slate" size="sm">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 5 && (
                            <span className="text-xs font-mono text-slate-400 self-center">
                              +{project.technologies.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {Boolean(project.githubUrl && project.githubUrl.trim().length > 0 && !project.githubUrl.includes('YOUR-GITHUB-USERNAME')) && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}

                    {Boolean(project.liveUrl && project.liveUrl.trim().length > 0 && !project.liveUrl.includes('YOUR-LIVE-DEMO')) && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {onSelectProject && (
                      <button
                        onClick={() => onSelectProject(String(project.id))}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer shadow-xs"
                        title="View Full Project Details"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                      title="Quick Preview Modal"
                      aria-label="Quick Preview Modal"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DataStateWrapper>

        {/* Modal for In-depth view */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
};
