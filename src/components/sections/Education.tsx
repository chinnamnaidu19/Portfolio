import React, { useState, useEffect, useCallback } from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';
import { DataStateWrapper } from '../ui/DataStateWrapper';
import { educationService } from '../../services/educationService';
import { portfolioService } from '../../services/portfolioService';
import { profile } from '../../data/profile';
import { educationData } from '../../data/portfolioData';
import type { EducationItem } from '../../types/portfolio';

export const Education: React.FC = () => {
  const [educations, setEducations] = useState<EducationItem[]>(educationData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEducation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await educationService.getEducation();
      if (data && data.length > 0) {
        setEducations(data);
      } else {
        setEducations(educationData);
      }
    } catch (err) {
      console.warn('Education API fetch error, falling back to local dataset:', err);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEducation();
    const unsubscribe = portfolioService.onDataChanged(() => {
      fetchEducation();
    });
    return () => unsubscribe();
  }, [fetchEducation]);

  return (
    <section id="education" className="py-20 lg:py-24 bg-slate-50/60 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Academic Background"
          title="Education & Foundations"
          subtitle="Formal computer science foundation in algorithms, system architecture, database theory, and software engineering."
        />

        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical line */}
          <div className="hidden sm:block absolute left-8 top-4 bottom-4 w-0.5 bg-slate-200" />

          <DataStateWrapper
            isLoading={isLoading}
            error={error}
            isEmpty={educations.length === 0}
            onRetry={fetchEducation}
            emptyTitle="No Academic Records"
            emptyMessage="No education records are currently found."
            skeletonType="timeline"
            loadingCount={1}
          >
            <div className="space-y-8 sm:space-y-10">
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="relative flex flex-col sm:flex-row gap-6 sm:gap-10 group"
                >
                  {/* Timeline Node */}
                  <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-white border-2 border-indigo-600 text-indigo-600 shadow-sm flex-shrink-0 z-10">
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
                    {/* Top Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {edu.grade}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{edu.period}</span>
                      </div>
                    </div>

                    {/* Degree & Field */}
                    <div className="space-y-1 mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {edu.degree}
                      </h3>
                      <p className="text-base font-semibold text-indigo-600">
                        {edu.field}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
                        <span className="font-medium text-slate-700">
                          {edu.institution}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {edu.location || profile.location}
                        </span>
                      </div>
                    </div>

                    {/* Coursework */}
                    {edu.coursework && edu.coursework.length > 0 && (
                      <div className="space-y-2 mb-4">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                          Key Coursework:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {edu.coursework.map((course) => (
                            <Badge key={course} variant="slate" size="sm">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Highlights */}
                    {edu.highlights && edu.highlights.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 space-y-1.5">
                        {edu.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <Award className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

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
