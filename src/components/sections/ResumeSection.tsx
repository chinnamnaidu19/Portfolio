import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { profile } from '../../data/profile';
import { experienceData } from '../../data/portfolioData';
import { analyticsService } from '../../services/analyticsService';

export const ResumeSection: React.FC = () => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    analyticsService.trackEvent('RESUME_DOWNLOAD', `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`);
    const link = document.createElement('a');
    link.href = profile.resumeURL;
    link.download = `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleOpenPreview = () => {
    analyticsService.trackEvent('PAGE_VIEW', 'Resume_Interactive_Preview_Modal');
    setShowPreviewModal(true);
  };

  return (
    <section id="resume" className="py-20 lg:py-24 bg-slate-50/60 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Curriculum Vitae"
          title="Resume & Professional Credentials"
          subtitle="A comprehensive overview of my technical profile, education, experience, and development qualifications."
        />

        <div className="max-w-4xl mx-auto">
          {/* Main Resume Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
            
            {/* Header / Actions Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-600 text-white shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {profile.name}
                  </h3>
                </div>
                <p className="text-sm font-medium text-indigo-600">
                  {profile.professionalTitle}
                </p>
                <p className="text-xs text-slate-500">
                  {profile.email} · {profile.location}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleOpenPreview}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-indigo-600" />
                  <span>View Resume</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>

            {downloadSuccess && (
              <div className="my-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Resume download initiated from <code className="font-mono bg-emerald-100/70 px-1 py-0.5 rounded">{profile.resumeURL}</code></span>
              </div>
            )}

            {/* Structured Resume Content Preview */}
            <div className="pt-6 space-y-6">
              
              {/* Summary */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Executive Summary
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {profile.shortBio} {profile.about.careerObjective}
                </p>
              </div>

              {/* Core Competencies Quick Summary */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  Technical Competencies
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block mb-1">Backend & Distributed Systems:</span>
                    <span className="text-slate-600">Java, Spring Boot, Microservices, REST APIs, Docker, AWS, PostgreSQL, MySQL, Hibernate</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block mb-1">Frontend & Engineering Tools:</span>
                    <span className="text-slate-600">React, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3, Git, Maven, Postman</span>
                  </div>
                </div>
              </div>

              {/* Experience Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  Experience Highlights
                </h4>
                <div className="space-y-3">
                  {experienceData.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <div className="font-bold text-sm text-slate-900">
                          {exp.role} <span className="text-indigo-600 font-normal">@ {exp.company}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        {exp.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Highlight from profile */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  Education
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">
                      {profile.education.degree}
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {profile.education.college}{profile.education.university ? ` · ${profile.education.university}` : ''}
                    </p>
                  </div>
                  <div className="text-right self-start sm:self-auto">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block">
                      {profile.education.cgpa}
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-1 font-mono">
                      {profile.education.startYear} — {profile.education.endYear}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Modal: In-browser Resume Viewer */}
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setShowPreviewModal(false)}
            />

            <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 max-h-[90vh] flex flex-col overflow-hidden">
              <div className="p-4 sm:px-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {profile.name} - Resume Preview
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Printable-style Preview Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 text-sm">
                <div className="text-center pb-5 border-b border-slate-200">
                  <h2 className="text-2xl font-extrabold text-slate-900">{profile.name}</h2>
                  <p className="text-xs font-medium text-indigo-600 mt-1">{profile.professionalTitle}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {profile.email} · {profile.mobileNumber} · {profile.location}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1 border-b border-indigo-100 pb-1">
                    Professional Summary
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1">
                    {profile.about.professionalSummary}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1 border-b border-indigo-100 pb-1">
                    Education
                  </h3>
                  <div className="flex justify-between text-xs font-semibold mt-1">
                    <span>{profile.education.degree}</span>
                    <span className="text-slate-500">{profile.education.startYear} — {profile.education.endYear}</span>
                  </div>
                  <p className="text-xs text-slate-600">{profile.education.college}{profile.education.university ? ` · ${profile.education.university}` : ''}</p>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">CGPA / Percentage: {profile.education.cgpa}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1 border-b border-indigo-100 pb-1">
                    Technical Focus
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1">
                    {profile.about.technicalInterests.join(' · ')}
                  </p>
                </div>

                <div className="pt-2 text-center text-slate-400 text-xs border-t border-slate-100">
                  PDF location: <span className="font-mono">{profile.resumeURL}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
