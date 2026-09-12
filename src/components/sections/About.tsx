import React from 'react';
import { 
  Target, 
  Code2, 
  Layers, 
  UserCheck
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { profile } from '../../data/profile';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-24 bg-slate-50/60 border-t border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Me"
          title="Professional Background & Focus"
          subtitle="An overview of my engineering philosophy, technical interests, and career trajectory."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Personal Intro, Professional Summary & Career Objective */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Summary Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-indigo-600">
                <UserCheck className="w-5 h-5" />
                <h3 className="text-lg font-bold text-slate-900">
                  Personal Introduction
                </h3>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {profile.about.personalIntroduction}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">
                  Professional Summary
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {profile.about.professionalSummary}
                </p>
              </div>

              {/* Career Objective Box */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
                  <Target className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-900 font-bold mb-1">
                      Career Objective
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {profile.about.careerObjective}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Technical & Software Interests */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Technical Interests Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-indigo-600">
                <Layers className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900">
                  Technical Interests
                </h3>
              </div>
              
              <ul className="space-y-2.5">
                {profile.about.technicalInterests.map((interest, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Software Development Interests Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <Code2 className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900">
                  Software Focus Areas
                </h3>
              </div>
              
              <ul className="space-y-2.5">
                {profile.about.softwareInterests.map((interest, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
