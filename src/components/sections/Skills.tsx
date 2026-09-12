import React, { useState, useEffect, useCallback } from 'react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  Wrench, 
  Cloud, 
  Check,
  Sparkles
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { DataStateWrapper } from '../ui/DataStateWrapper';
import { skillService } from '../../services/skillService';
import { portfolioService } from '../../services/portfolioService';
import { skillsData } from '../../data/portfolioData';
import type { SkillGroup, SkillItem } from '../../types/portfolio';

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('program') || cat.includes('language')) return <Code2 className="w-5 h-5 text-indigo-600" />;
  if (cat.includes('front') || cat.includes('ui')) return <Layout className="w-5 h-5 text-teal-600" />;
  if (cat.includes('back') || cat.includes('micro') || cat.includes('distribut')) return <Server className="w-5 h-5 text-emerald-600" />;
  if (cat.includes('data') || cat.includes('sql') || cat.includes('cache')) return <Database className="w-5 h-5 text-amber-600" />;
  if (cat.includes('cloud') || cat.includes('devops')) return <Cloud className="w-5 h-5 text-sky-600" />;
  return <Wrench className="w-5 h-5 text-slate-700" />;
};

export const Skills: React.FC = () => {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(skillsData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await skillService.getSkillCategories();
      if (data && data.length > 0) {
        const formatted: SkillGroup[] = data.map((cat) => ({
          category: cat.category as SkillGroup['category'],
          description: cat.description,
          skills: (cat.skills || []).map((s: SkillItem) => ({
            name: s.name,
            level: s.level,
            highlight: s.highlight
          }))
        }));
        setSkillGroups(formatted);
      } else {
        setSkillGroups(skillsData);
      }
    } catch (err) {
      console.warn('Skills API fetch error, falling back to local dataset:', err);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
    const unsubscribe = portfolioService.onDataChanged(() => {
      fetchSkills();
    });
    return () => unsubscribe();
  }, [fetchSkills]);

  return (
    <section id="skills" className="py-20 lg:py-24 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Technical Skills"
          title="Core Competencies & Stack"
          subtitle="A categorized overview of the languages, frameworks, databases, and developer tooling I work with."
        />

        <DataStateWrapper
          isLoading={isLoading}
          error={error}
          isEmpty={skillGroups.length === 0}
          onRetry={fetchSkills}
          emptyTitle="No Skills Found"
          emptyMessage="No skill categories are currently populated in the database."
          skeletonType="grid"
          loadingCount={6}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      {getCategoryIcon(group.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900">
                        {group.category}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400">
                        {group.skills.length} Technologies
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                    {group.description}
                  </p>

                  {/* Skills Badges Grid */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                          skill.highlight
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {skill.highlight && (
                          <Sparkles className="w-3 h-3 text-indigo-600 flex-shrink-0" />
                        )}
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span className="text-[9px] px-1 rounded bg-slate-200 text-slate-600">
                            {skill.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Quick Indicator */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Proficiency</span>
                  <div className="flex items-center gap-1 text-emerald-600 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DataStateWrapper>
      </div>
    </section>
  );
};
